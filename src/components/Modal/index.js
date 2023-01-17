import React from 'react';
// import "./style.css"

const Modal = ({ isOpen, close, onSubmit, title, children }) => (
  <div className="modal-overlay" style={{ display: isOpen ? 'block' : 'none' }}>
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <h5 style={{marginLeft:"auto",marginRight:"auto",marginTop:"20px"}}> Register</h5>
          <div className="modal-body">
            { children }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" style={{backgroundColor: "#c0fdfb",color:"black",border:"none"}} onClick={ onSubmit } >Register</button>
            <button type="button" className="btn btn-secondary"  style={{border:"none"}} onClick={ close } data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
  
