import React, { useState } from "react";
import classes from "./App.module.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const App = () => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [stats, setStats] = useState({ words: 0, lines: 0 });

  const onClick = (event) => {
    event.preventDefault();
    console.log({ artist: artist, title: title });
    setLyrics("");
    if (artist !== "" && title !== "") {
      // [GET]https://api.lyrics.ovh/v1/{:artist}/{:title}
      // https://api.lyrics.ovh/v1/Queen/BohemianRhapsody
      axios
        .get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then((response) => {
          if ((response.status = 200)) {
            // console.log(response);

            const lyrics =
              response.data.lyrics === ""
                ? "No lyrics found :("
                : response.data.lyrics;

            setLyrics(lyrics);
            calculateStats(lyrics);
          } else {
            console.log("something is bad with lyrics request");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const calculateStats = (lyrics) => {
    const payload = { lyrics: lyrics };
    axios
      .post("http://localhost:3001/count", payload)
      .then((response) => {
        if ((response.status = 200)) {
          console.log(response.data);
          setStats(response.data);
        } else {
          console.log("something is bad with stats request");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={classes.App}>
      <h4>Lyrics Finder</h4>
      <Row style={{ margin: "20px" }}>
        <Col sm="12">
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="artist">Artist</Label>
                  <Input
                    name="artist"
                    id="artist"
                    placeholder="Artist here!"
                    value={artist}
                    onChange={(event) => setArtist(event.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    name="title"
                    id="title"
                    placeholder="Title name here!"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button color="primary" onClick={onClick}>
              Find Lyrics!
            </Button>

            <div className={classes.TextArea}>
              <FormGroup>
                <Input
                  style={{ textAlign: "center" }}
                  type="textarea"
                  name="result"
                  id="result"
                  rows="10"
                  defaultValue={lyrics}
                  placeholder="...Nothing around here"
                />
              </FormGroup>
              <p>
                <b>Stats</b>
                {` - Song has ${stats.words} words and ${stats.lines} lines`}
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default App;
