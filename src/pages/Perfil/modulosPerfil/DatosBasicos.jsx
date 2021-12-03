import classNames from 'classnames';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import SelectCiudad from '../../../components/selectCiudad/SelectCiudad';

import { FaUserAlt, FaRegCalendarAlt } from "react-icons/fa";
import { ServicioCredencial } from '../../../service/ServicioCredencial';

const DatosContacto = (props) => {

    const serviCredencial = new ServicioCredencial()

    const formik = useFormik({
        initialValues: props.data,
        validate: (data) => {
            let errors = {};

            if(errorBlur){
                errors.blur = 'Error Blur'
            }

            if (!data.nombreUsuario) {
                errors.nombreUsuario = 'El Nombre es obligatorio.';
            }else if(!/^[A-Za-zá-ýÁ-Ý ]+$/.test(data.nombreUsuario)){
                errors.nombreUsuario = 'El nombre solo acepta letras y espacios.';
            }else if(!(data.nombreUsuario.length >= 3 && data.nombreUsuario.length <= 25)){
                errors.nombreUsuario = 'Cantidad de caracteres de 3 a 25 .';
            }

            if (!data.apellidoUsuario) {
                errors.apellidoUsuario = 'El Apellido es obligatorio.';
            }else if(!/^[A-Za-zá-ýÁ-Ý ]+$/.test(data.apellidoUsuario)){
                errors.apellidoUsuario = 'El Apellido solo acepta letras y espacios.';
            }else if(!(data.apellidoUsuario.length >= 3 && data.apellidoUsuario.length <= 25)){
                errors.apellidoUsuario = 'Cantidad de caracteres de 3 a 25 .';
            }

            if(!data.fechaNacimientoUsuario){
                errors.fechaNacimientoUsuario = 'La Fecha es obligatoria.';
            }

            if(!data.idCiudad_FK || data.idCiudad_FK === ''){
                errors.idCiudad_FK = 'La Ciudad De Recidencia es obligatoria.';
            }

            if(!data.username){
                errors.username = 'El Nombre De Usuario es obligatorio.';
            }

            return errors;
        },
        onSubmit: (data) => {
            serviCredencial.changeUsername(data, data.idUsuario).then(res=>{
                console.log(res)
            })
            props.guardarData(data)
        }
    });

    useEffect(() => {
        formik.setValues(props.data)
    }, [props.data]); // eslint-disable-line react-hooks/exhaustive-deps


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const [errorBlur, setErrorBlur] = useState("")

    const handleBlur = () =>{
        serviCredencial.validateUser({param:formik.values.username, id: formik.values.idUsuario}).then(res=>{
            if(!res.data.resul){
                setErrorBlur("El Nombre de Usuario ya está registrado en el sistema")
            }else{
                setErrorBlur("")
            }
        })
    }

    return (

            <div className="p-d-flex p-jc-center">
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText tooltip="Ingrese Su Nombre" id="nombreUsuario" name="nombreUsuario" value={formik.values.nombreUsuario} onChange={formik.handleChange}  autoFocus className={classNames({ 'p-invalid': isFormFieldValid('nombreUsuario') })} />
                                    <label htmlFor="nombreUsuario" className={classNames({ 'p-error': isFormFieldValid('nombreUsuario') })}>Nombre</label>
                                </span>
                                {getFormErrorMessage('nombreUsuario')}
                            </div>
                        </div>
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText tooltip="Ingrese Su Apellido" id="apellidoUsuario" name="apellidoUsuario" value={formik.values.apellidoUsuario} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('apellidoUsuario') })} />
                                    <label htmlFor="apellidoUsuario" className={classNames({ 'p-error': isFormFieldValid('apellidoUsuario') })}>Apellido</label>
                                </span>
                                {getFormErrorMessage('apellidoUsuario')}
                            </div>
                        </div>
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <InputText tooltip="Ingrese Su Apellido" id="fechaNacimientoUsuario" name="fechaNacimientoUsuario" value={formik.values.fechaNacimientoUsuario} className={classNames({ 'p-invalid': isFormFieldValid('fechaNacimientoUsuario') })} disabled/>
                                     <i><FaRegCalendarAlt/></i>
                                    <label htmlFor="fechaNacimientoUsuario" className={classNames({ 'p-error': isFormFieldValid('fechaNacimientoUsuario') })}>Fecha Nacimiento</label>
                                </span>
                                {getFormErrorMessage('fechaNacimientoUsuario')}
                            </div>
                        </div>
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <SelectCiudad name="idCiudad_FK" value={formik.values.idCiudad_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idCiudad_FK') })} />
                                    <label htmlFor="idCiudad_FK" className={classNames({ 'p-error': isFormFieldValid('idCiudad_FK') })}>Ciudad Recidencia</label>
                                </span>
                                {getFormErrorMessage('idCiudad_FK')}
                            </div>
                        </div>
                        <div className="formgrid grid mt-5 mx-1">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText onBlur={handleBlur} tooltip="Ingrese su nombre De usuario" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                    <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Nombre Usuario</label>
                                </span>
                                {getFormErrorMessage('username')}
                                {errorBlur && <small className="p-error">{errorBlur}</small>}
                            </div>
                        </div>

                        <Button type="submit" label="Actualizar" className="mt-5" />
                    </form>
                </div>
    );

}

export default DatosContacto
