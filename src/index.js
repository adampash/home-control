import express from "express";
import * as Spotify from "spotify-control";

const app = express();

const startPlaylistOnStereo = async playlistName => {
  await Spotify["start-device"](process.env.STEREO);
  await new Promise(res => setTimeout(res, 1500));
  const playlistId = await Spotify["get-playlist"](playlistName);
  await Spotify["set-volume"](40);
  await Spotify["play"]({ context_uri: `spotify:playlist:${playlistId}` });
};

const start = () => {
  app.get("/start-discover", async (req, res) => {
    await startPlaylistOnStereo("Discover Weekly");
    res.sendStatus(200);
  });

  app.get("/start-radar", async (req, res) => {
    await startPlaylistOnStereo("Release Radar");
    res.sendStatus(200);
  });

  app.get("/start-monthly", async (req, res) => {
    const monthlyPlaylist = await Spotify["get-monthly-playlist"]();
    await startPlaylistOnStereo(monthlyPlaylist);
    res.sendStatus(200);
  });

  app.get("/save-track", async (req, res) => {
    try {
      await Spotify["add-to-monthly-playlist"]();
      res.send("Saved song to your monthly playlist");
    } catch {
      res.send("Something went wrong saving that song");
    }
  });

  const port = process.env.PORT || 3001;
  app.listen(process.env.PORT || 3001);
  console.log("App started on", port);
};

start();
