import React from 'react';
import styled from 'styled-components';
import rw01 from '../../images/recent-work-01.jpg';
import rw02 from '../../images/recent-work-02.jpg';
import rw03 from '../../images/recent-work-03.jpg';

const ModulosSection=styled.section`
`;


const Modulos = () => {
    return (
        <ModulosSection id='/modulos'>
            <section className="py-5 mb-5">
                <div className="container">
                    <div className="recent-work-header row text-center pb-5">
                        <h2 className="col-md-6 m-auto h2 semi-bold-600 py-5">Módulos</h2>
                    </div>
                    <div className="row gy-5 g-lg-5 mb-4">

                        <div className="col-md-4 mb-3">
                            <a href="#" className="recent-work card border-0 shadow-lg overflow-hidden">
                                <img className="recent-work-img card-img" src={rw01} alt="Card image" />
                                <div className="recent-work-vertical card-img-overlay d-flex align-items-end">
                                    <div className="recent-work-content text-start mb-3 ml-3 text-dark">
                                        <h3 className="card-title light-300">Donaciones</h3>
                                        <p className="card-text">La forma perfecta para poder ayudar a los animalitos de manera económica, la donación no es obligatoria pero ayudará mucho a muestro sistema.</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-md-4 mb-3">
                            <a href="/catalogoAnimales" className="recent-work card border-0 shadow-lg overflow-hidden">
                                <img className="recent-work-img card-img" src={rw02} alt="Card image" />
                                <div className="recent-work-vertical card-img-overlay d-flex align-items-end">
                                    <div className="recent-work-content text-start mb-3 ml-3 text-dark">
                                        <h3 className="card-title light-300">Adopciones</h3>
                                        <p className="card-text">Si quieres que te proporcionen cariño y compañía este módulo de adopciónes es para tí, dónde se encontrarán diferentes animalitos que puedes adoptar con sus especificaciones mas importantes.</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="col-md-4 mb-3">
                            <a href="#" className="recent-work card border-0 shadow-lg overflow-hidden">
                                <img className="recent-work-img card-img" src={rw03} alt="Card image" />
                                <div class="recent-work-vertical card-img-overlay d-flex align-items-end">
                                    <div className="recent-work-content text-start mb-3 ml-3 text-dark">
                                        <h3 className="card-title light-300">Participaciones</h3>
                                        <p className="card-text">Por último se encuentra el módulo de participaciónes dónde si eres una persona que le interesa mucho nuestra causa te puedes unir y trabajar con nosotros para que más animalitos no sigan en más calles.</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </ModulosSection>
    )
}

export default Modulos;
