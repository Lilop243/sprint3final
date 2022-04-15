import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';




const Pricipal = () => {
  const Navigate = useNavigate()
  return (
    <div id='login'>
      <div className='Navb'>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/lilopez7/image/upload/v1648485793/aca-geek/favicon_hjxotc.svg" width="200px" alt="" /></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <button className='bot' onClick={() => { Navigate('/FormLogin') }}>Iniciar Sesión</button> <br />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
 
    </div>
  )
}

export default Pricipal