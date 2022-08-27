const express = require("express");
const notes = require("./db/db.json");
const fs = require("fs");
const path = require("path");
const uuid = require("./public/assets/uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(notes));

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a new note`);

  const { text, title } = req.body;

  if (text && title) {
    const newNote = {
      text,
      title,
      note_id: uuid(),
    };

     
    //     // noteString.push(notes)
    
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
        //    parsedNotes = JSON.parse(data);
  
        //   parsedNotes.push(notes);
  
          parsedNotes.push(newNote);
  
  
      fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 2),
          (writeErr) =>
          JSON.stringify(parsedNotes, null, 2),(writeErr) =>
           writeErr
            ? console.error(writeErr)
            : console.info("Successfully updated notes!")
          );
        }
      });
//     const noteString = JSON.stringify(newNote);
    // fs.writeFile("./db/db.json", noteString, (err) => {
    //   err ? console.error(err) : console.log("Successfully updated notes!");
    // });

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.json(newNote);
  } else {
    res.status(500).json("Error in posting note");
  }
});

var readNotes;
fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
  if (err) throw err;
  readNotes = JSON.parse(data);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


