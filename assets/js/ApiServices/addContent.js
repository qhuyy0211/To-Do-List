export async function addInfo(content, groupId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "group-id": groupId,
      "status": "available",
      "content": content
    }),
  }

  const newInfo = await fetch('http://localhost:3001/info', options)
    .then(function (response) {
      return response.json();
    })

  dispatch('ADD_INFO', newInfo)
}

export async function addHeading(content) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "content": `${content}`
      },
    ),
  }

  const newHeading = await fetch('http://localhost:3001/heading', options)
    .then(function (response) {
      return response.json();
    })

  dispatch('ADD_HEADING', newHeading)
  return newHeading
}