import React from 'react';
import "./Modal.css";

const Modal = props => {
  if (props.show === false){
    console.log("entre ds false")
    return <div>
      
    </div>
  } else {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">Fermer</button>
          </div>
        </div>
      </div>
    );}
};

export default Modal;
