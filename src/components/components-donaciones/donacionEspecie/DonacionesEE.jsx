import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Buutton } from '../../components-homepage/Buutton';
import TipoArtSelect from './TipoArtSelect';

import {AiOutlinePlus} from 'react-icons/ai';
import {CgDanger} from 'react-icons/cg';

import './stylesLocalStorage.css';
import DataDonE from './DataDonE';

const Section=styled.section`
    span{
        display:block;
        text-align:center;
    }

    p{
        padding:50px;
        text-align:justify;
        background-color:#C8C8C8;
        border-radius:10px 0 10px 0;
        margin:30px 30px 30px 5px;
    }
`;

const HeroHeading=styled.h1`
    color:#576975;
    text-align:center;
    font-size:48px;
    margin:25px 0 0 0;
`;

const DonacionEEContainer=styled.div`
    padding:3rem calc((100vw-1300px)/2);
    display:grid;
    grid-template-columns:53rem 500px;
    grid-template-rows:700px;

    @media screen and (max-width:768px){
        grid-template-columns:1fr;
    }
`;

const ColumnLeft=styled.div`
    // order:${({reverse}) => (reverse ? '2' : '1')};
    justify-content:center;
    align-items:center;

    @media screen and (max-width: 768px){
        order:${({reverse}) => (reverse ? '1' : '2')};
    }

    img{
        width:100%;
        height:100%;
        object-fit:cover;

        @media screen and (max-width: 768px){
            width:90%;
            hight:90%;
        }
    }
`;

