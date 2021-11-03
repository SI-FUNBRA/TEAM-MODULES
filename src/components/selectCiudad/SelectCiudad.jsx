import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ServicioPais } from '../../service/ServicioPais';
import { Tooltip } from 'primereact/tooltip';

const SelectCiudad = (props) => {

    const [countries, setCountries] = useState([])

    useEffect(() => {
        if(!countries[0]){
            const servicioPais = new ServicioPais();
            servicioPais.getPaises__Ciudad().then(res => {
                setCountries(res.data)
            });
        }
    });

    const [ciudadSelect, setCiudadSelect] = useState(props.value);


    const onCategoryChange = (e) => {
        setCiudadSelect(e.value);
        props.onChange(e)
    }

    const countryOptionTemplate = (option) => {
        return (
            <div className="country-item">
                {option.nombreCiudad && <i className="pi pi-map-marker p-mr-2"/>}
                <span>{option.nombreCiudad}</span>
            </div>
        );
    }

    return (
        <Dropdown tooltip={props.tooltip} className={props.className} id={props.name} name={props.name} value={ciudadSelect} itemTemplate={countryOptionTemplate} options={countries} onChange={onCategoryChange} emptyFilterMessage={'No se a encontrado ningun resultado'} emptyMessage={'No se a encontrado ningun resultado'} optionValue="idCiudad" optionLabel="nombreCiudad" filter showClear filterBy="nombreCiudad" optionGroupLabel="nombrePais" optionGroupChildren="Ciudads" />
    )
}

export default SelectCiudad
