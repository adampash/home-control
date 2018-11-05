import express from "express";
import * as Spotify from "spotify-control";

const app = express();

const startPlaylistOnStereo = async (playlistName, shuffle = true) => {
  const isActive = await Spotify["start-device"](process.env.STEREO);
  const playlistId = await Spotify["get-playlist"](playlistName);
  if (!isActive) {
    await Spotify["pause"]();
    await new Promise(res => setTimeout(res, 5000));
    await Spotify["set-volume"](40);
  }
  console.log('setting shuffle to', shuffle);
  await Spotify["set-shuffle"](shuffle);
  await Spotify["play"]({ context_uri: `spotify:playlist:${playlistId}` });
};

const start = () => {
  app.get("/set-shuffle", async (req, res) => {
    console.log('setting shuffle to', true);
    const result = await Spotify["set-shuffle"](true);
    console.log(`result`, result);
    res.sendStatus(200)
  });
  app.get("/now-playing", async (req, res) => {
    const nowPlaying = await Spotify["get-current-track-and-artist"]();
    res.send(nowPlaying);
  });

  app.get("/start-discover", async (req, res) => {
    await startPlaylistOnStereo("Discover Weekly");
    res.sendStatus(200);
  });

  app.get("/start-radar", async (req, res) => {
    await startPlaylistOnStereo("Release Radar");
    res.sendStatus(200);
  });

  app.get("/start-monthly", async (req, res) => {
    const monthlyPlaylist = await Spotify["get-monthly-playlist-name"]();
    await startPlaylistOnStereo(monthlyPlaylist);
    res.sendStatus(200);
  });

  app.get("/save-track", async (req, res) => {
    try {
      await Spotify["add-to-monthly-playlist"]();
      res.send("Saved song to your monthly playlist");
    } catch (e) {
      res.send("Something went wrong saving that song");
    }
  });

  app.get("/play", async (req, res) => {
    await Spotify.play()
    res.sendStatus(200);
  });
  app.get("/pause", async (req, res) => {
    await Spotify.pause()
    res.sendStatus(200);
  });

  const port = process.env.PORT || 3001;
  app.listen(process.env.PORT || 3001);
  console.log("App started on", port);
};

start();
