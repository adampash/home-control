## Home Control

A lightweight server for setting up some home automation. Mostly Spotify scripts now.

### Usage

```bash
git clone https://github.com/adampash/home-control.git

cd home-control

yarn install
```

You'll need to set up the following environment variables:

```
export CLIENT_ID=<spotify-client-id>
export CLIENT_SECRET=<spotify-client-secret>
export STEREO=<name-of-your-stereo>
export PORT=<preferred-port-default-3001>
```

Then run with `yarn serve`.
