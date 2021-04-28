import {
  MailIcon,
  PencilIcon,
  UserIcon,
  PhoneIcon,
  SaveIcon,
  XCircleIcon,
} from "@heroicons/react/solid"

import { useState, useCallback, Fragment, useEffect } from "react"
import { UPDATE_CUSTOMER } from "../graphql/customerMutation"
import { useMutation, useQuery } from "@apollo/client"
import { USER_QUERY } from "../graphql/userQuery"
import { useSession } from "../contexts/SessionContext"
import { storageRef } from "../config"
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import LoadingScreen from "./General/LoadingScreen"

const CardCustomerInfo = (props) => {
  const { userCookies } = useSession()
  const { addToast } = useToasts()
  const history = useHistory()
  const customer = userCookies
  const { loading, data, error, refetch } = useQuery(USER_QUERY)
  const username = data?.customerById?.username ?? ""
  const name = data?.customerById?.name_surname ?? ""
  const [isDisable, setDisable] = useState(true)
  const [email, setEmail] = useState(data?.customerById?.email ?? "")
  const [tel, setTel] = useState(data?.customerById?.tel ?? "")
  const [address, setAddress] = useState(data?.customerById?.address ?? "")
  let img = data?.customerById?.img === undefined || data?.customerById?.img === ""
    ? process.env.PUBLIC_URL + "/img/profile-user.png"
    : data?.customerById?.img ?? process.env.PUBLIC_URL + "/img/profile-user.png"
  const [imageFile, setFile] = useState({ files: null })
  const [imgPath, setImgPath] = useState(null)
  const mockIMG = process.env.PUBLIC_URL + "/img/profile-user.png"
  const [update_customer] = useMutation(UPDATE_CUSTOMER)
  const [forceLoading, setForceLoading] = useState(false)
  const handleEmailChange = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const handleTelChange = useCallback((e) => {
    e.preventDefault()
    setTel(e.target.value)
  }, [])

  const handleAddressChange = useCallback((e) => {
    e.preventDefault()
    setAddress(e.target.value)
  }, [])

  const clickEdit = () => {
    setDisable(!isDisable)
  }

  const handleEdit = async (imgPath) => {
    try {
      await update_customer({
        variables: {
          id: customer._id ?? 0,
          email: email ?? "promo",
          tel: tel ?? "Tel",
          address: address ?? "Address",
          img: imgPath ?? "path",
        },
      })
      addToast(`Update Success `, { appearance: 'success', autoDismiss: true })
      setForceLoading(false)
    } catch (err) {
      console.log(err)
      alert("Update Failed")
    }
  }

  const fileSelectionHandler = (e) => {
    e.preventDefault()

    setFile({ files: e.target.files[0] })
    setImgPath(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    if (!forceLoading) {
      refetch()
    }
  }, [forceLoading])

  const handleUploadData = async (e) => {
    e.preventDefault()

    setForceLoading(true)
    setDisable(true)
    if (imageFile.files) {
      const timestamp = `${Math.floor(Date.now() / 100)}`
      const uploadTask = storageRef.ref('All_Files/').child((imageFile?.files?.name ?? "") + timestamp).put(imageFile?.files)
      console.log("UPLOADING", imageFile.files)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done', snapshot)
        },
        (error) => {
          console.log("ERROR:-", error)
        }, async () => {
          const url = await storageRef.ref('All_Files/').child((imageFile?.files?.name ?? "") + timestamp).getDownloadURL().catch((error) => { throw error })
          console.log("URL:- ", url)
          handleEdit(url)
        }
      )
    } else {
      handleEdit(data?.customerById?.img)
    }
  }

  useEffect(() => {
    if (loading || data === undefined) {
      props?.showLoading(true)
    } else if (!loading || error && data !== undefined || null) {
      props?.showLoading(false)
    }

  }, [loading, userCookies, data])

  if (data?.customerById?._id !== userCookies?._id) {
    refetch()
  }

  return (
    <Fragment>
      <LoadingScreen show={forceLoading}/>
      <section
        className="relatives py-16 bg-blueGray-200"
        style={{ paddingTop: "350px" }}
      >
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg -mt-64">
            <div className="px-6">
              {data ? (
                <Fragment>
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={imgPath ?? img}
                          className="shadow-xl align-middle border-none"
                          style={{ borderRadius: '50%', width: '200px', height: '200px', objectFit: 'cover', margin: 'auto' }}
                          onError={(e) => {
                            e.target.onError = null
                            e.target.src = mockIMG
                          }}

                        />
                        <input hidden={isDisable} type='file' accept="image/*" id='pd_imageList' onChange={fileSelectionHandler} className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" />
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-right">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={clickEdit}
                          hidden={!isDisable}
                        >
                          <div className="flex flex-wrap justify-center">
                            <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
                          Edit
                        </div>
                        </button>
                        <button
                          className="bg-green-600 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          onClick={handleUploadData}
                          hidden={isDisable}
                        >
                          <div className="flex flex-wrap justify-center">
                            <SaveIcon className="text-white-600 h-4 w-4 mr-1" />
                          Save
                        </div>
                        </button>
                        <button
                          className="bg-red-600 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          hidden={isDisable}
                          onClick={clickEdit}
                        >
                          <div className="flex flex-wrap justify-center">
                            <XCircleIcon className="text-white-600 h-4 w-4 mr-1" />
                          Cancle
                        </div>
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                  </div>

                  <div className="text-center mt-6" style={{ width: '35%', margin: 'auto' }} >
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-4">
                      @{username}
                    </h3>
                    <div className="mb-2 text-lg text-blueGray-600">
                      <div className="flex flex-wrap justify-center" style={{ width: '100%', margin: 'auto' }}>
                        <UserIcon className="text-gray-600 h-7 w-7 mr-2" />
                        <b>Name:</b> <p className="ml-2">{name}</p>
                      </div>
                    </div>
                    <div className="mb-2 text-lg text-blueGray-600">
                      <div className="flex flex-wrap" style={{ width: '100%', margin: 'auto', position: 'relative' }}>
                        <MailIcon className="text-gray-600 h-7 w-7 mr-2" />
                        <b>Email:</b>
                        <input
                          type="email"
                          disabled={isDisable}
                          value={email}
                          name={email}
                          onChange={handleEmailChange}
                          placeholder="Email"
                          className="w-full mt-2 ml-2 px-8 py-1 pl-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div className="mb-2 text-lg text-blueGray-600 ">
                      <div className="flex flex-wrap" style={{ width: '100%', margin: 'auto' }}>
                        <PhoneIcon className="text-gray-600 h-7 w-7 mr-2" />
                        <b>Tel:</b>
                        <input
                          disabled={isDisable}
                          type="tel"
                          value={tel}
                          name={tel}
                          onChange={handleTelChange}
                          placeholder="Phone number"
                          className="w-full mt-2 ml-2 px-8 py-1 pl-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                          required={true}
                          pattern="[0-9]{10}"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 py-8 border-t border-blueGray-200 text-center w-full">
                    <div className="flex flex-wrap w-full">
                      <h5 className="text-3xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Address
                    </h5>
                      <div className="w-full">
                        <p className="w-full text-lg leading-relaxed text-blueGray-700">
                          <textarea
                            type="text"
                            disabled={isDisable}
                            value={address}
                            name={address}
                            onChange={handleAddressChange}
                            style={{ overflowWrap: 'break-word', wordBreak: 'break-all', hyphens: 'auto' }}
                            className="w-full ml-2 px-8 py-2 pl-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment />
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default CardCustomerInfo
