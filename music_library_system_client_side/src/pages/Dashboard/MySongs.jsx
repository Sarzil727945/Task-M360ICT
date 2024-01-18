import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import EmptyState from '../../components/Shared/EmptyState'
import Loader2 from '../../components/Shared/Loader2'
import { getSpecificSongs } from '../../api/songs'
import SongDataRow from '../../components/Dashboard/SongDataRow'

const MySongs = () => {
     const { user } = useContext(AuthContext)
     const [loading, setLoading] = useState(true);
     const [specificSongs, setSpecificSongs] = useState([])

     useEffect(() => {
          fetchSpecificSongs()
     }, [])

     const fetchSpecificSongs = () => {
          getSpecificSongs(user?.email).then(albums => {
               setSpecificSongs(albums);
               setLoading(false);
          })
     }

     return (
          <>
               {
                    loading ?
                         <div>
                              <Loader2 />
                         </div> :
                         <div>
                              {specificSongs && Array.isArray(specificSongs) && specificSongs.length > 0 ? (
                                   <div className='container mx-auto px-4 sm:px-8'>
                                        <div className='py-8'>
                                             <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                                  <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                                       <table className='min-w-full leading-normal'>
                                                            <thead>
                                                                 <tr>
                                                                      <th
                                                                           scope='col'
                                                                           className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                      >
                                                                           Title
                                                                      </th>
                                                                      <th
                                                                           scope='col'
                                                                           className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                      >
                                                                           Start Date
                                                                      </th>
                                                                      <th
                                                                           scope='col'
                                                                           className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                      >
                                                                           End Date
                                                                      </th>
                                                                      <th
                                                                           scope='col'
                                                                           className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                      >
                                                                           Delete
                                                                      </th>
                                                                      <th
                                                                           scope='col'
                                                                           className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                                                      >
                                                                           Update
                                                                      </th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody>
                                                                 {specificSongs &&
                                                                      specificSongs?.map(song => (
                                                                           <SongDataRow
                                                                                key={song?.id}
                                                                                song={song}
                                                                                fetchSpecificSongs={fetchSpecificSongs}
                                                                           />
                                                                      ))}
                                                            </tbody>
                                                       </table>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              ) : (
                                   <EmptyState
                                        message='No Room data available.'
                                        address='/dashboard/add-room'
                                        label='Add Rooms'
                                   />
                              )}
                         </div>
               }

          </>
     )
}

export default MySongs
