export default async function removeInfo(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }
  dispatch('REMOVE_INFO', id)
  
  const restoreData = await fetch(`http://localhost:3001/info/${id}`, options)
    .then(function(response) {
      return response.json()
    })
  
}