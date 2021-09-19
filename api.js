export const request = (data) => {
  return fetch(`./json/${data}.json`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(`${res.status} Error`);
    })
    .catch((e) => alert(e.message));
};
