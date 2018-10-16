# Veppo

This is a react app for Porto Alegre's bus station.

## Setup

#### Node.js

The server requires Node.js and NPM installed. If you do not have Node.js, you should run:

```sh
nvm use
nvm install
```

#### App dependencies

After NodeJS is ready, app dependencies must be installed:

```sh
npm install
```

#### App dependencies

To install app dependencies, run the following command:

```sh
npm install
```

## Running the application

You can run the application locally or serving it from an express.js, in both cases you need to start veppo-api so that you can retrieve data.

#### Local development

You can run the application with webpack dev server. Inside the project folder, run:

```sh
npm start
```

#### Server

You can deliver the bundled app from the server, but first, you have to build it:

```sh
npm run build
```

Then, if the app built correctly, you can start serving:

```sh
npm run server
```

## Testing

To run application tests, run:

```
npm test
```
