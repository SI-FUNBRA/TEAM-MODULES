import React from 'react';
import styled from 'styled-components';


const VentajasSection=styled.section`

    padding: 10px 0;
    .section-header h3 {
        font-size: 36px;
        color: #413e66;
        text-align: center;
        font-weight: 700;
        position: relative;
    }
    .section-header {
    margin-bottom: 40px;
    }

    @media (max-width: 767px) {
    .testimonial-item {
        text-align: center;
    }
    }

    .testimonial-item .testimonial-img {
    width: 120px;
    border-radius: 50%;
    border: 4px solid #fff;
    float: left;
    }

    @media (max-width: 767px) {
    .testimonial-item .testimonial-img {
        float: none;
        margin: auto;
    }
    }

    .testimonial-item h3 {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0 5px 0;
    color: #111;
    margin-left: 140px;
    }

    .testimonial-item h4 {
    font-size: 14px;
    color: #C0C0C0;
    margin: 0 0 15px 0;
    margin-left: 80px;
    }

    .testimonial-item p {
    font-style: italic;
    margin: 0 0 15px 100px;
    }

    @media (min-width: 992px) {
    .testimonial-item p {
        width: 80%;
    }
    }

    @media (max-width: 767px) {
    .testimonial-item h3, #testimonials .testimonial-item h4, #testimonials .testimonial-item p {
        margin-left: 0;
    }
    }

    .swiper-pagination {
    margin-top: 20px;
    position: relative;
    }

    .swiper-pagination .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background-color: #fff;
    opacity: 1;
    border: 1px solid #1bb1dc;
    }

    .swiper-pagination .swiper-pagination-bullet-active {
        background-color: #1bb1dc;
    }

    @media screen and (max-width: 1048px){
        margin: 0 -5rem;
    }

    @media screen and (max-width: 860px){
        margin: 0 -10rem;
    }

    @media screen and (max-width: 680px){
        margin: 0 -13rem;
    }

`;

const Ventajas = () => {
    return (
        <VentajasSection id='/ventajas'>
            <div className="recent-work-header row text-center">
                <h2 className="col-md-6 m-auto h2 semi-bold-600 py-5">Ventajas</h2>
            </div>
            <section id="testimonials" className="testimonials py-5 mb-5" style={{'margin': '0 15rem 0 15rem', 'borderRadius': '7px', 'background': '#5d55e3'}}>
            <div className="container" data-aos="zoom-in">

                <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="testimonials-slider swiper-container" data-aos="fade-up" data-aos-delay="100">
                    <div className="swiper-wrapper">

                        <div className="swiper-slide mb-4">
                        <div className="testimonial-item">
                            <a className="filter-btn nav-link active btn-outline-light rounded-pill text-dark px-4 light-600 mb-3" href="/" data-filter=".project">Virtualización</a>
                            <h4>Todo desde la comodidad de tu casa</h4>
                            <p className="text-light">
                                Tan solo con entrar a nuestra página podras acceder a nuestros servicios y contactarnos rapidamente en cualquier situacion.
                            </p>
                        </div>
                        </div>

                        <div className="swiper-slide">
                        <div className="testimonial-item">

                        <a className="filter-btn nav-link active btn-outline-light rounded-pill text-dark px-4 light-600 mb-3" href="/" data-filter=".project">Comodidad</a>
                            <h4>Facilidad al Usar</h4>
                            <p className="text-light">
                                No necesitas saber demaciado o buscar mucho para saber donde puedes encontrar lo que quieres
                            </p>
                        </div>
                        </div>

                        <div className="swiper-slide">
                        <div className="testimonial-item">

                        <a className="filter-btn nav-link active btn-outline-light rounded-pill text-dark px-4 light-600 mb-3" href="/" data-filter=".project">Intuitivo</a>
                            <h4>Interfaces muy explicitas</h4>
                            <p className="text-light">
                            Todo esta a tu alcance, cada apartado es facil de encontrar y siempre tienen un identificador grafico que recordaras muy bien la proxima vez que ingrese.
                            </p>
                        </div>
                        </div>

                        <div className="swiper-slide">
                        <div className="testimonial-item">
                        <a className="filter-btn nav-link active btn-outline-light rounded-pill text-dark px-4 light-600 mb-3" href="/" data-filter=".project">Ayuda</a>
                            <h4>your assistant</h4>
                            <p className="text-light">
                            Si tienes problemas con algo, puedes contactarnos llamando a nuestro numero telefonico, escribir a nuestro correo o si es algo relacionado con encontrar algo en la pagina puedes leer el instructivo.
                            </p>
                        </div>
                        </div>

                    </div>
                    <div className="swiper-pagination"></div>
                    </div>
                </div>
                </div>

            </div>
            </section>
        </VentajasSection>
    );
}

export default Ventajas;
