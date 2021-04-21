import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export class About extends Component {
  render() {
    return (
      <Container>
        <Card bg="light" text="dark" className="mt-5 mb-5">
          <Card.Header>
            <h4>Mini Project</h4>
          </Card.Header>
          <Card.Body>
            <p>
              This mini project is your opportunity to show us your style and
              thought process.
            </p>
            <p>
              Please ensure you are able to talk about how and why you built the
              project in the way you did. While this is an artificially small
              project we are looking for good code practices.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default About;
