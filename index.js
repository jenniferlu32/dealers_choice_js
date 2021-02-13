//pgSQL library
const pg = require('pg');

//create pg client, find db of pg server by entering connection str
const client = new pg.Client('postgres://localhost/playlist_db');

//uploading data
const syncAndSeed = async() => {
  const SQL = `
  DROP TABLE IF EXISTS hip_hop;
  CREATE TABLE hip_hop(
    id SERIAL PRIMARY KEY,
    song_name VARCHAR(100) NOT NULL
  );
  INSERT INTO hip_hop(song_name) VALUES('Redbone (Child Gambino)');
  INSERT INTO hip_hop(song_name) VALUES('m.A.A.d City (Kendric Lamar)');
  INSERT INTO hip_hop(song_name) VALUES('EARFQUAKE (Tyler, the Creator)');
  INSERT INTO hip_hop(song_name) VALUES('I Love It (Kanye West)');
  `;

  //run query
  await client.query(SQL);
}

const setUp = async() => {
  try {
    //connect to client
    await client.connect();
    console.log('connected to database')
    //upload data
    await syncAndSeed();
  }
  catch(err) {
    console.log(err);
  }
}

setUp();
