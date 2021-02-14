import React, {useState} from 'react';
import {Navbar, Nav,FormControl,InputGroup,Button} from "react-bootstrap";
import "../../css/headerCss/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
    ReasonPhrases,
    StatusCodes,
    getStatusCode,
} from 'http-status-codes';

export default function LoginComponent(props) {

    const [login, setLogin] = useState({
        id:"",
        password:""
    });

    const subminLogin = (e) => {
        axios.post("http://localhost:8080/login",new URLSearchParams({
            'id': login.id,
            'password': login.password,
          }),{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }
        ).then(function(response){
            if(response.status == StatusCodes.OK){
                props.loginSetting({
                    isLogin:1,
                    id:response.data.id,
                    name:response.data.name,
                });
                props.changeHome(1);
            }
        }).catch(function(err){
            if(err.request.status == StatusCodes.BAD_REQUEST){
                alert("id not signed up");
            } else if (err.message == "Network Error"){
                alert("network err")
            } else{
                alert("wrong password");
                console.log(err.request)
            }
        })
    }

    const changeId = (e) => {
        login.id = e.target.value;
        setLogin(login);
    }

    const changePassword = (e) => {
        login.password = e.target.value;
        setLogin(login);
    }

    return (
        <div id="login">
            <InputGroup>
                <FormControl
                placeholder="ID"
                aria-label="ID"
                aria-describedby="basic-addon2"
                onChange = {(e)=>changeId(e)}
                />
                <FormControl
                placeholder="PASSWORD"
                aria-label="PASSWORD"
                aria-describedby="basic-addon2"
                onChange = {(e)=>changePassword(e)}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={(e)=>subminLogin(e)}>Submit</Button>
                    <Button variant="outline-secondary" onClick={()=>props.changeHome(4)}>Join us</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}