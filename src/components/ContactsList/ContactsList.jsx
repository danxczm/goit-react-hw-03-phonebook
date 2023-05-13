import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
export const ContactsList = ({ contacts, onDeleteContact }) => (
  <ul className={css.contacts_list}>
    {contacts.map(({ id, name, number }) => (
      <li className={css.contacts_item} key={id}>
        {name}: {number}
        <button
          className={css.contacts_button}
          onClick={() => onDeleteContact(id)}
        >
          delete
        </button>
      </li>
    ))}
  </ul>
);

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
