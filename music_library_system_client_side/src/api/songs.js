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