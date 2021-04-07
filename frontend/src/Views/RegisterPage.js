import { useCallback, useState } from "react"
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_CUSTOMER_USER, CREATE_ADMIN_USER } from '../graphql/registerMutation'
import { useSession } from "../contexts/SessionContext"
const Registerpage = (props) => {
    const { login } = useSession()
    const history = useHistory()
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
                    alert('Login success', )
                } catch (err) {
                    alert('Login failed')
                    console.log(err)
                }
            } catch (err) {
                console.log(err)
                alert('Register failed')
            }
        },
        [createUser, history, newUser],
    )
    return (
        <form className="RegisterForm-form" onSubmit={handleRegister}>
            <input className="RegisterForm-input" type="text" name="name_surname" value={newUser.name_surname} onChange={handleInputChange} placeholder="Fullname" autoComplete="off" required />
            <input className="RegisterForm-input" type="text" name="username" value={newUser.username} onChange={handleInputChange} placeholder="Username" autoComplete="off" required />
            <input className="RegisterForm-input" type="password" name="password" value={newUser.password} onChange={handleInputChange} placeholder="Password" required />
            <button className="RegisterForm-button" type="submit">Register</button>
        </form>
    )
}

export default Registerpage