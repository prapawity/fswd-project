import { Fragment, useCallback, useState } from "react";
import { storageRef } from "../../config";
import { CREATE_PRODUCT } from "../../graphql/productMutation";
import { useMutation } from "@apollo/client";
import { PRODUCTS_QUERY } from "../../graphql/productQuery";
import ButtonAdminProduct from "../../Components/General/ButtonAdminProduct";
import { useHistory } from "react-router";
import { useSession } from "../../contexts/SessionContext";

const AdminCreateProduct = (props) => {
  const history = useHistory();
  const { setLoading } = useSession();
  const title = "ADMIN FORM:- CREATE PRODUCT";
  const desc = "Please fill all input information";
  const show = true;
  const [imageList, setImage] = useState({ files: [] });
  const [thumpnail, setthumnail] = useState({ file: {} });
  const [thumpnailPath, setThumpnailPath] = useState("");
  const [imgBlob, setImgBlob] = useState({ data: [] });
  const categoryType = [
    "RUNNING",
    "FOOTBALL",
    "CASUAL",
    "BASKETBALL",
    "SANDALS",
    "OTHER",
  ];
  const refetchQuery = {
    refetchQueries: [
      {
        query: PRODUCTS_QUERY,
      },
    ],
  };
  const [create_product] = useMutation(CREATE_PRODUCT, refetchQuery);
  let flagRefresh = 0;
  const [productCreate, setProduct] = useState({
    name: "",
    price: "1",
    category: categoryType[0],
    description: "",
    imageList: [],
    thumpnail: "",
  });
  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleUploadThumpnail();
  };

  const clearData = () => {
    redirectToAdminProduct();
  };

  const redirectToAdminProduct = useCallback(() => {
    history.push("/admin/products");
  }, [history]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleUploadData = async (thumpnailURL) => {
    const imgListUpload = [thumpnailURL];
    imageList.files.map(async (file, index) => {
      const timestamp = `${Math.floor(Date.now() / 100)}`;
      const uploadTask = storageRef
        .ref("All_Files/")
        .child(file.name + timestamp)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done", snapshot);
        },
        (error) => {
          console.log("ERROR:-", error);
          setLoading(false);
          alert("Upload Thumpnail not success");
        },
        async () => {
          const url = await storageRef
            .ref("All_Files/")
            .child(file.name + timestamp)
            .getDownloadURL()
            .catch((error) => {
              throw error;
            });
          imgListUpload.push(url);
          flagRefresh += 1;
          if (imgBlob.data.length === flagRefresh) {
            await createProductRequest(thumpnailURL, imgListUpload);
          }
        }
      );
    });
  };

  const createProductRequest = async (thumpnailURL, imgListUpload) => {
    console.log("CHECK THUMPNAIL", thumpnailURL, imgListUpload, productCreate);
    setProduct((prev) => ({
      ...prev,
      thumpnail: thumpnailURL,
      imageList: imgListUpload,
    }));
    try {
      await create_product({
        variables: {
          record: {
            name: productCreate.name,
            price: productCreate.price,
            category: productCreate.category,
            description: productCreate.description,
            imageList: imgListUpload,
            thumpnail: thumpnailURL,
          },
        },
      });
      setLoading(false);
      alert("Create Product Success");
      clearData();
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Create Product Fail");
    }
  };

  const handleUploadThumpnail = async () => {
    const timestamp = `${Math.floor(Date.now() / 100)}`;
    const uploadTask = storageRef
      .ref("All_Files/")
      .child(thumpnail.file.name + timestamp)
      .put(thumpnail.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done", snapshot);
      },
      (error) => {
        console.log("ERROR:-", error);
        setLoading(false);
        alert("Upload Images not success");
      },
      async () => {
        const url = await storageRef
          .ref("All_Files/")
          .child(thumpnail.file.name + timestamp)
          .getDownloadURL()
          .catch((error) => {
            throw error;
          });
        setProduct((prev) => ({ ...prev, thumpnail: url }));
        handleUploadData(url);
      }
    );
  };

  const handleCancle = () => {
    history.goBack();
  };

  const fileSelectionHandler = (e) => {
    const dataArray = Object.entries(e.target.files).map((key) => key[1]);
    setImage({ files: dataArray });

    const blobImg = Object.entries(e.target.files).map((key) =>
      URL.createObjectURL(key[1])
    );
    setImgBlob({ data: blobImg });
  };

  const fileSelectionHandlerThumpnail = (e) => {
    setthumnail({ file: e.target.files[0] });
    setThumpnailPath(URL.createObjectURL(e.target.files[0]));
  };

  const mainStyle = {
    display: show ? "block" : "none",
  };

  return (
    <Fragment>
      <div
        className={"fixed z-10 inset-0 overflow-y-auto"}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        style={mainStyle}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleConfirm} className="mt-6">
                <div className="py-1 px-8 rounded-xl">
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">
                      Product Name
                    </label>
                    <input
                      name="name"
                      value={productCreate.name}
                      onChange={handleInputChange}
                      required={true}
                      type="text"
                      autoFocus
                      id="pd_name"
                      className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">
                      Description
                    </label>
                    <input
                      name="description"
                      value={productCreate.description}
                      onChange={handleInputChange}
                      required={true}
                      type="text"
                      autoFocus
                      id="pd_description"
                      className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                      placeholder="Description"
                    />
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">
                      Price
                    </label>
                    <input
                      name="price"
                      value={productCreate.price}
                      required={true}
                      onChange={handleInputChange}
                      type="number"
                      min="1"
                      autoFocus
                      id="pd_price"
                      className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                      placeholder="499"
                    />
                  </div>
                  <div className="my-1 text-sm">
                    <label htmlFor="username" className="block text-black">
                      Category
                    </label>
                    <select
                      name="category"
                      value={productCreate.category}
                      required={true}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    >
                      {categoryType.map((cat, index) => (
                        <option value={cat} key={index}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="thumpnail" className="block text-black">
                      Thumpnail
                    </label>
                    <input
                      required={true}
                      type="file"
                      accept="image/*"
                      id="pd_imageList"
                      onChange={fileSelectionHandlerThumpnail}
                      className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    />
                    <img style={{ width: "auto" }} src={thumpnailPath} />
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="imageList" className="block text-black">
                      Images
                    </label>
                    <input
                      required={true}
                      type="file"
                      multiple={true}
                      accept="image/*"
                      id="pd_imageList"
                      onChange={fileSelectionHandler}
                      className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                    />
                    <ul style={{ columnCount: `3` }}>
                      {imgBlob.data.length > 0 &&
                        imgBlob.data.map((image, index) => {
                          return (
                            <li key={index}>
                              <img style={{ width: "auto" }} src={image} />
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-flow-col grid-cols-2 py-4 px-4 gap-2">
                  <div className="inline-block w-full">
                    <button
                      type="submit"
                      className={
                        "w-full focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-600 hover:bg-green-600 hover:shadow-lg font-bold uppercase"
                      }
                    >
                      Add
                    </button>
                  </div>
                  <div className="inline-block w-full">
                    <button
                      onClick={handleCancle}
                      className={
                        "w-full focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gray-600 hover:bg-gray-600 hover:shadow-lg font-bold uppercase"
                      }
                    >
                      Cancle
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCreateProduct;
