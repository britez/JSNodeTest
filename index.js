#!/usr/bin/env node

const { JSDOM } = require('jsdom');
const axios = require('axios');
const tests = ['#make-everything-ok-button', "a[title='Make-Button']",
  "a[href='#ok']", "a[href='#ok']"];

const search = (htmlString) =>
  tests
    .reduce((exists, nextTest) => exists || convertToJSDOM(htmlString).querySelector(nextTest), false)
    .text;

const convertToJSDOM = (htmlString) => new JSDOM(htmlString).window.document;

const run = async (arg) => {

  console.log(`Fetching request to: ${arg}`);
  axios
    .get(arg)
    .then(resp => {
      console.log(`Fetching succesfully: ${resp.status}`);
      const dom = new JSDOM(resp.data);
      console.log(`Boton encontrado: ${search(resp.data)}`);
    })
    .catch(err => console.error(`Error fectching url ${arg}: ${err}`));

};

run(process.argv[2]);
