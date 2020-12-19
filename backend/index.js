const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

//################################ STATS ################################################
// Function to calculate stats
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

  response.json({ lines, words });

  translateRequest("Welcome Developers");
});
//#######################################################################################

//################################ TRANSLATIONS #################################################
//Function to translate the requests
const translateRequest = async (data) => {
  let translation = "";
  const payload = {
    from: "en_GB",
    to: "es_CO",
    data: data,
    platform: "api",
  };
  const APIkey =
    "Bearer a_ItVQVpy8n2JpN7SO382k7W0vMPV3O27WE9QQ0PXkAAAPDX9HEHRS5VJmcPuOPGzZoH2U0PglLUVbv2W0";

  const headers = { Authorization: APIkey };

  await axios
    .post("https://api-b2b.backenster.com/b1/api/v3/translate", payload, {
      headers,
    })
    .then((response) => {
        console.log(response.data.targetTransliteration)
      translation = response.data.targetTransliteration;
    })
    .catch((error) => console.log(error));

  return translation;
};

// Function to response translation requests from frontend
app.post("/translate", (request, response) => {
  const body = request.body;
  if (!body.lyrics) {
    return response.status(400).json({
      error: "The content is missing",
    });
  }

  const lyrics = request.body.lyrics;
  const translation = translateRequest(lyrics);

  console.log("translation", translation);

  response.json({ translation });
});

//###############################################################################################

//function to response to unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
