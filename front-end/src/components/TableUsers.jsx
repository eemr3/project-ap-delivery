import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteUser, getAllUsers } from '../services/deliveryAPI';
import dataTestId from '../utils/dataTestIds';
import styles from '../styles/TableUsers.module.css';

function TableUsers({ isCreated }) {
  const [userData, setUserData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const getAllUserAD = async () => {
      const ENDPOINT = '/register';
      const result = await getAllUsers(ENDPOINT);
      setUserData(result);
    };

    getAllUserAD();
  }, [isCreated, isDeleted]);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setIsDeleted(!isDeleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table className={ styles.customers }>
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Exluir</th>
        </tr>
      </thead>
      <tbody>
        {userData.length > 0
          ? userData
            .filter((user) => user.role !== 'administrator')
            .map((user, index) => (
              <tr key={ user.id }>
                <td data-testid={ `${dataTestId[69]}${index}` }>{index + 1}</td>
                <td data-testid={ `${dataTestId[70]}${index}` }>{user.name}</td>
                <td data-testid={ `${dataTestId[71]}${index}` }>
                  {user.email}
                </td>
                <td data-testid={ `${dataTestId[72]}${index}` }>{user.role}</td>
                <td data-testid={ `${dataTestId[73]}${index}` }>
                  <button
                    type="button"
                    onClick={ () => handleDeleteUser(user.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          : ''}
      </tbody>
    </table>
  );
}

TableUsers.propTypes = {
  isCreated: PropTypes.bool,
};

TableUsers.defaultProps = {
  isCreated: false,
};
export default TableUsers;
