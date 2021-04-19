import { Fragment } from 'react'

const InputAdminProduct = (props) => {

    const title = props.title
    const type = props.type
    const id = props.id
    const placeholder = props.placeholder

    return (
        <Fragment>
            <form action="" className="mt-6">
                <div className="py-1 px-8 rounded-xl">
                    <div className="my-1 text-sm">
                        <label for="username" className="block text-black">{title}</label>
                        <input type={type} autofocus id={id} className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder={placeholder} />
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default InputAdminProduct
