# TwitchWatch2
# Author: Michael Sund, michael@osund.com
Twitch stream notifications
v1.0.3

Download at http://michaelsund.github.io/twitchwatch2/

**Development Notes**

To develop the application further you need to register a application at twitch.tv under your own account since i wont be sharing my own key.
Then copy the application key and create the file "config.json" with the following
{
  "key": "your_application_key"
}

- npm install typings --global
- npm install
- typings install --save --ambient require
- npm run postinstall
- npm run dev

**Building for selected platforms**
- npm run packagewin
- npm run packagelin
- npm run packageosx
