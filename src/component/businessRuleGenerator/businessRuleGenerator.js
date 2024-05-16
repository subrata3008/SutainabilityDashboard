import React, { useState } from "react";
import "./businessRuleGenerator.css";
import ApiLoader from "../loader/loader";

const BusinessRuleGenerator = () => {
  const [podata, setPodata] = useState("");
  const [title, setTitle] = useState("");
  const [ansData, setAnsData] = useState("");

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
          setAnsData(data);
          setIsLoading(false);
          setIsValidPodata(true);
          alert("Query submitted successfully");
          //setPodata("");
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsValidPodata(false);
    }
  };

  /**
   * Approve or reject rule method
   * @param {*} status
   */

  const approveOrRejectRuleFunc = (status) => {
    let approveOrRejectRuleUrl;
    if (status === "accept") {
      approveOrRejectRuleUrl =
        "https://4j2h5tcsch.execute-api.us-east-1.amazonaws.com/approve";
    }
    if (status === "reject") {
      approveOrRejectRuleUrl =
        "https://4j2h5tcsch.execute-api.us-east-1.amazonaws.com/reject";
    }
    if (podata) {
      setIsLoading(true);
      const approveOrRejectRulePostOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify(
          JSON.stringify(
            {
              prompt: podata,
              message: ansData,
            },
            null,
            2
          )
        ),
      };
      fetch(approveOrRejectRuleUrl, approveOrRejectRulePostOptions)
        .then((data) => {
          alert(`Query ${status}ed successfully`);
          return data.json();
        })
        .then((data) => {
          debugger
          console.log(data);
          setIsLoading(false);
          alert(`Query {$status}ed successfully`);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      setIsValidPodata(false);
    }
  };

  /**
   * Assign header of table dynamically
   * @param {*} resp
   * @returns
   */
  const getHeaders = (resp) => {
    return (
      <thead>
        <th>
          {
            Object.keys(resp[0]).filter(
              (eachkey) => eachkey.toUpperCase() !== "STATUS"
            )[0]
          }
        </th>
        <th>Status</th>
      </thead>
    );
  };

  /**
   * Business rule funcion
   * @param {*} resp
   * @returns
   */
  const getBusinessResponse = (resp) => {
    const finalResp = resp.map((eachData) => (
      <tr>
        <td>
          {
            eachData[
              Object.keys(resp[0]).filter(
                (eachkey) => eachkey.toUpperCase() !== "STATUS"
              )[0]
            ]
          }
        </td>
        <td>{eachData.Status}</td>
      </tr>
    ));
    return finalResp;
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
                Please enter valid Purchase order data
              </span>
            )}
          </div>
          <button className="saveBtn generate" onClick={generateRules}>
            Generate Business Rules
          </button>
        </div>
        {ansData.length > 0 && (
          <>
            <div className="btnHolder">
              <button
                className="saveBtn generate"
                onClick={() => approveOrRejectRuleFunc("accept")}
              >
                Accept
              </button>
              <button
                className="saveBtn generate"
                onClick={() => approveOrRejectRuleFunc("reject")}
              >
                Reject
              </button>
            </div>
            <div className="cartTable">
              <table className="cartableData">
                {getHeaders(ansData)}

                <tbody>{getBusinessResponse(ansData)}</tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BusinessRuleGenerator;
