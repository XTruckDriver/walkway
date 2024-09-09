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

  // const handleFormSubmit = (startingCity: string, destination: string) => {
  //   const journey: JourneyData = {
  //     distance: 1,
  //     steps: 2,
  //     calories: 3,
  //     time: 4,
  //   };
  //   setJourneyData(journey);
  //   // setStartInput(startingCity);
  //   // setFinishInput(destination);
  //   console.log(
  //     `${startingCity} -> ${destination} Click inside of Input component`
  //   );
  // };

  return (
    <div className="col-md-4">
      <SearchForm setStart={setStart} setFinish={setFinish} />
      {journeyData && <TravelData journeyData={journeyData} />}
    </div>
  );
};

export default Input;
