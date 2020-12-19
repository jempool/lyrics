import React, { useState } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function Tab1() {
  const [phone, setPhone] = useState(3003445566);
  const [message, setMessage] = useState("");

  const onClick = (event) => {
    event.preventDefault();
    const payload = {
      author_phone: phone,
      message: message,
    };
    axios
      .post("http://localhost:3001/new-message/", payload)
      .then((response) => {
        console.log(response);
        setPhone("");
        setMessage("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Row style={{ margin: "20px" }}>
        <Col sm="12">
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleAddress">Address</Label>
              <Input
                type="text"
                name="address"
                id="exampleAddress"
                placeholder="1234 Main St"
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePhone">Phone</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="examplePhone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label for="exampleMessage">Message</Label>
                  <Input
                    type="text"
                    name="message"
                    id="exampleMessage"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleAny">Any</Label>
                  <Input
                    type="text"
                    name="any"
                    id="exampleAny"
                    disabled={true}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" onClick={onClick}>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Tab1;
