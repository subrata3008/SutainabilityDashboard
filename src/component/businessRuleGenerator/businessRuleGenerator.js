import React, { useState } from "react";
import "./businessRuleGenerator.css";  
import ApiLoader from "../loader/loader"; 

const BusinessRuleGenerator = () => {
  const [podata, setPodata] = useState('');
  const [title, setTitle] = useState('');
  const [ansData, setAnsData] = useState('');
  
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
      const brgUrl = "https://kttaoqm5o8.execute-api.us-east-1.amazonaws.com/genAI-BusinessRules-updater";
      //fetch('https://vxkr89zy2h.execute-api.us-east-1.amazonaws.com/dev/?prompt='+podata,
      fetch( brgUrl, requestPostOptions)
      .then(data => {
        return data.json()
      })
      .then((data) => { 
        setAnsData(data);
        setIsLoading(false); 
        setIsValidPodata(true)
        alert("Query submitted successfully");
        setPodata(''); 
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false); 
      }) 
    }else{
      setIsValidPodata(false)
    }
  } 
  const getHeaders = (resp) => { 
     return ( 
     <thead>
     <th>{ Object.keys(resp[0]).filter(eachkey=> eachkey.toUpperCase() !=='STATUS')[0] }</th>
     <th>Status</th>
     </thead>)
  }

  const getBusinessResponse = (resp) =>{   
    const finalResp =  resp.map(eachData => 
      <tr> 
      <td>{eachData[Object.keys(resp[0]).filter(eachkey=> eachkey.toUpperCase() !=='STATUS')[0]]}</td>
        <td>{eachData.Status}</td>
      </tr>
    )
    return finalResp;
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
       { ansData.length > 0 && 
       <div className="cartTable">
       <table className="cartableData"> 
        
        
        {getHeaders(ansData)}
         
        <tbody>       
        {getBusinessResponse(ansData)} 
        </tbody>
       </table>
       </div>
}
    </div>
    </>
  );
};

export default BusinessRuleGenerator;
