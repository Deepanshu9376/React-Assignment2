import React, { useEffect, useState } from "react";
import "./view.css";

import Card from "react-bootstrap/Card";

const View2 = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const finalData = JSON.parse(localStorage.getItem("usersData"));
    setData(finalData);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mb-5">View All Users</h1>
      <div xs={2} md={1} className="row">
        {data?.map((dataSaved, idx) => (
          <div className="col-md-3 mb-4 " key={idx}>
            <Card>
              <Card.Body>
                <Card.Title className="texture">User</Card.Title>
                <div>
                  <strong>Name:-</strong>
                  {dataSaved.name}
                </div>
                <div>
                  <strong>Contact:</strong>
                  {dataSaved.contact}
                </div>
                <div className="col">
                  <strong>Email:</strong> {dataSaved.email}
                </div>
                <div className="col">
                  <strong>Gender:</strong> {dataSaved.gender}
                </div>
                <div className="col">
                  <strong>Category:</strong> {dataSaved.category}
                </div>
                <div className="col">
                  <strong>Technologies:</strong>{" "}
                  {dataSaved.technology.join(", ")}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View2;
