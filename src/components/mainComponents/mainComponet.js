import React from 'react';
import {Carousel,Jumbotron,Form,Button,Alert,Container,Row,Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage1 from "../../freeimg_92769330046freejpg850.jpg";
import backgroundImage2 from "../../NorthConway-2-19-2020-Skating-Cranmore-WiseguyCreative.com_-5fb7fdf68ea71-850x478$large.jpg";
import '../../css/mainCss/main.css';

function MainComponent(props) {
    return (
        <div id="background_main">
            <Container fluid bsPrefix="test" >
                <Row bsPrefix="mainRow">
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="carousel"
                            src={backgroundImage1}
                            alt="First slide"/>
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="carousel"
                            src={backgroundImage2}
                            alt="First slide"/>
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                        <Alert variant={"light"}>
                            <Alert.Heading>FUN</Alert.Heading>
                            text
                        </Alert>
                        <Alert variant={"primary"}>
                            <Alert.Heading>EXCITING</Alert.Heading>
                            text
                        </Alert>
                        <Alert variant={"warning"}>
                            <Alert.Heading>SMART</Alert.Heading>
                            text
                        </Alert>
                        <Jumbotron>
                            <h1>Hello, world!</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainComponent;