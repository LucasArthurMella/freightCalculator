import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {

  const cardInfoBodyStyle: React.CSSProperties = {
    backgroundColor: "#2b3136",
    height: "100%"
  }
  
  const [freightSimulationAmount, setFreightSimulationAmount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/freight-simulation", {method: "GET"})
    .then((res) => {
      return res.json();
    }) 
    .then((data) => {
      setFreightSimulationAmount(data.length);
    })
  });

  return(
    <Card body bg="dark" text="light">
      <Container>
        <Card.Header as="h5">Home</Card.Header>
        <Card.Body>
          <Row>
            <Col lg="3"></Col>
            <Col>
              <Card body style={cardInfoBodyStyle} text="white">
                <Card.Header><h1 className="text-center"><strong>Informações Gerais</strong></h1></Card.Header>
                <Card.Body>
                  <h1 className="text-center">Simulações Feitas: {freightSimulationAmount}</h1>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="3"></Col>
          </Row>
        </Card.Body>
      </Container>
    </Card>
  )
} 

export default Home;
