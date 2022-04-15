// import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { types } from "../types/types"
// import { subirUsuario } from "./loginGoogle"

export const loginSincrono = (id, displayname) => {
    return {
        type: types.login,
        payload: {
            id,
            displayname
        }
    }
}