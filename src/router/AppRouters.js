import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Registro from '../component/Registro'
import { Dasboard } from './Dahboard'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import Pricipal from "../component/Pricipal";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import FormLogin from "../component/FormLogin"

const AppRouters = () => {

    const [checking, setchecking] = useState(true)
    const [isLogin, setisLogin] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                setisLogin(true)
            }
            else {
                setisLogin(false)
            }
            setchecking(false)
        })
    }, [setisLogin, setchecking])


    if (checking) {
        return (
            <h1>Cargando...</h1>
        )
    }

    return (
        <div>
            <Router>
                <Routes>

                    <Route path='/' element={<PublicRouter isAuthenticated={isLogin}>
                        <Pricipal />

                    </PublicRouter >} />
                    <Route path='/*' element={<PrivateRouter isAuthenticated={isLogin}>
                        <Dasboard />
                        
                    </PrivateRouter >} />
                    <Route path='/login' element={<PublicRouter isAuthenticated={isLogin}>
                       
                    </PublicRouter>} />
                    <Route path='/FormLogin' element={<PublicRouter isAuthenticated={isLogin}>
                        <FormLogin />
                    </PublicRouter>} />
                    <Route path='/Registro' element={<PublicRouter isAuthenticated={isLogin}>
                        <Registro />
                    </PublicRouter>} />
                   
                </Routes>
            </Router>
        </div>
    )
}

export default AppRouters