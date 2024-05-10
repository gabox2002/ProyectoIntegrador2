import React, { useState } from 'react';
import { postMessage } from '../util/api';
import InputGroup from './InputGroup';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from './Button';
import useForm from '../hooks/useFormContact';

function ContactForm() {
    const { values, errors, handleChange, setValues, validateForm } = useForm(); 
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar el formulario antes de enviar
        const isValid = validateForm();

        if (!isValid) {
            // Si el formulario no es válido, detener el envío
            return;
        }

        setLoading(true);

        try {
            // Ajustar los datos del formulario antes de enviarlos a la API
            const adjustedData = {
                name: values.nombre,
                email: values.correo,
                subject: values.asunto,
                body: values.comentario
            };
    
            await postMessage(adjustedData);
            alert('Mensaje enviado exitosamente.');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error.message);
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
            setValues({
                name: "",
                email: "",
                subject: "",
                body: ""
            });
        }
    };

    return (
        <form className="form__container" onSubmit={handleSubmit}>
            <InputGroup
                id="nombre"
                inputLabel="Nombre:"
                inputType="text"
                onChange={handleChange}
                onSubmit={postMessage}
                value={values.nombre || ""}
                validationIcon={errors.nombre ? faTimes : (values.nombre && values.nombre.trim().length >= 3 ? faCheck : null)}
                errorMessage={errors.nombre}
            />

            <InputGroup
                id="correo"
                inputLabel="Correo:"
                inputType="email"
                onChange={handleChange}
                onSubmit={postMessage}
                value={values.correo || ""}
                validationIcon={errors.correo ? faTimes : (values.correo && values.correo.trim() && !errors.correo ? faCheck : null)}
                errorMessage={errors.correo}
            />

            <InputGroup
                id="asunto"
                inputLabel="Asunto:"
                inputType="text"
                onChange={handleChange}
                onSubmit={postMessage}
                value={values.asunto || ""}
                validationIcon={errors.asunto ? faTimes : (values.asunto && values.asunto.trim() && !errors.asunto ? faCheck : null)}
                errorMessage={errors.asunto}
            />

            <InputGroup
                id="comentario"
                inputLabel="Comentario:"
                inputType="textarea"
                onChange={handleChange}
                onSubmit={postMessage}
                value={values.comentario || ""}
                validationIcon={errors.comentario ? faTimes : (values.comentario && values.comentario.trim() && !errors.comentario ? faCheck : null)}
                errorMessage={errors.comentario}
            />
            <div className="form__buttton-container">
                <Button
                    type="submit"
                    label={loading ? "Enviando..." : "Enviar"}
                    className="form__button-submit"
                    disabled={loading}
                />
            </div>
        </form>    
    );
}

export default ContactForm;

