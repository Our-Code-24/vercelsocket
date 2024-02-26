# vercelsocket
A socket package for vercel

## How to use
Install package with npm

```bash
npm install vercelsocket
```

Embed by using

Server:
```javascript
const app = require("express")()
const io = require("vercelsocket")(app)

// Your code

app.listen(3000) // 3000 = Port
```

Client:
```html
<html>
    <body>

    </body>
    <script src="/js"></script>
</html>
```

As the program uses

```javascript
app.get("route", callback)
```

no further action is needed.

## Use it in applications

There are 2 actions:

```javascript
io.bindto(eventname, function(data) {
    // Callback
})
// and
io.send(eventname, data)
```

Clients are working like this:

```html
<html>
    <body>

    </body>
    <script src="/js"></script>
    <script>
        io().then((socket) => {
        socket.send("eventname", data)
        socket.bindto("eventname", function(data) {
            // Callback
        })
        })
    </script>
</html>
```
