import React, { useState } from "react";
import "../tracking/tracking.css"; 
import ApiLoader from "../loader/loader"; 
import TrackingDatatable from "../trackingDatatable/trackingDatatable";

const Tracking = () => {
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState(""); 
  const [trackTableData, setTtrackTableData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);  

  
  const callTrackingTableData = () => { 
    setTtrackTableData([]);
    setIsLoading(true);
    const InputCriteriaUrl = !(monthValue && yearValue)
      ? "https://e9jn3dpild.execute-api.us-east-1.amazonaws.com/BioMatchingTracing_processor"
      : "https://e9jn3dpild.execute-api.us-east-1.amazonaws.com/BioMatchingTracing_processor?year=" +
        yearValue +
        "&month=" +
        monthValue;
    
    const InputCriteria = fetch(InputCriteriaUrl).then((response) =>
      response.json()
    ); 
    Promise.all([InputCriteria])
      .then(([InputCriteriaData]) => {
        if(InputCriteriaData.message){
          alert(InputCriteriaData.message);
          setIsLoading(false);
        }else{
          let finalSalesData = InputCriteriaData.records.map(
            (eachSalesdata, indx) => {
              eachSalesdata.id = indx;
              return eachSalesdata;
            }
          );
          setTtrackTableData(finalSalesData);        
          setIsLoading(false); 
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  return (
    <>
      <ApiLoader isLoading={isLoading} />
      <div className="top-section-container">
        <div className="date-filter-container">
          <div className="filterOptionsTop">
            <span>Month:</span>
            <input
              type="text"
              onChange={(ev) => setMonthValue(ev.target.value)}
            />
          </div>
          <div className="filterOptionsTop">
            <span>Year:</span>
            <input type="text" onChange={(e) => setYearValue(e.target.value)} />
          </div>
          <span className="saveBtn" onClick={() => callTrackingTableData()}>
            Filter
          </span>
        </div>

        <div className="table-container">
          <TrackingDatatable
            trackTableData={trackTableData}
            //setselectedSales={setselectedSales}
          />
        </div> 
      </div>
    </>
  );
};

export default Tracking;
