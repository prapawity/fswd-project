import {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { useCookies } from 'react-cookie'

import { ME_QUERY } from '../graphql/meQuery'
import { LOGIN_MUTATION } from '../graphql/loginMutation'
import { useHistory } from 'react-router'

const SessionContext = createContext()

export const SessionProvider = (props) => {
  const { children } = props
  const [user, setUser] = useState(null)
  const history = useHistory()
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user', 'cart'])
  const cart = cookies.cart
  const token = cookies.token
  const userData = cookies.user
  const [loginError, setLoginError] = useState('')
  const [loadMe, { loading, data }] = useLazyQuery(ME_QUERY, { fetchPolicy: 'network-only' })
  const [login, { loadingLogin }] = useMutation(LOGIN_MUTATION)
  const handleLogin = useCallback(
    async (username, password) => {
      try {
        setLoginError('')
        const res = await login({ variables: { username, password } })
        if (res?.data?.login) {
          setCookie('token', res?.data?.login?.token, { maxAge: 86400, path: '/' })
          setCookie('user', res?.data?.login?.user, { maxAge: 86400, path: '/' })
          setUser(res?.data?.login?.user)
        }
      } catch (err) {
        console.log("Error form Login: ", err)
        removeCookie('token', { maxAge: 86400, path: '/' })
        removeCookie('user', { maxAge: 86400, path: '/' })
        setLoginError(err)
      }
    },
    [login, removeCookie, setCookie],
  )

  const handleAddCart = (product) => {
    console.log("CART", cart)
    if (cart === undefined) {
      console.log("FIRST TIME")
      const arrayData = [product]
      const json_data = JSON.stringify(arrayData)
      setCookie('cart', json_data, { maxAge: 86400, path: '/' })
    } else {
      console.log("SECOND TIME")
      const response_data = cart
      response_data.push(product)
      setCookie('cart', response_data, { maxAge: 86400, path: '/' })
    }
  }

  const clearCart = () => removeCookie('cart', { maxAge: 86400, path: '/' })


  const redirectToHome = useCallback(
    () => {
      history.push('/')
    },
    [history],
  )

  const handleLogout = useCallback(
    () => {
      console.log("Logout Called")
      setUser(null)
      removeCookie('token', { maxAge: 86400, path: '/' })
      removeCookie('user', { maxAge: 86400, path: '/' })
      removeCookie('cart', { maxAge: 86400, path: '/' })
      redirectToHome()
    },
    [user],
  )
  useEffect(
    () => {
      if (data?.me) {
        setUser(data?.me)
      }
    },
    [data],
  )
  useEffect(() => {
    const loadData = async () => {
      try {
        const id = userData?._id ?? "0"
        const res = await loadMe({ variables: { id } })
        if (res?.data?.login?.token) {
          setCookie('token', res?.data?.login?.token, { maxAge: 86400, path: '/' })
          setCookie('user', res?.data?.login?.user, { maxAge: 86400, path: '/' })
          setUser(res?.data?.login?.user)
        }
      } catch (err) {
        removeCookie('token', { maxAge: 86400 })
        removeCookie('user', { maxAge: 86400 })
      }
    }
    loadData()
  },
    [loadMe, removeCookie],
  )
  console.log("Session Checking....")
  return (
    <SessionContext.Provider
      value={{
        loading, user, login: handleLogin, logout: handleLogout, userCookies: userData, cart: cart, clearCart: clearCart, addProductToCart: handleAddCart, token: token, loginError: loginError, loginLoading: loadingLogin
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)

export default SessionContext