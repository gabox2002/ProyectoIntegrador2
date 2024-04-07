import Form from '../components/Form';

function Upload() {
    return (
        <div className="upload-container">
            <h2>Alta de Producto</h2>
            <Form mostrarFormAlta={true} buttonLabel="Enviar" />
        </div>
    );
}
export default Upload;