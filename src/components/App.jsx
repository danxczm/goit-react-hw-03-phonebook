import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section.jsx';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactsList } from './ContactsList/ContactsList.jsx';
import { Filter } from './Filter/Filter.jsx';
import { Popup } from './Popup/Popup.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    showInfo: false,
  };

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    parsedContacts && this.setState({ contacts: parsedContacts });
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addNewContact = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(5),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else if (contacts.some(contact => contact.number === number)) {
      alert(`${number} is already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
      this.setState({ showInfo: true });
      setTimeout(() => {
        this.setState({ showInfo: false });
      }, 1500);
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    const convertedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(convertedFilter)
    );
  };

  render() {
    const { filter, showInfo } = this.state;

    const visibleContacts = this.getFilteredContacts();

    return (
      <>
        {showInfo && <Popup />}
        <Section title={'Phonebook'}>
          <ContactForm onSubmit={this.addNewContact} />
        </Section>
        {visibleContacts.length > 0 ? (
          <Section title={'Contacts'}>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactsList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        ) : (
          <h2>You have no contacts yet</h2>
        )}
      </>
    );
  }
}
