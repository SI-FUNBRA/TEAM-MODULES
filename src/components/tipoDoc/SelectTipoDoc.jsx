import React, { useEffect, useState } from 'react'
import { ServicioTipoDoc } from '../../service/ServicioTipoDoc';
import { SelectButton } from 'primereact/selectbutton';

const SelectTipoDocumento = (props) => {

    const [tiposDoc, setTiposDoc] = useState([])

    useEffect(() => {
        const servicioTipoDoc = new ServicioTipoDoc();
        servicioTipoDoc.getTiposDoc().then(res => {
            let arreglo = []
            res.data.forEach(el => {
                arreglo.push({id:el.idTipoDoc, name:el.nombreTipoDoc})
            });
            setTiposDoc(arreglo)
        });
    }, []);

    const [tipoDoc, setTipoDOc] = useState(props.value)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setTipoDOc(e.value);
        if(e.target.value){
            e.target.name = props.name
            e.target.value = e.value.id
        }else{
            e.target.name = props.name
            e.target.value = 0
        }
        props.onChange(e)
    }



    return (
        <div className="field">
            <SelectButton className="mt-4" tooltip="Tipo Documento" value={tipoDoc} onChange={e=>onCategoryChange(e)} options={tiposDoc} optionLabel="name" />
        </div>
    )
}

export default SelectTipoDocumento
