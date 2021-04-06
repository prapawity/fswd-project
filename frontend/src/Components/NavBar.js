import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../contexts/SessionContext'
import UserNavBar from './UserNavBar'

const Navbar = () => {
  const { loading, user } = useSession()

  const NavBarType = useMemo(
    () => {
      console.log("check data", user)
      
      if (user) {
        console.log("Should Update Navbar")
        return (
          <UserNavBar isGuest={false}/>
        )
      } else {
        return (
          <UserNavBar isGuest={true}/>
        )
      }
    },
    [loading, user],
  )

  return (
    <Fragment>
      {NavBarType}
    </Fragment>
  )
}

export default Navbar
