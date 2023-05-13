import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  nameInputId = nanoid(5);
  numberInputId = nanoid(5);

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetState();
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  resetState = _ => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label className={css.form_label} htmlFor={this.nameInputId}>
          Name
          <input
            className={css.form_input}
            placeholder="your name"
            onChange={this.handleChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={this.nameInputId}
          />
        </label>
        <label className={css.form_label} htmlFor={this.numberInputId}>
          Number
          <input
            className={css.form_input}
            placeholder="000-00-00"
            type="tel"
            value={number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleChange}
            id={this.numberInputId}
            required
          />
        </label>
        <button className={css.form_button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
