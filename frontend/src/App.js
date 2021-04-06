import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Home from './Views/Home';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer'
import { Component, Fragment, Suspense } from 'react';
import LoginPage from './Views/LoginPage';
import Registerpage from './Views/RegisterPage';
import CustomerInfo from './Views/CustomerInfo';
import { useSession } from './contexts/SessionContext';

function App() {
  const {user} = useSession()
  // MARK: - How to call someting in SesstionContext this is example
  // const handleLogin = useCallback(
  //   async (e) => {
  //     e.preventDefault()
  //     const res = await login(username, password)
  //     console.log("Result", res)
  //   },
  //   [login, password, username],
  // )
  const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    return (
      <Route 
      {...rest}
      render={(props) => (authed === true) ? <Component {...props} /> : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      exact
      />
    )
  }

  const passAuthen = () => {
    return !(user === null)
  }

  return (
    <Fragment>
      <Navbar />
      <div className="App-page">
        <div className="App-content">
          <Suspense fallback="Loading ...">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
              <Route path="/register" exact>
                <Registerpage />
              </Route>
              <PrivateRoute authed={passAuthen} path="/customer/info" component={CustomerInfo} />
              {/* <Route path="/customer/info" exact>
                <CustomerInfo />
              </Route> */}
            </Switch>
          </Suspense>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
