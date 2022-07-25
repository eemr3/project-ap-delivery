export const getHeaders = () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  return {
    headers: { Authorization: token },
  };
};

export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};
