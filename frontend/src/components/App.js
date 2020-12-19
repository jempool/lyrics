import React, { useState } from "react";
import classes from "./App.module.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const App = () => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");

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
            console.log(response);

            const lyrics =
              response.data.lyrics === ""
                ? "No lyrics found :("
                : response.data.lyrics;

            setLyrics(lyrics);
          } else {
            console.log("something is bad with request");
          }
        })
        .catch((error) => console.log(error));
    }
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
                {/* <Label for="result">Result</Label> */}
                <Input
                style={{textAlign:'center'}}
                  type="textarea"
                  name="result"
                  id="result"
                  rows="10"
                  defaultValue={lyrics}
                  placeholder="...Nothing around here"
                />
              </FormGroup>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default App;
