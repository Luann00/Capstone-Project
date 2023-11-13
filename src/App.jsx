import "./App.css";
import {Navbar, Nav, Container} from 'react-bootstrap'
import NavbarAdmin from "./components/NavbarAdmin";
import { WhitelistStudent } from "./components/whitelistStudent";


function App() {
  return (
    <div className="App">
       <NavbarAdmin/>
       <br></br>
       <WhitelistStudent/>
    </div>
  );
}

export default App;
