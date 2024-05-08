import React, { useState } from "react";
import "./businessRuleGenerator.css";  
import ApiLoader from "../loader/loader"; 

const BusinessRuleGenerator = () => {
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

  const generateRules = () =>{ 
    if(podata){
      setIsLoading(true);
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors", 
      };
      fetch('https://vxkr89zy2h.execute-api.us-east-1.amazonaws.com/dev/?prompt='+podata,requestOptions)
      .then(data => {
        return data.text()
      })
      .then((data) => {
        //resolve(data ? JSON.parse(data) : {})
        
        setIsLoading(false); 
      setIsValidPodata(true)
       alert("Query submitted successfully");
       setPodata('');
      })
      .catch((error) => {
        console.log(error)
      }) 
    }else{
      setIsValidPodata(false)
    }
  } 

  return (
    <> 
    <ApiLoader isLoading={isLoading}/>
    <div className="card">
      <div className="generateData-wrapper">
        <label className="calLabel">Questions: </label>
        <div className="podData-input-wrapper">
       <textarea className="questions" rows="5" cols="70" type="text" value={podata} onChange={updateInputValue}/>
       {!isValidPodata && <span style={{color:'red'}}>Please enter valid Purchase order data</span>}
        </div>
       <button className="saveBtn generate" onClick={generateRules}>Generate Business Rules</button>
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

export default BusinessRuleGenerator;