const ColumnRight=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    line-height:1.4;
    padding: 1rem;
    // order:${({reverse}) => (reverse ? '1' : '2')};

    h1{
        margin-bottom:1rem;
        font-size: clamp(1.5rem, 6vw, 2rem);
    }

    p{
        margin-bottom:2rem;
    }

    .invisible{
        display:none;
    }

    .visible{
        display:block;
`;

//FORM Donacion Especie

const DESection=styled.div`
    margin: 15px -100px 20px 20px;
`;

const DEFormWrap=styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;

    @media screen and (max-width:400px){
        height:80%;
    }
`;

const DEFormContent=styled.div`
    height:100%;
    display: flex;
    flex-direction:column;
    justify-content:center;

    @media screen and (max-width:480px){
        padding:10px;
    }
`;

const DEForm=styled.form`
    background:#EFEFEF;
    max-width: 50rem;
    height:auto;
    width:100%;
    z-index:1;
    display:grid;
    margin:0 auto;
    padding:50px 50px;
    border-radius:4px;

    @media screen and (max-width:400px){
        padding:32px 32px;
    }
`;

const DEFormLabel=styled.label`
    margin-bottom:8px;
    font-size:14px;
    color:#000;
`;

const DEFormInput=styled.input`
    padding:16px 16px;
    margin-bottom:32px;
    border:none;
    outline:none;
    border-radius:3px;
`;


const DEFormTwo=styled.form`
    background: rgba( 218, 215, 215, 0.6 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 5px );
    -webkit-backdrop-filter: blur( 5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );


    max-width: 60rem;
    height:auto;
    width:100%;
    z-index:1;
    display:grid;
    margin:-190px 0px 0px 0px;
    padding:50px 30px;
    border-radius:4px;

    @media screen and (max-width:400px){
        padding:32px 32px;
    }
`;

const DEFormInputTwo=styled.input`
    padding:10px 10px;
    margin: 0 150px 32px 0;
    border:none;
    outline:none;
    border-radius:3px;
`;


const validateForm=(dataSolDonEsp,
    // nombreArticuloDonado, cantidadArticuloDonado
    )=>{

    //Errores
    let errors={}

    //Validaciones

    if(!dataSolDonEsp.lugarEntrega.trim()){
        errors.lugarEntrega='El campo "Lugar Entrega" es requerido';
    }

    if(!dataSolDonEsp.fechaEntrega.trim()){
        errors.fechaEntrega='El campo "Fecha Entrega" es requerido';
    }

    // if(!nombreArticuloDonado.trim()){
    //     errors.nombreArticuloDonado='El campo "nombre Articulo" es requerido';
    // }

    // if(!cantidadArticuloDonado.trim()){
    //     errors.cantidadArticuloDonado='El campo "Cantidad Articulo" es requerido';
    // }

    return errors;
}

const DonacionesEE = () => {

    //obtener el valor del sessionStorage
    const getDatafromDE=()=>{
        const data=sessionStorage.getItem('dataSolDonEsp.ArticulosDonados');
        if(data){
            return JSON.parse(data);
        }else{
            return [];
        }
    }

    //Errors
    const[errors, setErrors]=useState({});
    const [estado, setEstado] = useState("invisible")

    //tabla emergente
    const mostrarContenedor=(e) =>{
        e.preventDefault();
        handleChange(e);
        setErrors(validateForm(dataSolDonEsp));
        setEstado("visible");
    }

    const ocultar=(e)=>{
        e.preventDefault();
        setEstado("invisible")
    }

    const [dataSolDonEsp, setDataSolDonEsp]=useState({
        estadoSolicitud:"",
        fechaEntrega:"",
        lugarEntrega:"",
        ArticulosDonados:[]
    });

    const handleChange=({target})=>{
        setDataSolDonEsp({
            ...dataSolDonEsp,
            [target.name]:target.value
        });
        console.log(dataSolDonEsp);
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //NUEVO

    const[dataa, setDataa]=useState(getDatafromDE())

    const [tipoArticuloDonado, setTipoArticuloDonado]=useState('');
    const [nombreArticuloDonado, setNombreArticuloDonado]=useState('');
    const [cantidadArticuloDonado, setCantidadArticuloDonado]=useState('');

    useEffect(()=>{
        sessionStorage.setItem('dataSolDonEsp.ArticulosDonados', JSON.stringify(dataSolDonEsp.ArticulosDonados));
    }, [dataSolDonEsp.ArticulosDonados]);

    //Eliminar un registro de dataa
    const deleteDataa=(idTipoArticuloDonado_FK)=>{
        const filteredDataa=dataSolDonEsp.ArticuloDonados.filter((element,index)=>{
            return element.idTipoArticuloDonado_FK!==idTipoArticuloDonado_FK
        })
        setDataa(filteredDataa);
    }

    // const handleBlur=(e)=>{
    //     handleChange(e);
    //     setErrors(validateForm(dataSolDonEsp));
    // }

    // const handleBlurNAD=(e)=>{
    //     handleChange(e);
    //     setErrors(validateForm(nombreArticuloDonado));
    // }

    // const handleBlurCAD=(e)=>{
    //     handleChange(e);
    //     setErrors(validateForm(cantidadArticuloDonado));
    // }

    const URL='http://localhost:3005/api/solicitudDonacionEspecie';

    const handleSubmit=(e)=>{
        e.preventDefault();

        console.log(dataSolDonEsp);

        axios.post(URL, dataSolDonEsp).then((res)=>{
            if(res.status===201){
                alert('Donacion en Especie registrada con exito!');
            }else{
                alert('Ocurrio un error');
            }
        }).catch(err=>console.log(err));

    };


    const handleProducto=(e)=>{
        e.preventDefault();
        setDataSolDonEsp({
            ...dataSolDonEsp,
            ArticulosDonados:[
                ...dataSolDonEsp.ArticulosDonados,
                {
                    "idTipoArticuloDonado_FK": document.getElementById('idTipoArticuloDonado_FK').value,
                    nombreArticuloDonado:nombreArticuloDonado,
                    cantidadArticuloDonado: cantidadArticuloDonado
                }
            ]
        });
    }

    return (
        <Section id='/donaciones'>
            <HeroHeading>Donación en Especie</HeroHeading>
            <span>Para realizar donaciones en especie puedes hacerlo de la siguiente manera</span>
            <DonacionEEContainer>
                <ColumnLeft>
                <DESection>
                <Button variant="warning" onClick={handleShow} className="my-3 ml-3"><CgDanger /></Button>

                        <Modal
                            show={show}
                            onHide={handleClose}
                            animation={false}
                            size="lg"
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Información</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Donaciones en especie:</strong><br /><br />
                            <i>1. Dejar pago el alimento (concentrado) en almacén veterinario: </i>
                            En este caso el Director Operativo del Refugio lo recogerá. Avisar al correo FUNBRA@gmail.com y/o al celular/whatsapp 3116327238 sobre la fecha de la operación, el sitio donde se realizó (nombre y dirección), así como el nombre y el teléfono de la persona encargada de la misma dentro del almacén. Recomendamos a Deganado Norte y/o Sur, debido a que nos conocen, siempre tienen el producto y el mejor precio.<br />

                            <i>2. Comprar el alimento (concentrado) y llevarlo a diferentes puntos de recepción en Mosquera según su comodidad:</i>
                            OHLALA MAKE UP BAR, MIMA MIRIMA (Se especifican en la siguiente diapositiva).<br />

                            <i>3. Comprar el alimento concentrado y llevarlo directamente al albergue.</i>
                            Si se trata de concentrado se hace necesario traerlo directamente al Refugio Canino (Waze y/o Google Maps con dirección “fundación animal”).
                            Aprovecha y conoce nuestras instalaciones y comparte con nuestros mas de 1000 animales y conoce la magnitud de la labor social que se está realizando. <br />

                            <i>4.Donación de drogas de uso humano y/o veterinario:</i><br />
                            - Nueva o de segunda (abierta o averiada) puede utilizar los medios arriba indicados para el alimento.<br />
                            - Si los medicamentos se van a comprar nuevos, se hace necesario antes de hacerlo, comunicarse con el Director Operativo del Refugio para poder definir con el cual es la droga que es prioritaria de comprar en ese momento. Celular 311 6327238 <br />

                            <i>5. Donación de elementos y materiales de aseo y limpieza:</i>
                            Seguir el procedimiento anotado para el alimento (Paso 2 y 3), No aplica dejarlo pago para que sea recogido en el sitio de compra.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>
                        </Modal.Footer>
                        </Modal>

                        <DEFormWrap>
                            <DEFormContent>
                                <DEForm action=''>

                                    <DEFormLabel htmlFor='for'>Estado Solicitud:</DEFormLabel>
                                    <DEFormInput type='text' name="estadoSolicitud" value={dataSolDonEsp.estadoSolicitud = 'En Espera'} onChange={handleChange} style={{'color': 'grey'}} disabled />

                                    <DEFormLabel htmlFor='for'>Ingrese la fecha <span className="text-danger d-inline">*</span></DEFormLabel>
                                    <DEFormInput type='date' min='1910-01-01' max='2002-12-31'  name="fechaEntrega" value={dataSolDonEsp.fechaEntrega} onChange={handleChange}  />

                                    <DEFormLabel htmlFor='for'>Ingrese el lugar <span className="text-danger d-inline">*</span></DEFormLabel>
                                    <DEFormInput type='text' name="lugarEntrega" value={dataSolDonEsp.lugarEntrega} onChange={handleChange}  style={{'marginBottom': '5px'}} />

                                    {errors.lugarEntrega&&<span className="text-start text-danger ">{errors.lugarEntrega}</span>}

                                    <button className='btn btn-primary mx-5 my-3' onClick={mostrarContenedor}><AiOutlinePlus /> Agregar Articulos</button>

                                    <div>
                                        {dataSolDonEsp.ArticulosDonados.length>0 && <>
                                            <div className="table-responsive mt-3">
                                                <table className="table table-bordered ">
                                                    <thead>
                                                        <tr>
                                                            <th>Tipo articulo</th>
                                                            <th>Nombre Articulo</th>
                                                            <th>Cantidad</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <DataDonE dataa={dataSolDonEsp.ArticulosDonados} deleteDataa={deleteDataa} />
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button className="btn btn-danger btn-block" onClick={()=>setDataa([])}>Eliminar Todo</button>

                                            <button className="btn btn-warning float-right my-4" onClick={handleSubmit}>Enviar Todo</button>
                                        </>}
                                        {dataSolDonEsp.ArticulosDonados.length < 1 && <div className="text-center text-muted">No hay Articulos agregados aún</div>}
                                    </div>
                                </DEForm>
                            </DEFormContent>
                        </DEFormWrap>
                    </DESection>
                    <Buutton className="mx-5" to='/donacionEconomica/listDonEsp' primary='true' style={{'margin-top':'1.5rem'}}>Ir</Buutton>
                </ColumnLeft>
                <ColumnRight className={estado}>
                        <DEFormTwo action='' onSubmit={handleProducto}>

                            <TipoArtSelect nameForm={"idTipoArticuloDonado_FK"} handChangeModal={handleChange} />

                            <DEFormLabel htmlFor='for'>Ingrese el nombre <span className="text-danger d-inline">*</span></DEFormLabel>
                            <DEFormInputTwo type='text' name="nombreArticuloDonado" value={nombreArticuloDonado} onChange={(e)=>setNombreArticuloDonado(e.target.value)}  />

                            <DEFormLabel htmlFor='for'>Ingrese la cantidad <span className="text-danger d-inline">*</span></DEFormLabel>
                            <DEFormInputTwo type='number' name="cantidadArticuloDonado" value={cantidadArticuloDonado} onChange={(e)=>setCantidadArticuloDonado(e.target.value)}  />

                            <button className='btn btn-success mx-5 my-3'>Enviar</button>
                            <button className='btn btn-danger mx-5' onClick={ocultar}>Cancelar</button>
                        </DEFormTwo>
                </ColumnRight>
            </DonacionEEContainer>
        </Section>
    )
}

export default DonacionesEE;
