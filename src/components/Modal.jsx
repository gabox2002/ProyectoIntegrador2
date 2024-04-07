import React from 'react';

function Modal({ children, show }) {
    return (
        show && (
            <div className="modal__overlay">
                <div className={"modal__container "}>
                    {children}
                </div>
            </div>
        )
    );
}

export default Modal;
