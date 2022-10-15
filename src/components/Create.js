import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Edit from "./Edit";
function Create() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = JSON.stringify({
    address: address,
    city: city,
    state: state,
    zip: zip,
  });
  const createUser = (e) => {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:3030/create", data, axiosConfig).then(
        (response) => {
          console.log(response.data);
          if (response.status == 200) {
            resolve(response.status);
            window.location.reload();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return (
    <Container fluid="sm">
      <Form
        style={{
          width: 900,
          margin: "auto",
          padding: 17,
          border: "2px solid black",
          marginTop: 10,
        }}
        method="post"
      >
        <FormGroup>
          <Label for="exampleAddress">Address</Label>
          <Input
            id="exampleAddress"
            name="address"
            placeholder="1234 Main St"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleCity">City</Label>
              <Input
                id="exampleCity"
                name="city"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleState">State</Label>
              <Input
                id="exampleState"
                name="state"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleZip">Zip</Label>
              <Input
                id="exampleZip"
                name="zip"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button
          onClick={(e) =>
            createUser(e).then((success) => {
              console.log(success);
            })
          }
        >
          Submit
        </Button>
      </Form>
      <Home />
    </Container>
  );
}

export default Create;
