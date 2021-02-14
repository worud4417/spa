import React,{useState,useEffect,useTrail} from 'react';
import {Container,Row,Col,InputGroup,FormControl,Button,Card,Alert,Pagination, PageItem} from "react-bootstrap";
import axios from 'axios';
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useSpring,animated, config} from 'react-spring';
import {
    StatusCodes,
} from 'http-status-codes';

export default function IncomeComponent(props) {

    const [incomeInfo,setIncomeInfo] = useState({
            income:"",
            amount:0,
        }
    )
    const [startDate, setStartDate] = useState(new Date());
    const [reranderFlag,setReranderFalg] = useState(0);
    const [page,setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [incomeList, setIncomeList] = useState([]);
    const styleProps = useSpring({opacity:1, from: {opacity: 0},config:config.molasses});

    const changeIncome = (e) => {
        incomeInfo.income = e.target.value;
        setIncomeInfo(incomeInfo);
    }

    const changeAmount = (e) => {
        incomeInfo.amount = e.target.value;
        setIncomeInfo(incomeInfo);
    }

    const submitIncome = () => {
        if(!Number(incomeInfo.amount)){
            alert("Amount must be Number");
            return null;
        }else if (props.loginInfo.isLogin === 0) {
            alert("please login");
            return null;
        }{
            axios.post("http://localhost:8080/setIncome",new URLSearchParams({
                'income': incomeInfo.income,
                'amount': incomeInfo.amount,
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

    useEffect(() => {
        axios.get("http://localhost:8080/getIncome?page="+page).then((e)=>{
            if(e.data.message == null){
                setIncomeList([
                    {data:"null"}
                ])
            }else{
                setIncomeList(e.data.message)
                setMaxPage(e.data.maxLength)
            }
        }).catch((err)=>{
            if(err.request.status == StatusCodes.BAD_REQUEST){

            }else{

            }
        })
    }, [reranderFlag])

    const paginationBasic = ()=>{
        let items = [];
        if (maxPage<6){
            for (let number = 1; number <= maxPage; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === page} onClick={()=>{clickPage(number)}}>
                        {number}
                    </Pagination.Item>,
                );
            }
        }
        else if(page<3){
            for (let number = 1; number <= 5; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === page} onClick={()=>{clickPage(number)}}>
                        {number}
                    </Pagination.Item>,
                );
            }
            items.push(
                <Pagination.Ellipsis />
            )
        }else if(page<maxPage-4){
            items.push(
                <Pagination.Ellipsis />
            )
            for (let number = page; number <= page+4; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === page} onClick={()=>{clickPage(number)}}>
                        {number}
                    </Pagination.Item>,
                );
            }
              items.push(
                <Pagination.Ellipsis />
            )
        }else{
            items.push(
                <Pagination.Ellipsis />
            )
            for (let number = maxPage-4; number <= maxPage; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === page} onClick={()=>{clickPage(number)}}>
                        {number}
                    </Pagination.Item>,
                );
            }
        }
        return(
            <div>
                <Pagination>
                    <Pagination.First onClick={()=>firstAndLastPage(1)}/>
                    <Pagination.Prev onClick={()=>prevPage()}/>
                    {items}
                    <Pagination.Next onClick={()=>nextPage()}/>
                    <Pagination.Last onClick={()=>firstAndLastPage(maxPage)}/>
                </Pagination>
            </div>
        )
    };

    const clickPage = (number) => {
        setPage(number)
        setReranderFalg(reranderFlag+1)
    }

    const prevPage = () => {
        if (page <= 1){
            setPage(1)
        }
        else {
            setPage(page -1)
        }
        setReranderFalg(reranderFlag+1)
    }

    const nextPage = () => {
        if (page >= maxPage){
            setPage(maxPage)
        }
        else {
            setPage(page +1)
        }
        setReranderFalg(reranderFlag+1)
    }

    const firstAndLastPage=(page) => {
        setPage(page)
        setReranderFalg(page+1)
    }

    return (
        <div id="background_con">
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <label id="consumptionLabel">My Income</label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><div className="inputText">&nbsp;&nbsp;&nbsp;&nbsp;Income&nbsp;&nbsp;&nbsp;&nbsp;</div></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={(e)=>changeIncome(e)}/>
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
                        <Button variant="dark" onClick={()=>submitIncome()}>Submit</Button>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <label id="consumptionLabel">Income List</label>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={7}>
                    {incomeList.map((e,i)=>{
                        return (
                            <animated.div style={styleProps}>
                                <Alert variant={"light"}>
                                    <Alert.Heading>{e.id}</Alert.Heading>
                                    <h6>{e.date}</h6>
                                    <p>
                                        Mount : {e.amount}
                                        <br></br>
                                        {e.income}
                                    </p>
                                </Alert>
                            </animated.div>
                        )
                    })}
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        {paginationBasic()}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}