import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { MdOutlineReviews, MdFavoriteBorder } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiMovie2Line } from "react-icons/ri";
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
    <Container fluid className="p-0">
      <div className="border-start border-dark bg-primary p-3 d-flex text-white justify-content-between align-items-center">
        <span className="fs-4 fw-bold">Dashboard</span>
      </div>
      <Row className="justify-content-center mt-5 p-2">
        <Col xs={12} sm={6} md={4} lg={3} className="gap-2">
          <Card className="dashboard-card">
            <Card.Body>
              <RiMovie2Line size={46}/>
              <Card.Title>Total Movies</Card.Title>
              <Card.Text>{dashboardData.numMovies}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <FiUsers size={46}/>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{dashboardData.numUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <MdOutlineReviews size={46} />
              <Card.Title>Total Reviews</Card.Title>
              <Card.Text>{dashboardData.numReviews}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <MdFavoriteBorder size={46}/>
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
