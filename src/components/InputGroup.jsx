import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function InputGroup({
    id,
    inputLabel,
    inputType = "text",
    onChange = () => {},
    validation = () => "",
    values,
    showValidation

}) {
    const [error, setError] = useState("")
    const [touched, setTouched] = useState(false)
   

    const validatedOnChange = e => {
        onChange(e)
        setTouched(true)
        const validationError = validation(e.target.value);
        setError(validationError);    
    }

    const isValid = error === "" && values[id] !== "";

    return (
        <div className={`input-group__container${inputType === "checkbox" ? " input-group__checkbox" : ""}`}>
          <label htmlFor={id}>
            {inputLabel}
            {(showValidation || touched) && (
              <FontAwesomeIcon 
                icon={isValid ? faCheck : faTimes} 
                className={`input-group__icon ${isValid ? "valid" : "invalid"}`} 
              />
            )}
          </label>
          {inputType === "textarea" ? (
            <textarea
              id={id}
              name={id}
              onChange={validatedOnChange}
              value={values[id]}
              className={`input-group__input${error ? " error" : ""}`}
            ></textarea>
          ) : (
            <input
              id={id}
              name={id}
              type={inputType}
              onChange={validatedOnChange}
              value={inputType !== "file" ? values[id] : ""}
              className={`input-group__input${error ? " error" : ""}`}
            />
          )}
          <span className="input-group__text-error">{error}</span>
        </div>
      );
    }

export default InputGroup
