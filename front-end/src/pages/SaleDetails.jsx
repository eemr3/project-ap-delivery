import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

function SaleDetails({ match }) {
  const { id } = match.params;
  return (
    <>
      <Navbar />
      <div>
        {id}
      </div>
    </>
  );
}

SaleDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SaleDetails;
