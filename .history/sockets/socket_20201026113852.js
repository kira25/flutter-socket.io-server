//Sockets messages
const { io } = require("../index");
const Bands = require("../models/Bands");
const Band = require("../models/band");
const bands = new Bands();
console.log("init server");

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Los kafres"));
bands.addBand(new Band("Killers"));
bands.addBand(new Band("Offspring"));

io.on("connection", (client) => {
  console.log("Client connected");
  client.on("disconnect", () => {
    console.log("Disconnected client");
  });
  client.on("message", (payload) => {
    console.log("Message!!", payload);
    io.emit("message", {
      admin: "Papa",
    });
  });

  client.on("send-message", (payload) => {
    // io.emit("new-message", payload); // emite a todos
    console.log(payload);
    client.broadcast.emit("new-message", payload); // emite a todos menos al que emitio
  });
});
