import { Fragment, useState } from 'react'
import ButtonAdminProduct from './ButtonAdminProduct'
import ConfirmModalAdminProduct from './ConfirmModalAdminProduct'

const CardAdminProduct = () => {

    const [showAlert, setShowAlert] = useState(false)

    const handleActionLogout = () => {
        setShowAlert(!showAlert)
        console.log("check here", showAlert)
    }

    return (
        <Fragment>
            <ConfirmModalAdminProduct title='Add Product' show={showAlert} cancel={handleActionLogout} />
            <div className="flex flex-col items-center w-full mt-4">
                <div className='w-full bg-white shadow-lg overflow-hidden mx-auto'>
                    <div className="grid grid-flow-col grid-cols-3 py-4 px-4 gap-2">
                        <ButtonAdminProduct title='Add' type='primary' color='blue' onClick={handleActionLogout} />
                        <ButtonAdminProduct title='Edit' type='primary' color='gray' />
                        <ButtonAdminProduct title='Remove' type='primary' color='red' />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CardAdminProduct