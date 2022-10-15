import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";

export default function Home() {
  var [datalist, setData] = useState([]);
  const [dataperPage] = useState(3);
  const [currentPage, setcurrentPage] = useState(1);
  var [search, setSearch] = useState("");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const getData = () => {
    axios.get(`http://localhost:3030/getdata/?q=${search}`).then(
      (response) => {
        setData(response.data);
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const deleteData = (_id) => {
    console.log(_id);
    var data = JSON.stringify({
      data: _id,
    });
    console.log(data);
    axios.delete(`http://localhost:3030/delete/${_id}`).then((res) => {
      if (res.status == 200) {
        console.log(res);
        alert("Data Deleeted" + _id);
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    getData();
  }, [search]);

  const indexofLastdata = dataperPage * currentPage;
  const indexofFirstdata = indexofLastdata - dataperPage;
  var currentData = datalist.slice(indexofFirstdata, indexofLastdata);

  const dataset = [];
  console.log(datalist.length);
  for (let i = 1; i <= Math.ceil(datalist.length / dataperPage); i++) {
    dataset.push(i);
  }
  const paginate = (value) => {
    setcurrentPage(value);
  };

  return (
    <Container>
      <div
        className="mb-3"
        style={{ width: 900, margin: "auto", marginTop: 10 }}
      >
        <input
          type="text"
          id="city"
          className="form-control"
          placeholder="Search here.."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table
        hover
        style={{
          width: 900,
          margin: "auto",
          border: "2px solid black",
          marginTop: 5,
          padding: 18,
        }}
      >
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentData ? (
            currentData.map((data) => (
              <tr key={data.uid}>
                <td>{data.uid}</td>
                <td>{data.address}</td>
                <td>{data.city}</td>
                <td>{data.state}</td>
                <td>{data.zip}</td>
                <td>
                  <Button
                    style={{ padding: 4, width: 90 }}
                    color="primary"
                    tag="a"
                    onClick={(e) => deleteData(data.uid)}
                  >
                    <i className="bi bi-trash3-fill">&nbsp; Delete</i>
                  </Button>
                </td>
                <td>
                  <Button
                    style={{ padding: 4, width: 90 }}
                    color="primary"
                    tag="a"
                    href={`/edit/${data.uid}`}
                  >
                    <i className="bi bi-pencil-square">&nbsp;Edit</i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <>data not found</>
          )}
        </tbody>
      </Table>
      <Pagination
        aria-label="Page navigation example"
        style={{ marginLeft: 185, marginTop: 10 }}
      >
        {dataset.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink onClick={(e) => paginate(num)}>
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </Container>
  );
}
