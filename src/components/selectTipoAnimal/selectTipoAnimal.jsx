import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { ServicioTipoAnimal } from '../../service/ServicioTipoAnimal';

const SelectTipoAnimal = (props) => {

    const [tiposAnimal, setTiposAnimal] = useState([])

    useEffect(() => {
        const servicioTipoAnimal = new ServicioTipoAnimal();
        servicioTipoAnimal.getTipoAnimal().then(res => setTiposAnimal(res.data));
    }, []);

    const [tipoAnimal, setTipoAnimal] = useState(props.idTipoAnimal)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setTipoAnimal(e.value);
        props.onInputChange(e, 'idTipoAnimal_FK')
    }


    return (
        <div className="field">
            <label>Tipo de animal</label>
            <div className="formgrid grid">
                {
                    tiposAnimal.map((_tipoAnimal )=>(
                        <div key={_tipoAnimal.idTipoAnimal} className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value={_tipoAnimal.idTipoAnimal} onChange={onCategoryChange} checked={tipoAnimal === _tipoAnimal.idTipoAnimal} />
                            <label htmlFor="category1">{_tipoAnimal.nombreTipoAnimal}</label>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectTipoAnimal
