import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import Contacts from "./Contacts";
import LoginPage from "./LoginPage";


function App() {

    const [isAuth, setIsAuth] = useState(false)

    return (
        <div>
            <BrowserRouter>
                <div className="linkWrapper">
                <Link to='/' className="link">Login</Link>
                <Link to='/contacts' className="link">Contacts</Link>
                </div>
                <Routes>
                    <Route  path='/contacts' element={<Contacts isAuth={isAuth}/>}/>
                    <Route exact path='/' element={<LoginPage isAuth={setIsAuth}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
