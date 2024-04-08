import Text from '../components/Text'
import Form from '../components/Form'

function Contact() {
    return (
        <div className='contact__container'>
            <Text renderAs="h2" content="Envíanos un mensaje"/>
            <Form mostrarFormContacto={true} buttonLabel="Enviar" />
        </div>
    )
}
export default Contact