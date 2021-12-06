import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { ServicioAnimal } from '../../service/ServicioAnimal';

const SelectAnimal = (props) => {

    const [animales, setAnimales] = useState([])

    useEffect(() => {
        const animalService = new ServicioAnimal();
        animalService.getAnimales().then(res => setAnimales(res.data));
    }, []);

    const [animal, setAnimal] = useState(props.idAnimal)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setAnimal(e.value);
        props.onInputChange(e, 'idAnimal_FK')
    }


    return (
        <div className="field">
            <label>Animal</label>
            <div className="formgrid grid">
                {
                    animales.map((_animal )=>(
                        <div key={_animal.idAnimal} className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value={_animal.idAnimal} onChange={onCategoryChange} checked={animal === _animal.idAnimal} />
                            <label htmlFor="category1">{_animal.nombreAnimal}</label>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectAnimal
