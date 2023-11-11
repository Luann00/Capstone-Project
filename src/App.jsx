
import LoginForm from "./components/loginform";
import WhitelistStudenten from "./components/whitelist_studenten";
import WhitelistVerwalter from "./components/whitelist_verwalter";



function App() {
  return (
    // <div className="page">
    //   <LoginForm />
    // </div>

    <><div>
      <WhitelistStudenten />
    </div>
    <div>
      <WhitelistVerwalter/>
    </div>
    </>

   
  );
}

export default App;