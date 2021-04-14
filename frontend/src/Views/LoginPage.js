import { useCallback, useEffect, useState } from "react"
import { useSession } from "../contexts/SessionContext"

const LoginPage = () => {
  const { login, loginError } = useSession()
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

  useEffect(() => {
    if (loginError !== "") {
      alert("Login Error")
    }
  }, [loginError])

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
                <form onSubmit={handleLogin}>
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
                      name="username" value={username} placeholder="Username" onChange={handleUsernameChange}
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
                      name="password" value={password} placeholder="Password" onChange={handlePasswordChange}
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Login
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage