import React, { useEffect, useState }  from 'react'

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import SelectCiudad from '../../selectCiudad/SelectCiudad';
import { Dropdown } from 'primereact/dropdown';

import SelectTipoDoc from '../../tipoDoc/SelectTipoDoc';

import { FaRegCalendarAlt, FaAddressCard } from "react-icons/fa";
import { ServicioCredencial } from '../../../service/ServicioCredencial';

const Identificacion = (props) => {
    let today = new Date()

    const serviCredencial = new ServicioCredencial()

    useEffect(() => {
        console.log(props.data)
        formik.setValues(props.data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const [errorBlur, setErrorBlur] = useState("")

    const handleBlur = () =>{
        serviCredencial.validateParam({nameParam:"numeroDocumento",param:formik.values.numeroDocumento}).then(res=>{
            if(!res.data.resul){
                setErrorBlur("El Numero de documento ya esta registrado en el sistema")
            }else{
                setErrorBlur("")
            }
        })
    }


    const formik = useFormik({
        initialValues: {
            idTipoDocumento_FK:'',
            numeroDocumento:'',
            fechaExpedicionDoc:'',
            LugarExpedicionDoc:'',
        },
        validate: (data) => {
            let errors = {};

            if(errorBlur){
                errors.blur = 'Error Blur'
            }

            if(!data.idTipoDocumento_FK){
                errors.idTipoDocumento_FK = 'El Tipo de Documento de es obligatorio.';
            }

            if(!data.numeroDocumento){
                errors.numeroDocumento = 'El Número de Documento de es obligatorio.';
            }else if(!/^\d{0,20}$/.test(data.numeroDocumento)){
                errors.numeroDocumento = 'El Número de Documento debe ser un numero.';
            }

            if(!data.fechaExpedicionDoc){
                errors.fechaExpedicionDoc = 'La Fecha de Expedicion es obligatoria.';
            }

            if(!data.LugarExpedicionDoc){
                errors.LugarExpedicionDoc = 'El Lugar De Expedicion es obligatorio.';
            }


            return errors;
        },
        onSubmit: (data) => {
            props.guardarData(data)
        }
    });

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
                    <form onSubmit={formik.handleSubmit} className="p-fluid ">
                            <SelectTipoDoc name="idTipoDocumento_FK" value={formik.values.idTipoDocumento_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idTipoDocumento_FK') })}/>
                            {getFormErrorMessage('idTipoDocumento_FK')}

                                <div className="p-field mt-4">
                                    <span className="p-float-label p-input-icon-right">
                                        <i><FaAddressCard/></i>
                                        <InputText onBlur={handleBlur} tooltip="Ingrese Su Número de documento" id="numeroDocumento" name="numeroDocumento" value={formik.values.numeroDocumento} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('numeroDocumento') })} />
                                        <label htmlFor="numeroDocumento" className={classNames({ 'p-error': isFormFieldValid('numeroDocumento') })}>Numero De Documento*</label>
                                    </span>
                                    {getFormErrorMessage('numeroDocumento')}
                                    {errorBlur && <small className="p-error">{errorBlur}</small>}

                                </div>

                            <div className="formgrid grid my-4">
                                <div className="p-field col">
                                    <span className="p-float-label p-input-icon-right">
                                        <Calendar tooltip="Ingrese la fecha de expedicion de su documento" name="fechaExpedicionDoc" yearRange={`${today.getFullYear()-90}:${today.getFullYear()}`} id="fechaExpedicionDoc" value={formik.values.fechaExpedicionDoc} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaExpedicionDoc') })}
                                        readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                        <i><FaRegCalendarAlt/></i>
                                        <label htmlFor="fechaExpedicionDoc" className={classNames({ 'p-error': isFormFieldValid('fechaExpedicionDoc') })}>Fecha Expedicion Doc*</label>
                                    </span>
                                    {getFormErrorMessage('fechaExpedicionDoc')}
                                </div>

                                <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <SelectCiudad name="LugarExpedicionDoc" value={formik.values.LugarExpedicionDoc} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('LugarExpedicionDoc') })} />
                                    <label htmlFor="LugarExpedicionDoc" className={classNames({ 'p-error': isFormFieldValid('LugarExpedicionDoc') })}>Lugar Expedicion Documento*</label>
                                </span>
                                {getFormErrorMessage('LugarExpedicionDoc')}
                            </div>
                            </div>

                        <div className="formgrid grid my-4">
                            <Button type="button" onClick={props.retrocederPage} label="Anterior" className="col mx-6" />
                            <Button type="submit" label="Siguiente" className="p-2 mx-6 col" />
                        </div>

                    </form>
                </div>
    );
}

export default Identificacion
