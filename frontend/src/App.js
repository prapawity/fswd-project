import logo from './logo.svg';
import './App.css';
import Home from './Views/Home';
import CustomerInfo from './Views/CustomerInfo';

function App() {

  // MARK: - How to call someting in SesstionContext this is example
  // const handleLogin = useCallback(
  //   async (e) => {
  //     e.preventDefault()
  //     const res = await login(username, password)
  //     console.log("Result", res)
  //   },
  //   [login, password, username],
  // )

  return (
    <div className="App">
      {/* <Home /> */}
      <CustomerInfo />
    </div>
  );
}

export default App;
