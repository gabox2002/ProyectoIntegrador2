
export const validatePrice = value => 
    value <= 0 ? "El precio debe ser un valor mayor a cero." : "" ;

export const validateStock = value => 
    value <= 0 ? "El stock debe ser un valor mayor a cero." : "" ;

export const validatShort = value => 
    value.length <= 10 ? "El texto tiene que tener un valor mayor a 10 caracteres." : "" ;

export const validateLong = value => 
    value.length <= 30 ? "El texto tiene que tener un valor mayor a 10 caracteres." : "" ;