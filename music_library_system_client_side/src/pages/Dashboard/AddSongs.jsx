import React, { useContext, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AddSongForm from '../../components/Forms/AddSongForm'
import { saveSongsData } from '../../api/songs'

const AddSongs = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [loading, setLoading] = useState(false)
  // handle form submit
  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)

    const title = event.target.title.value
    const startDate = dates.startDate;
    const endDate = dates.endDate;
    const email = user?.email

    const SongData = { title, startDate, endDate, email }
    saveSongsData(SongData).then(data => {
      console.log(data)
      setLoading(false)
      navigate('/dashboard/my-songs')
    })
  }

  const handleDates = ranges => {
    setDates(ranges.selection)
  }
  return (
    <div>
      <AddSongForm
        handleSubmit={handleSubmit}
        loading={loading}
        dates={dates}
        handleDates={handleDates}
      />
    </div>
  )
}

export default AddSongs