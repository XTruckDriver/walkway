"use client";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

interface JourneyProps {
  distance: number | null;
  steps: number;
  calories: number;
  time: string | null;
}

interface JourneyData {
  journeyData: JourneyProps;
}

const TravelData: React.FC<JourneyData> = ({ journeyData }) => {
  const [metric, setMetric] = useState(true);
  const [standard, setStandard] = useState(false);

  const handleMetric = () => {
    setMetric(true);
    setStandard(false);
  };

  const handleStandard = () => {
    setMetric(false);
    setStandard(true);
  };

  return (
    <>
      <Form>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="metric"
            label="Metric"
            checked={metric}
            onChange={handleMetric}
          />

          <Form.Check
            type="radio"
            label="Standard"
            id="standard"
            checked={standard}
            onChange={handleStandard}
          />
        </div>
      </Form>
      <Table striped bordered hover style={{ width: "300px" }}>
        <thead>Your Journey:</thead>
        <tbody>
          <tr>
            <td>
              Distance {metric && <>(km)</>}
              {standard && <>(mi)</>}
            </td>
            <td>
              {metric && journeyData.distance}
              {standard && (journeyData.distance * 0.621371).toFixed(1)}
            </td>
          </tr>
          <tr>
            <td>Steps</td>
            <td>{journeyData.steps}</td>
          </tr>
          <tr>
            <td>Calories</td>
            <td>{journeyData.calories}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{journeyData.time}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TravelData;
