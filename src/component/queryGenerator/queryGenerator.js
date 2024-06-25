import React, { useState } from "react";
import "./queryGenerator.css";
import ApiLoader from "../loader/loader";

const QueryGenerator = () => {
  const [podata, setPodata] = useState(""); 
  const [kbaseData, setKbaseData] = useState("");
  

  const [isLoading, setIsLoading] = useState(false);
  const [isValidPodata, setIsValidPodata] = useState(true);

  const updateInputValue = (evt) => {
    if (evt.target.value) {
      setIsValidPodata(true);
    }
    setPodata(evt.target.value);
  };

  /**
   * Generate rule function
   *
   */
  const generateRules = () => {
    if (podata) {
      setIsLoading(true);
      const requestPostOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //mode: "no-cors",
        body: JSON.stringify(
          JSON.stringify(
            {
              prompt: podata,
            },
            null,
            2
          )
        ),
      };
      const brgUrl =
        "https://kttaoqm5o8.execute-api.us-east-1.amazonaws.com/genAI-BusinessRules-updater";
      fetch(brgUrl, requestPostOptions)
        .then((data) => {
         
          return data.json();
        })
        .then((data) => { 
          setKbaseData((data.kbase || "No response found" ));
          setIsLoading(false);
          setIsValidPodata(true);  
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsValidPodata(false);
    }
  };
  
 

  return (
    <>
      <ApiLoader isLoading={isLoading} />
      
      <div className="card">
        <div className="generateData-wrapper">
          <label className="calLabel">Questions: </label>
          <div className="podData-input-wrapper">
            <textarea
              className="questions"
              rows="5"
              cols="70"
              type="text"
              value={podata}
              onChange={updateInputValue}
            />
            {!isValidPodata && (
              <span style={{ color: "red" }}>
                Please enter valid Question
              </span>
            )}
          </div>
          <button className="saveBtn generate" onClick={generateRules}>
            Generate response
          </button>
          {kbaseData && <p className="kbaseText">{kbaseData}</p>}
        </div> 
      </div>
    </>
  );
};

export default QueryGenerator;
