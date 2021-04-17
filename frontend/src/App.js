import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Home from './Views/Home';
import Navbar from './Components/General/NavBar';
import Footer from './Components/General/Footer'
import { Suspense, useState } from 'react';
import LoginPage from './Views/LoginPage';
import Registerpage from './Views/RegisterPage';
import CustomerInfo from './Views/CustomerInfo';
import CustomerOrder from './Views/CustomerOrder';
import { useSession } from './contexts/SessionContext';
import CustomerOrderDetail from './Views/CustomerOrderDetail';
import ProductPage from './Views/ProductPage';
import ProductDetail from './Views/ProductDetail';
import AdminOrder from './Views/Admin/AdminOrder';
import AdminOrderDetail from './Views/Admin/AdminOrderDetail';
import LoadingScreen from './Components/General/LoadingScreen';

function App() {
  const { userCookies } = useSession()
  const [showLoading, setShowLoading] = useState(false)
  // MARK: - How to call someting in SesstionContext this is example
  // const handleLogin = useCallback(
  //   async (e) => {
  //     e.preventDefault()
  //     const res = await login(username, password)
  //     console.log("Result", res)
  //   },
  //   [login, password, username],
  // )
  const PrivateRoute = ({ component: Component, authed, redirectTo, isAdminPath, ...rest }) => {
    const adminPath = isAdminPath ?? false
    return (
      <Route
        {...rest}
        render={(props) => (authed === true) ? adminPath ? userCookies.type === "Admin" ? <Component showLoading={handleShowLoading} {...props} /> : <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} /> : <Component showLoading={handleShowLoading} {...props} /> : <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />}
      />
    )
  }

  const NormalRoute = ({ component: Component, ...rest }) => {
    return (
      <Route 
      {...rest}
      render={(props) => <Component showLoading={handleShowLoading} {...props} />}
      />
    )
  }

  const handleShowLoading = (isShow) => {
    setShowLoading(isShow)
  }

  const passAuthen = () => {
    return !(userCookies === undefined)
  }

  return (
    <div className="main-dom">
      <LoadingScreen show={showLoading} />
      <Navbar />
      <div className="App-page pb-105 md:pb-77">
        <div className="App-content">
          <Suspense fallback="Loading ...">
            <Switch>
              <NormalRoute path="/" component={Home} exact/>

              {/* MARK:- Authentication */}
              <PrivateRoute authed={!passAuthen()} path="/login"
                redirectTo="/" component={LoginPage} exact/>
              <PrivateRoute authed={!passAuthen()} path="/register/admin"
                redirectTo="/" component={Registerpage} exact/>
              <PrivateRoute authed={!passAuthen()} path="/register" redirectTo="/" component={Registerpage} exact/>

              {/* MARK:- Customer Zone */}
              <NormalRoute path="/products" component={ProductPage} exact/>
              <NormalRoute path="/products/:type" component={ProductPage} exact/>
              <NormalRoute path="/product/detail/:id" component={ProductDetail} exact/>

              <PrivateRoute authed={passAuthen()} path="/customer/info" redirectTo="/login" component={CustomerInfo} exact/>
              <PrivateRoute authed={passAuthen()} path="/customer/orders" redirectTo="/login" component={CustomerOrder} exact/>
              <PrivateRoute authed={passAuthen()} path="/customer/order-detail/:id" redirectTo="/login" component={CustomerOrderDetail} exact/>

              {/* MARK:- Admin Zone */}
              <PrivateRoute authed={passAuthen()} isAdminPath={true} path="/admin/orders" redirectTo="/login" component={AdminOrder} exact/>
              <PrivateRoute authed={passAuthen()} isAdminPath={true} path="/admin/order-detail/:id" redirectTo="/login" component={AdminOrderDetail} exact/>

              {/* MARK:- Other URL */}
              <Route render={() => <Redirect to={{ pathname: "/" }} />} />
            </Switch>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
