import React from "react";

function Modal({ children, show, direction }) {
  
    return (
        show && (
            <div className={`modal__overlay ${direction}`}>
                <div className="modal__container">{children}</div>
            </div>
        )
    );
}

export default Modal;
