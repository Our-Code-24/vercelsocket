const express = require("express");

let functions = {};
let lastevent = {
  "eventname": "undefined",
  "data": "undefined"
};
let listeners = {};

function io(app) {
  app.get("/socket", (req, res) => {
    res.send(lastevent)
  })

  app.get("/socket/trigger", (req, res) => {
    listeners[req.query["event"]](req.query["data"])
    res.sendStatus(200)
  })

  return {
    "send": function(eventname, data) {
      lastevent = {
        "eventname": eventname,
        "data": data
      };
    },
    "bindto": function(eventname, callback) {
      listeners[eventname] = callback;
    }
  };
}

module.exports = io;
