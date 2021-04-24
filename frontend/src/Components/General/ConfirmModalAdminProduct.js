import { Fragment, useEffect, useState } from "react";
import { storageRef } from "../../config";
import ButtonAdminProduct from './ButtonAdminProduct'

const ConfirmModalAdminProduct = (props) => {
  const title = props.title ?? "ใส่ Props Title ด้วยจ้า";
  const desc = props.description ?? "ใส่ Props Description  ด้วยจ้า";
  const show = props.show ?? true
  const [imageList, setImage] = useState({ files: [] })
  const [imgBlob, setImgBlob] = useState({ data: [] })
  const [imageUpload, setImgUpload] = useState([])
  const categoryType = ["Running", "Football", "Casual", "Basketball", "Sandals", "Other"]
  const [flagRefresh, setFlag] = useState(0)
  const handleConfirm = async () => {
    handleUploadData()
    console.log("SUCCESS")
  }

  const handleUploadData = async () => {
    // setImgUpload([])
    imageList.files.map(async (file, index) => {
      const timestamp = `${Math.floor(Date.now() / 100)}`
      const uploadTask = storageRef.ref('All_Files/').child(file.name + timestamp).put(file)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done', snapshot)
        },
        (error) => {
          console.log("ERROR:-", error)
        }, async () => {
          const url = await storageRef.ref('All_Files/').child(file.name + timestamp).getDownloadURL().catch((error) => { throw error })
          setImgUpload(prev => [...prev, url])
          if (imageUpload.length === imgBlob.data.length) {
            setFlag(index)
          }
        }
      )
    })
  }


  const handleCancle = () => {
    props?.cancel()
  }


  const fileSelectionHandler = (e) => {
    const dataArray = Object.entries(e.target.files).map((key) => key[1])
    setImage({ files: dataArray })

    const blobImg = Object.entries(e.target.files).map((key) => URL.createObjectURL(key[1]))
    setImgBlob({ data: blobImg })
  }

  const mainStyle = {
    display: show ? "block" : "none"
  }

  useEffect(() => {
    if (imageUpload.length === imgBlob.data.length && imgBlob.data.length !== 0) {
      console.log("ALL SUCCESS", imageUpload)
    }
  }, [flagRefresh, imageUpload])

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
                    <p className="text-sm text-gray-500">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form action="" className="mt-6">
                <div className="py-1 px-8 rounded-xl">
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">Product Name</label>
                    <input type='text' autoFocus id='pd_name' className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder='Product Name' />
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">Description</label>
                    <input type='text' autoFocus id='pd_description' className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder='Description' />
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">Size</label>
                    <input type='number' min="30" max="50" autoFocus id='pd_size' className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder='40' />
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">Stock</label>
                    <input type='number' min="1" autoFocus id='pd_stock' className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder='40' />
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="username" className="block text-black">Price</label>
                    <input type='number' min="1" autoFocus id='pd_price' className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder='499' />
                  </div>
                  <div className="my-1 text-sm">
                    <label htmlFor="username" className="block text-black">Category</label>
                    <select className="border p-2 rounded">
                      {categoryType.map((cat, index) => <option key={index}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="my-2 text-sm">
                    <label htmlFor="imageList" className="block text-black">Images</label>
                    <input type='file' multiple={true} accept="image/*" id='pd_imageList' onChange={fileSelectionHandler} className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" />
                    <ul style={{ columnCount: `3` }}>
                      {imgBlob.data.length > 0 && imgBlob.data.map((image, index) => {
                        return <li key={index}><img style={{ width: 'auto' }} src={image} /></li>
                      })}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-flow-col grid-cols-2 py-4 px-4 gap-2">

                  <ButtonAdminProduct title='Add' color='blue' type='primary' onClick={handleConfirm} />
                  <ButtonAdminProduct title='Cancel' color='gray' type='primary' onClick={handleCancle} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmModalAdminProduct;