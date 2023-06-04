import React from "react";
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from "components/ContactForm/ContactForm";
import ContactList from "components/ContactList/ContactList";
import Filter from "components/Filter/filter";

import { Box } from "./App.styled";  


 export class App extends React.Component {

  state = {
    contacts: [],
    filter: '',
  }

  addContact = ({name, number}) => {
    const newContact = {
      name,
      number,
      id: nanoid(), 
    }
      
    if (this.chekName(newContact.name)) {
      Notify.failure(`${newContact.name} is already in contacts`, Notify.init({
        clickToClose: true,
        position: 'center-top',
      }));
      return newContact.name;
    }

    
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));

    // console.log(this.state);
  }

    chekName = newName => {
      // console.log(this.state)
      return this.state.contacts.find(({ name }) => name === newName);
    };

    changeFilter = event => {
      this.setState({ filter: event.currentTarget.value });
    };
  
    deleteContact = contactId => {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      }));
    };


  render() {
    const { contacts, filter } = this.state;    
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
       contact.name.toLowerCase().includes(normalizedFilter));

    return (
      <>
      <Box>             
        <h1>Phonebook</h1>
        <ContactForm onSubmit = {this.addContact}/>
      </Box>

      <Box>  
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList 
        contacts={visibleContacts} 
        onDelete={this.deleteContact} 
         />        
      </Box> 
    </>
    );
  }
  
};


