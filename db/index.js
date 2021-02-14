//pgSQL library
const pg = require('pg');

//create pg client, find db of pg server by entering connection str
const client = new pg.Client('postgres://localhost/playlist_db');

//uploading data
const syncAndSeed = async() => {
  const SQL = `
  DROP TABLE IF EXISTS songs;
  DROP TABLE IF EXISTS playlist;

  CREATE TABLE playlist(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );
  CREATE TABLE songs(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    playlist_id INTEGER REFERENCES playlist(id)
  );

  INSERT INTO playlist(name) VALUES('Hip Hop');
  INSERT INTO playlist(name) VALUES('Walking in NYC');
  INSERT INTO playlist(name) VALUES('Working Out');

  INSERT INTO songs(name, playlist_id) VALUES('Redbone (Child Gambino)', 1);
  INSERT INTO songs(name, playlist_id) VALUES('EARFQUAKE (Tyler, the Creator)', 1);
  INSERT INTO songs(name, playlist_id) VALUES('m.A.A.d city (Kendrick Lamar)', 1);
  INSERT INTO songs(name, playlist_id) VALUES('God''s Plan (Drake)', 1);
  INSERT INTO songs(name, playlist_id) VALUES('Empire State of Mind (Jay-Z, Alicia Keys)', 2);
  INSERT INTO songs(name, playlist_id) VALUES('Welcome to New York (Taylor Swift)', 2);
  INSERT INTO songs(name, playlist_id) VALUES('City Looks Pretty (Courtney Barnett)', 2);
  INSERT INTO songs(name, playlist_id) VALUES('Ever Since New York (Harry Styles)', 2);
  INSERT INTO songs(name, playlist_id) VALUES('Stronger (Kanye West)', 3);
  INSERT INTO songs(name, playlist_id) VALUES('Work B**ch (Britney Spears)', 3);
  INSERT INTO songs(name, playlist_id) VALUES('Bootalicious (Beyonce)', 3);
  INSERT INTO songs(name, playlist_id) VALUES('Work it (Missy Elliott)', 3);
  `;

  //run query
  await client.query(SQL);
};

module.exports = {
  client,
  syncAndSeed
}
