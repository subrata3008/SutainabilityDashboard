
import Popup from "reactjs-popup";
import "./about.css";


const About = (props) => {
  console.log(props);
  return (
    <Popup
      open={props.open}
      closeOnDocumentClick
      onClose={props.closeModal}
    >

      <div className="modal-design">
        <div className="modal-reset">
          <button className="close" onClick={props.onClose}>
            &times;
          </button>
          <div className="modal-content">
            <div className="modal-heading-box">
              <h4 className="modal-heading">Creadentials</h4>
            </div>

            <div className="modal-form">

              <div className="modal-input-box">
                <p className="modal-text">IBM Confidential<br/>
                694972L<br/>
                © Copyright IBM Corp. 2024<br/>
                US Government Users Restricted Rights - Use, <br/>
                duplication or disclosure restricted by GSA <br/>
                ADP Schedule Contract with IBM Corp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Popup >
  );
};

export default About;
