import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useState } from 'react'
import { ServicioPais } from '../service/ServicioPais';

const SelectPais= (props) => {

    const [countries, setCountries] = useState([])

    useEffect(() => {
        if(!countries[0]){
            const servicioPais = new ServicioPais();
            servicioPais.getPais().then(res => {
                setCountries(res.data)
            });
        }
    });

    const [paisSelect, setPaisSelect] = useState(props.value);

    const onCategoryChange = (e) => {
        setPaisSelect(e.value);
        console.log(e)
        props.onChange(e)
    }


    return (
        <div>
            <Dropdown id={props.name} name={props.name} value={paisSelect} options={countries} onChange={onCategoryChange} filter showClear filterBy="nombrePais" placeholder="Seleccione un País"
                        optionValue="idPais" optionLabel="nombrePais"/>
        </div>
    )
}

export default SelectPais
