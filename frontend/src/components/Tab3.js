import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardTitle, Table } from "reactstrap";
import axios from "axios";

function Tab3() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/messages/")
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data.messages);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Row style={{ margin: "20px" }}>
        <Col sm="12">
          <Card body>
            <CardTitle>Table Title</CardTitle>
            {/* <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            </Table> */}
            {/* ------------------------------------------------------------------------ */}
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Author Phone</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.id}</td>
                    <td>{message.author_phone}</td>
                    <td>{message.message}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* ------------------------------------------------------------------------ */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Tab3;
