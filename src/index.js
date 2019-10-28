const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url} +
      , recived ${res.status}`);
  }
  const body = await res.json();
  return body;
};

getResource("https://swapi.co/api/people/1/")
  .then(body => {
    console.log(body);
  })
  .catch(err => {
    console.error(err);
  });
