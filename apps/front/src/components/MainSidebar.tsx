import { Sidebar, Menu, MenuItem  } from 'react-pro-sidebar';
import { FaHome,  FaHistory } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { GiPathDistance } from 'react-icons/gi';

const MainSidebar = (props: {burguerToggle: boolean, setBurguerToggle: any}) => {

  const closeSideBar = () => {
    props.setBurguerToggle(false);
  }

  const colors = {
    active: "#1abc9c",
    inactive: "lightblue"
  }

  function getItemColor(page: string){
    const location = useLocation();
    return {color: location.pathname === page ? colors.active : colors.inactive}
  }

  return (
      <Sidebar
        onBackdropClick={() => {closeSideBar()}}
        toggled={props.burguerToggle}
        backgroundColor="#212529"
        style={{minHeight: "100vh"}}
        breakPoint='md'
      >
        <div style={{ padding: '20px', textAlign: 'center', color: '#ecf0f1' }}>
          <h5>Opções</h5>
        </div>

        <Menu>
          <MenuItem
            icon={<FaHome />}
            style={getItemColor("/")}
            component={<Link to="/" />}
            onClick={closeSideBar}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<GiPathDistance />}
            style={getItemColor("/calculate-freight")}
            component={<Link to="/calculate-freight" />}
            onClick={closeSideBar}
          >
            Calcular Frete 
          </MenuItem>
          <MenuItem
            icon={<FaHistory />}
            style={getItemColor("/history")}
            component={<Link to="/history" />}
            onClick={closeSideBar}
          >
            Histórico
          </MenuItem>
        </Menu>
      </Sidebar>
  );
};

export default MainSidebar;
