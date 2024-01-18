// save a Songs
export const saveSongsData = async (SongData) => {
  const response = await fetch(`http://localhost:5005/createSongs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('access-token')}`,
    },
    body: JSON.stringify(SongData),
  })
  const data = await response.json()
  return data
}

// getSpecific a Songs
export const getSpecificSongs = async (email) => {
  const response = await fetch(`http://localhost:5005/getSpecificSongs/${email}`)
  const SpecificSongs = await response.json()
  return SpecificSongs
}

// update a Songs
export const updateSongs = async (id, songsUpdateData) => {
  const response = await fetch(
    `http://localhost:5005/updateSongs/${id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
      body: JSON.stringify(songsUpdateData),
    }
  )
  const data = await response.json()
  return data
}

// delete a Songs
export const deleteSongs = async id => {
  const response = await fetch(
    `http://localhost:5005/deleteSongs/${id}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    }
  )
  const data = await response.json()
  return data
}