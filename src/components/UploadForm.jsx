import React, { useState } from 'react';
import { postProducts } from '../util/api';
import InputGroup from './InputGroup';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from './Button';
import useForm from '../hooks/useFormUpload';


function UploadForm({ buttonLabel }) {
    const [nombre, setNombre] = useState("");
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
    const { values, setValues } = useForm(); 


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const camposAValidar = {
            nombre,
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
            precio: true,
            marca: true,
            categoria: true,
            descripcionCorta: true,
            descripcionLarga: true,
            edadDesde: true,
            edadHasta: true,
            stock: true,
            foto: true,
        };

        const camposVacios = Object.keys(camposAValidar).filter(
            (key) => camposObligatorios[key] && (!camposAValidar[key] || (typeof camposAValidar[key] === 'string' && camposAValidar[key].trim() === ''))
        );

        setErrorFields(camposVacios);

       
        if (camposVacios.length === 0) {
            try {
                // Ajustar los datos del formulario antes de enviarlos a la API
            const adjustedData = {
                name: values.nombre,
                price: values.precio,
                img1: values.foto,
                stock: values.stock,
                brand: values.marca,
                category: values.categoria,
                shortDesc: values.descripcionCorta,
                longDesc: values.descripcionLarga,
                ageFrom: values.edadHasta,
                ageTo: values.edadDesde
            };
                await postProducts(adjustedData);
                alert('Producto creado exitosamente.');
            } catch (error) {
                console.error('Error al crear el producto:', error);
                alert('Hubo un error al crear el producto. Por favor, inténtalo de nuevo.');
            } finally {
                setLoading(false);
                // Restablece los campos del formulario
                setValues({
                    name: "",
                    email: "",
                    subject: "",
                    body: "",
                    price: "",
                    img1: "",
                    stock: "",
                    brand: "",
                    category: "",
                    shortDesc:"",
                    longDesc:"",
                    ageFrom: "",
                    ageTo:"",
                });
            }
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
    
        const handleFotoChange = (event) => {
            const file = event.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; 
        
            if (file) {
                if (allowedTypes.includes(file.type)) {
                    setFoto(file);
                    setImagenCargada(true);
                    setErrorFields(prevErrorFields => prevErrorFields.filter(field => field !== "foto")); 
                } else {
                    setErrorFields(prevErrorFields => [...prevErrorFields, "foto"]); 
                }
            }else {
                setImagenCargada(false); // Actualiza el estado de la imagen cargada si no se selecciona ningún archivo
            }
        };
        
    

    return (
        <form className="form__container" onSubmit={handleSubmit}>
            <InputGroup
                id="nombre"
                inputLabel="Nombre:"
                inputType="text"
                onChange={(e) => setNombre(e.target.value)}
                value={values.nombre || ""}
                validationIcon={
                errorFields.includes("nombre") || nombre !== "" ? validarNombre(nombre) ? faCheck : faTimes : null }
                errorMessage={ (errorFields.includes("nombre") || (nombre !== "" && !validarNombre(nombre))) && !validarNombre(nombre) ? "*Debe tener al menos 3 caracteres" : ""}
            />
            <InputGroup
                id="precio"
                inputLabel="Precio:"
                inputType="text"
                onChange={(e) => setPrecio(e.target.value)}
                value={values.precio || ""}
                validationIcon={errorFields.includes("precio") || precio !== "" ? validarPrecio(precio) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("precio") || (precio !== "" && !validarPrecio(precio))) && !validarPrecio(precio) ? "*El precio debe ser un número mayor que cero" : "" }
            />
            <InputGroup
                id="marca"
                inputLabel="Marca:"
                inputType="text"
                onChange={(e) => setMarca(e.target.value)}
                value={values.marca || ""}
                validationIcon={errorFields.includes("marca") || marca !== "" ? validarMarca(marca) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("marca") || (marca !== "" && !validarMarca(marca))) && !validarMarca(marca) ? "*El campo marca no puede estar vacío": ""}
                hideErrorMessage={marca.trim() !== "" && validarMarca(marca)} 
            />
            <InputGroup
                id="categoria"
                inputLabel="Categoría:"
                inputType="text"
                onChange={(e) => setCategoria(e.target.value)}
                value={values.categoria || ""}
                validationIcon={errorFields.includes("categoria") || categoria !== "" ? validarMarca(categoria) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("categoria") || (categoria !== "" && !validarCategoria(categoria))) && !validarCategoria(categoria) ? "*El campo categoría no puede estar vacío" : "" }
            />
            <InputGroup
                id="descripcionCorta"
                inputLabel="Descripción corta:"
                inputType="text"
                onChange={(e) => setDescripcionCorta(e.target.value)}
                value={values.descripcionCorta || ""}
                validationIcon={errorFields.includes("descripcionCorta") || descripcionCorta !== "" ? validarDescripcionCorta(descripcionCorta) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("descripcionCorta") || (descripcionCorta !== "" && !validarDescripcionCorta( descripcionCorta ))) && !validarDescripcionCorta(descripcionCorta) ? "*La descripción corta debe tener al menos 10 caracteres" : "" }
            />
            <InputGroup
                id="descripcionLarga"
                inputLabel="Descripción larga:"
                inputType="text"
                onChange={(e) => setDescripcionLarga(e.target.value)}
                value={values.descripcionLarga || ""}
                validationIcon={errorFields.includes("descripcionLarga") || descripcionLarga !== "" ? validarDescripcionLarga(descripcionLarga) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("descripcionLarga") || (descripcionLarga !== "" && !validarDescripcionLarga( descripcionLarga ))) && !validarDescripcionLarga(descripcionLarga) ? "*La descripción larga debe tener al menos 20 caracteres" : "" }
            />
            <InputGroup
                id="edadDesde"
                inputLabel="Edad desde:"
                inputType="text"
                onChange={(e) => setEdadDesde(e.target.value)}
                value={values.edadDesde || ""}
                validationIcon={errorFields.includes("edadDesde") || edadDesde !== "" ? validarEdadDesde(edadDesde) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("edadDesde") || (edadDesde !== "" && !validarEdadDesde(edadDesde))) && !validarEdadDesde(edadDesde) ? "*La edad desde debe ser un número mayor que cero" : "" }
            />
            <InputGroup
                id="edadHasta"
                inputLabel="Edad hasta:"
                inputType="text"
                onChange={(e) => setEdadHasta(e.target.value)}
                value={values.edadHasta || ""}
                validationIcon={errorFields.includes("edadHasta") || edadHasta !== "" ? validarEdadHasta(edadHasta) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("edadHasta") || (edadHasta !== "" && !validarEdadHasta(edadHasta))) && !validarEdadHasta(edadHasta) ? "*La edad hasta debe ser un número mayor que cero" : "" }
            />
            <InputGroup
                id="stock"
                inputLabel="Stock:"
                inputType="text"
                onChange={(e) => setStock(e.target.value)}
                value={values.stock || ""}
                validationIcon={errorFields.includes("stock") || stock !== "" ? validarStock(stock) ? faCheck : faTimes : null }
                errorMessage={(errorFields.includes("stock") || (stock !== "" && !validarStock(stock))) && !validarStock(stock) ? "*El stock debe ser un número mayor que cero" : "" }
            />
            
            <InputGroup
                id="foto"
                inputLabel="Agregar foto:"
                inputType="file" 
                onChange={handleFotoChange} 
                validationIcon={errorFields.includes("foto") || foto !== null  ? validarFoto(foto) ? faCheck : faTimes : null }
                errorMessage={errorFields.includes("foto") && !validarFoto(foto) ? "*Debe seleccionar una una imagen válida (JPEG, PNG o GIF)" : "" } // Mostrar un mensaje de error personalizado si no se selecciona una imagen válida
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
                
            <div className="form__buttton-container">
                <Button
                    type="submit"
                    label={loading ? "Enviando..." : buttonLabel="Enviar"}
                    className="form__button-submit"
                    disabled={loading}
                />
            </div>
        </form>    
    );
}

export default UploadForm;


