const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const usersModel = require('./model/users_information/users');
const ArtistsModel = require('./model/artists/artists');
const AlbumsModel = require('./model/albums/albums');
const SongsModel = require('./model/songs/songs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: true, message: 'Unauthorized access' });
  }

  // Extract the token from the "Authorization" header (assuming "Bearer" token)
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: true, message: 'Unauthorized access' });
    }

    req.decoded = decoded;
    next();
  });
};

app.post('/jwt', (req, res) => {
  const user = req.body;

  // Sign the user information and create a JWT token
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// users part start
app.post('/createUsers', usersModel.createUsers);
app.get('/getUsers', usersModel.getUsers);
app.get('/getSpecificUser/:email', usersModel.getSpecificUser)
// users part end

// artist part start
app.get('/getArtists', ArtistsModel.getArtists);
// artist part end

// albums part start
app.post('/createAlbums', verifyJWT, AlbumsModel.createAlbums);
app.get('/getAlbums', AlbumsModel.getAlbums);
app.get('/getSpecificAlbums/:email', AlbumsModel.getSpecificAlbums)
app.put('/updateAlbums/:id', verifyJWT, AlbumsModel.updateAlbums)
app.delete('/deleteAlbums/:id', verifyJWT, AlbumsModel.deleteAlbums);
// albums part end


// songs part start
app.post('/createSongs', verifyJWT, SongsModel.createSongs);
app.get('/getSongs', SongsModel.getSongs);
app.get('/getSpecificSongs/:email', SongsModel.getSpecificSongs)
app.put('/updateSongs/:id', verifyJWT, SongsModel.updateSongs)
app.delete('/deleteSongs/:id', verifyJWT, SongsModel.deleteSongs);
// songs part start



app.get('/', (req, res) => {
  res.send('Server running...');
});

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
