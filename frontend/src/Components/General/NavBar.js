import { Fragment, useMemo } from 'react'
import { useSession } from '../../contexts/SessionContext'

import UserNavBar from './UserNavBar'
import AdminNavBar from './AdminNavBar'

const Navbar = () => {
  const { loading, userCookies } = useSession()

  const NavBarType = useMemo(
    () => {
      
      if (!(userCookies.user === undefined)) {
        return (
          userCookies.user.type === "Admin" ? <AdminNavBar /> : <UserNavBar isGuest={false}/>
        )
      } else {
        return (
          loading ? <Fragment /> : <UserNavBar isGuest={true} />
        )
      }
    },
    [loading, userCookies],
  )

  return (
    <Fragment>
      {NavBarType}
    </Fragment>
  )
}

export default Navbar
