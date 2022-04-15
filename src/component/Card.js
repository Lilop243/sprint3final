import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import '../Modal.css';

export const Card = ({ personaje }) => {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

const imag = "https://image.tmdb.org/t/p/w1280"
	
	return (
	

	   
	
	<section  className='personaje'>
  <div className='personaje-header'>
    <div className='estado'>
    </div>
  </div>
 

  <div className='personaje-body '>
    <figure>
    <img onClick={handleShow} src={imag + personaje.poster_path} className="img-thumbnail" alt={personaje.poster_path} />
    </figure>

     <div>

            <h2>{personaje.original_title}</h2>
  
    </div>
    
  </div>
 

  

  <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header  className='Modal3'>
    <img src={personaje.image} width={"50px"} alt=""/>

      <Modal.Title>
        <h1>
          <b>
              {personaje.name}
          </b>
      </h1></Modal.Title>
  <b>
    <span>{personaje.dato}</span>
</b>
    </Modal.Header>
    <Modal.Body  className='Modal3'>


    <div id='blogvision'>
<iframe width="475" height="250" src={personaje.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br/>
<div id='infor'>
 <b><h4>
{personaje.overview}</h4></b>
</div>

    </Modal.Body>
    <Modal.Footer  className='Modal3'>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</section>


	 
	)
}
