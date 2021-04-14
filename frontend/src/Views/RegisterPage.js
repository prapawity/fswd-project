import { useCallback, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_CUSTOMER_USER, CREATE_ADMIN_USER } from '../graphql/registerMutation'
import { useSession } from "../contexts/SessionContext"
const Registerpage = (props) => {
    const { login } = useSession()
    const [newUser, setNewUser] = useState({ name_surname: '', username: '', password: '' })
    const isCustomerType = () => {
        return !(props.location.pathname.includes('admin'))
    }
    const [createUser] = useMutation(isCustomerType() ? CREATE_CUSTOMER_USER : CREATE_ADMIN_USER)
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target
            setNewUser((prev) => ({ ...prev, [name]: value }))
        },
        [],
    )

    const handleRegister = useCallback(
        async (e) => {
            e.preventDefault()
            try {
                await createUser({ variables: { record: newUser } })
                try {
                    await login(newUser.username, newUser.password)
                    alert('Login success',)
                } catch (err) {
                    console.log(err)
                    alert('Login failed')
                }
            } catch (err) {
                console.log(err)
                alert('Register failed')
            }
        },
        [newUser],
    )
    return (
        <section className="section-login">
            <div
                className="w-full h-full bg-login"
                style={{
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    position: "inherit"
                }}
            ></div>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div className="flex-auto px-4 lg:px-10 py-10">
                                <form onSubmit={handleRegister}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Fullname
                  </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            name="name_surname" value={newUser.name_surname} placeholder="Name - Surname" onChange={handleInputChange}
                                            style={{ transition: "all .15s ease" }}
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Username
                  </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            name="username" value={newUser.username} placeholder="Username" onChange={handleInputChange}
                                            style={{ transition: "all .15s ease" }}
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                  </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            name="password" value={newUser.password} placeholder="Password" onChange={handleInputChange}
                                            style={{ transition: "all .15s ease" }}
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                            type="submit"
                                            style={{ transition: "all .15s ease" }}
                                        >
                                            Register
                  </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registerpage