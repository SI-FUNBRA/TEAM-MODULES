import React from 'react';
import styled from 'styled-components';

const FuncionalidadesSection=styled.section`
        min-height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 0;

        .timeline {
          width: 80%;
          height: auto;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .timeline ul {
          list-style: none;
        }
        .timeline ul li {
          padding: 20px;
          background-color:#FFFAFA;
          color: #000;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .timeline ul li:last-child {
          margin-bottom: 0;
        }
        .timeline-content h1 {
          font-weight: 500;
          font-size: 20px;
          line-height: 30px;
          margin-bottom: 10px;
        }
        .timeline-content p {
          font-size: 15px;
          line-height: 20px;
          font-weight: 300;
        }
        .timeline-content {
          font-size: 12px;
          font-weight: 300;
          margin-bottom: 10px;
          letter-spacing: 2px;
        }
        @media only screen and (min-width: 768px) {
          .timeline:before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 100%;
            background-color: gray;
          }
          .timeline ul li {
            width: 50%;
            position: relative;
            margin-bottom: 50px;
          }
          .timeline ul li:nth-child(odd) {
            float: left;
            clear: right;
            transform: translateX(-30px);
            border-radius: 20px 0px 20px 20px;
          }
          .timeline ul li:nth-child(even) {
            float: right;
            clear: left;
            transform: translateX(30px);
            border-radius: 0px 20px 20px 20px;
          }
          .timeline ul li::before {
            content: "";
            position: absolute;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background-color: gray;
            top: 0px;
          }
          .timeline ul li:nth-child(odd)::before {
            transform: translate(50%, -50%);
            right: -30px;
          }
          .timeline ul li:nth-child(even)::before {
            transform: translate(-50%, -50%);
            left: -30px;
          }
          .timeline-content .date {
            position: absolute;
            top: -30px;
          }
          .timeline ul li:hover::before {
            background-color: #11B3C9;
          }
        }
  }
`;

const Funcionalidades = () => {
    return (
          <div id='/funcionalidades'>
              <div className="recent-work-header row text-center pt-5">
                  <h2 className="col-md-6 m-auto h2 semi-bold-600 ">Funcionalidades</h2>
              </div>
              <FuncionalidadesSection>
                <div className="timeline">
                  <ul>
                    <li>
                      <div className="timeline-content">
                        <h1><strong>Citas</strong></h1>
                        <p>Asignamos citas para tus adopciones acoplandonos siempre a tu, participaciones y donaciones en especie y todo a como se te acomode el horario, y siempre desde tu celular.</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-content">
                        <h1><strong>Seguimiento Animales</strong></h1>
                        <p>Somos muy cuidadosos cuando tenemos bajo nuestra responsabilidad un animalito, asi que llevar siempre su seguimiento actualizado y transparente para nosotros es una prioridad.</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-content">
                        <h1><strong>Gestion Animales</strong></h1>
                        <p>Gracias a las nuevas actualizaciones y estrategias de ZOOPPORT las gestiones son mas rapidaz y con unos patrones muy eficacez, que en cualquier situación siempre se tendra el control veloz de esto.</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-content">
                        <h1><strong>Reporte</strong></h1>
                        <p>Tanto en archivos pdf, excel, json y csv podemos mostrarte cada reporte que generamos dependiendo de la funcionalidad que desees, eso si, siempre con detalles que facilitaran el entendimiento de los mismos.</p>
                      </div>
                    </li>
                  </ul>
                </div>
            </FuncionalidadesSection>
          </div>
    );
};

export default Funcionalidades;
