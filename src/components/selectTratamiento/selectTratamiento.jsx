import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { ServicioTratamiento } from '../../service/ServicioTratamiento';

const SelectTratamiento = (props) => {

    const [tratamientos, setTratamientos] = useState([])

    useEffect(() => {
        const servicioTratamiento = new ServicioTratamiento();
        servicioTratamiento.getTratamiento().then(res => setTratamientos(res.data));
    }, []);

    const [tratamiento, setTratamiento] = useState(props.idTratamiento)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setTratamiento(e.value);
        props.onInputChange(e, 'idTratamiento_FK')
    }


    return (
        <div className="field">
            <label>Tratamientos</label>
            <div className="formgrid grid">
                {
                    tratamientos.map((_tratamiento )=>(
                        <div key={_tratamiento.idTratamiento} className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value={_tratamiento.idTratamiento} onChange={onCategoryChange} checked={tratamiento === _tratamiento.idTratamiento} />
                            <label htmlFor="category1">{_tratamiento.nombreTratamiento}</label>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectTratamiento
