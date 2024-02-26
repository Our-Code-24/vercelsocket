const socket = require("./src/index")
const app = require("express")()
socket(app).then((io) => {
console.log("WORKS!")

io.bindto("test", (data) => {
    io.send("test", "Pong!")
})


app.get("/js", (req, res) => {
    res.sendFile(__dirname + "/src/client.js")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000)
})