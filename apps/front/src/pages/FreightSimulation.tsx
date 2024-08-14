import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IFreightSimulation, isFreightSimulation } from '../interfaces-types/freight-simulation';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { formatFullAddress } from '../util/address';
import { IoIosSpeedometer } from 'react-icons/io';
import { FaMoneyBill, FaTextHeight, FaTextWidth } from 'react-icons/fa';
import { BsBorderWidth } from 'react-icons/bs';
import { IoTime } from 'react-icons/io5';
import { TfiMoney } from 'react-icons/tfi';
import { MdTripOrigin } from 'react-icons/md';
import { CgEditBlackPoint } from 'react-icons/cg';
import { RiPinDistanceFill } from 'react-icons/ri';


const FreightSimulation = () => {
  const { id } = useParams();  

  const cardInfoBodyStyle: React.CSSProperties = {
    backgroundColor: "#2b3136",
    height: "100%"
  }

  const [freightSimulation, setFreightSimulation] = useState<IFreightSimulation | {}>({});

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/v1/freight-simulation/${id}`, {method: "GET"})
    .then((res) => {
      return res.json();
    }) 
    .then((data) => {
      if (data.statusCode != 500){
      setFreightSimulation(data);
      }else{
      setFreightSimulation({})
      }
    })
    .catch((_error) => {
      setFreightSimulation({});
    });
  });
  
  if(isFreightSimulation(freightSimulation)){
  return(
    <Card body bg="dark" text="light">
      <Container>
        <Card.Header as="h5">Simulação de Frete</Card.Header>
          <Card.Body>
            <Row className="mt-4">
                <Col>
                  <Card body style={cardInfoBodyStyle} text="white" >
                    <Card.Header><h1 className="text-center"><strong>Resultado</strong></h1></Card.Header>
                    <Card.Body style={{minHeight: "100%"}}>
                      <Row>
                        <Col lg="12"> 
                          <h3 className="text-center"><strong><TfiMoney/> Mais Barato:</strong> {freightSimulation.cheapest_logistics_operator?.name ? freightSimulation.cheapest_logistics_operator?.name : "Nenhum"}</h3>
                          <h3 className="text-center"><strong><IoIosSpeedometer/> Mais Rápido:</strong> {freightSimulation.fastest_logistics_operator?.name ? freightSimulation.fastest_logistics_operator?.name : "Nenhum"}</h3>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card body style={cardInfoBodyStyle} text="white" >
                    <Card.Header><h1 className="text-center"><strong>Dimensões do Produto</strong></h1></Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg="12"> 
                          <h3 className="text-center"><strong><FaTextHeight/> Altura:</strong> {freightSimulation.product.height}cm</h3>
                          <h3 className="text-center"><strong><FaTextWidth/> Largura:</strong> {freightSimulation.product.width}cm</h3>
                          <h3 className="text-center"><strong><BsBorderWidth/> Comprimento:</strong> {freightSimulation.product.length}cm</h3>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
            <Row className="mt-4">
              <Col lg="6">
                <Card body style={cardInfoBodyStyle} text="white" >
                <Card.Header><h1 className="text-center"><strong>Operador Logístico 1</strong></h1></Card.Header>
                <Card.Body className="mt-3">
                  <Row>
                    <Col lg="6">
                      <h3 className="text-center"><strong><FaMoneyBill/> Preço:</strong> R$ {freightSimulation.logistics_operator1_calculated_data.price.toFixed(2)} </h3>
                    </Col>
                    <Col lg="6">
                      <h3 className="text-center"><strong><IoTime/> Tempo:</strong> {freightSimulation.logistics_operator1_calculated_data.time_in_days} Dia{freightSimulation.logistics_operator1_calculated_data.time_in_days== 1 ? "" : "s"}</h3>
                    </Col>
                  </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="6">
                <Card body style={cardInfoBodyStyle} text="white" >
                <Card.Header><h1 className="text-center"><strong>Operador Logístico 2</strong></h1></Card.Header>
                <Card.Body className="mt-3">
                  <Row>
                    <Col lg="6">
                      <h3 className="text-center"><FaMoneyBill/> <strong>Preço:</strong> R$ {freightSimulation.logistics_operator2_calculated_data.price.toFixed(2)} </h3>
                    </Col>
                    <Col lg="6">
                      <h3 className="text-center"><IoTime/> <strong>Tempo:</strong> {freightSimulation.logistics_operator2_calculated_data.time_in_days} Dia{freightSimulation.logistics_operator2_calculated_data.time_in_days== 1 ? "" : "s"}</h3>
                    </Col>
                  </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Card body style={cardInfoBodyStyle} text="white" >
                  <Card.Header><h1 className="text-center"><strong>Endereços</strong></h1></Card.Header>
                  <Card.Body>
                    <Row>
                    <Col lg="6">
                      <h2 className="text-center my-3"><strong><MdTripOrigin/> Endereço de Origem</strong></h2>
                      <iframe src={`https://maps.google.com/maps?q=${freightSimulation.product.origin_address.coordinates.lat},${freightSimulation.product.origin_address.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`} width="100%" height="250px" loading="lazy" ></iframe>
                      <h2 className='text-center'>{formatFullAddress(freightSimulation.product.origin_address)}</h2>
                    </Col>

                    <Col lg="6">
                      <h2 className="text-center my-3"><strong><CgEditBlackPoint/> Endereço de Destino</strong></h2>
                      <iframe src={`https://maps.google.com/maps?q=${freightSimulation.product.destination_address.coordinates.lat},${freightSimulation.product.destination_address.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`} width="100%" height="250px" loading="lazy" ></iframe>
                      <h2 className='text-center'>{formatFullAddress(freightSimulation.product.destination_address)}</h2>
                    </Col>

                    <Col>
                      <h2 className="mt-3 text-center"><strong><RiPinDistanceFill/> Distancia:</strong> {freightSimulation.product.distance_between_addresses.toFixed(2)} km </h2>
                    </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Container>
    </Card>
  )}else {
    return(
      <Card body bg="dark" text="light">
        <Container>
          <Card.Header as="h5">Simulação de Frete</Card.Header>
          <Card.Body>
            <h1 className="text-center">Simulação de frete não encontrada!</h1>
          </Card.Body>
        </Container>
      </Card>
    )
  }
};

export default FreightSimulation;
