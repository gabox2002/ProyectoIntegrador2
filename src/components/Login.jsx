import React, { useState, useEffect } from "react";
import {
    faUser,
    faArrowLeft,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "./Button";
import Modal from "./Modal";
import SocialMedia from "../components/SocialMedia";

function Login() {
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [nombreValido, setNombreValido] = useState(null);
    const [correoValido, setCorreoValido] = useState(null);
    const [contraseñaValida, setContraseñaValida] = useState(null);
    const [contraseñaVisible, setContraseñaVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
    });

    const handleToggleModal = () => {
        setOpen(!open);
    };

    const handleCloseModal = () => {
        setNombre("");
        setCorreo("");
        setContraseña("");
        setNombreValido(null);
        setCorreoValido(null);
        setContraseñaValida(null);
        setOpen(false);
    };

    const toggleContraseñaVisibilidad = () => {
        setContraseñaVisible(!contraseñaVisible);
    };

    const validarNombre = (value) => {
        setNombre(value);
        if (value.trim() === "" || value.length < 3) {
            setNombreValido(false);
            setErrores({
                ...errores,
                nombre: " *El nombre no puede estar vacío y debe tener al menos 3 caracteres.",
            });
            return false;
        } else {
            setNombreValido(true);
            setErrores({
                ...errores,
                nombre: "",
            });
            return true;
        }
    };

    const validarCorreo = (value) => {
        setCorreo(value);
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (value.trim() === "" || !regex.test(value)) {
            setCorreoValido(false);
            setErrores({
                ...errores,
                correo: " *Ingrese un correo electrónico válido.",
            });
            return false;
        } else {
            setCorreoValido(true);
            setErrores({
                ...errores,
                correo: "",
            });
            return true;
        }
    };

    const validarContraseña = (value) => {
        setContraseña(value);
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡?¿!'"#$%&()*+,:;=/.,\-_{}[\]])[A-Za-z\d¡?¿!'"#$%&()*+,:;=/.,\-_{}[\]]{8,}$/;
        if (value.trim() === "" || !regex.test(value)) {
            setContraseñaValida(false);
            setErrores({
                ...errores,
                contraseña:
                    " *La contraseña debe tener al menos 8 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial.",
            });
            return false;
        } else {
            setContraseñaValida(true);
            setErrores({
                ...errores,
                contraseña: "",
            });
            return true;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nombreValid = validarNombre(nombre);
        const correoValid = validarCorreo(correo);
        const contraseñaValid = validarContraseña(contraseña);

        if (nombreValid && correoValid && contraseñaValid) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setNombre("");
                setCorreo("");
                setContraseña("");
                setNombreValido(null);
                setCorreoValido(null);
                setContraseñaValida(null);
                setOpen(false);
                setErrores({
                    nombre: "",
                    correo: "",
                    contraseña: "",
                });
                alert("El registro se envió exitosamente!");
            }, 1000);
        } else {
            alert(
                "Por favor, complete todos los campos obligatorios y corrija los errores en el formulario."
            );
            setErrores({
                nombre: !nombreValid
                    ? " *El nombre no puede estar vacío y debe tener al menos 3 caracteres."
                    : "",
                correo: !correoValid
                    ? " *Ingrese un correo electrónico válido."
                    : "",
                contraseña: !contraseñaValid
                    ? " *La contraseña debe tener al menos 8 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial."
                    : "",
            });
        }
    };

    // Efecto para limpiar los iconos de validacione y mensajes de error cuando se cierra el modal
    useEffect(() => {
        if (!open) {
            setNombre("");
            setCorreo("");
            setContraseña("");
            setNombreValido(null);
            setCorreoValido(null);
            setContraseñaValida(null);
            setErrores({
                nombre: "",
                correo: "",
                contraseña: "",
            });
        }
    }, [open]);

    // Efecto para manejar el clic fuera del modal
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleClickOutside = (event) => {
        if (!event.target.closest(".modal__container")) {
            setOpen(false);
        }
    };

    // Función para manejar el clic en la tecla Escape
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            setOpen(false);
            // Desenfocar cualquier elemento que esté actualmente enfocado
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    };

    // Función que remueve un event listener para cerrar el modal al presionar la tecla 'Escape'
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <>
            <div className="login__container">
                <Button
                    icon={faUser}
                    className="login__navbar-button"
                    action={handleToggleModal}
                />
            </div>
            <div className="modal__login">
                <Modal show={open} Close={handleCloseModal} direction="right">
                <div>
                    <div className="modal__header">
                        <Button
                            icon={faArrowLeft}
                            className="modal__close"
                            action={handleCloseModal}
                        />
                        <p>Registro / Inicio de sesión</p>
                    </div>
                    <div className="modal__content">
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-container">
                                <div className="label-icon-container">
                                    <label htmlFor="nombre">Nombre:</label>
                                    {nombreValido !== null && (
                                        <span className="validation-icon">
                                            {nombreValido ? "✅" : "❌"}
                                        </span>
                                    )}
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={nombre}
                                        onChange={(e) =>
                                            validarNombre(e.target.value)
                                        }
                                        placeholder="Ingrese su nombre"
                                        className={
                                            nombreValido === null
                                                ? ""
                                                : nombreValido
                                                ? "input-valid"
                                                : "input-invalid"
                                        }
                                    />
                                </div>
                                {errores.nombre && !nombreValido && (
                                    <span className="error-message">
                                        {errores.nombre}
                                    </span>
                                )}
                            </div>
                            <div className="input-container">
                                <div className="label-icon-container">
                                    <label htmlFor="correo">Correo:</label>
                                    {correoValido !== null && (
                                        <span className="validation-icon">
                                            {correoValido ? "✅" : "❌"}
                                        </span>
                                    )}
                                    <input
                                        type="text"
                                        id="correo"
                                        name="correo"
                                        value={correo}
                                        onChange={(e) =>
                                            validarCorreo(e.target.value)
                                        }
                                        placeholder="Ej: correo@gmail.com"
                                        className={
                                            correoValido === null
                                                ? ""
                                                : correoValido
                                                ? "input-valid"
                                                : "input-invalid"
                                        }
                                    />
                                </div>
                                {errores.correo && !correoValido && (
                                    <span className="error-message">
                                        {errores.correo}
                                    </span>
                                )}
                            </div>
                            <div className="input-container">
                                <div className="label-icon-container">
                                    <label htmlFor="contraseña">
                                        Contraseña:
                                    </label>
                                    {contraseñaValida !== null && (
                                        <span className="validation-icon">
                                            {contraseñaValida ? "✅" : "❌"}
                                        </span>
                                    )}
                                    <div className="password-container">
                                        {" "}
                                        <input
                                            type={
                                                contraseñaVisible
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="contraseña"
                                            name="contraseña"
                                            value={contraseña}
                                            onChange={(e) =>
                                                validarContraseña(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Ej: $LogiN_123"
                                            className={
                                                contraseñaValida === null
                                                    ? ""
                                                    : contraseñaValida
                                                    ? "password-input input-valid"
                                                    : "password-input input-invalid"
                                            }
                                        />
                                        <Button
                                            icon={
                                                contraseñaVisible
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                            className="eye-icon"
                                            action={toggleContraseñaVisibilidad}
                                        />
                                    </div>
                                </div>
                                {errores.contraseña && !contraseñaValida && (
                                    <span className="error-message">
                                        {errores.contraseña}
                                    </span>
                                )}
                            </div>
                            <Button
                                label={
                                    loading ? "Registrando..." : "Registrarse"
                                }
                                type="submit"
                                className="modal__button registro_btn"
                                disabled={loading}
                            />
                            <div className="form-divider"></div>
                        </form>
                        <Button
                            label="Iniciar Sesión"
                            className="modal__button"
                        />
                        <Link className="modal__forgot-password">
                            <span>¿Olvidaste tu contraseña?</span>
                        </Link>
                        <p className="modal__or">
                            O ingresa con alguna red social:
                        </p>
                        <SocialMedia showMessage={false} />
                    </div>
                </div>
                </Modal>
            </div>
        </>
    );
}

export default Login;
