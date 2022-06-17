import { useState } from "react";
// import updatedCodesLocations from "../constant/updatedCodesLocations";
import updatedCodesLocations from "../constant/singleNameCombined";


const AirportList = ({ text, state }) => {
  // We've got text, let's do something with it
  let airportTextCheck = updatedCodesLocations.filter((element, index) => {
    // if text only has two characters, fail it
    if (text.length < 3) {
      return false;
    }
    // Easy. Check if the airport name in skyscannerNameWithCode
    return (
      element.skyscannerNameWithCode
        .toLowerCase()
        .includes(text.toLowerCase()) ||
      element.location.toLowerCase().includes(text.toLowerCase())
    );
  });
  airportTextCheck.sort((a,b) => {return a.skyscannerNameWithCode.length - b.skyscannerNameWithCode.length})
  console.log(airportTextCheck);
  return (
    <>
      {airportTextCheck.map((airport, index) => {
        return (
          <>
            <a onClick={() => state(airport.skyscannerNameWithCode)}>
              {airport.skyscannerNameWithCode}
            </a>
          </>
        );
      })}
      {(airportTextCheck.length === 0 && text.length > 3) && <a>❌❌❌❌❌❌</a>}
      {(airportTextCheck.length === 0 && text.length < 3) && <a>Please type more than three characters</a>}
    </>
  );
};

export default AirportList;