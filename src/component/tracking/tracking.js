import React, { useState } from "react";
import "../tracking/tracking.css";
import ApiLoader from "../loader/loader";
import TrackingDatatable from "../trackingDatatable/trackingDatatable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tracking = () => {
  const [selectedDatas, setselectedSales] = useState(null);
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [trackTableData, setTtrackTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  /**
   * Generate Pos method
   */
  const generateReport = () => {
    setIsLoading(true);
    const { SalesOrder, SalesOrderItem } = selectedDatas;
    const url = "https://ke8tbgj9g6.execute-api.us-east-1.amazonaws.com/certificate_header_qldb?SalesOrder=" + SalesOrder + "&SalesOrderItem=" + SalesOrderItem;
    const data = fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } 
        toast.error("Internal server error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .then((reporData) => {
        setIsLoading(false);
        toast.success(reporData.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }



  /**
   * Tracking table api function
   */
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
        if (InputCriteriaData.message) {
          toast.success(InputCriteriaData.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsLoading(false);
        } else {
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
      <ToastContainer />
      <ApiLoader isLoading={isLoading} />
      <div className="top-section-container">
        <div className="date-filter-container">
          <div className="filterOptionsTop">
            <span>Month:</span>
            <input
              type="text"
              aria-label="Month"
              onChange={(ev) => setMonthValue(ev.target.value)}
            />
          </div>
          <div className="filterOptionsTop">
            <span>Year:</span>
            <input type="text"
              aria-label="Year"  onChange={(e) => setYearValue(e.target.value)} />
          </div>
          <button className="saveBtn" alt="Filter" onClick={() => callTrackingTableData()}>
            Filter
          </button>
        </div>

        <div className="table-container">
          <TrackingDatatable
            trackTableData={trackTableData}
            setselectedSales={setselectedSales}
          />
        </div>
        {trackTableData.length > 1 &&
          <div className="reportBtn-container">
            <button className="saveBtn generateBtn" alt="Generate PoS" onClick={generateReport}>
              <i className="fa fa-file-excel-o" aria-hidden="true"></i> Generate PoS
            </button>
          </div>
        }
      </div>
    </>
  );
};

export default Tracking;
