import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '../services/deliveryAPI';
import dataTestId from '../utils/dataTestIds';

function TableUsers({ isCreated }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getAllUserAD = async () => {
      const ENDPOINT = '/register';
      const result = await getAllUsers(ENDPOINT);
      setUserData(result);
    };

    getAllUserAD();
  }, [isCreated]);

  return (
    <table>
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
        {userData.length > 0 ? userData.map((user) => (
          <tr key={ user.id }>
            <th data-testid={ dataTestId[69] }>{user.id}</th>
            <th data-testid={ dataTestId[70] }>{user.name}</th>
            <th data-testid={ dataTestId[71] }>{user.email}</th>
            <th data-testid={ dataTestId[72] }>{user.role}</th>
            <th data-testid={ dataTestId[73] }><button type="button">Excluir</button></th>
          </tr>
        )) : ''}
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
