import React, { useEffect, useRef } from 'react'
import { bool, element } from 'prop-types'

function Modal({ children, show, onClose, direction }) {
  
    const modalRef = useRef()

    useEffect(() => {
        if (show) {
            modalRef.current.focus()
        }
    }, [show])
    
    const handleKeyPress = e => {
        if (e.key === "Escape") {
            onClose()
        }
    }

    return (
        show ? (
            <div className={`modal__overlay ${direction}`} onClick={onClose} >
                <div
                    ref={modalRef} 
                    className='modal__container' 
                    tabIndex="0"
                    onClick={e => e.stopPropagation()}
                    onKeyDown={handleKeyPress}>
                    {children}
                </div>                
            </div>

        ) : undefined
    )
}
Modal.propTypes = {
    children: element.isRequired,
    show: bool
}

Modal.defaultProps = {
    show: false
}

export default Modal;
