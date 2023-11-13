import "./App.css";
import {Navbar, Nav, Container} from 'react-bootstrap'
import NavbarAdmin from "./components/NavbarAdmin";
import { WhitelistStudent } from "./components/whitelistStudent";
import Loginform from "./components/loginform";



function App() {
  return (
    <div className="App">
       <NavbarAdmin/>
       <br></br>
       <Loginform/>
    </div>
  );
}

export default App;
