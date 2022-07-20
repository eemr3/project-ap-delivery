export default () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  return {
    headers: { Authorization: token },
  };
};
