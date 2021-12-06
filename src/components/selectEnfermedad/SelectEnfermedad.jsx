import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { ServicioEnfermedad } from '../../service/ServicioEnfermedad';

const SelectEnfermedad = (props) => {

    const [enfermedades, setEnfermedades] = useState([])

    useEffect(() => {
        const servicioEnfermedad = new ServicioEnfermedad();
        servicioEnfermedad.getEnfermedad().then(res => setEnfermedades(res.data));
    }, []);

    const [enfermedad, setEnfermedad] = useState(props.idEnfermedad)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setEnfermedad(e.value);
        props.onInputChange(e, 'idEnfermedad_FK')
    }


    return (
        <div className="field">
            <label>Enfermedad</label>
            <div className="formgrid grid">
                {
                    enfermedades.map(( _enfermedad )=>(
                        <div key={_enfermedad.idEnfermedad} className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value={_enfermedad.idEnfermedad} onChange={onCategoryChange} checked={enfermedad === _enfermedad.idEnfermedad} />
                            <label htmlFor="category1">{_enfermedad.nombreEnfermedad}</label>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectEnfermedad
