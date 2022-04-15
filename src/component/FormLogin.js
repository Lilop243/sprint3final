import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../redux/actions/loginGoogle';
import { login } from '../firebaseConfig';


const FormLogin = () => {

  const dispatch = useDispatch()

  const iniciarSesion = (valores) => {
    login(valores.email, valores.password)
  }

  return (<>
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: ''
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur }) => (
   
        <div id="login-box" onSubmit={handleSubmit} >
          <div className="left">
            <h1>Inicio de Sesión</h1>

            <input type="text" name="username" placeholder="Nombre" value={values.username} onChange={handleChange}
              onBlur={handleBlur} />
            <input type="text" name="email" placeholder="E-mail" value={values.email}
              onChange={handleChange}
              onBlur={handleBlur} />
            <input type="password" name="password" placeholder="Password" value={values.password}
              onChange={handleChange}
              onBlur={handleBlur} />
            <input type="submit" name="signup_submit" value="Ingresar" onClick={() => iniciarSesion(values)} />

          </div>

          <div className="right">
            <span className="loginwith"><img src="https://res.cloudinary.com/lilopez7/image/upload/v1648485793/aca-geek/favicon_hjxotc.svg" width={150} height="auto" alt="" /></span>
            <label className='googl'>Iniciar sesion con</label>&nbsp;&nbsp;&nbsp;
            <img id='btngoogle' className="social-signin google" onClick={() => {
              dispatch(loginGoogle())
            }} src="./simbolo-de-google.png" alt="" />
   <br/><br/>
            <Button className="ini" type='button' as={Link} to="/Registro" variant="primar">¿No tienes una cuenta? Registrate</Button>

          </div>
          <div className="or">OR</div>
        </div>
      )}
    </Formik>


  </>
  );
};

export default FormLogin;


