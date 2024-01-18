import React from 'react'
import { DateRange } from 'react-date-range'
import { TbFidgetSpinner } from 'react-icons/tb'
const UpdateSongForm = ({
  handleSubmit,
  dates,
  handleDates,
  loading,
  songData,
  setSongData,
}) => {
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            
            <div className='space-y-1'>
              <label htmlFor='location' className='block text-gray-600'>
                Select Duration
              </label>
              <DateRange
                onChange={handleDates}
                ranges={[dates]}
                rangeColors={['#F43F5E']}
              />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='title' className='block text-gray-600'>
                Title
              </label>
              <input
                value={songData?.title}
                onChange={event =>
                  setSongData({ ...songData, title: event.target.value })
                }
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='title'
                id='title'
                type='text'
                placeholder='Title'
                required
              />
            </div>           
          </div>
        </div>

        <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Update'
          )}
        </button>
      </form>
    </div>
  )
}

export default UpdateSongForm
