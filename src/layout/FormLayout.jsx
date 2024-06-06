import React, { useState } from 'react';
import Text from '../components/Text';
import Form from '../components/Form';
import InputGroup from '../components/InputGroup';
import { useForm } from "../hooks/useForm";

function FormLayout({
    title,
    inputProps,
    initialState,
    onSubmit,
    labelSubmit
}) {
    const { values, handleInputChange, resetForm } = useForm(initialState);
    const [loadingForm, setLoadingForm] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [errors, setErrors] = useState({}); 

    const validateForm = () => {
        const newErrors = {};
        Object.entries(inputProps).forEach(([key, props]) => {
            const error = props.validation(values[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        const isValid = validateForm();

        if (isValid) {
            setLoadingForm(true);
            onSubmit(values)
                .then(data => {
                    console.log(data);
                    resetForm();
                    setShowValidation(false); 
                    setErrors({});
                })
                .catch(err => console.error(err))
                .finally(() => setLoadingForm(false));
        } else {
            setShowValidation(true); 
        }
    };

    return (
        <div className='form-layout__container'>
            <Text renderAs="h2" content={title}/>
            <Form 
                onSubmit={handleSubmit} 
                labelButton={labelSubmit} 
                loading={loadingForm}
            >
                {Object.entries(inputProps).map(([key, props]) => (
                    <InputGroup
                        key={key}
                        id={key}
                        onChange={e => {
                            handleInputChange(e);
                            if (!showValidation) {
                                setShowValidation(true); 
                            }
                        }}
                        values={values}
                        showValidation={showValidation && !!errors[key]} 
                        {...props}
                    />
                ))}
            </Form>
        </div>
    );
}

export default FormLayout;
