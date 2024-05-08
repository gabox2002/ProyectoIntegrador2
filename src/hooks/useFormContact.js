import { useState } from 'react';

const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
    // Validar el campo y actualizar los errores
          const newErrors = { ...errors };
    
    switch (name) {
      case 'nombre':
        newErrors.nombre = value.trim().length < 3 ? '*Debe tener al menos 3 caracteres' : '';
        break;
        case 'correo':
          const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        newErrors.correo = !correoRegex.test(value) ? '*Ingrese un correo electrónico válido' : '';
        break;
        case 'comentario':
          newErrors.comentario = !value.trim() ? '*El campo comentario no puede estar vacío' : '';
          break;
          
          case 'asunto':
            newErrors.asunto = !value.trim() ? '*El comentario no puede estar vacío' : '';
            break;
            default:
              break;
            }
            
            setErrors(newErrors);
          };
          
          const validateForm = () => {
            const newErrors = {};
            
            // Validación del campo "nombre"
            if (!values.nombre || values.nombre.trim().length < 3) {
              newErrors.nombre = "*Debe tener al menos 3 caracteres";
            }
            
            // Validación del campo "correo"
            const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!values.correo || !correoRegex.test(values.correo)) {
              newErrors.correo = "*Ingrese un correo electrónico válido";
            }
            
            // Validación del campo "comentario"
            if (!values.comentario) {
              newErrors.comentario = "*El campo comentario no puede estar vacío";
            }
            
            // Validación del campo "asunto"
            if (!values.asunto) {
              newErrors.asunto = "*El comentario no puede estar vacío";
            }
            
            setErrors(newErrors);
            
            // Retorna true si no hay errores, false si hay al menos un error
            return Object.keys(newErrors).length === 0;
          };
          
          return { values, errors, handleChange, setValues, validateForm };
        };

export default useForm;
