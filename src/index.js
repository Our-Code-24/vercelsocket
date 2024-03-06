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
    if (listeners[req.query["event"]]) {
      listeners[req.query["event"]](req.query["data"])
      res.sendStatus(200)
    }
  })

  app.get("/socket/js", (req, res) => {
    res.sendFile(__dirname + "/client.js")
  })

  functions = {
    "send": function(eventname, data) {
      lastevent = {
        "eventname": eventname,
        "data": data
      };
    },
    "bindto": function(eventname, callback) {
      listeners[eventname] = callback;
    },
    "resetevent": function() {
      lastevent = {
        "eventname": "undefined",
        "data": "undefined"
      };
    },
    "completereset": function() {
      listeners = {}
      lastevent = {
        "eventname": "undefined",
        "data": "undefined"
      };
    }
  }
  return functions;
}

module.exports = io;
