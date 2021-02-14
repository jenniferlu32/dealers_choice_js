const { client, syncAndSeed } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

//set up static path to access public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//handle express pipeline
app.get('/', async(req, res, next) => {
  try {
    const response = await client.query(`SELECT * FROM playlist;`);
    //[{"id":1,"name":"hip_hop"}, ...]
    const playlists = response.rows;
    res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/public/styles.css'/>
      </head>
      <body>
        <h1>Jennifer's Playlist</h1>
        <ul>
          ${
            playlists.map(playlist => `
            <li>
              <a href='/songs/${playlist.id}'>
              ${ playlist.name }
            </li>
            `).join('')
          }
        </ul>
      </body>
    </html>
    `);
  }
  catch (err) {
    next(err);
  }
});

app.get('/songs/:id', async(req, res, next) => {
  try {
    const response = await client.query('SELECT * FROM songs WHERE playlist_id=$1;', [req.params.id]);
    const songs = response.rows;
    res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/public/styles.css'/>
      </head>
      <body>
        <h1>Songs</h1>
        <ul>
          ${songs.map(song => `
          <li>${song.name}</li>
          `).join('')}
        </ul>
      </body>
    </html>
    `);
  }
  catch(err) {
    next(err);
  }
})

//if deploying application that sets port for us, or set it to 3000
const port = process.env.PORT || 3000;

const setUp = async() => {
  try {
    //connect to client
    await client.connect();
    console.log('connected to database')
    //upload data
    await syncAndSeed();
    //listen to port
    app.listen(port, () => console.log(`listening on port ${port}`));
  }
  catch(err) {
    console.log(err);
  }
}
setUp();
