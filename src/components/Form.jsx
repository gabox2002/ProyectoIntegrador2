import React from 'react'
import Button from './Button';

function Form({children, onSubmit, labelButton, loading}) {
    return (
        <form 
            onSubmit={
                e => {
                    e.preventDefault();
                    onSubmit()
                }
            }
            className="form__container"
        >
            {children}
            <Button 
                type='submit' 
                label={loading ? "Enviando..." : labelButton} 
                className={"form__button"}
                disabled={loading}
                />
        </form>
    )
}

export default Form