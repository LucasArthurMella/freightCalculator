import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { IFreightSimulation } from '../interfaces-types/freight-simulation';
import { TfiMoney } from 'react-icons/tfi';
import { IoIosSpeedometer } from 'react-icons/io';
import { formatFullAddress } from '../util/address';
import { MdTripOrigin } from 'react-icons/md';
import { CgEditBlackPoint } from 'react-icons/cg';
const Historic = () => {

  const [freightSimulations, setFreightSimulations] = useState<[IFreightSimulation] | []>([]);
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/api/v1/freight-simulation`, {method: "GET"})
    .then((res) => {
      return res.json();
    }) 
    .then((data) => {
      setFreightSimulations(data);
    })
    .catch((_error) => {
      setFreightSimulations([]);
    });
  });

  if(freightSimulations.length > 0){
    return(
      <Card body bg="dark" text="light">
        <Card.Header as="h5">Simulações de Frete Feitas</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <div className="table-responsive">
                  <Table responsive="xxs" striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center"><MdTripOrigin/> Endereço de Origem</th>
                        <th className="text-center"><CgEditBlackPoint/> Endereço de Destino</th>
                        <th className="d-none d-lg-table-cell text-center"><TfiMoney/> Operador Mais Barato</th>
                        <th className="d-none d-lg-table-cell text-center"><IoIosSpeedometer/> Operador Mais Rápido</th>
                        <th className="text-center">Ver</th>
                      </tr>
                    </thead>
                    <tbody>
                      {freightSimulations.map((freightSimulation, index) => ( 
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="d-none d-lg-table-cell">{formatFullAddress(freightSimulation.product.origin_address)}</td>
                          <td className="d-none d-lg-table-cell">{formatFullAddress(freightSimulation.product.destination_address)}</td>
                          <td>{freightSimulation.cheapest_logistics_operator?.name ? freightSimulation.cheapest_logistics_operator?.name : "Nenhum"}</td>
                          <td>{freightSimulation.fastest_logistics_operator?.name ? freightSimulation.fastest_logistics_operator?.name : "Nenhum"}</td>
                          <td className="text-center"><Link to={`/history/${freightSimulation._id}`} ><FaEye/></Link> </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>  
                </div>
              </Col>
            </Row>
          </Card.Body>
      </Card>
    )
  }else{
    return (
      <Card body bg="dark" text="light">
        <Container>
          <Card.Header as="h5">Simulação de Frete</Card.Header>
          <Card.Body>
            <h1 className="text-center">Não há simulações de frete feitas no momento!</h1>
          </Card.Body>
        </Container>
      </Card>
    )
  }
} 


export default Historic;
