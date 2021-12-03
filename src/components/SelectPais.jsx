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

    const countryOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <i className="pi pi-map-marker p-mr-2"/>
                <span>{option.nombrePais}</span>
            </div>
        );
    }

    return (
        <div>
                {/* <Dropdown  id={props.name} name={props.name} value={paisSelect} itemTemplate={countryOptionTemplate} options={countries} onChange={onCategoryChange} emptyFilterMessage={'No se a encontrado ningun resultado'} emptyMessage={'No se a encontrado ningun resultado'} optionValue="idPais" optionLabel="nombrePais" filter showClear filterBy="nombreCiudad"/>
                 */}<Dropdown id={props.name} name={props.name} value={paisSelect} options={countries} onChange={onCategoryChange} filter showClear filterBy="nombrePais" placeholder="Seleccione un País"
                        optionValue="idPais" optionLabel="nombrePais"/>
        </div>
    )
}

export default SelectPais
