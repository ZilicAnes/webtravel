import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const TripHistoryPage = () => {
  const [pastTrips, setPastTrips] = useState([]);

  useEffect(() => {
    const fetchPastTrips = async () => {
      try {
        var token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:3000/api/trips/past/trips',
        { headers: { Authorization: `Bearer ${token}` } });
        console.log(response);
        setPastTrips(response.data);
      } catch (error) {
        console.error('Error fetching past trips:', error);
      }
    };

    fetchPastTrips();
  }, []);

  return (
    <div>
      <h1>Past Trips</h1>
      <Row>
        {pastTrips.map(trip => (
          <Col key={trip._id} lg={4} md={6} sm={12} className="mb-4">
            <Card>
              <Card.Img variant="top" src={trip.destinationImage} alt={trip.title} />
              <Card.Body>
                <Card.Title>{trip.title}</Card.Title>
                <Card.Text>{trip.description}</Card.Text>
                <Card.Text>Category: {trip.category}</Card.Text>
                <Card.Text>Start Date: {new Date(trip.startDate).toLocaleDateString()}</Card.Text>
                <Card.Text>End Date: {new Date(trip.endDate).toLocaleDateString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TripHistoryPage;
