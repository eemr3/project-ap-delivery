import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TableUsers from '../components/TableUsers';
import dataTestId from '../utils/dataTestIds';

import styles from '../styles/Administrator.module.css';
import FormAdmin from '../components/FormAdmin';

function Administrator() {
  const [isCreated, setIsCreated] = useState(false);
  const [errorApi, setErrorAip] = useState('');

  return (
    <>
      <Navbar />
      <main className={ styles.container }>
        <section className={ styles.sectoinForm }>
          <div>
            <h1>Cadastrar novo usuário</h1>
          </div>
          <FormAdmin
            setIsCreated={ setIsCreated }
            isCreated={ isCreated }
            setErrorAip={ setErrorAip }
          />
          {errorApi ? (
            <span data-testid={ dataTestId[74] } style={ { color: 'orangered' } }>
              {errorApi}
            </span>
          ) : (
            ''
          )}
        </section>
        <section className={ styles.sectionTable }>
          <TableUsers isCreated={ isCreated } />
        </section>
      </main>
    </>
  );
}

export default Administrator;
