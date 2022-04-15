import { Route, Routes, Navigate } from "react-router-dom";
import { Crud } from "../component/Crud";

export const Dasboard = () => {



    return (
        <div>
       
            <Routes>
                <Route path="/crud" element={<Crud />} />
                <Route path="*" element={<Navigate to="/crud" />} />
            </Routes>
        </div>
    )
}