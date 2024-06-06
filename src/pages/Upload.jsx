import React from 'react'
import FormLayout from '../layout/FormLayout'
import { postProducts } from '../util/api'
import ScrollToTopOnMount from '../components/ScrollToTopOnMount'
import { validateName, validateCategory, validateShort, validateLong, validatePrice, validateStock } from '../util/upload-validations'

const INITIAL_STATE = {
    name: "",
    price: 0,
    stock: 0,
    brand: "",
    category: "",
    shortDesc: "",
    longDesc: "",
    ageFrom: 0,
    ageTo: 0,
    img1: "",
    img2: "",
    img3: "",
    img4: ""
}

function Upload() {

    const inputProps = {
        name: {
            inputLabel: "Nombre",
            validation: validateName
        },
        price: {
            inputLabel: "Precio",
            inputType: "number",
            validation: validatePrice
        },
        stock: {
            inputLabel: "Stock inicial",
            inputType: "number",
            validation: validateStock
        },
        brand: {
            inputLabel: "Marca",
            validation: () => "" 
        },
        category: {
            inputLabel: "Categoria",
            validation: validateCategory
        },
        shortDesc: {
            inputLabel: "Descripción corta",
            validation: validateShort
        },
        longDesc: {
            inputLabel: "Descripción larga",
            inputType: "textarea",
            validation: validateLong
        },
        delivery: {
            inputLabel: "Envío sin cargo",
            inputType: "checkbox",
            validation: () => "" 
        },
        ageFrom: {
            inputLabel: "Edad desde",
            inputType: "number",
            validation: () => "" 
        },
        ageTo: {
            inputLabel: "Edad hasta",
            inputType: "number",
            validation: () => "" 
        },
        img1: {
            inputLabel: "Foto principal del producto",
            inputType: "file",
            validation: () => "" 
        },
        img2: {
            inputLabel: "Foto 2 del producto",
            inputType: "file",
            validation: () => "" 
        },
        img3: {
            inputLabel: "Foto 3 del producto",
            inputType: "file",
            validation: () => "" 
        },
        img4: {
            inputLabel: "Foto 4 del producto",
            inputType: "file",
            validation: () => "" 
        }
    }

    return (
        <div className='upload-container'>
            <FormLayout
                title="Crea un nuevo producto"
                inputProps={inputProps}
                onSubmit={postProducts}
                labelSubmit="Guardar producto"
                initialState={INITIAL_STATE}
                />
            <ScrollToTopOnMount />
        </div>

    )
}

export default Upload