import React, {useState} from 'react';
import './App.css';

const ContactsItem = (props) => {

    const [refactorName, setRefactorName] = useState(props.name)
    const [refactorMail, setRefactorMail] = useState(props.mail)
    const [refactorBtn, setRefactorBtn] = useState(false)
//евенты
    let nameRefactor = (event) => {
        setRefactorName(event.target.value)
    }
    let mailRefactor = (event) => {
        setRefactorMail(event.target.value)
    }
    let deleteContact = (event) => {
        event.preventDefault()
        props.delete(props.id, props.name, props.mail)
    }
    let refactorContact = (event) => {
        event.preventDefault()
        props.refactor(props.id, refactorName, refactorMail )
        setRefactorBtn(false)
    }
    let refactorOnOffBtn = (event) => {
        event.preventDefault()
        setRefactorBtn(true)
    }
//логика изменения контактов
    if(refactorBtn === false) {
        return(<div className="contactItemWrapper">
            <div className="contactItemId">{props.id}</div>
            <div className="contactItemDiv">{props.name}</div>
            <div>{props.mail}</div>
            <div>
                <button onClick={refactorOnOffBtn} className="contactAddButton">ref</button>
                <button onClick={deleteContact} className="contactAddButton">X</button>
            </div>
        </div>)
    } else if(refactorBtn === true) {
        return (
            <form onSubmit={refactorContact}  className="contactItemWrapper">
                <div className="contactItemId">{props.id}</div>
                <input type="text" value={refactorName} onChange={nameRefactor}/>
                <input type="text" value={refactorMail} onChange={mailRefactor}/>
                <input type="submit" value="ok" className="contactAddButton"/>
            </form>
        )
    }
};

export default ContactsItem;