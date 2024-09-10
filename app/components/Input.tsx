"use client";
import React, { useState } from "react";
import TravelData from "./inputHelpers/TravelData";
import SearchForm from "./inputHelpers/SearchForm";

interface InputProps {
  setStart: React.Dispatch<React.SetStateAction<string>>;
  setFinish: React.Dispatch<React.SetStateAction<string>>;
}

interface JourneyData {
  distance: number;
  steps: number;
  calories: number;
  time: string;
}

const Input: React.FC<InputProps> = ({ setStart, setFinish }) => {
  const [journeyData, setJourneyData] = useState<JourneyData | null>(null);

  return (
    <div className="col-md-4">
      <SearchForm setStart={setStart} setFinish={setFinish} />
      {journeyData && <TravelData journeyData={journeyData} />}
    </div>
  );
};

export default Input;
