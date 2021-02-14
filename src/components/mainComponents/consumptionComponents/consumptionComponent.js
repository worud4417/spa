import React,{useState,useEffect} from 'react';
import {Container,Row,Col,InputGroup,FormControl,Button,Card,OverlayTrigger,Popover} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../css/mainCss/consumption.css";
import axios from 'axios';
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import {
    ReasonPhrases,
    StatusCodes,
    getStatusCode,
} from 'http-status-codes';

registerLocale('ko', ko)

function ConsumptionComponent(props) {

    const [consumptionInfo,setConsumptionInfo] = useState({
            consumption:"",
            amount:0,
        }
    )
    const [startDate, setStartDate] = useState(new Date());
    const [consumptionListData, setConsumptionListData] = useState([]);
    const [reranderFlag,setReranderFalg] = useState(0);

    const changeConsumption = (e) => {
        consumptionInfo.consumption = e.target.value;
        setConsumptionInfo(consumptionInfo);
    }

    const changeAmount = (e) => {
        consumptionInfo.amount = e.target.value;
        setConsumptionInfo(consumptionInfo);
    }

    const submitConsumption = () => {
        if(!Number(consumptionInfo.amount)){
            alert("Amount must be Number");
            return null;
        }else if (props.loginInfo.isLogin === 0) {
            alert("please login");
            return null;
        }{
            axios.post("http://localhost:8080/setConsumption",new URLSearchParams({
                'consumption': consumptionInfo.consumption,
                'amount': consumptionInfo.amount,
                "id": props.loginInfo.id,
                "date": startDate.toISOString(),
              }),{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;'
                }
              }
            ).then(()=>{
                setReranderFalg(reranderFlag+1);
            })
        }
    }

    useEffect(()=>{
        if(props.loginInfo.isLogin === 1){
            axios.get("http://localhost:8080/getAllConsumption?id="+props.loginInfo.id).then((e)=>{
                if (e.data.message == null){
                    setConsumptionListData([
                        {date:"null"},
                    ])
                } else {
                    setConsumptionListData(e.data.message);
                }
            }).catch((err)=>{
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
    },[reranderFlag])

    return(
            <div id="background_con">
                <Container fluid>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <label id="consumptionLabel">My Consumption</label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><div className="inputText">Consumption</div></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={(e)=>changeConsumption(e)}/>
                            </InputGroup>
                            <br></br>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><div className="inputText">&nbsp;&nbsp;&nbsp;&nbsp; Amount &nbsp;&nbsp;&nbsp;</div></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={(e)=>changeAmount(e)}/>
                            </InputGroup>
                            <br></br>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><div className="inputText">&nbsp;&nbsp;&nbsp;&nbsp; Date &nbsp;&nbsp;&nbsp;</div></InputGroup.Text>
                                </InputGroup.Prepend>
                                <DatePicker id="dataPicker" selected={startDate} onChange={date => setStartDate(date)} locale="ko" dateFormat={"yyyy-MM-dd"}/> 
                            </InputGroup>
                            <br></br>
                            <Button variant="dark" onClick={()=>submitConsumption()}>Submit</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <label id="consumptionLabel">Consumption List</label>
                        </Col>
                        <Col></Col>
                    </Row>
                    {props.loginInfo.isLogin ? <Row>
                                <div id="list">
                                {consumptionListData.map((e,i)=>{
                                    return (
                                        <Card key={i} style={{ width: '20em', float:"left", marginLeft:"2%",marginBottom:"2%" }}>
                                            <Card.Body>
                                                <Card.Title>
                                                    {new Date(e.date).getFullYear()}-
                                                    {new Date(e.date).getMonth()+1}-
                                                    {new Date(e.date).getDate()}
                                                </Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{e.id}</Card.Subtitle>
                                                <Card.Text>
                                                    Amount : {e.amount}
                                                    <br></br>
                                                    {e.consumption ? new String(e.consumption).slice(0,6) + "..." : "empty"}
                                                </Card.Text>
                                                <OverlayTrigger trigger="click" placement="right" overlay={
                                                    <Popover id="popover-basic">
                                                        <Popover.Title as="h3">consumtion</Popover.Title>
                                                        <Popover.Content>
                                                            {e.consumption}
                                                        </Popover.Content>
                                                    </Popover>
                                                }>
                                                    <Button variant="dark">Click me to see</Button>
                                                </OverlayTrigger>
                                            </Card.Body>
                                        </Card>
                                    )
                                })}
                                </div>
                        </Row> : <Row>
                            <Col></Col>
                            <Col xs={6}>
                                <label id="consumptionLabel">Login please</label>
                            </Col>
                            <Col></Col>
                        </Row>}
                </Container>
            </div>
        )
}

export default ConsumptionComponent;