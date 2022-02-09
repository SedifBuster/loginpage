import React, {useState} from 'react';
import './App.css';
import {useNavigate} from 'react-router-dom'

function LoginPage(props) {

const [auth, setAuth] = useState('')
const [pass, setPass] = useState('')
const [errAuth, setErrAuth] = useState('')
const toContacts = useNavigate()
//апи
    let logging =  () => {
        fetch('http://localhost:3000/profile').then((response) => {
            return response.json()
        }).then((data) => {
            if(data.login === auth && data.password === pass){
                setErrAuth('Successful')
                props.isAuth(true)
                toContacts('/contacts')
            } else if(data.login != auth || data.password != pass) {
                setErrAuth('Incorrect login or password')
            }
        })
    }
//евенты
let firstChange = (event) => {
    setAuth(event.target.value)
}
let secondChange = (event) => {
    setPass(event.target.value)
}
let  log =  (event) => {
    event.preventDefault()
    logging()
}

  return (
    <div className="loginWrapper">
  <form onSubmit={log} className="loginForm">
      <input type="text" placeholder="Login..." value={auth} onChange={firstChange} className="loginInput"/>
      <input type="text" placeholder="Password..." value={pass} onChange={secondChange} className="loginInput"/>
      <input type="Submit" className="loginButton" defaultValue="Sing in" />
      <p className="loginError">{errAuth}</p>
  </form>

    </div>
  );
}

export default LoginPage;
