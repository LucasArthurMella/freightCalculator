import { Form, Row, Col, Container, Button } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import {  FormEvent, useState } from "react";
import { cepMask } from "../util/masks";

const CalculateFreight = () => {

  const [productInfo, setProductInfo] = useState({altura: "", largura: "", comprimento: ""});
  const handleProductInfoChange = (e: any) => {
    let {name, value} = e.target 
    setProductInfo((prevData) => ({
      ...prevData,
      [name]: value 
    }))
  } 

  const [productOriginAddress, setProductOriginAddress] = useState({logradouro: "", cep: "", numero: ""})
  const handleProductOriginAddressChange = (e: any) => {
    let {name, value} = e.target 
    setProductOriginAddress((prevData) => ({
      ...prevData,
      [name]: name == "cep" ? cepMask(value) : value 
    }))
  } 

  const [productDestinationAddress, setProductDestinationAddress] = useState({logradouro: "", cep: "", numero: ""})
  const handleProductDestinationAddressChange = (e: any) => {
    let {name, value} = e.target 
    setProductDestinationAddress((prevData) => ({
      ...prevData,
      [name]: name == "cep" ? cepMask(value) : value 
    }))
  } 


  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reqBody = {
      productInfo,
      productOriginAddress,
      productDestinationAddress
    }
    console.log(JSON.stringify(reqBody));
  }


  return(
    <>
    <Card body bg="dark" text="light">
      <Container>
      <Card.Header as="h5">Calcular Frete</Card.Header>
      <Card.Body>
          <Form onSubmit={handleSubmit}>
          <h3 className="mt-3">Dimensões do Produto (cm)</h3>
          <Row>

            <Col>
              <Form.Group className="mb-3" controlId="ControlInput1">
                <Form.Label>Altura</Form.Label>
                <Form.Control required type="number" name="altura" onChange={handleProductInfoChange} value={productInfo.altura} min={1} max={1000} placeholder="30" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="ControlInput2">
                <Form.Label>Largura</Form.Label>
                <Form.Control required type="number" name="largura" onChange={handleProductInfoChange} value={productInfo.largura} min={1} max={1000} placeholder="15" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="ControlInput3">
                <Form.Label>Comprimento</Form.Label>
                <Form.Control required type="number" name="comprimento" onChange={handleProductInfoChange} value={productInfo.comprimento} min={1} max={1000} placeholder="10" />
              </Form.Group>
            </Col>
          </Row>
          <Row> 
            <Col xs="12" lg="6">
              <h3 className="mt-3">Endereço de Origem do Produto</h3>
              <Form.Group className="mb-3" controlId="ControlInput4">
                <Form.Label>Logradouro</Form.Label>
                <Form.Control required type="text" name="logradouro" onChange={handleProductOriginAddressChange} value={productOriginAddress.logradouro} minLength={3} maxLength={200} placeholder="Rua XXX da silva" />
              </Form.Group>
              <Row >
                <Col xs="7">
                <Form.Group className="mb-3" controlId="ControlInput5">
                  <Form.Label>Cep</Form.Label>
                  <Form.Control required type="text" name="cep" onChange={handleProductOriginAddressChange} value={productOriginAddress.cep} minLength={9} maxLength={9} placeholder="50730-685" />
                </Form.Group>
                </Col>
                <Col xs="5">
                <Form.Group className="mb-3" controlId="ControlInput6">
                  <Form.Label>Número</Form.Label>
                  <Form.Control required type="number" name="numero" onChange={handleProductOriginAddressChange} value={productOriginAddress.numero} min={1} max={9999} placeholder="281"/>
                </Form.Group>
                </Col>
              </Row>

            </Col>

            <Col xs="11" lg="6">
              <h3 className="mt-3">Endereço de Destino do Produto</h3>
              <Form.Group className="mb-3" controlId="ControlInput7">
                <Form.Label>Logradouro</Form.Label>
                <Form.Control required type="text" name="logradouro" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.logradouro} minLength={3} maxLength={200} placeholder="Rua XXX da silva" />
              </Form.Group>

              <Row >
                <Col xs="7">
                <Form.Group className="mb-3" controlId="ControlInput8">
                  <Form.Label>Cep</Form.Label>
                  <Form.Control required type="text" name="cep" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.cep} minLength={9} maxLength={9} placeholder="50730-685" />
                </Form.Group>
                </Col>
                <Col xs="5">
                <Form.Group className="mb-3" controlId="ControlInput9">
                  <Form.Label>Número</Form.Label>
                  <Form.Control required type="number" name="numero" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.numero} min={1} max={9999} placeholder="281" />
                </Form.Group>
                </Col>
              </Row>

            </Col>
          </Row>
            <Button variant="primary" type="submit">
              Calcular 
            </Button>
          </Form>
          </Card.Body>
        </Container>
    </Card>


    </>
  )
} 


export default CalculateFreight;
