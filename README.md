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
CLIENT_ID=<spotify-client-id>
CLIENT_SECRET=<spotify-client-secret>
STEREO=<name-of-your-stereo>
PORT=<preferred-port-default-3001>
```

Then run with `yarn serve`.
