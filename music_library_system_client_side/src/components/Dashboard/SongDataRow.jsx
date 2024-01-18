import { format } from 'date-fns'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import DeleteModal from '../Modal/DeleteModal'
import UpdateSongModal from '../Modal/UpdateSongModal'
import { deleteSongs } from '../../api/songs'

const SongDataRow = ({ song, fetchSpecificSongs }) => {

  let [isOpen, setIsOpen] = useState(false)
  let [isEditModalOpen, setIsEditModalOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  const modalHandler = id => {
    deleteSongs(id)
      .then(data => {
        fetchSpecificSongs()
        toast.success('Room deleted')
      })
      .catch(err => console.log(err))
    closeModal()
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{song?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(song?.start_date), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(song?.end_date), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={openModal}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={song.id}
        />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsEditModalOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
        <UpdateSongModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          song={song}
          id={song.id}
          setIsEditModalOpen={setIsEditModalOpen}
          fetchSpecificSongs={fetchSpecificSongs}
        />
      </td>
    </tr>
  )
}

export default SongDataRow
