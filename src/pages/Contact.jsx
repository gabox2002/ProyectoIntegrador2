//Contact.jsx
import Text from '../components/Text'
import ContactForm from '../components/ContactForm'

function Contact() {
    return (
        <div className='contact__container'>
            <Text renderAs="h2" content="Envíanos un mensaje"/>
            <ContactForm />
        </div>
    )
}
export default Contact

