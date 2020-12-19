import React from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

function Tab2() {
  return (
    <div>
      <Row style={{ margin: "20px" }}>
        <Col sm="6">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Tab2;
