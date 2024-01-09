import React, {  useState } from "react";
import "../matching/matching.css";
import DatatableComp from "../datatable/datatable";
import SalesDatatable from "../salesDatatable/salesDatatable";
import ApiLoader from "../loader/loader";

const Matching = () => {
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedSales, setselectedSales] = useState([]);
  const [salesTableData, setSalesTableData] = useState([]);  
  const [isLoading, setIsLoading] = useState(false);
  const [isNodata, setIsNodata] = useState(false);

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
    //fetch(finalUrl)
    Promise.all([InputCriteria, SalesOrder])
      .then(([InputCriteriaData, SalesOrderData]) => {
        let finalSalesData = SalesOrderData.records.map((eachSalesdata,indx)=>{
          eachSalesdata.id=indx;
          return eachSalesdata;
        })
        setSalesTableData(finalSalesData);
        let dataWithBatch = InputCriteriaData.records.filter(
          (eachdata) =>
            eachdata.hasOwnProperty("batch") && eachdata.hasOwnProperty("PO")
        );
        if (InputCriteriaData.records.length > 0) {
          let finalData = dataWithBatch.map((eachbatchData) => {
            return eachbatchData.batch.map((eachBatch,index) => {
              return {
                id: index,
                feedStockStype: !eachbatchData.FeedStockType
                  ? ""
                  : eachbatchData.FeedStockType,
                //.length > 1 ? eachbatchData.FeedStockType.join(): eachbatchData.FeedStockType,
                BatchNo: eachBatch.BatchNo,
                CertID: eachBatch.CertID,
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
        
        console.log(salesTableData)
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const bioMatchingFunc = () =>{
   setIsLoading(true);
   const  {SalesOrder,Material} = selectedSales[0];
   fetch('https://jcdz88g56j.execute-api.us-east-1.amazonaws.com/SalesOrder_data_bioMatching_sf?salesordernumber=+'+ SalesOrder +'&product=+'+ Material)
   .then(response=>response.json())
   .then(finalResp=>{
    setIsLoading(false);
    alert(finalResp.message);
   })
   .catch(err=>{
    console.log(err);
   })
  }
 
  return (
    <>
    <ApiLoader isLoading={isLoading}/>
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
        <SalesDatatable
         salesTableData={salesTableData}
         setselectedSales={setselectedSales}/>
      </div>
      <div className="filter-container">
        <div className="top-block">
          <div className="preset-section">
            <span>Preset Search</span>
            <select>
              <option>All supplied</option>
            </select>
            <span className="saveBtn">Search</span>
            <span className="searchBtn">Save</span>
          </div>
        </div>

        <div className="bottom-block">
          <div className="filterOptions">
            <span className="quantity">Has Free Quantity</span>
            <select>
              <option>All supplied</option>
            </select>
          </div>
          <div className="filterOptions">
            <span>Deal Number</span>
            <input type="text" />
          </div>
          <div className="filterOptions">
            <span>Allocation Pool</span>
            <input type="text" />
          </div>
          <div className="filterOptions">
            <span>Transport Mode</span>
            <input type="text" />
          </div>
          <div className="filterOptions">
            <span>Options</span>
            <input type="text" />
          </div>
          <div className="filterOptions">
            <span>Size</span>
            <input type="text" />
          </div>
          <div className="filterOptions">
            <span>Start Date</span>
            <input type="text" />
          </div>
          <div className="filterOptions">
            <span>End Date</span>
            <input type="text" />
          </div>
        </div>
      </div>

      <div className="manual-filter-container">
        <span className="saveBtn" onClick={bioMatchingFunc}>
          <i className="fa fa-magic" aria-hidden="true"></i> Auto
        </span>
        <span className="saveBtn">
          <i
            className="fa fa-hand-rock-o"
            aria-hidden="true"
            onClick={() => callInputcriteria("manual")}
          ></i>{" "}
          Manual
        </span>
      </div> 
      {isNodata && (
        <div className="centerText">
          <span>No data found</span>
        </div>
      )}
      {tableData.length !== 0 && (
        <div className="table-container">
          <DatatableComp tableData={tableData} isLoading={isLoading} />
        </div>
      )}
    </div>
    </>
  );
};

export default Matching;
