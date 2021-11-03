import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { ServicioTipoDoc } from '../../service/ServicioTipoDoc';

const SelectTipoDocumento = (props) => {

    const [tiposDoc, setTiposDoc] = useState([])

    useEffect(() => {
        const servicioTipoDoc = new ServicioTipoDoc();
        servicioTipoDoc.getTiposDoc().then(res => setTiposDoc(res.data));
    }, []);

    const [tipoDoc, setTipoDOc] = useState(props.value)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setTipoDOc(e.value);
        props.onChange(e)
    }


    return (
        <div className="field">
            <div className="formgrid grid">
                {
                    tiposDoc.map((_tipoDoc )=>(
                        <div key={_tipoDoc.idTipoDoc} className="field-radiobutton col-6">
                            <RadioButton inputId={props.name} name={props.name} value={_tipoDoc.idTipoDoc} onChange={onCategoryChange} checked={tipoDoc === _tipoDoc.idTipoDoc} />
                            <label htmlFor={props.name} >{_tipoDoc.nombreTipoDoc}</label>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectTipoDocumento
