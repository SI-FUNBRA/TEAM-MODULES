import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TipoArtSelectSection=styled.section`

    select{
        padding:10px 7rem 10px 10px;
        margin-bottom:32px;
        border:none;
        outline:none;
        border-radius:3px;
    }

`;

const TipoArtSelect = ({nameForm, valor, handChangeModal}) => {

    const URL=`${process.env.REACT_APP_API_URL}/tipoArticuloDonado`;

    const getData=async()=>{
        const response=await axios.get(URL);
        return response;
    }

    const [listTipoArt, setListTipoArt]=useState([]);

    useEffect(() => {
            getData().then((response)=>{
                setListTipoArt(response.data);
            })
    }, [])

    const [seleccionadoTipoArt, setSeleccionadoTipoArt]=useState({valor:valor});

    const handleChange=({target})=>{
        setSeleccionadoTipoArt({ valor:target.value })
        handChangeModal( {target} )
    }

    return (
        <TipoArtSelectSection>
            <select name={nameForm} id={nameForm} onChange={handleChange} value={seleccionadoTipoArt.valor} required>
                <option>Tipo Articulo</option>
                {
                    listTipoArt.map((TipoArt)=>(
                        <option key={TipoArt.idTipoArticuloDonado} value={TipoArt.idTipoArticuloDonado}>{TipoArt.nombreTipoArticulo}</option>
                    ))
                }
            </select>
        </TipoArtSelectSection>
    )
}

export default TipoArtSelect;
