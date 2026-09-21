
export async function changeStatus(status) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "status": `${status}`
      },
    ),
  }

  
  dispatch('CHANGE_FILTER', status);

  await fetch('http://localhost:3001/config', options)
}

export async function changeTheme(theme) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "theme": `${theme}`
      },
    ),
  }

  await fetch('http://localhost:3001/config', options)
  
  dispatch('CHANGE_THEME', theme);
}

export async function changeHeading(content, id) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "content": `${content}`
      },
    ),
  }

  
  dispatch('CHANGE_HEADING', content, id);

  await fetch(`http://localhost:3001/heading/${id}`, options)
}

export async function changeInfoStatus(status, id) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "status": `${status}`
      },
    ),
  }

  
  dispatch('CHANGE_INFO_STATUS', status, id);

  await fetch(`http://localhost:3001/info/${id}`, options)
}