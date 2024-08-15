import { Form, Row, Col, Container, Button } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import {  FormEvent, useState } from "react";
import { cepMask } from "../util/masks";
import StatesOptions from "../components/StatesOptions";
import { removeEmptyStringProperties } from "../util/general";
import { TbBuildingEstate, TbRulerMeasure } from "react-icons/tb";
import { MdTripOrigin } from "react-icons/md";
import { CgEditBlackPoint } from "react-icons/cg";
import { FaCity, FaRoad, FaTextHeight, FaTextWidth } from "react-icons/fa";
import { BsBorderWidth } from "react-icons/bs";
import { GiZipper } from "react-icons/gi";
import { GoNumber } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const CalculateFreight = () => {
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({height: "", width: "", length: ""});
  const handleProductInfoChange = (e: any) => {
    let {name, value} = e.target 
    setProductInfo((prevData) => ({
      ...prevData,
      [name]: value 
    }))
  } 

  const [productOriginAddress, setProductOriginAddress] = useState({street: "", city: "", state:"", zip_code: "", number: ""})
  const handleProductOriginAddressChange = (e: any) => {
    let {name, value} = e.target 
    setProductOriginAddress((prevData) => ({
      ...prevData,
      [name]: name == "cep" ? cepMask(value) : value 
    }))
  } 

  const [productDestinationAddress, setProductDestinationAddress] = useState({street: "", city: "", state:"", zip_code: "", number: ""})
  const handleProductDestinationAddressChange = (e: any) => {
    let {name, value} = e.target 
    setProductDestinationAddress((prevData) => ({
      ...prevData,
      [name]: name == "cep" ? cepMask(value) : value 
    }))
  } 


  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const productBody = {
      ...productInfo,
      height: +productInfo.height,
      width: +productInfo.width,
      length: +productInfo.length
    }

    const reqBody = {
      logistics_operator1_id: "66b57b26021bcc50490b19b8",
      logistics_operator2_id: "66b57cc8021bcc50490b19c0",
      ...productBody,
      origin_address: productOriginAddress,
      destination_address: productDestinationAddress
    }
    let treatedReqBody = removeEmptyStringProperties(reqBody);
    sendData(treatedReqBody);
  }

  const sendData = async (body: any) => {
    try {
      const apiPort = VITE_API_PORT || "3000";
      const response = await fetch("http://127.0.0.1:"+apiPort+"/api/v1/freight-simulation", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      const result = await response.json();
      console.log(result);

      if (result.message == "Coordinates not found with provided address!"){
        alert("Um dos endereços que você passou não existe!");
      }else if(result.statusCode == 500 || result.statusCode == 500){
        alert("Algo deu errado ao tentar fazer o cálculo, tente novamente mais tarde!");
      }else{      
        navigate(`/history/${result._id}`);
      }
    }catch(e){
      alert("Algo deu errado ao tentar fazer o cálculo, tente novamente mais tarde!");
    }
  }


  return(
    <Card body bg="dark" text="light">
      <Container>
      <Card.Header as="h5">Calcular Frete</Card.Header>
      <Card.Body>
          <Form onSubmit={handleSubmit}>
          <h3 className="mt-3"><TbRulerMeasure/> Dimensões do Produto (cm)</h3>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="ControlInput1">
                <Form.Label><FaTextHeight/> Altura</Form.Label>
                <Form.Control required step="any" type="number" name="height" onChange={handleProductInfoChange} value={productInfo.height} min={0.1} max={10000} placeholder="30" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="ControlInput2">
                <Form.Label><FaTextWidth/> Largura</Form.Label>
                <Form.Control required step="any" type="number" name="width" onChange={handleProductInfoChange} value={productInfo.width} min={0.1} max={10000} placeholder="15" />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="ControlInput3">
                <Form.Label><BsBorderWidth/> Comprimento</Form.Label>
                <Form.Control required step="any" type="number" name="length" onChange={handleProductInfoChange} value={productInfo.length} min={0.1} max={10000} placeholder="10" />
              </Form.Group>
            </Col>
          </Row>
          <Row> 
            <Col xs="12" lg="6">
            <Row>
              <h3 className="mt-3"><MdTripOrigin/> Endereço de Origem do Produto</h3>
              <Form.Group className="mb-3" controlId="ControlInput4">
                <Form.Label><FaRoad/> Logradouro</Form.Label>
                <Form.Control type="text" name="street" onChange={handleProductOriginAddressChange} value={productOriginAddress.street} minLength={3} maxLength={200} placeholder="Rua XXX da silva" />
              </Form.Group>
              </Row>
              <Row>
                <Col xs="6">
                  <Form.Group className="mb-3" controlId="ControlInput5">
                    <Form.Label><FaCity/> Cidade</Form.Label>
                    <Form.Control required type="text" name="city" onChange={handleProductOriginAddressChange} value={productOriginAddress.city} minLength={1} maxLength={70} placeholder="Maringá" />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3" controlId="ControlInput6">
                    <Form.Label><TbBuildingEstate/> Estado</Form.Label>
                    <Form.Select name="state" onChange={handleProductOriginAddressChange} value={productOriginAddress.state}>
                      <StatesOptions/> 
                    </Form.Select>                
                  </Form.Group>
                </Col>
              </Row>
              <Row >
                <Col xs="7">
                  <Form.Group className="mb-3" controlId="ControlInput7">
                    <Form.Label><GiZipper/> Cep</Form.Label>
                      <Form.Control type="text" name="zip_code" onChange={handleProductOriginAddressChange} value={productOriginAddress.zip_code} minLength={9} maxLength={9} placeholder="50730-685" />
                  </Form.Group>
                </Col>
                <Col xs="5">
                  <Form.Group className="mb-3" controlId="ControlInput8">
                    <Form.Label><GoNumber/> Número</Form.Label>
                    <Form.Control type="number" name="number" onChange={handleProductOriginAddressChange} value={productOriginAddress.number} min={1} max={9999} placeholder="281"/>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col xs="12" lg="6">
              <Row>
                <h3 className="mt-3"><CgEditBlackPoint/> Endereço de Destino do Produto</h3>
                <Form.Group className="mb-3" controlId="ControlInput9">
                  <Form.Label><FaRoad/> Logradouro</Form.Label>
                  <Form.Control type="text" name="street" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.street} minLength={3} maxLength={200} placeholder="Rua XXX da silva" />
                </Form.Group>
              </Row>
              <Row>
                <Col xs="6">
                  <Form.Group className="mb-3" controlId="ControlInput10">
                    <Form.Label><FaCity/> Cidade</Form.Label>
                    <Form.Control required type="text" name="city" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.city} minLength={1} maxLength={70} placeholder="Maringá" />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3" controlId="ControlInput11">
                    <Form.Label><TbBuildingEstate/> Estado</Form.Label>
                    <Form.Select name="state" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.state}>
                      <StatesOptions/> 
                    </Form.Select>                
                  </Form.Group>
                </Col>
              </Row>
              <Row >
                <Col xs="7">
                  <Form.Group className="mb-3" controlId="ControlInput12">
                    <Form.Label><GiZipper/> Cep</Form.Label>
                      <Form.Control type="text" name="zip_code" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.zip_code} minLength={9} maxLength={9} placeholder="50730-685" />
                  </Form.Group>
                </Col>
                <Col xs="5">
                  <Form.Group className="mb-3" controlId="ControlInput13">
                    <Form.Label><GoNumber/> Número</Form.Label>
                      <Form.Control type="number" name="number" onChange={handleProductDestinationAddressChange} value={productDestinationAddress.number} min={1} max={9999} placeholder="281" />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
            <Button className="mb-3" variant="primary" type="submit">
              Calcular 
            </Button>
          </Form>
        </Card.Body>
      </Container>
    </Card>
  )
} 


export default CalculateFreight;
