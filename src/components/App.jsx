import React from 'react';
import { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import SearchFilter from './searchFilter/SearchFilter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '', // Adăugăm un câmp pentru filtrare
  };

  componentDidMount() {
    // Încărcăm datele din localStorage la începutul ciclului de viață
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      this.setState({
        contacts: JSON.parse(storedContacts),
      });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    // Salvăm datele în localStorage daca datele au fost modificate
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
