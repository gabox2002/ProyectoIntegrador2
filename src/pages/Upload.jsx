import Text from '../components/Text'
import Form from '../components/Form'

function Upload() {
    return (
        <div className="upload-container">
            <Text renderAs="h2" content="Alta de Producto"/>
            <Form mostrarFormAlta={true} buttonLabel="Enviar" />
        </div>
    );
}
export default Upload;