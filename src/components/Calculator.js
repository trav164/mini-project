import React, { Component } from "react";
import { Container, Card, Button, Form, Col, Alert } from "react-bootstrap";

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: "",
      number2: "",
      calculation: "",
      result: "",
      isValid: false,
    };
  }

  fetchData = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number1: this.state.number1,
        number2: this.state.number2,
      }),
    };

    console.log(this.state.calculation);

    const res = await fetch(
      `http://localhost:8080/calc/${this.state.calculation}`,
      options
    );
    // const res = await fetch(`http://localhost:8080/calc/${route}`, options);
    const data = await res.json();

    this.setState({
      result: data.result,
    });

    console.log(this.state);
  };

  handleInput = (event) => {
    const value = event.target.value;
    const target = event.target.id.toLowerCase(); // using id instead of setting an explicit "name" on each input
    this.setState({
      ...this.state,
      [target]: value,
    });
    console.log(this.state);
  };

  handleValidation = (event) => {
    // Checks to see if the form has all the correct inputs
    const form = event.currentTarget;
    if (form.checkValidity()) this.setState({ isValid: true });
  };

  render() {
    return (
      <Container>
        <Card bg="light" text="dark">
          <Card.Header>
            <h4>Probability Calculator</h4>
          </Card.Header>
          <Card.Body>
            <Form
              noValidate
              validated={this.state.isValid}
              onSubmit={this.calculate}
            >
              <Form.Row>
                <Col>
                  <Form.Group controlId="number1">
                    <Form.Label>Number 1</Form.Label>
                    <Form.Control
                      required
                      name="number1"
                      placeholder=""
                      type="number"
                      value={this.state.number1}
                      onChange={this.handleInput}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="number2">
                    <Form.Label>Number 2</Form.Label>
                    <Form.Control
                      required
                      name="number2"
                      placeholder=""
                      type="number"
                      value={this.state.number2}
                      onChange={this.handleInput}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="calculation">
                    <Form.Label>Calculation</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="calculation"
                      placeholder=""
                      value={this.state.calculation}
                      onChange={this.handleInput}
                    >
                      <option></option>
                      <option key="combined" value="combined">
                        Combined With
                      </option>
                      <option key="either" value="either">
                        Either
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
            // try this
            https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
            <Alert className="mt-3 result-box" variant="success">
              <h6>Result: </h6>
              {this.state.result}
            </Alert>
            <Button onClick={this.fetchData} variant="primary">
              Calculate
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Calculator;
