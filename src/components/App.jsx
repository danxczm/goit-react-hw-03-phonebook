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

    // ! Підкажи будь-ласка як можна відтворити цю модалку так щоб коли у нас були збережені контакти в локал стореджі при перезавантаженні сторінки не зявлявся попап з інфою про доданий контакт

    if (prevState.contacts.length < this.state.contacts.length) {
      this.setState({ showInfo: true });
      setTimeout(() => {
        this.setState({ showInfo: false });
      }, 1500);
    }

    if (prevState.contacts.length > this.state.contacts.length)
      this.setState({ showInfo: false });
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
    const newContact = {
      id: nanoid(5),
      name,
      number,
    };

    this.state.contacts.find(
      contact => contact.name === name || contact.number === number
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
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
