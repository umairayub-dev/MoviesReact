import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/Auth/AuthContext";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    numFavorites: 0,
    numReviews: 0,
    numMovies: 0,
  });
  const { state } = useContext(AuthContext);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get(
          "https://victorious-lion-clothes.cyclic.cloud/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${state?.token}`,
            },
          }
        );
        const data = response.data;
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <Container fluid>
        <div className="border-start border-dark bg-primary p-3 d-flex text-white justify-content-between align-items-center">
        <span className="fs-4 fw-bold">Movies</span></div>
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Movies</Card.Title>
              <Card.Text>{dashboardData.numMovies}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{dashboardData.numUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Reviews</Card.Title>
              <Card.Text>{dashboardData.numReviews}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Total Favorites</Card.Title>
              <Card.Text>{dashboardData.numFavorites}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
