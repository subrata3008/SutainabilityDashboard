import React, { useState } from "react";
import "../tracking/tracking.css"; 
import ApiLoader from "../loader/loader"; 
import TrackingDatatable from "../trackingDatatable/trackingDatatable";

const Tracking = () => {
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedSales, setselectedSales] = useState([]);
  const [salesTableData, setSalesTableData] = useState([]);
  const [selectedMatchingSales, setselectedMatchingSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNodata, setIsNodata] = useState(false);
  const items = { ...localStorage };
  const loggedInuserName = JSON.parse(items[Object.keys(items)[1]])
    .UserAttributes[2].Value;
    console.log(JSON.parse(items[Object.keys(items)[1]])
    .UserAttributes);
  console.log(loggedInuserName);
  const callInputcriteria = (type) => {
    setTableData([]);
    setSalesTableData([]);
    setIsLoading(true);
    const InputCriteriaUrl = !(monthValue && yearValue)
      ? "https://jca5zw5ei2.execute-api.us-east-1.amazonaws.com/InputCriteria"
      : "https://jca5zw5ei2.execute-api.us-east-1.amazonaws.com/InputCriteria?year=" +
        yearValue +
        "&month=" +
        monthValue;
    const SalesOrderUrl = !(monthValue && yearValue)
      ? "https://jcdz88g56j.execute-api.us-east-1.amazonaws.com/SalesOrder_data_bioMatching"
      : "https://jcdz88g56j.execute-api.us-east-1.amazonaws.com/SalesOrder_data_bioMatching?year=" +
        yearValue +
        "&month=" +
        monthValue;
    const InputCriteria = fetch(InputCriteriaUrl).then((response) =>
      response.json()
    );
    const SalesOrder = fetch(SalesOrderUrl).then((response) => response.json());
    Promise.all([InputCriteria, SalesOrder])
      .then(([InputCriteriaData, SalesOrderData]) => {
        let finalSalesData = SalesOrderData.records.map(
          (eachSalesdata, indx) => {
            eachSalesdata.id = indx;
            return eachSalesdata;
          }
        );
        setSalesTableData(finalSalesData);
        let dataWithBatch = InputCriteriaData.records.filter(
          (eachdata) =>
            eachdata.hasOwnProperty("batch") && eachdata.hasOwnProperty("PO")
        );
        let flag = 0;
        if (dataWithBatch.length > 0) {
          let finalData = dataWithBatch.map((eachbatchData) => {
            return eachbatchData.batch.map((eachBatch, index) => {
              flag++;
              return {
                id: flag,
                feedStockStype: eachbatchData.FeedStockType || "",
                BatchNo: eachBatch.BatchNo,
                RefineryCertID: eachBatch.RefineryCertID,
                origin: eachBatch.origin,
                quantity: eachBatch.quantity,
                UoM: eachbatchData.UoM,
                po: eachbatchData.PO,
                POdate: eachbatchData.POdate,
                POItem: eachbatchData.POItem,
                carbonIntensity: eachBatch.carbonIntensity,
              };
            });
          });
          setIsNodata(false);
          setTableData(finalData.flat(Infinity));
          setSalesTableData(SalesOrderData.records);
        } else {
          setIsNodata(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const bioMatchingFunc = () => {
    setIsLoading(true);
    const { SalesOrder, Material } = selectedSales;
    fetch(
      "https://jcdz88g56j.execute-api.us-east-1.amazonaws.com/SalesOrder_data_bioMatching_sf?salesordernumber=+" +
        SalesOrder +
        "&product=+" +
        Material
    )
      .then((response) => response.json())
      .then((finalResp) => {
        setIsLoading(false);
        alert(finalResp.message);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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
          <span className="saveBtn" onClick={() => callInputcriteria("filter")}>
            Filter
          </span>
        </div>

        <div className="table-container">
          <TrackingDatatable
            salesTableData={salesTableData}
            setselectedSales={setselectedSales}
          />
        </div> 
      </div>
    </>
  );
};

export default Tracking;
