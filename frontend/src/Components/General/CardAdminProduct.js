import { Fragment, useCallback, useState } from 'react'
import ButtonAdminProduct from './ButtonAdminProduct'
import { useHistory } from "react-router"

const CardAdminProduct = () => {
    const history = useHistory()

    const redirectToAdminProductCreate = useCallback(
        () => {
            history.push('/admin/products/create')
        },
        [history],
    )

    return (
        <Fragment>
            <div className='w-full bg-white mx-auto'>
                <div className="pt-4 pr-12 w-full md:w-1/6" style={{marginRight: '0', marginLeft: 'auto'}}>
                    <ButtonAdminProduct  title='ADD PRODUCT' type='primary' color='blue' onClick={redirectToAdminProductCreate} />
                </div>
            </div>
        </Fragment>
    )
}

export default CardAdminProduct