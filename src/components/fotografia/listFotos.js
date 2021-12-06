import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import './assets/styles/dataview.css';
import ServicioFotografia from '../../service/ServicioFotografia';
import CardFoto from './cardFoto';

const ListFotos= () => {
    const [lista, setList] = useState([]);
    const [updatedList, setUpdatedList] = useState(false)


    const fotografiaService = new ServicioFotografia();

    const getFotografias=()=>{
        const fotografiaService = new ServicioFotografia();
        fotografiaService.getFotos().then(res => setList(res.data));
    }

    useEffect(() => {
        getFotografias()
    }, [updatedList]);


    return (
        <div className="dataview-demo">
            <div className="card">
                {
                lista.map((fotografia, index)=>(
                    <CardFoto
                    key={index}
                    fotografia={fotografia}
                    />
                ))
            }

            </div>

        </div>
    );
}

export default ListFotos
