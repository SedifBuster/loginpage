import React, {useEffect, useState} from 'react';
import ContactsItem from "./ContactsItem";
import './App.css';

const Contacts = (props) => {

    const [dataContacts, setDataContacts] = useState([])
    const [contactName,setContactName] = useState('')
    const [contactMail, setContactMail] = useState('')
    const [contactSearch, setContactSearch] = useState('')

    useEffect(() => {
    fetch('http://localhost:3000/contacts').then((response) => {
        return response.json()
    }).then((data) => {
          setDataContacts(data)
    })
},[])
//евенты и апи
    let nameChangeAdd = (event) => {
        setContactName(event.target.value)
    }
    let mailChangeAdd = (event) => {
        setContactMail(event.target.value)
    }
    let searchChange = (event) => {
        setContactSearch(event.target.value)
    }
    const filteredSearch = dataContacts.filter(contact => {
        return contact.name.toLowerCase().includes(contactSearch.toLowerCase())
    })

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    }
    async function deleteData(url = ``) {
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    }
    async function refactorData(url = '', data= {}) {
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    let addContact = (event) => {
        event.preventDefault()
          postData('http://localhost:3000/contacts', {id: dataContacts.length + 1 , name: contactName, mail: contactMail  })
              .then((data) => {
                  setDataContacts([...dataContacts, data])
        });
        setContactMail('')
        setContactName('')
    }
    let deleteContact = (id) => {
          deleteData(`http://localhost:3000/contacts/${id}`)
              .then(() => {
                  fetch('http://localhost:3000/contacts').then((response) => {
                      return response.json()
                  }).then((data) => {
                      setDataContacts(data)
                  })
              })
    }
    let refactorContact = (id, name, mail) => {
        refactorData(`http://localhost:3000/contacts/${id}`, {name : name, mail: mail })
            .then(() => {
                fetch('http://localhost:3000/contacts').then((response) => {
                    return response.json()
                }).then((data) => {
                    setDataContacts(data)
                })
            })
    }
//проверка авторизации
    if(props.isAuth === false) {
        return (
            <div className="loginError">You are not authorized! </div>
        )
    } else if(props.isAuth === true) {
        return (
            <div className="contactsWrapper">
                    <input type="text" placeholder="search..." value={contactSearch} onChange={searchChange} className="contactSearch"/>
                <form onSubmit={addContact} className="contactAddForm">
                    <input type="text" placeholder="name" value={contactName} onChange={nameChangeAdd} className="contactAddInput"/>
                    <input type="text" placeholder="mail" value={contactMail} onChange={mailChangeAdd} className="contactAddInput"/>
                    <input type="submit" value="add" className="contactAddButton"/>
                </form>
                {filteredSearch.map((contact) => {
                    return <ContactsItem key={contact.id} name={contact.name} mail={contact.mail} id={contact.id}
                                         delete={deleteContact} refactor={refactorContact}/>
                })}
            </div>
        )
    }
};

export default Contacts;