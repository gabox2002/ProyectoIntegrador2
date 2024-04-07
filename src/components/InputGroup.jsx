import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function InputGroup({
    id,
    inputLabel,
    inputType = 'text',
    onChange,
    value,
    validationIcon,
    errorMessage,
    icon,
}) {
    const getValidationIconColor = () => {
        if (validationIcon === faCheck) {
            return 'valid-icon';
        } else if (validationIcon === faTimes) {
            return 'invalid-icon';
        }
        return '';
    };

    return (
        <div className='input-group__container'>
            <div className={`label-icon-container ${getValidationIconColor()}`}>
                <label htmlFor={id} className="label-text">{inputLabel}</label>
                {validationIcon && (
                    <span className='validation-icon'>
                        <FontAwesomeIcon icon={validationIcon} />
                    </span>
                )}
            </div>
            {inputType === 'textarea' ? (
                <textarea
                    id={id}
                    name={id}
                    type={inputType}
                    onChange={onChange}
                    value={value}
                    className='input-group__input'
                ></textarea>
            ) : inputType === 'file' ? ( 
                <div className='file-input-container'>
                    <input
                        id={id}
                        name={id}
                        type={inputType}
                        onChange={onChange}
                        className='input-group__input file-input' 
                    />
                    {icon && (
                        <button className='upload-icon' onClick={icon.action}>
                            <FontAwesomeIcon icon={icon.icon} />
                        </button>
                    )}
                </div>
            ) : (
                        <div className='password-container'>
                            <input
                                id={id}
                                name={id}
                                type={inputType}
                                onChange={onChange}
                                value={value}
                                className='input-group__input password-input'
                            />
                            {icon && (
                                <button className='eye-icon' onClick={icon.action}>
                                    <FontAwesomeIcon icon={icon.icon} />
                                </button>
                            )}
                        </div>
                    )}
            <div className="error-container">
                {errorMessage && (
                    <span className='error-message'>{errorMessage}</span>
                )}
            </div>
        </div>
    );
}

export default InputGroup;

