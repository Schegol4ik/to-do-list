import React from "react";
import './App.scss';
import Header from "./Components/Header/Header";
import Main from "./pages/Main/Main";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <div className='app-container'>
                <Navbar/>
                <Main/>
            </div>
        </div>
    );
}

export default App;
