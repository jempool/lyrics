const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let messages = [
  {
    content: "Hi!",
    id: 1,
  },
  {
    content: "Bye!",
    id: 2,
  },
];

app.post("/count", (request, response) => {
  const body = request.body;
  if (!body.lyrics) {
    return response.status(400).json({
      error: "The content is missing",
    });
  }
  const lyrics = request.body.lyrics;
  const lines = lyrics.split(/\r\n|\r|\n/).length;
  const words = lyrics.split(" ").length;

  console.log(lines);
  response.json({ lines, words });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
