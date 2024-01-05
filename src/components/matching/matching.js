import React, { useState } from "react";
import "../matching/matching.css";
import DatatableComp from "../datatable/datatable";

const Matching = () => {
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const callInputcriteria = () => {
    const finalUrl = !(monthValue && yearValue)
      ? "https://jca5zw5ei2.execute-api.us-east-1.amazonaws.com/InputCriteria"
      : "https://jca5zw5ei2.execute-api.us-east-1.amazonaws.com/InputCriteria?year=" +
        yearValue +
        "&month=" +
        monthValue;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((finalResp) => {
        debugger
        let dataWithBatch = finalResp.records.filter((eachdata) =>
          eachdata.hasOwnProperty("batch")
        );
        let finalData = dataWithBatch.map((eachbatchData) => {
          return eachbatchData.batch.map((eachBatch) => {
            return {
              feedStockStype: !eachbatchData.FeedStockType
                ? ""
                : eachbatchData.FeedStockType,
              //.length > 1 ? eachbatchData.FeedStockType.join(): eachbatchData.FeedStockType,
              BatchNo: eachBatch.BatchNo,
              CertID: eachBatch.CertID,
              origin: eachBatch.origin,
              quantity: eachBatch.quantity,
            };
          });
        });
        setIsLoading(false);
        setTableData(finalData.flat(Infinity));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
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
        <span className="saveBtn" onClick={callInputcriteria}>
          Filter
        </span>
      </div>

      <div className="table-container">
        <table className="sale-details">
          <tr>
            <th>
              <span style={{ color: "#67BC2A" }}>Sales Order</span>
            </th>
            <th>Sales Order Number</th>
            <th>Sales Date</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit of Measures</th>
            <th>Price</th>
            <th>Delivery Address - City</th>
          </tr>
          <tbody>
            <tr>
              <td></td>
              <td>213123123</td>
              <td>11/02/2023</td>
              <td>XYZ</td>
              <td>XYZ</td>
              <td>XYZ</td>
              <td>MT</td>
              <td>XYZ</td>
              <td>Houston, TX</td>
            </tr>
          </tbody>
        </table>
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
        <span className="saveBtn">
          <i className="fa fa-magic" aria-hidden="true"></i> Auto
        </span>
        <span className="saveBtn">
          <i className="fa fa-hand-rock-o" aria-hidden="true"></i> Manual
        </span>
      </div>
      {tableData.length !==0 && (
        <div className="table-container">
          <DatatableComp tableData={tableData} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Matching;
