let getExchangeRates = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/v1/days.json')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} ($response.statusText)`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      resolve(response.json());
    })
    .catch(error => reject(Error(`Error in fetch: ${error.message}`)));
  });
};

let getWallets = () => {
  let user_id = document.getElementById('current_user').innerHTML;
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/v1/users/${user_id}/wallets.json`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} ($response.statusText)`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      resolve(response.json());
    })
    .catch(error => reject(Error(`Error in fetch: ${error.message}`)));
  });
};

export { getExchangeRates, getWallets };
