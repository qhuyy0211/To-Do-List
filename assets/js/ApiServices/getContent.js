export function getHeading() {
  return fetch('http://localhost:3001/heading')
    .then(function(response) {
      return response.json();
    })
}

export function getInfo() {
  return fetch('http://localhost:3001/info')
    .then(function(response) {
      return response.json();
    })
}

export function getConfig() {
  return fetch('http://localhost:3001/config')
    .then(function(response) {
      return response.json();
    })
}