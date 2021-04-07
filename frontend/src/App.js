import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Home from './Views/Home';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer'
import { Component, Fragment, Suspense } from 'react';
import LoginPage from './Views/LoginPage';
import Registerpage from './Views/RegisterPage';
import CustomerInfo from './Views/CustomerInfo';
import CustomerOrder from './Views/CustomerOrder';
import { useSession } from './contexts/SessionContext';

function App() {
  const { user } = useSession()
  // MARK: - How to call someting in SesstionContext this is example
  // const handleLogin = useCallback(
  //   async (e) => {
  //     e.preventDefault()
  //     const res = await login(username, password)
  //     console.log("Result", res)
  //   },
  //   [login, password, username],
  // )
  const PrivateRoute = ({ component: Component, authed, redirectTo, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (authed === true) ? <Component {...props} /> : <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />}
        exact
      />
    )
  }

  const passAuthen = () => {
    return !(user === null)
  }

  return (
    <Fragment>
      <div className="main-dom">
        <Navbar />
        <div className="App-page">
          <div className="App-content">
            <Suspense fallback="Loading ...">
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <PrivateRoute authed={!passAuthen()} path="/login"
                  redirectTo="/" component={LoginPage} />
                <PrivateRoute authed={!passAuthen()} path="/register/admin"
                  redirectTo="/" component={Registerpage} />
                <PrivateRoute authed={!passAuthen()} path="/register" redirectTo="/" component={Registerpage} />
                <PrivateRoute authed={passAuthen()} path="/customer/info" redirectTo="/login" component={CustomerInfo} />
                <PrivateRoute authed={passAuthen()} path="/customer/info" redirectTo="/login" component={CustomerInfo} />
                <PrivateRoute authed={passAuthen()} path="/customer/order" redirectTo="/login" component={CustomerOrder} />
                {/* <Route path="/customer/info" exact>
                <CustomerInfo />
              </Route> */}
              </Switch>
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
