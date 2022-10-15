const express = require("express");
const bodyparser = require("body-parser");
const getdbConnect = require("./connectdb");
const uuid = require("uuid");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyparser.json()); // to support JSON-encoded bodies

const port = 3030;

getdbConnect.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to db ");
  //Create data
  app.post("/create", (req, res) => {
    var uid = uuid.v1();
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;

    var query = "insert into contact values ?";
    var values = [[address, city, state, zip, uid]];
    console.log(values);
    getdbConnect.query(query, [values], (err, res) => {
      if (err) {
        throw err;
      }
      console.log("inserted... ");
    });
    res.status(200);
    res.send();
  });

  // Get data from DB
  app.get("/getdata", (req, res) => {
    var get = "select * from contact";
    getdbConnect.query(get, (err, result) => {
      if (err) {
        console.log(err.sqlMessage());
        throw err;
      }

      //get query if search function is active
      const { q } = req.query;
      const keys = ["address", "uid", "state"];
      const search = (data) => {
        return data.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(q))
        );
      };

      q ? res.json(search(result)) : res.json(result);
    });
  });

  //delete data
  app.delete("/delete/:uid", (req, res) => {
    var uid = req.params.uid;
    console.log(uid);
    var dlt = "Delete from contact where uid = ?";
    var value = [[uid]];
    if (uid != null) {
      getdbConnect.query(dlt, value, (err, result) => {
        if (err) {
          res.status(404).send();
        }
        console.log("data deleted " + uid);
        res.status(200).send();
      });
    } else {
      res.status(404).send();
    }
  });
  //get data with uid
  app.get("/getuid/:uid", (req, res) => {
    var uid = req.params.uid;
    var getbyid = "select * from contact where uid = ?";
    var value = [uid];
    getdbConnect.query(getbyid, value, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404);
      }
      console.log("fetched..... uid " + uid);
      res.json(data);
    });
  });

  //Update data
  app.put("/update", (req, resp) => {
    var uid = req.body.uid;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    console.log(address, city, state, zip, uid);

    console.log(uid);
    var values = [address, city, state, zip, uid];
    var put =
      "update contact set address = ?, city = ?, state = ?, zip = ? where uid = ?";

    getdbConnect.query(put, values, (err, res) => {
      if (err) {
        throw err;
        resp.status(404).send();
      }

      console.log("updated.... ");
      resp.status(200);
      resp.send();
    });
  });

  app.listen(port, () => {
    console.log("server started....");
  });
});
