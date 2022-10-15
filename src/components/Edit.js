import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
export default function Edit() {
  const { uid } = useParams();
  const history = useHistory();
  console.log("uid" + uid);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [contact, setContact] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3030/getuid/${uid}`).then((response) => {
      setContact(response.data);
      console.log(response);
    });
  }, []);

  const editData = (e) => {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const data = JSON.stringify({
      uid: uid,
      address: address,
      city: city,
      state: state,
      zip: zip,
    });
    console.log(address, city, state, zip);

    axios.put("http://localhost:3030/update", data, axiosConfig).then((res) => {
      console.log(res);
      if (res.status == 200) {
        alert("data updated");
        history.push("/");
        window.location.reload();
      }
    });
  };

  return (
    <Row>
      <Col
        className="bg-light border"
        md={{
          offset: 3,
          size: 6,
        }}
        sm="12"
      >
        {contact ? (
          contact.map((data) => (
            <Form key={data.uid}>
              <legend>Edit Address Data</legend>
              <div className="mb-3">
                <label htmlFor="disabledTextInput" className="form-label">
                  Unique Id
                </label>
                <input
                  type="text"
                  id="disabledTextInput"
                  className="form-control"
                  value={uid}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  placeholder="Address"
                  defaultValue={data.address}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="City" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  placeholder="City"
                  defaultValue={data.city}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="State" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="form-control"
                  placeholder="State"
                  //   onChange={(e) => {
                  //     setState(e.target.value);
                  //   }}
                  defaultValue={data.state}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  className="form-control"
                  placeholder="Zip"
                  //   onBlur={(e) => {
                  //     setZip(e.target.value);
                  //   }}
                  defaultValue={data.zip}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginBottom: 10, width: "100%" }}
                onClick={(e) => editData(e)}
              >
                Submit
              </button>
            </Form>
          ))
        ) : (
          <h2>No Data</h2>
        )}
      </Col>
    </Row>
  );
}
