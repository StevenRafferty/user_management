# User Management
A simple React app that uses JSON for storing authentication and viewing users via the JSON placeholder API.

## Challenges
I wanted to code this as if I was coding for a real backend, doing it this way presented a few issues due to using the JSON placeholder API as I state in ` Issues due to using placeholder API`.

## Issues due to using placeholder API
* If you add a user you will not be able to edit it as that user hasn't been created on the backend, editing normal users will work fine
* Using add more than once will present a key error due to JSON placeholder api only sending one id back, this will not effect adding multiple users/posts.

## TODO
* In a few places I have used type any which is not great

## Features
* Redux
* Hooks
* TypeScript
* Semantic UI

## Building
* `npm i` - install dependencies 
* `npm run build` - Will build the project ready for production

## Run project for development
* `npm i` - install dependencies 
* `npm start` - Starts live build of React
* login - username: `steven`, password: `password` or add your own to the users.json file
