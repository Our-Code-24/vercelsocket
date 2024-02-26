const listeners = []

function io() {
    setInterval(() => {
        fetch("/socket")
    }, 1000);
    return {
        "send": function(eventname, data) {
            if (eventname) {
                fetch("/socket/trigger").then((res) => {
                    if (res.status != 200) {
                        throw new Error("Responded with a status code of", res.status, ":", res.statusText)
                    }
                })
            }
        },
        "bindto": function(eventname, callback) {
            listeners[eventname] = callback
        }
    }
}