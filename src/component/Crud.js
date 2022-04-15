import '../App.css';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react'
import { Card } from './Card'
import { Filtrar } from './Filtrar'
import '../Card.css';
import { CerrarSesion, useAuth } from '../firebaseConfig';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// or get all of the named exports for further usage
import * as bootstrap from 'bootstrap';
import axios from 'axios'; //npm i axios
import { fileUpload } from '../helpers/fileUpload';
import Subida from './Subida'
import Modal from 'react-bootstrap/Modal'



export const Crud = () => {

  const [personajes, setPersonajes] = useState([])
	const [Loading, setLoading] = useState(true)
  const [loading, setloading] = useState(false)
	const [filter, setFilter] = useState('')
  const [paginacion, setPaginacion] = useState(1)


  const URL = ('https://json-crudds.herokuapp.com/peliculas/')

  const [listaMento, setListaMento] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [overview, setOverview] = useState('')
  const [image, setImage] = useState('')
  const [dato, setDato] = useState('')
  const [buscar, setBuscar] = useState('')
  const [texto, setTexto] = useState('')
  const [bandera, setBandera] = useState(true)
  const [imagen, setimagen] = useState('')

  const [show, setShow] = useState(false);

  const addOrUpdateMento = () => {
    bandera ? addMento() : update()
  }

  const addMento = async () => {
    let obj = { name, overview,imagen, dato }
    const res = await axios.post(URL, obj)
    console.log(res.data)
    setName('')
    setOverview('')
    setImage('')
    setDato('')
  
  }

  const update = async () => {
    const obj = { id, name, overview, dato, imagen }
    const res = await axios.put(URL + "/" + id, obj)
    console.log(res.data)
    setBandera(true)
    setName('')
    setOverview('')
    setImage('')
    setDato('')
    getMentos()
  }


  const deleteMento = async (id) => {
    const res = await axios.delete(URL + '/' + id)
    console.log(res.data)
    getMentos()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    fileUpload(file)
    .then(response => {
      setimagen(response)
      console.log(imagen)
    }).catch(error => {
      console.log(error.message)
    } )
  }


  const getMentos = async () => {
    const res = await axios.get(URL)
    setListaMento(res.data)
  }



	useEffect(() => {
		const getPersonajes = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${paginacion}`
				)
				const data = await response.json()
				setPersonajes(data.results)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		getPersonajes()
    getMentos()
    return (imagen) => {
      <Subida imagen={imagen}/>
      console.log(imagen)
    }
	}, [paginacion])

	const personjesFiltrados = personajes.filter((personaje) =>
		personaje.original_title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	)

  async function handleCerrarSesion() {
    setloading(true)
    try {
      await CerrarSesion()
    } catch {
      alert("error!")
    }
    setloading(false)
  }

  const currentUser = useAuth()

  function handlePaginasiguiente(){
    setPaginacion(paginacion + 1)
  }

  function handlePaginaanterior(){
    setPaginacion(paginacion - 1)
  }

  return (
    <div >
    <div>  
      <div className='Navb'>
    <Navbar>
      <Container>
        <Navbar.Brand id='usuariolog'><img src="https://img.icons8.com/external-bearicons-flat-bearicons/64/000000/external-user-essential-collection-bearicons-flat-bearicons.png" alt='' />   <div><h4><b>Bienvenido:</b></h4> {currentUser?.displayName} </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <div id='filtraryagre'>
        <label>Buscar peliculas </label>
        <Filtrar filter={filter} setFilter={setFilter} />
        <button  type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            Crud Peliculas
        </button>
        </div>
        <Link to='/login'>
          <button className='bot' onClick={handleCerrarSesion} disabled={loading || !currentUser} variant="secondary">Cerrar Sesion</button>{' '}
        </Link>
      </Container>
    </Navbar>
    </div>
  </div>
  	<div className='container'>
			<br/>

      <MDBCarousel>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src='https://res.cloudinary.com/lilopez7/image/upload/v1648567199/aca-geek/Mulan_vykttk.png' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src='https://res.cloudinary.com/lilopez7/image/upload/v1648567191/aca-geek/Raya_hpokmw.png' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem>
          <MDBCarouselElement src='https://res.cloudinary.com/lilopez7/image/upload/v1648567184/aca-geek/Unidos_faf5q3.png' alt='...' />
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    <br /><br />


  <div className="lista-personajes">
        {listaMento.map((item,index) => (
      <section  key={item.id}  className='personaje'>
      <div className='personaje-header'>
        <div className='estado'>
        </div>
      </div>
     
    
      <div className='personaje-body '>
        <figure>
          <img src={item.imagen} className="img-thumbnail" alt={item.imagen} />
        </figure>
    
         <div>
    
                <h2>{item.name}</h2>
      
        </div>
        <button
            className="btn btn-danger"
            onClick={() => deleteMento(item.id)}>DELETE
        </button>
        <button
        className="btn btn-success mr-2"
        onClick={() => {
          setShow(true)
          setName(item.name)
          setOverview(item.overview)
          setimagen(item.imagen)
          setDato(item.dato)
          setId(item.id)
        }}>Editar</button>
      </div>
    </section>

          
        ))}
      </div>	

      <br></br>


<section className='lista-personajes'>
  {Loading ? (
    <p>Cargando...</p>
  ) : personjesFiltrados.length > 0 ? (
    personjesFiltrados.map((personaje) => (
      <Card key={personaje.id} personaje={personaje} />
    ))
  ) : (
    <p>
      No se encontro personajes con la busqueda{' '}
      <strong>"{filter}"</strong>.
    </p>
  )}
</section>

<hr/>
      <div id='paginacion'>
            <button variant="secondary" onClick={handlePaginasiguiente}>
              Siguiente
            </button>
            <button variant="secondary" onClick={handlePaginaanterior}>
              Anterior
            </button>
      </div>

      <br></br>
		</div>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <input
              className="form-control mb-2" placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          <div>
            <input type="file" onChange={handleFileChange} />
        </div>

         
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button
              className="btn btn-primary"
              onClick={addOrUpdateMento}>{bandera ? 'add' : 'update'}</button>
              </div>
    </div>

   
<Modal show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header >
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
            <Modal.Body> 
              <input
                      className="form-control mb-2" placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
            </Modal.Body>
        <Modal.Footer>
        <input type="file" onChange={handleFileChange} />

        <button onClick={() => update()}> Add</button>
        </Modal.Footer>
      </Modal>


  </div>

</div>


    </div>
  )
}










