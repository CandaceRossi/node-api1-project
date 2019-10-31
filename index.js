const express = require("express"); // import the express package

const server = express(); // creates the server

const db = require("./data/db.js");

//middleware;
server.use(express.json());

//request to / on localhost:8000
server.get("/", (req, res) => {
  res.status(200).send("Hello Magi's World");
});

//listen for request in port on localhost
server.listen(8000, () =>
  console.log("Server running on http://localhost:8000")
);

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The users information cannot be retrieved." });
    });
});

//POST
//If req body is missing the name or bio property
//If the information about the user is valid
//If there's an error while saving the user

server.post("/api/users", (req, res) => {
  const userInformation = req.body;
  db.insert(userInformation)
    .then(id => {
      if (id) {
        res.status(201).json(id);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for user." });
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ error: "failed to add the user to the db" });
    });
});

// DELETE
// if user with the specified id is not found
// if there is an error in removing the user from the database

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(res => {
      if (id) {
        res.status(200).json({
          message: `The user with the specified ID ${id} has been remove`
        });
      } else {
        res.status(404).json({
          error: `The user with the specified ID ${id} does not exist.`
        });
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ error: "INTERNAL ERROR" });
    });
});

// GET
// if user with specific id is not found:
// if there is an error in retrieving the user from database

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." });
      }
    })
    .catch(err => {
      res.status(404).json({
        message: `The user with the specified ID ${id} does not exist.`
      });
    });
});

// //PUT
// if user with specific id is not found
// if request body is missing the name or bio property
// if there is an error when updating the user
// if the user is found and the new information is valid

server.put("/api/users/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  db.update(id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: `The user with the specified ID ${id} does not exist.`
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .send({ message: "The user information could not be modified." })
    );
});
