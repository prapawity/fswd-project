import { Fragment, useCallback, useState } from 'react'
import ButtonAdminProduct from './ButtonAdminProduct'
import { useHistory } from "react-router"

const CardAdminProduct = () => {
    const history = useHistory()
    const handleActionLogout = () => {
    }

    const redirectToAdminProductCreate = useCallback(
        () => {
            history.push('/admin/products/create')
        },
        [history],
    )

    const redirectToAdminProductEdit = useCallback(
        () => {
            history.push('/admin/products/edit')
        },
        [history],
    )

    return (
        <Fragment>
            <div className="flex flex-col items-center w-full mt-4">
                <div className='w-full bg-white shadow-lg overflow-hidden mx-auto'>
                    <div className="grid grid-flow-col grid-cols-3 py-4 px-4 gap-2">
                        <ButtonAdminProduct title='Add' type='primary' color='blue' onClick={redirectToAdminProductCreate} />
                        <ButtonAdminProduct title='Edit' type='primary' color='gray' onClick={redirectToAdminProductEdit} />
                        <ButtonAdminProduct title='Remove' type='primary' color='red' />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CardAdminProduct