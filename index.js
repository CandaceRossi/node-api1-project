// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

//middleware
server.use(expressjson());

//request/route handlers

//POST

//If req body is missing the name or bio property
server.post('/users/:id', (req, res) => {
    const id = req.params.id;
    const name = req.params.id;

    db.insert(id, name).then(user => {
        res.status(400).json({errorMessage: "Please provide name and bio for user."});
  })
    .catch(err => {
        console.log("error", err);
        res.status(500).json({error: "failed to add the user to the db"})
    })
})
//If the information about the user is valid
server.post('/users', (req, res) => {
    const userInformation = req.body;

    db.insert(userInformation).then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log("error", err);
        res.status(500).json({error: "failed to add the user to the database"})
    })
})

//If there's an error while saving the user
server.post('/users', (req, res) => {

db.cancel(req).then(res => {
        res.status(500).json({error: "There was an error while saving the user to the database "});
    })
.catch(err => {
        console.log("error", err);
        res.status(500).json({error: "failed to add the user to the database"})
    })
})

//GET 

//request to / on localhost:8000
server.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

//request /api/users that returns a list of Users
server.get('/api/users', (req, res) => {
    db.find(req).then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log("error", err);
        res.status(500).json({error: "failed to get users from db"})
    })
})

//listen for request in port on localhost
server.status(200).listen(8000, () => console.log("API running on port 8000"));

//PUT 
server.put("/api/users/:id", (req, res) => {
    const changes = req.body;
})
Users.update(req.params.id, changes) .then(user => {
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send({message: "The user with the specified ID does not exist."})
    }
}).catch (err => console.log(err))
res.status(500).send({message: "error updating the hub"})



db.find().then(data => {
    res.send(data);
})



//db.insert().then(data => {
    //res.
//})

const users = {
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String
  created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
  updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
}
