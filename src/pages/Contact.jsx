import React from 'react'
import FormLayout from '../layout/FormLayout';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import { postMessage } from '../util/api';
import { validateName, validateEmail, validateSubject, validateBody } from '../util/contact-validations'

const INITIAL_STATE = {
    name: "",
    email: "",
    subject: "",
    body: ""
}

function Contact() {
    const inputProps = {
        name: {
            inputLabel: "Nombre y apellido",
            validation: validateName

        },
        email: {
            inputLabel: "Correo electrónico",
            inputType: "email",
            validation: validateEmail

        },
        subject: {
            inputLabel: "Asunto",
            validation: validateSubject

        },
        body: {
            inputLabel: "Mensaje",
            inputType: "textarea",
            validation: validateBody

        }
    }

    return (
        <div className='contact__container'>
            <FormLayout
                title="Envíanos un mensaje"
                inputProps={inputProps}
                onSubmit={postMessage}
                labelSubmit="Enviar mensaje"
                initialState={INITIAL_STATE}/>
            <ScrollToTopOnMount />
        </div>
    )
}

export default Contact