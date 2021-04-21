import React, { Component } from "react";
import { Container, Card, Button, Form, Col, Alert } from "react-bootstrap";

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: "",
      number2: "",
      algorithm: "",
      result: "",
      isValid: false,
      dropdown: [
        {
          label: "Combined With",
          value: "combinedWith",
        },
        {
          label: "Either",
          value: "either",
        },
      ],
    };
  }

  handleInput = (event) => {
    const value = event.target.value;
    const target = event.target.id.toLowerCase(); // using id instead of setting an explicit "name" on each input
    this.setState({
      ...this.state,
      [target]: value,
    });
  };

  handleCombinedWith = () => {
    return parseFloat(this.state.number1) * parseFloat(this.state.number2);
  };

  handleEither = () => {
    const number1 = parseFloat(this.state.number1);
    const number2 = parseFloat(this.state.number2);
    const result = number1 + number2 - number1 * number2;
    return result;
  };

  handleValidation = (event) => {
    // Checks to see if the form has all the correct inputs
    const form = event.currentTarget;
    if (form.checkValidity()) {
      this.setState({
        isValid: true,
      });
      return true;
    }
  };

  calculate = (event) => {
    event.preventDefault();

    if (this.handleValidation(event)) {
      // replace this case statement with a dictionary
      switch (this.state.algorithm) {
        case "combinedWith":
          this.setState({
            result: this.handleCombinedWith(),
          });
          break;
        case "either":
          this.setState({
            result: this.handleEither(),
          });
          break;
        default:
          break;
      }
    } else {
      // if form is not valid, reset result
      this.setState({
        result: "",
      });
    }
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
                  <Form.Group controlId="algorithm">
                    <Form.Label>Algorithm</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="algorithm"
                      placeholder=""
                      value={this.state.algorithm}
                      onChange={this.handleInput}
                    >
                      <option key="" value=""></option>
                      {this.state.dropdown.map((algorithm) => (
                        <option key={algorithm.value} value={algorithm.value}>
                          {algorithm.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
            <Alert className="mt-3 result-box" variant="success">
              <h6>Result: </h6>
              {this.state.result}
            </Alert>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Calculator;