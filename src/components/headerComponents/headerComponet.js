import React,{useState} from 'react';
import {Navbar, Nav,FormControl,InputGroup,Button,Image} from "react-bootstrap";
import "../../css/headerCss/header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from "../headerComponents/LoginComponent";
import Logo from "../../books.png"

function HeaderComponent(props) {

    const [isLoginPage,setIsLoginPage] = useState(0);
    const [nowPage, setNowPage] = useState(1);

    const changeHome = (e)=>{
        props.pageSetting(e);
        setNowPage(e);
        setIsLoginPage(0);
    }

    const logout = () =>{
        props.pageSetting(1);
        setNowPage(1);
        setIsLoginPage(0);
        props.loginSetting({
            isLogin:0,
            id:"",
            name:""
        })
    }

    if(props.loginInfo.isLogin === 1){
        return (
            <div id="header">
                <Navbar expand="lg" bg="secondary" variant="dark">
                    <Navbar.Brand>
                        <img src={Logo} width="300" height="33" className="d-inline-block align-top"/>{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link onClick={()=>changeHome(1)}>Home</Nav.Link>
                            <Nav.Link onClick={()=>changeHome(2)}>My consumption</Nav.Link>
                            <Nav.Link onClick={()=>changeHome(3)}>My income</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <div id="userName">Hello! {props.loginInfo.name}&nbsp;</div>
                        </Navbar.Text>
                        <Navbar.Text>
                            <div id="loginButton" onClick={()=>logout()}>Logout</div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
    else if (isLoginPage === 0){
        return (
            <div id="header">
                <Navbar expand="lg" bg="secondary" variant="dark">
                    <Navbar.Brand>
                        <img src={Logo} width="300" height="33" className="d-inline-block align-top"/>{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link onClick={()=>changeHome(1)}>Home</Nav.Link>
                            <Nav.Link onClick={()=>changeHome(2)}>My consumption</Nav.Link>
                            <Nav.Link onClick={()=>changeHome(3)}>My income</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <div id="loginButton" onClick={()=>setIsLoginPage(1)}>Login</div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
    else {
        return (
            <div id="header">
                <Navbar expand="lg" bg="secondary" variant="dark">
                    <Navbar.Brand>
                        <img src={Logo} width="300" height="33" className="d-inline-block align-top"/>{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link onClick={()=>changeHome(1)}>Home</Nav.Link>
                            <Nav.Link onClick={()=>changeHome(2)}>My consumption</Nav.Link>
                            <Nav.Link onClick={()=>changeHome(3)}>My income</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <div id="loginButton" onClick={()=>changeHome(nowPage)}>Login</div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <LoginComponent changeHome={changeHome} loginSetting={props.loginSetting}></LoginComponent>
            </div>
        );
    }
}

export default HeaderComponent;