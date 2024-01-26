import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

  handleNameChange = evt => {
    // Restrictionarea la text (litere, spații, apostrof și cratimă):
    const newTextValue = evt.target.value.replace(/[^a-zA-Z\s'-]/g, '');
    this.setState({ name: newTextValue });
  };

  handleNumberChange = e => {
    // Restrictionarea la cifre, spații, cratime paranteze și + la început:
    const newNumberValue = e.target.value.replace(
      /[^+\d\s()-]|^[\s()-]+|(?<=\d)[+]|\b[+]\b/g,
      ''
    );
    this.setState({ number: newNumberValue });
  };

  handleAddButtonClick = () => {
    const { name, number } = this.state;
    const { onAddContact, contacts } = this.props;

    // Verificăm dacă numele sau numărul există deja în lista de contacte:
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const numberExists = contacts.some(contact => contact.number === number);

    if (nameExists) {
      alert(`${name} is already in contacts!`);
    } else if (numberExists) {
      alert(`${number} is already in contacts!`);
    } else if (name.trim() !== '' && number.trim() !== '') {
      // Adăugăm contactul doar dacă nu există și câmpurile nu sunt goale:
      onAddContact(name, number);
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.container}>
        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name and surname:"
            // pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={this.handleNameChange}
          />
        </label>

        <label className={styles.label}>
          Number:
          <input
            className={styles.input}
            type="tel"
            name="number"
            placeholder="Telephone number:"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleNumberChange}
          />
        </label>

        <Button type="button" action={this.handleAddButtonClick}>
          Add contact
        </Button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default ContactForm;
