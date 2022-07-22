import React from 'react';
import PropTypes from 'prop-types';

function SaleDetails({ match }) {
  const { id } = match.params;
  return (
    <div>
      {id}
    </div>
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
