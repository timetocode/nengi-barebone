# nengi-barebone
This is a barebone nengi template.

Attach your own renderer, input system, collisions etc!

Contains:
- TestEntity
- TestCommand
- TestMessage
- basic onConnect/onDisconnect logic
- client-side game loop
- server-side game loop
- functioning bot
- webpack-dev-server (serves public folder, hot reloads client-side changes)
- nodemon auto restart server on server-side changes


To run the game:
```sh
npm install
npm start
## visit http://localhost:8080
```
All that you will see in this game are console log messages showing the test entity, message, and command.


## Bots
```sh
> node bot/index.js
```
