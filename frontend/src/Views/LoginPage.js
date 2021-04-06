import { useCallback, useState } from "react"
import { useSession } from "../contexts/SessionContext"

const LoginPage = () => {
    const { login } = useSession()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = useCallback(
        (e) => {
          setUsername(e.target.value)
        },
        [],
      )
      const handlePasswordChange = useCallback(
        (e) => {
          setPassword(e.target.value)
        },
        [],
      )
      const handleLogin = useCallback(
        async (e) => {
          e.preventDefault()
          await login(username, password)
        },
        [login, password, username],
      )

    return (
        <div>
            <form className="LoginForm-form" onSubmit={handleLogin}>
            <input type="text" name="username" value={username} placeholder="Please Input Username" onChange={handleUsernameChange} width="200px" />
            <input type="password" name="password" value={password} placeholder="Please Input Password" onChange={handlePasswordChange} width="200px" />
                <button className="LoginForm-button" type="submit">Login</button>
            </form>
            
        </div>
    );
}

export default LoginPage