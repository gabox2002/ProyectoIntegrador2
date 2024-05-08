import React, { useState } from 'react'
import Text from '../components/Text'
import Form from '../components/Form'
import InputGroup from '../components/InputGroup'

import { useForm } from "../hooks/useForm";

function FormLayout({
    title,
    inputProps,
    initialState,
    onSubmit,
    labelSubmit
}) {
    const {values, handleInputChange, resetForm} = useForm(initialState)
    const [loadingForm, setLoadingForm] = useState(false)
    
    return (
        <div className='form-layout__container'>
            <Text renderAs="h2" content={title}/>
            <Form 
                onSubmit={() => {
                    setLoadingForm(true)
                    onSubmit(values)
                        .then( data => console.log(data))
                        .catch( err => console.error(err))
                        .finally( () => {
                            setLoadingForm(false)
                            resetForm()})
                }}
                labelButton={labelSubmit}
                loading={loadingForm}
            >
                {
                    Object.entries(inputProps)
                        .map(
                            ([key, props]) =>
                                <InputGroup
                                    key={key}
                                    id={key}
                                    onChange={handleInputChange}
                                    values={values}
                                    {...props}
                                />
                        )
                }
            </Form>
        </div>
    )
}

export default FormLayout