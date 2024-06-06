export const validateName = (value) => {
    return value.trim().length >= 3 ? "" : "*El nombre debe tener al menos 3 caracteres.";
  };
  
export const validateEmail = (value) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(value.trim()) ? "" : "*Ingrese un correo electrónico válido.";
};

export const validateSubject = (value) => {
  return value.trim().length >= 3 ? "" : "*El asunto debe tener al menos 3 caracteres.";
};

export const validateBody = (value) => {
  return value.trim().length >= 10 ? "" : "*El mensaje debe tener al menos 10 caracteres.";
};
  