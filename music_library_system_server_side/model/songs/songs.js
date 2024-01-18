const connection = require('../../connection/config/database')

const SongsModel = {

     createSongs: async (req, res) => {
          try {
               const {
                    title, startDate, endDate, email
               } = req.body;

               const start_date = new Date(startDate);
               const end_date = new Date(endDate);
               const startDateMySQLFormat = start_date.toISOString().slice(0, 19).replace('T', ' ');
               const endDateMySQLFormat = end_date.toISOString().slice(0, 19).replace('T', ' ');
               const insertQuery = `INSERT INTO songs (title, start_date, end_date, host_email) VALUES (?, ?, ?, ?)`;

               const result = await new Promise((resolve, reject) => {
                    connection.query(
                         insertQuery,
                         [title, startDateMySQLFormat, endDateMySQLFormat, email],
                         (error, result) => {
                              if (error) {
                                   reject(error);
                              } else {
                                   resolve(result);
                              }
                         }
                    );
               });

               if (result.affectedRows > 0) {
                    console.log(result);
                    return res.send(result);
               } else {
                    console.log('Insert failed');
                    return res.status(500).json({ message: 'Insert failed.' });
               }

          } catch (error) {
               console.error(error);
               res.status(500).json({ message: 'Internal Server Error' });
          }
     },

     getSongs: async (req, res) => {
          try {
               const data = "select * from songs  order by id asc";

               connection.query(data, function (error, result) {
                    if (!error) {
                         res.send(result)
                    }
                    else {
                         console.log(error)
                    }
               })
          }
          catch (error) {
               console.log(error)
          }
     },

     getSpecificSongs: async (req, res) => {
          try {
               const query = 'SELECT * FROM songs WHERE host_email = ?';
               connection.query(query, [req.params.email], (error, result) => {
                    if (!error && result.length > 0) {
                         console.log(result);
                         return res.send(result);
                    } else {
                         console.log(error || 'songs not found');
                         return res.status(404).json({ message: 'songs not found.' });
                    }
               });
          }
          catch (error) {
               console.log(error)
          }
     },

     updateSongs: async (req, res) => {
          try {
               const {
                    id, title, startDate, endDate, email
               } = req.body;

               const start_date = new Date(startDate);
               const end_date = new Date(endDate);
               const startDateMySQLFormat = start_date.toISOString().slice(0, 19).replace('T', ' ');
               const endDateMySQLFormat = end_date.toISOString().slice(0, 19).replace('T', ' ');

               const updateQuery = `UPDATE songs SET title = ?, start_date = ?, end_date = ?, host_email = ? WHERE id = ?`;

               const result = await new Promise((resolve, reject) => {
                    connection.query(
                         updateQuery,
                         [title, startDateMySQLFormat, endDateMySQLFormat, email, id],
                         (error, result) => {
                              if (error) {
                                   reject(error);
                              } else {
                                   resolve(result);
                              }
                         }
                    );
               });

               // Handle the result or send a response to the client
               if (result.affectedRows > 0) {
                    console.log(result);
                    return res.send(result);
               } else {
                    console.log('Update failed');
                    return res.status(500).json({ message: 'Update failed.' });
               }
          } catch (error) {
               console.error(error);
               res.status(500).json({ message: 'Internal Server Error' });
          }
     },

     deleteSongs: async (req, res) => {
          try {
               const query = 'DELETE FROM songs WHERE id = ?';
               connection.query(query, [req.params.id], (error, result) => {
                    if (!error && result.affectedRows > 0) {
                         console.log(result);
                         return res.send(result);
                    } else {
                         console.log(error || 'songs not found');
                         return res.status(404).json({ message: 'songs not found.' });
                    }
               });
          }
          catch (error) {
               console.log(error)
          }
     },
};

module.exports = SongsModel