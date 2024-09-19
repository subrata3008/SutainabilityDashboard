import React, { useState } from "react";
import "../matching/matching.css";
import SalesDatatable from "../salesDatatable/salesDatatable";
import ApiLoader from "../loader/loader";
import MatchingSalesDatatable from "../matchingSalesDatatable/matchingSalesDatatable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Matching = () => {
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedSales, setselectedSales] = useState([]);
  const [salesTableData, setSalesTableData] = useState([]);
  const [selectedMatchingSales, setselectedMatchingSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNodata, setIsNodata] = useState(false);
  const items = { ...localStorage };
  let userDataIndex = Object.keys(items).findIndex(e=>e.endsWith('userData')); 
  const loggedInuserName = JSON.parse(items[Object.keys(items)[userDataIndex]])
    .UserAttributes[2].Value; 
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
       
        if(SalesOrderData.message){
          toast.success(SalesOrderData.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
             });          
          setIsLoading(false);
        }else{
        let finalSalesData = SalesOrderData.records.map(
          (eachSalesdata, indx) => {
            eachSalesdata.id = indx;
            return eachSalesdata;
          }
        );
        setSalesTableData(finalSalesData);
        }
        let dataWithBatch = InputCriteriaData.records.filter(
          (eachdata) =>
            eachdata.hasOwnProperty("batch") && eachdata.hasOwnProperty("PO")
        );
        let flag = 0;
        if (dataWithBatch.length > 0) {
          let finalData = dataWithBatch.map((eachbatchData,indx) => {
            return eachbatchData.batch.map((eachBatch, index) => { 
              flag++;
              return {
                id: flag,
                feedStockStype: eachbatchData.FeedStockType || "",
                BatchNo: eachBatch.BatchNo,
                RefineryCertID: eachBatch.RefineryCertID,
                origin: eachBatch.origin,
                quantity: dataWithBatch[indx].LoadedQuantity,
                UoM: eachbatchData.UoM,
                po: eachbatchData.PO,
                Plant: eachbatchData.Plant,
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
      .then((response) => { 
        if(response.ok)
          {
            return response.json();         
          }
    
          toast.error("Internal server error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
             });  
      })
      .then((finalResp) => {
        setIsLoading(false);
        toast.success(finalResp.message, {
          position: "top-right",
          autoClose: 5000,
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
  };

  /**
   * Manual matching API function
   */
  const manualMatching = () => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { 
        'Content-type': 'application/json; charset=UTF-8',
       },
      body: JSON.stringify(
        JSON.stringify(
          {
            salesData111: selectedSales,
            purchaseData: selectedMatchingSales,
            userEmail: loggedInuserName,
          },
          null,
          2
        )
      ),
    };
 
 
    fetch(
        "https://ip07sv5z51.execute-api.us-east-1.amazonaws.com/ManualBioMatching",
        requestOptions
      )
    .then((response) => { 
      if(response.ok)
        {
          return response.json();         
        } 
        toast.error("Internal server error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
           });  
    })
    .then((finalResp) => {
      setIsLoading(false); 
      toast.success(finalResp.message, {
        position: "top-right",
        autoClose: 5000,
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
      //alert("Something went wrong")
      setIsLoading(false);
    });
      
  };

  return (
    <>
    <ToastContainer/>
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

        <div className="matching table-container">
          <SalesDatatable
            salesTableData={salesTableData}
            setselectedSales={setselectedSales}
          />
        </div> 

        <div className="manual-filter-container">
          <span className="saveBtn" onClick={bioMatchingFunc}>
            <i className="fa fa-magic" aria-hidden="true"></i> Auto
          </span>
          <span className="saveBtn" onClick={manualMatching}>
            <i className="fa fa-hand-rock-o" aria-hidden="true"></i> Manual
          </span>
        </div>
        {isNodata && (
          <div className="centerText">
            <span>No data found</span>
          </div>
        )}
        {tableData.length !== 0 && (
          <div className="table-container matchingTable">
            <MatchingSalesDatatable
              salesTableData={tableData}
              isLoading={isLoading}
              setselectedMatchingSales={setselectedMatchingSales}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Matching;
