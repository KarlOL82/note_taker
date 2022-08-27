// Required files and modules
const express = require("express");
const notes = require("./db/db.json");
const fs = require("fs");
const path = require("path");
const uuid = require("./public/assets/uuid");

const PORT = 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET route to read saved notes from db.json file
app.get("/api/notes", (req, res) => res.json(notes));

// Post route starts here
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a new note`);

  // Deconstructs the object, builds new note and pushes it to the array as string data
  const { text, title } = req.body;

  if (text && title) {
    const newNote = {
      text,
      title,
      id: uuid(),
    };
    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info("Successfully updated notes!")
    );
    
    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.json(notes);
  } else {
    res.status(500).json("Error in posting note");
  }
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
           parsedNotes = JSON.parse(data);
          const notesDecremented = parsedNotes.filter(notes => notes.id !== parseInt(req.params.id));
      fs.writeFile(
          "./db/db.json",
          JSON.stringify(notesDecremented, null, 2),
          (writeErr) =>
           writeErr
            ? console.error(writeErr)
            : console.info("Successfully updated notes!")
          );
          const response = {
            status: "success",
            body: notesDecremented,
          };
          console.log(response);
          res.json(notes);
        } 
    });
      
});


app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


