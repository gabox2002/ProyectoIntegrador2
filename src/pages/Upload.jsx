import Text from '../components/Text'
import UploadForm from '../components/UploadForm'

function Upload() {
    return (
        <div className="upload-container">
            <Text renderAs="h2" content="Alta de Producto"/>
            <UploadForm />
        </div>
    );
}
export default Upload;
