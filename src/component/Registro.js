import React from 'react'
// import { Form } from 'react-bootstrap'
import '../FormLogin.css';
// import styled from "styled-components";
import { useNavigate } from 'react-router';
import { register } from "../firebaseConfig"
// import Swal from "sweetalert2"
import { useForm } from '../hooks/useForm';


// import { Link } from 'react-router-dom';

// const Div = styled.div`
// height: 100vh;
// background:#5fcdd9;
// `;



const Registro = () => {

  // const currentUser = useAuth()

  // const [loading, setloading] = useState(false)
  const [values, handleInputChange] = useForm({
    username: "",
    email: "",
    password: ""
  })

  const { username, email, password } = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    register(email, password, username)
  }




  const Navigate = useNavigate()
  return (

    <div className="left2">
      <h1>REGISTRO</h1>&nbsp;
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nombre" onChange={handleInputChange} value={username} />
        <input type="text" name="email" placeholder="E-mail" onChange={handleInputChange} value={email} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={password} />
        <button  type="submit">
          Registrarte
        </button>
      </form>
      <button type="button" className='mt-3' onClick={() => {
        Navigate('/FormLogin')
      }}>
        Login
      </button>
    </div>


  )
}

export default Registro