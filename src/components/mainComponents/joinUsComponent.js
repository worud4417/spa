import React,{useState} from 'react';
import {Row, Col,InputGroup,Form,FormControl, Container,Button} from "react-bootstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/mainCss/joinUs.css";
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

function JoinUsComponent(props){

    const [joinUsInfo,setJoinUsInfo] = useState({
            id:"",
            password:"",
            name:"",
        }
    )

    const changeId = (e)=>{
        joinUsInfo.id = e.target.value;
        setJoinUsInfo(joinUsInfo);
    }

    const changePassword = (e)=>{
        joinUsInfo.password = e.target.value;
        setJoinUsInfo(joinUsInfo);
    }

    const changeName = (e)=>{
        joinUsInfo.name = e.target.value;
        setJoinUsInfo(joinUsInfo);
    }

    const setUserInfo = () => {
        axios.post("http://localhost:8080/joinUs",new URLSearchParams({
            'id': joinUsInfo.id,
            'password': joinUsInfo.password,
            'name': joinUsInfo.name
          }),{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }
        ).then(function(response){
            if(response.status == StatusCodes.OK){
                alert("join success");

                //redux setting onlogin

                props.pageSetting(1);
            }
        }).catch(function(err){
            if(err.request.status == StatusCodes.INTERNAL_SERVER_ERROR){
                alert("existed id");
            } else if (err.message == "Network Error"){
                alert("network err")
            }else{
                alert("server fail");
            }
        })
    }

    return (
        <div id="background_join">
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <label id="joinUsLabel">Join Us</label>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><div className="inputText">&nbsp;&nbsp;&nbsp;&nbsp; ID &nbsp;&nbsp;&nbsp;&nbsp;</div></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="ID"
                            aria-label="ID"
                            aria-describedby="basic-addon2"
                            onChange={(e)=>changeId(e)}
                            />
                        </InputGroup>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><div className="inputText">PASSWORD</div></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="PASSWORD"
                            aria-label="PASSWORD"
                            aria-describedby="basic-addon2"
                            onChange={(e)=>changePassword(e)}
                            />
                        </InputGroup>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><div className="inputText">&nbsp;&nbsp; NAME &nbsp;&nbsp;</div></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="NAME"
                            aria-label="NAME"
                            aria-describedby="basic-addon2"
                            onChange={(e)=>changeName(e)}
                            />
                        </InputGroup>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Button variant="outline-secondary" onClick={()=>setUserInfo()}>Submit</Button>{' '}
                        <Button variant="outline-secondary" onClick={()=>props.pageSetting(1)}>Cancel</Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default JoinUsComponent;

