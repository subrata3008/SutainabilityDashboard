import React, { useState, useEffect } from "react";
import "./utility.css";  
import ApiLoader from "../loader/loader"; 

const Utility = () => {
  const [podata, setPodata] = useState('');
  const [carbonData, setCarbonData] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPodata, setIsValidPodata] = useState(true);  
 

  const updateInputValue = (evt) => {
    if(evt.target.value){
      setIsValidPodata(true);
    }
    setPodata(evt.target.value);
  }

  const calculateData = () =>{
    if(podata){
      setIsLoading(true);
      fetch('https://d497jytpn1.execute-api.us-east-1.amazonaws.com/EIS_calculation?PO='+podata)
      .then(data => {
      return data.json();
      })
      .then(post => {
        setIsLoading(false);
      setCarbonData(post.records);
      setIsValidPodata(true)
      console.log(carbonData)
      });
    }else{
      setIsValidPodata(false)
    }
  } 

  return (
    <> 
    <ApiLoader isLoading={isLoading}/>
    <div className="card">
      <div className="podData-wrapper">
        <label>EIS Transport Carbon Calculator: </label>
        <div className="podData-input-wrapper">
       <input type="text" value={podata} onChange={updateInputValue}/>
       {!isValidPodata && <span style={{color:'red'}}>Please enter valid Purchase order data</span>}
        </div>
       <button className="saveBtn calculate" onClick={calculateData}>Calculate</button>
      </div>
       { carbonData && 
       <div className="cartTable">
       <table className="cartableData">
        <tbody>
        <tr>
          <td>CH4</td>
          <td>{carbonData.CH4}</td>
        </tr>
        <tr>
          <td>N2O</td>
          <td>{carbonData.N2O}</td>
        </tr>
        <tr>
          <td>Fuel C02</td>
          <td>{carbonData.fossilFuelCO2+' gC02e/MT'}</td>
        </tr>
        <tr>
          <td>Biogenic C02</td>
          <td>{carbonData.biogenicCO2}</td>
        </tr>
        <tr>
          <td>C02e</td>
          <td>{carbonData.CO2e+'gCO2e/MT'}</td>
        </tr> 
        <tr>
          <td>Quantity</td>
          <td>{carbonData.Quantity}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{carbonData.description}</td>
        </tr>
        </tbody>
       </table>
       </div>
}
    </div>
    </>
  );
};

export default Utility;
