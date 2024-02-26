const socket = require("./src/index")
const app = require("express")()
const io = socket(app)
console.log("WORKS!")

io.bindto("test", (data) => {
    console.log(data)
})


app.get("/js", (req, res) => {
    res.sendFile(__dirname + "/src/client.js")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000)