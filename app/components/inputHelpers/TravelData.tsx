"use client";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

interface JourneyProps {
  distance: number;
  steps: number;
  calories: number;
  time: string;
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
    <div className="mt-4">
      <Form>
        <div className="mb-1 mt-2">
          <h5>
            <strong>Your Journey:</strong>
          </h5>
          <Form.Check
            inline
            type="radio"
            id="metric"
            label="Metric"
            checked={metric}
            onChange={handleMetric}
          />

          <Form.Check
            inline
            type="radio"
            label="Standard"
            id="standard"
            checked={standard}
            onChange={handleStandard}
          />
        </div>
      </Form>
      <Table striped bordered hover style={{ width: "300px" }}>
        <tbody>
          <tr>
            <td>
              Distance {metric && <>(km)</>}
              {standard && <>(mi)</>}
            </td>
            <td>
              {metric &&
                journeyData.distance.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
              {standard &&
                (journeyData.distance * 0.621371).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
            </td>
          </tr>
          <tr>
            <td>Steps</td>
            <td>{journeyData.steps.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Calories</td>
            <td>{journeyData.calories.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{journeyData.time}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TravelData;
