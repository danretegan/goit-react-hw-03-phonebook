import React from 'react';
import { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import SearchFilter from './searchFilter/SearchFilter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-0', name: 'Dan Retegan', number: '+40 753 023 616' },
      { id: 'id-1', name: 'Rosie Simpson', number: '459-123-563' },
      { id: 'id-2', name: 'Hermione Kant', number: '443 (895) 123' },
      { id: 'id-3', name: 'Eden Clements', number: '645-177-799' },
      {
        id: 'id-4',
        name: "Charles de-Batz de Castelmore d'Artagnan",
        number: '+01 227-911-266',
      },
    ],
    filter: '', // Adăugăm un câmp pentru filtrare
  };

  handleAddContact = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleFilterChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    // Filtrăm contactele în funcție de șirul de căutare:
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          contacts={this.state.contacts}
        />
        <h2>Contacts:</h2>
        <SearchFilter
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
          className={styles.list}
        />
      </div>
    );
  }
}

export default App;
