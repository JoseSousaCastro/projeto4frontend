import React from "react";
import "../Main/Main.css";
import { Routes, Route } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile";

function Main() {
    
        return (
            <div className="main" id="main-outer-container">
                <div className="page-wrap" id="main-page-wrap">
                    <Routes>
                        <Route path="/edit-profile" element={<EditProfile />} />
                    </Routes>
                </div>
            </div>
        );
    }

export default Main;