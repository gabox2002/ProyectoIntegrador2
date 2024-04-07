import React, { useState } from "react";
import Button from "./Button";
import InputGroup from "./InputGroup";
import { postMessage } from "../util/api";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Form = ({ mostrarFormAlta, mostrarFormContacto, mostrarFormLogin, buttonLabel }) => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [comentario, setComentario] = useState("");
    const [asunto, setAsunto] = useState("");
    const [precio, setPrecio] = useState("");
    const [marca, setMarca] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descripcionCorta, setDescripcionCorta] = useState("");
    const [descripcionLarga, setDescripcionLarga] = useState("");
    const [edadDesde, setEdadDesde] = useState("");
    const [edadHasta, setEdadHasta] = useState("");
    const [stock, setStock] = useState("");
    const [envioGratis, setEnvioGratis] = useState(false);
    const [foto, setFoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorFields, setErrorFields] = useState([]);
    const [imagenCargada, setImagenCargada] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    
        const camposAValidar = {
            nombre,
            correo,
            contraseña,
            comentario,
            asunto,
            precio,
            marca,
            categoria,
            descripcionCorta,
            descripcionLarga,
            edadDesde,
            edadHasta,
            stock,
            foto: imagenCargada ? foto : null,

        };
    
        const camposObligatorios = {
            nombre: true,
            correo: mostrarFormContacto,
            comentario: mostrarFormContacto,
            asunto: mostrarFormContacto,
            precio: mostrarFormAlta,
            marca: mostrarFormAlta,
            categoria: mostrarFormAlta,
            descripcionCorta: mostrarFormAlta,
            descripcionLarga: mostrarFormAlta,
            edadDesde: mostrarFormAlta,
            edadHasta: mostrarFormAlta,
            stock: mostrarFormAlta,
            foto: mostrarFormAlta,

        };
    
        const camposVacios = Object.keys(camposAValidar).filter(
            (key) => camposObligatorios[key] && (!camposAValidar[key] || (typeof camposAValidar[key] === 'string' && camposAValidar[key].trim() === ''))
        );
        
        setErrorFields(camposVacios);
        
        if (camposVacios.length === 0) {
            postMessage(camposAValidar)
                .then((data) => console.log(data))
                .catch((err) => console.error(err))
                .finally(() => {
                    setLoading(false);
                    setNombre("");
                    setCorreo("");
                    setContraseña("");
                    setComentario("");
                    setAsunto("");
                    setPrecio("");
                    setMarca("");
                    setCategoria("");
                    setDescripcionCorta("");
                    setDescripcionLarga("");
                    setEdadDesde("");
                    setEdadHasta("");
                    setStock("");
                    setEnvioGratis(false);
                    setFoto(null);
                    alert("El formulario se envió exitosamente!");
                });
        } else {
            alert(
                `Por favor, complete los campos obligatorios: ${camposVacios.join(", ")}`
            );
            setLoading(false);
        }
    };

    // Funciones de validación de campos
    const validarNombre = (value) => {
        return value.trim() !== "" && value.length >= 3;
    };

    const validarCorreo = (value) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return value.trim() !== "" && regex.test(value);
    };

    const validarContraseña = (value) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡?¿!'"#$%&()*+,:;=/.,\-_{}[\]])[A-Za-z\d¡?¿!'"#$%&()*+,:;=/.,\-_{}[\]]{8,}$/;
        return value.trim() !== "" && regex.test(value);
    };

    const validarComentario = (value) => {
        return value.trim() !== "";
    };

    const validarAsunto = (value) => {
        return value.trim() !== "";
    };

    const validarPrecio = (value) => {
        return value.trim() !== "" && !isNaN(value) && parseFloat(value) > 0;
    };
    const validarMarca = (value) => {
        return value.trim() !== "";
    };

    const validarCategoria = (value) => {
        return value.trim() !== "";
    };

    const validarDescripcionCorta = (value) => {
        return value.trim() !== "" && value.length >= 10;
    };

    const validarDescripcionLarga = (value) => {
        return value.trim() !== "" && value.length >= 20;
    };

    const validarEdadDesde = (value) => {
        return value.trim() !== "" && !isNaN(value) && parseInt(value) > 0;
    };
    const validarEdadHasta = (value) => {
        return value.trim() !== "" && !isNaN(value) && parseInt(value) > 0;
    };
    const validarStock = (value) => {
        return value.trim() !== "" && !isNaN(value) && parseInt(value) > 0;
    };

    const validarFoto = (foto) => {
        return foto !== null; 
    };
    // Función modificada para actualizar el estado de la imagen cargada
    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        setFoto(file);
        setImagenCargada(true); 
    };
    return (
        <form className="form__container" onSubmit={handleSubmit}>
            {mostrarFormContacto && (
                <>
                    <InputGroup
                        id="nombre"
                        inputLabel="Nombre:"
                        inputType="text"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                        validationIcon={
                        errorFields.includes("nombre") || nombre !== "" ? validarNombre(nombre) ? faCheck : faTimes : null }
                        errorMessage={ (errorFields.includes("nombre") || (nombre !== "" && !validarNombre(nombre))) && !validarNombre(nombre) ? "*Debe tener al menos 3 caracteres" : ""}
                    />
                    <InputGroup
                        id="correo"
                        inputLabel="Correo:"
                        inputType="email"
                        onChange={(e) => setCorreo(e.target.value)}
                        value={correo}
                        validationIcon={errorFields.includes("correo") || correo !== "" ? validarCorreo(correo) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("correo") || (correo !== "" && !validarCorreo(correo))) && !validarCorreo(correo) ? "*Ingrese un correo electrónico válido" : "" }
                    />
                    <InputGroup
                        id="asunto"
                        inputLabel="Asunto:"
                        inputType="text"
                        onChange={(e) => setAsunto(e.target.value)}
                        value={asunto}
                        validationIcon={ errorFields.includes("asunto") || asunto !== "" ? asunto !== "" ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("asunto") || (asunto !== "" && !validarAsunto(asunto))) && !validarAsunto(asunto) ? "*El campo comentario no puede estar vacío" : "" }
                    />
                    <InputGroup
                        id="comentario"
                        inputLabel="Comentario:"
                        inputType="textarea" 
                        onChange={(e) => setComentario(e.target.value)} 
                        value={comentario}
                        validationIcon={errorFields.includes("comentario") || comentario !== "" ? validarComentario(comentario) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("comentario") || (comentario !== "" && !validarComentario(comentario))) && !validarComentario(comentario) ? "*El comentario no puede estar vacío" : "" }
                    />
                </>
            )}
            {mostrarFormLogin && (
                <>
                    <InputGroup
                        id="nombre"
                        inputLabel="Nombre:"
                        inputType="text"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                        validationIcon={ errorFields.includes("nombre") || nombre !== "" ? validarNombre(nombre) ? faCheck : faTimes : null }
                        errorMessage={ (errorFields.includes("nombre") || (nombre !== "" && !validarNombre(nombre))) && !validarNombre(nombre) ? "*Debe tener al menos 3 caracteres" : "" }
                    />
                    <InputGroup
                        id="correo"
                        inputLabel="Correo:"
                        inputType="email"
                        onChange={(e) => setCorreo(e.target.value)}
                        value={correo}
                        validationIcon={ errorFields.includes("correo") || correo !== "" ? validarCorreo(correo) ? faCheck : faTimes : null }
                        errorMessage={ (errorFields.includes("correo") || (correo !== "" && !validarCorreo(correo))) && !validarCorreo(correo) ? "*Ingrese un correo electrónico válido" : "" }
                    />
                    <InputGroup
                        id="contraseña"
                        inputLabel="Contraseña:"
                        inputType="password"
                        onChange={(e) => setContraseña(e.target.value)}
                        value={contraseña}
                        validationIcon={ errorFields.includes("contraseña") || contraseña !== "" ? validarContraseña(contraseña) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("contraseña") || (contraseña !== "" && !validarContraseña(contraseña))) && !validarContraseña(contraseña) ? "*La contraseña no puede estar vacía y debe tener al menos 8 caracteres" : "" }
                    />
                </>
            )}
            {mostrarFormAlta && (
                <>
                    <InputGroup
                        id="nombre"
                        inputLabel="Nombre:"
                        inputType="text"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                        validationIcon={errorFields.includes("nombre") || nombre !== "" ? validarNombre(nombre) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("nombre") || (nombre !== "" && !validarNombre(nombre))) && !validarNombre(nombre) ? "*Debe tener al menos 3 caracteres" : "" }
                    />

                    <InputGroup
                        id="precio"
                        inputLabel="Precio:"
                        inputType="text"
                        onChange={(e) => setPrecio(e.target.value)}
                        value={precio}
                        validationIcon={errorFields.includes("precio") || precio !== "" ? validarPrecio(precio) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("precio") || (precio !== "" && !validarPrecio(precio))) && !validarPrecio(precio) ? "*El precio debe ser un número mayor que cero" : "" }
                    />
                    <InputGroup
                        id="marca"
                        inputLabel="Marca:"
                        inputType="text"
                        onChange={(e) => setMarca(e.target.value)}
                        value={marca}
                        validationIcon={errorFields.includes("marca") || marca !== "" ? validarMarca(marca) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("marca") || (marca !== "" && !validarMarca(marca))) && !validarMarca(marca) ? "*El campo marca no puede estar vacío": ""}
                        hideErrorMessage={marca.trim() !== "" && validarMarca(marca)} 
                    />
                    <InputGroup
                        id="categoria"
                        inputLabel="Categoría:"
                        inputType="text"
                        onChange={(e) => setCategoria(e.target.value)}
                        value={categoria}
                        validationIcon={errorFields.includes("categoria") || categoria !== "" ? validarMarca(categoria) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("categoria") || (categoria !== "" && !validarCategoria(categoria))) && !validarCategoria(categoria) ? "*El campo categoría no puede estar vacío" : "" }
                    />
                    <InputGroup
                        id="descripcionCorta"
                        inputLabel="Descripción corta:"
                        inputType="text"
                        onChange={(e) => setDescripcionCorta(e.target.value)}
                        value={descripcionCorta}
                        validationIcon={errorFields.includes("descripcionCorta") || descripcionCorta !== "" ? validarDescripcionCorta(descripcionCorta) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("descripcionCorta") || (descripcionCorta !== "" && !validarDescripcionCorta( descripcionCorta ))) && !validarDescripcionCorta(descripcionCorta) ? "*La descripción corta debe tener al menos 10 caracteres" : "" }
                    />
                    <InputGroup
                        id="descripcionLarga"
                        inputLabel="Descripción larga:"
                        inputType="text"
                        onChange={(e) => setDescripcionLarga(e.target.value)}
                        value={descripcionLarga}
                        validationIcon={errorFields.includes("descripcionLarga") || descripcionLarga !== "" ? validarDescripcionLarga(descripcionLarga) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("descripcionLarga") || (descripcionLarga !== "" && !validarDescripcionLarga( descripcionLarga ))) && !validarDescripcionLarga(descripcionLarga) ? "*La descripción larga debe tener al menos 20 caracteres" : "" }
                    />
                    <InputGroup
                        id="edadDesde"
                        inputLabel="Edad desde:"
                        inputType="text"
                        onChange={(e) => setEdadDesde(e.target.value)}
                        value={edadDesde}
                        validationIcon={errorFields.includes("edadDesde") || edadDesde !== "" ? validarEdadDesde(edadDesde) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("edadDesde") || (edadDesde !== "" && !validarEdadDesde(edadDesde))) && !validarEdadDesde(edadDesde) ? "*La edad desde debe ser un número mayor que cero" : "" }
                    />
                    <InputGroup
                        id="edadHasta"
                        inputLabel="Edad hasta:"
                        inputType="text"
                        onChange={(e) => setEdadHasta(e.target.value)}
                        value={edadHasta}
                        validationIcon={errorFields.includes("edadHasta") || edadHasta !== "" ? validarEdadHasta(edadHasta) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("edadHasta") || (edadHasta !== "" && !validarEdadHasta(edadHasta))) && !validarEdadHasta(edadHasta) ? "*La edad hasta debe ser un número mayor que cero" : "" }
                    />
                    <InputGroup
                        id="stock"
                        inputLabel="Stock:"
                        inputType="text"
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                        validationIcon={errorFields.includes("stock") || stock !== "" ? validarStock(stock) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("stock") || (stock !== "" && !validarStock(stock))) && !validarStock(stock) ? "*El stock debe ser un número mayor que cero" : "" }
                    />
                    
                    <InputGroup
                        id="foto"
                        inputLabel="Agregar foto:"
                        inputType="file" 
                        onChange={handleFotoChange} 
                        validationIcon={errorFields.includes("foto") || foto !== null  ? validarFoto(foto) ? faCheck : faTimes : null }
                        errorMessage={(errorFields.includes("foto") || (foto !== null  && !validarFoto(foto))) && !validarFoto(foto) ? "*Debe seleccionar una foto" : "" } 
                    />
                   

                    <div>
                        <label style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                checked={envioGratis}
                                onChange={() => setEnvioGratis(!envioGratis)}
                            />
                            <p style={{ marginLeft: "5px" }}>Envío sin cargo</p>
                        </label>
                    </div>
                </>
            )}
            <div className="form__buttton-container">
                <Button
                    type="submit"
                    label={loading ? "Enviando..." : buttonLabel}
                    className="form__button-submit"
                    disabled={loading}
                />
            </div>
        </form>
    );
};

export default Form;