import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = (props: {setBurguerToggle: any}) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
      <Container>
        <Navbar.Brand>Calculador de Frete</Navbar.Brand>
        <Navbar.Brand 
          onClick={() => {props.setBurguerToggle((prevValue: boolean) => !prevValue)}} 
          style={{cursor: "pointer"}}  
          className="d-block d-md-none"><GiHamburgerMenu/></Navbar.Brand>
      </Container>
    </Navbar>     
  )
}

export default Header;
