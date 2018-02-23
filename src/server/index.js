import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/containers/App.js';

global.window = { addEventHandler() {}, fake: true }

const server = express();

server.use(express.static('public'));

server.get('*', (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Dylan Scheidt</title>
        <script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
        <meta charset="utf-8" >
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
        <link rel="stylesheet" href="/css/main.css">
        <link rel="shortcut icon" href="/me.png">
        <script src="/bundle.js" defer></script>
      </head>
      <body class="no-scroll">
        <div id="loader">
          <div class="loader-contain">
            <div id="bounce1" class="bounce1"></div>
            <div id="bounce2"class="bounce2"></div>
            <div id="bounce3" class="bounce3"></div>
            <div class="logo">
              <h1 class="initials">DS</h1>
            </div>
          </div>
        </div>
        <div id="root">
        ${renderToString(<App />)}
        </div>
      </body>
    </html>
  `);
});

server.listen(process.env.PORT || 3000, () => console.log('servering'));