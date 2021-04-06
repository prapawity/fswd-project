import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [loading, setLoading] = useState(true)
  const userBox = useMemo(
    () => {
      if (loading) {
        return (
          <span className="Navbar-user">Loading ...</span>
        )
      }
      else {
          return(
              <span>NotLoading</span>
          )
      }
    },
    [loading],
  )
  return (
    <nav className="Navbar-nav">
      <Link className="Navbar-title" to="/">Facecook</Link>
      <div className="Navbar-space" />
      {userBox}
    </nav>
  )
}

export default Navbar
