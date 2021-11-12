import React, { useEffect }  from 'react'

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import SelectCiudad from '../../selectCiudad/SelectCiudad';
import { Dropdown } from 'primereact/dropdown';

import { FaUserAlt, FaRegCalendarAlt } from "react-icons/fa";


const PersonalInfo = (props) => {
    let today = new Date()

    const formik = useFormik({
        initialValues: {
            nombreUsuario: '',
            apellidoUsuario: '',
            fechaNacimientoUsuario:'',
            idCiudad_FK:''
        },
        validate: (data) => {
            let errors = {};

            if (!data.nombreUsuario) {
                errors.nombreUsuario = 'El Nombre es obligatorio.';
            }else if(!(data.nombreUsuario.length >= 3 && data.nombreUsuario.length <= 25)){
                errors.nombreUsuario = 'Cantidad de caracteres de 3 a 25 .';
            }

            if (!data.apellidoUsuario) {
                errors.apellidoUsuario = 'El Apellido es obligatorio.';
            }

            if(!data.fechaNacimientoUsuario){
                errors.fechaNacimientoUsuario = 'La Fecha es obligatoria.';
            }

            if(!data.idCiudad_FK || data.idCiudad_FK === ''){
                errors.idCiudad_FK = 'La Ciudad De Recidencia es obligatoria.';
            }


            return errors;
        },
        onSubmit: (data) => {
            props.guardarData(data)
        }
    });

    useEffect(() => {
        console.log(props.data)
        formik.setValues(props.data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    //estilado del selector de año y mes del calendario
    const monthNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    return (

            <div className="p-d-flex p-jc-center">
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText tooltip="Ingrese Su Nombre" id="nombreUsuario" name="nombreUsuario" value={formik.values.nombreUsuario} onChange={formik.handleChange}  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('nombreUsuario') })} />
                                    <label htmlFor="nombreUsuario" className={classNames({ 'p-error': isFormFieldValid('nombreUsuario') })}>Nombre*</label>
                                </span>
                                {getFormErrorMessage('nombreUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText tooltip="Ingrese Su Apellido" id="apellidoUsuario" name="apellidoUsuario" value={formik.values.apellidoUsuario} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('apellidoUsuario') })} />
                                    <label htmlFor="apellidoUsuario" className={classNames({ 'p-error': isFormFieldValid('apellidoUsuario') })}>Apellido*</label>
                                </span>
                                {getFormErrorMessage('apellidoUsuario')}
                            </div>
                        </div>
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <Calendar tooltip="Ingrese Su Fecha De Nacimiento" name="fechaNacimientoUsuario" yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fechaNacimientoUsuario" value={formik.values.fechaNacimientoUsuario} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaNacimientoUsuario') })}
                                    readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    <i><FaRegCalendarAlt/></i>
                                    <label htmlFor="fechaNacimientoUsuario" className={classNames({ 'p-error': isFormFieldValid('fechaNacimientoUsuario') })}>Fecha Nacimiento*</label>
                                </span>
                                {getFormErrorMessage('fechaNacimientoUsuario')}
                            </div>
                        </div>
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <SelectCiudad name="idCiudad_FK" value={formik.values.idCiudad_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idCiudad_FK') })} />
                                    <label htmlFor="idCiudad_FK" className={classNames({ 'p-error': isFormFieldValid('idCiudad_FK') })}>Ciudad Recidencia*</label>
                                </span>
                                {getFormErrorMessage('idCiudad_FK')}
                            </div>
                        </div>


                        <Button type="submit" label="Siguiente" className="mt-5" />
                    </form>
                </div>
    );
}

export default PersonalInfo
