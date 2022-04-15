import { collection, deleteDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { typesLiquidacion } from "../types/types";

export const eliminarLiquidacion = (docu, uid) => {
    return async (dispatch) => {
        await deleteDoc(doc(db, "Liquidaciones", docu))
        dispatch(listLiquidacionAsyn(uid))
    }
}

export const listLiquidacionAsyn = (id) => {
    return async (dispatch) => {
        const q = query(collection(db, "Liquidaciones"), where("Usuario", "==", id));
        const querySnapshot = await getDocs(q);
        // const query = await getDocs(collection(db, "Liquidaciones"))
        const Liquidaciones = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            const DocId = doc.id;
            const liquidacion = {
                Nombre: data.Nombre,
                FechaInicio: data.FechaInicio,
                FechaFin: data.FechaFin,
                Salario: data.Salario,
                Transporte: data.Transporte,
                Usuario: data.Usuario,
                Liquidacion: data.Liquidacion,
                Cesantias: data.Cesantias,
                IntereCesan: data.IntereCesan,
                PrimaServi: data.PrimaServi,
                Vacaciones: data.Vacaciones,
                DiasLabo: data.DiasLabo,
                Documento: DocId
            }
            Liquidaciones.push(liquidacion)
        });
        dispatch(listLiquidacionSyn(Liquidaciones))
    }
}



export const listLiquidacionSyn = (liquidacion) => {
    return {
        type: typesLiquidacion.list,
        payload: liquidacion
    }
}
