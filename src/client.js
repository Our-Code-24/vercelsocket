const listeners = {}
let eventbuffer = "undefined"
const {v4: uuidv4} = require("uuid")

async function io() {
    setInterval(() => {
        fetch("/socket").then(async (res) => {
            const data = await res.json()
            if (listeners[data.eventname]) {
                if (eventbuffer != data.eventname) {
                listeners[data.eventname](data.data)
                eventbuffer = data.eventname
                }
            }
        })
    }, 1000)
    const functions = {
        "send": function(eventname, data) {
            if (eventname) {
                fetch("/socket/trigger?event=" + eventname + "&data=" + data).then((res) => {
                    if (res.status != 200) {
                        throw new Error("Responded with a status code of", res.status, ":", res.statusText)
                    }
                })
            }
        },
        "bindto": function(eventname, callback) {
            listeners[eventname] = callback
        },
        "id": uuidv4()
    }
    functions.send("connect", functions.id)
    return functions
}