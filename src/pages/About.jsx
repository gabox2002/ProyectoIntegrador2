import React from 'react';
import Button from '../components/Button'; 
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import images from '../components/Images';
import Text from '../components/Text';

function About() {
    return (
        <>
        <div className='about__container'>
            <Text renderAs="h2" content="¿Quiénes somos?"/>
         </div> 
        <main className="content">
            <section className="history">
                <article className="history__image">
                    <img src={images.image1} alt="jugueteria" />

                </article>
                <article className="history__description">
                    <h2 className="history__description--title">Nuestra Historia</h2>
                    <p className="history__description--content">¡Bienvenidos a la Juguetería Toys, donde la diversión y la imaginación se encuentran desde 1995! Fundada por Andrea Rodríguez, una apasionada educadora infantil con un sueño: crear un espacio donde los niños pudieran aprender y desarrollarse a través del juego.</p>
                </article>
            </section>

            <section className="mission">
                <article className="mission__image">
                    <img src={images.image2} alt="jugueteria" />
                </article>
                <article className="mission__description">
                    <h2 className="mission__description--title">Misión y Valores</h2>
                    <p className="mission__description--content">En Juguetería Cósmica, nos comprometemos a proporcionar juguetes que no solo entretengan, sino que también inspiren y eduquen. Nuestra misión es alimentar la creatividad, fomentar el aprendizaje y promover momentos felices en la infancia. Nos regimos por valores de calidad, responsabilidad y diversidad en nuestra selección de productos.</p>
                </article>
            </section>

            <section className="comunity">
                <article className="comunity__image">
                    <img src={images.image3} alt="jugueteria" />

                </article>
                <article className="comunity__description">
                    <h2 className="comunity__description--title">Compromiso con la Comunidad</h2>
                    <p className="comunity__description--content">Somos parte activa de nuestra comunidad. Hemos organizado eventos en colaboración con escuelas locales, donado juguetes a organizaciones benéficas y participado en programas educativos para niños. Creemos que contribuir a nuestra comunidad es esencial para construir un mundo más vibrante y solidario.</p>
                </article>
            </section>

            <section className="visit">
                <h2 className="visit--title">Conoce nuestra juguetería!! </h2>
                <Button
                    label="Catálogo"
                    className="about__button"
                    to="/" 
                    />
                
            </section>

            <section className="team">
                <h2 className="team__title">Nuestro Equipo</h2>
                <div className="team__members">
                    <div className="team__members__member">
                        <img className="team__members__member--photo" src={images.image4} alt="Foto de Miembro 1" />
                        <h3 className="team__members__member--name">Andrea</h3>
                        <p className="team__members__member--position">Presidencia</p>
                    </div>
                    <div className="team__members__member">
                        <img className="team__members__member--photo" src={images.image5} alt="Foto de Miembro 2" />
                        <h3 className="team__members__member--name">Federico</h3>
                        <p className="team__members__member--position">Adminitración</p>
                    </div>
                    <div className="team__members__member">
                        <img className="team__members__member--photo" src={images.image6} alt="Foto de Miembro 3" />
                        <h3 className="team__members__member--name">Martina</h3>
                        <p className="team__members__member--position">Tesorería</p>
                    </div>
                    <div className="team__members__member">
                        <img className="team__members__member--photo" src={images.image7} alt="Foto de Miembro 4" />
                        <h3 className="team__members__member--name">Josue</h3>
                        <p className="team__members__member--position">Ejecutivo de Ventas</p>
                    </div>
                </div>
            </section>
        </main>
        <ScrollToTopOnMount />
        </>
    );
}

export default About;
