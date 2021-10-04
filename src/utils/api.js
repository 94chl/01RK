export const request = (data) => {
  return fetch(`./src/json/${data}.json`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(`${res.status} Error`);
    })
    .catch((e) => alert(__dirname));
};
