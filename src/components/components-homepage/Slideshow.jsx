import React, { useRef } from 'react';

import styled from 'styled-components';
//Export images
import ImageOne from '../../images/ImageOne.jpg';
import ImageTwo from '../../images/ImageTwo.jpg';
import ImageThree from '../../images/ImageThree.jpg';
// import ImageFour from '../../images/ImageFour.jpg';

import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import { Button } from 'primereact/button'

const ContenedorPrincipal=styled.div`
  position:relative;
`;

const ContenedorSlideshow=styled.div`
  display:flex;
  flex-wrap: nowrap;
`;

const Slide=styled.div`
  min-width:100%;
  overflow: hidden;
  transition: .3 ease all;
  z-index: 10;
  max-height: 695.5px;
  position:relative;

  img{
     width:100%;
     vertical-align:top;
     height:100vh;
     object-fit:cover;
     filter: brightness(50%);
  }
`;

const TextoSlide=styled.div`
  position: absolute;
  bottom: 35%;
  // background: rgba(0,0,0,.5);
  color: #fff;
  width: 100%;
  padding: 10px 60px;
  text-align: center;

  h1{
    margin: 0 0 20px 0;
  }

  p{
    margin: 0 0 20px 0;
  }
`;

const Controles=styled.div`
  position:absolute;
  top:0;
  z-index:20;
  width: 100%;
  height:100%;
  pointer-events: none;

`;

const Boton=styled.button`
  pointer-events: all;
  border: none;
  cursor: pointer;
  outline:none;
  text-align:center;
  position:absolute;
  transition: .3s ease all;
  width:50px;
  height:50px;
  color:#fff;
  background:#000d1a;
  border-radius:50px;
  padding:10px;
  margin-top:22rem;
  user-select:none;

  ${props=>props.derecho ? 'right: 1.5rem' : 'left: 1.5rem'}
`;

const PrevArrow=styled(IoArrowBack)`
    ${Boton}
`;

const NextArrow=styled(IoArrowForward)`
    ${Boton}
`;

const Slideshow = (porps) => {

    const slideshow=useRef(null);

    const Anterior=()=>{
      if(slideshow.current.children.length>0){
          //Obtener el ultimo elemento del slideshow
          const index=slideshow.current.children.length-1;
          const ultimoElemento=slideshow.current.children[index];

          slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);

            //Establecer la transicion para el slideshow
            slideshow.current.style.transition=`none`;
           //Tamaño Slide
           const tamañoSlide=slideshow.current.children[0].offsetWidth;

           slideshow.current.style.transform=`translateX(-${tamañoSlide}px)`;

           setTimeout(()=>{
            slideshow.current.style.transition='300ms ease-out all';
              //Mover el slideshow
              slideshow.current.style.transform=`translateX(0)`;
           }, 30)

      }
    }

    const Siguiente=()=>{
      //Comprobar que si hayan elementos en el slideshow
      if(slideshow.current.children.length>0){
        //Obtener el primer elemento del slideshow
        const primerElemento=slideshow.current.children[0];

        //Establecer la transicion para el slideshow
        slideshow.current.style.transition=`300ms ease-out all`;

        //Tamaño Slide
        const tamañoSlide=slideshow.current.children[0].offsetWidth;

        //Mover el slideshow
        slideshow.current.style.transform=`translateX(-${tamañoSlide}px)`;

        const transicion=()=>{
          //Reiniciamos la posicion del slide
          slideshow.current.style.transition='none';
          slideshow.current.style.transform=`translateX(0)`;

          //mandar al final el primer elemento
          slideshow.current.appendChild(primerElemento);

          slideshow.current.removeEventListener('transitionend', transicion);
        }

        //EventListener para cuando termina la animación
        slideshow.current.addEventListener('transitionend', transicion);
      }
    }

    // useEffect(()=>{
    //    setInterval(()=>{
    //       Siguiente();
    //    }, 5000)
    // }, [])

    return (
        <ContenedorPrincipal  id='/inicio'>
          <ContenedorSlideshow ref={slideshow}>

            <Slide>

                <img src={ImageOne} alt="DonacionEcon" />

              <TextoSlide>
                <h1>¿Te gustaria Donar?</h1>
                <p>En nuestra fundación te agradecemos por tu colaboración<br /> es muy importante para tanto nosotros como para nuestros animalitos.</p>
                <Button  onClick={()=>porps.showDialog("/donacionEconomica")} primary='true' style={{'marginRight': 'auto', 'marginLeft': 'auto'}}>Donar</Button>
              </TextoSlide>
            </Slide>

            <Slide>

                <img src={ImageTwo} alt="Adoptar" />

              <TextoSlide>
                <h1>¿Te gustaria Adoptar?</h1>
                <p>Primero debes loguearte para poder ver algunas<br /> fotografias de nuestros animalitos.</p>
                <Button  onClick={()=>porps.showDialog('/catalogoAnimales')} primary='true' style={{'marginRight': 'auto', 'marginLeft': 'auto'}}>Ver Animales</Button>
              </TextoSlide>
            </Slide>
            <Slide>

                <img src={ImageThree} alt="DonarEspecie" />

              <TextoSlide>
                <h1>¿Te gustaria donar materiales?</h1>
                <p>Hoy puedes ser parte de la solución y sostenimiento<br /> de nuestra fundación, brindandonos un apoyo material, generando grandes cambios.</p>
                <Button  onClick={()=>porps.showDialog('/donacionEspecie')} primary='true' style={{'marginRight': 'auto', 'marginLeft': 'auto'}}>Donar en Especie</Button>
              </TextoSlide>
            </Slide>

          </ContenedorSlideshow>
            <Controles>
                <Boton onClick={Anterior}>
                    <PrevArrow />
                </Boton>
                <Boton derecho onClick={Siguiente}>
                    <NextArrow />
                </Boton>
            </Controles>

        </ContenedorPrincipal>
    )
}

export default Slideshow;
