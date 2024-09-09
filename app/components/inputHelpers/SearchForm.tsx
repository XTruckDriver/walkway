"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

interface SearchFormProps {
  setStart: React.Dispatch<React.SetStateAction<string>>;
  setFinish: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ setStart, setFinish }) => {
  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");
  const [formIncomplete, setFormIncomplete] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pointA || !pointB) {
      setFormIncomplete(true);
      return;
    }
    console.log(`SearchForm: pointA = ${pointA} pointB = ${pointB}`);
    setFormIncomplete(false);
    setStart(pointA);
    setFinish(pointB);
  };

  const handlePointAChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPointA(e.target.value);
  };

  const handlePointBChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPointB(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          className="search"
          placeholder="Enter starting city"
          value={pointA}
          onChange={handlePointAChange}
        />
      </div>
      <div>
        <input
          type="text"
          className="search"
          placeholder="Enter destination"
          value={pointB}
          onChange={handlePointBChange}
          style={{ marginTop: "16px" }}
        />
      </div>
      {formIncomplete && (
        <p style={{ color: "red" }}>Please fill out both fields.</p>
      )}
      <Button
        className="searchBtn"
        type="submit"
        variant="outline-success"
        style={{ marginBottom: "40px " }}
      >
        Go
      </Button>
    </Form>
  );
};

export default SearchForm;
