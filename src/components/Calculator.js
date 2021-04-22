import React, { Component } from "react";
import { Container, Card, Button, Form, Col } from "react-bootstrap";
import ResultAlert from "./ResultAlert";

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: { value: "", isInvalid: false },
      number2: { value: "", isInvalid: false },
      calculation: "combined", // force default value
      result: "",
    };
    this.baseState = this.state; // preserve original state
  }

  fetchCalculation = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number1: this.state.number1.value,
        number2: this.state.number2.value,
      }),
    };

    console.log(this.state);

    const res = await fetch(
      `http://localhost:8080/calc/${this.state.calculation}`,
      options
    );

    const data = await res.json();
    console.log(data);
    this.setState({
      result: data.result,
    });
  };

  handleInput = (event) => {
    const value = event.target.value;
    const target = event.target.id; // using id instead of setting an explicit "name" on each input
    let isInvalid;
    if (value < 0 || value > 1) isInvalid = true;
    else isInvalid = false;
    this.setState({ [target]: { value: value, isInvalid: isInvalid } });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.number1.isInvalid || this.state.number2.isInvalid) {
      console.log("Part of the form is invalid");
    } else {
      console.log("Form is ready for submitting");
      this.fetchCalculation();
    }
  };

  resetForm = () => {
    this.setState(this.baseState);
  };

  render() {
    return (
      <Container>
        <Card bg="light" text="dark">
          <Card.Header>
            <h4>Probability Calculator</h4>
          </Card.Header>
          <Card.Body>
            <p>Values 0 to 1 e.g. 0.5 is valid while 1.1 or -0.1 is invalid</p>
            <Form
              // noValidate
              // validated={this.state.isValid}
              onSubmit={this.handleSubmit}
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
                      value={this.state.number1.value}
                      onChange={this.handleInput}
                      isInvalid={this.state.number1.isInvalid}
                    />
                    <Form.Control.Feedback type="invalid">
                      The number you entered is outside of the acceptable range.
                    </Form.Control.Feedback>
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
                      value={this.state.number2.value}
                      onChange={this.handleInput}
                      isInvalid={this.state.number2.isInvalid}
                    />
                    <Form.Control.Feedback type="invalid">
                      The number you entered is outside of the acceptable range.
                    </Form.Control.Feedback>
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
                      value={this.state.calculation}
                      onChange={(e) =>
                        this.setState({ calculation: e.target.value })
                      }
                    >
                      <option label="Combined With" value="combined" />
                      <option label="Either" value="either" />
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Button
                disabled={
                  this.state.number1.isInvalid || this.state.number2.isInvalid
                    ? true
                    : false
                }
                type="submit"
                variant="primary"
              >
                Calculate
              </Button>
              <Button
                className="ml-2"
                variant="secondary"
                onClick={this.resetForm}
              >
                Reset
              </Button>
            </Form>
            <ResultAlert result={this.state.result} />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Calculator;
