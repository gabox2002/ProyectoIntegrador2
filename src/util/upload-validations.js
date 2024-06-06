export const validateName = (value) => {
    return value.trim().length >= 3 ? "" : "*El nombre debe tener al menos 3 caracteres." }

export const validateCategory = (value) => {
    return value.trim().length >= 3 ? "" : "*La categoría debe tener al menos 3 caracteres." }

export const validatePrice = value => 
    value <= 0 ? "*El precio debe ser un valor mayor a cero." : "" ;

export const validateStock = value => 
    value <= 0 ? "*El stock debe ser un valor mayor a cero." : "" ;

export const validateShort = value => 
    value.length < 10 ? "*El texto tiene que tener un valor mayor o igual a 10 caracteres." : "" ;

export const validateLong = value => 
    value.length < 30 ? "*El texto tiene que tener un valor menor o igual a 30 caracteres." : "" ;
