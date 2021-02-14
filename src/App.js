import { useState } from "react";
import HeaderComponent from "./components/headerComponents/headerComponet";
import MainComponent from "./components/mainComponents/mainComponet";
import FooterComponent from "./components/footerComponents/footerComponent";
import ConsumptionComponent from "./components/mainComponents/consumptionComponents/consumptionComponent";
import JoinUsComponent from "./components/mainComponents/joinUsComponent";
import IncomeComponent from "./components/mainComponents/incomeComponents/incomeComponent";

function App() {

  const [page,setPage] = useState(1);
  const [loginInfo, setLogin] = useState({
    isLogin:0,
    id:"",
    name:""
  });

  const pageSetting = e => {
    setPage(e);
  }

  if(page === 1){
    return (
      <div className="App">
        <header className="App-header">
          <HeaderComponent pageSetting={pageSetting} loginSetting={setLogin} loginInfo={loginInfo}></HeaderComponent>
        </header>
        <MainComponent></MainComponent>
        <FooterComponent></FooterComponent>
      </div>
    );
  } else if(page === 2){
    return (
      <div className="App">
        <header className="App-header">
          <HeaderComponent pageSetting={pageSetting} loginSetting={setLogin} loginInfo={loginInfo}></HeaderComponent>
        </header>
        <ConsumptionComponent loginInfo={loginInfo}></ConsumptionComponent>
        <FooterComponent></FooterComponent>
      </div>
    );
  } else if (page === 3){
    return (
      <div className="App">
        <header className="App-header">
          <HeaderComponent pageSetting={pageSetting} loginSetting={setLogin} loginInfo={loginInfo}></HeaderComponent>
        </header>
        <IncomeComponent loginInfo={loginInfo}></IncomeComponent>
        <FooterComponent></FooterComponent>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <HeaderComponent pageSetting={pageSetting} loginSetting={setLogin} loginInfo={loginInfo}></HeaderComponent>
        </header>
        <JoinUsComponent pageSetting={pageSetting}></JoinUsComponent>
        <FooterComponent></FooterComponent>
      </div>
    );
  }
}

export default App;
