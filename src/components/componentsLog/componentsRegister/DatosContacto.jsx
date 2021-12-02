import React, { useEffect, useState }  from 'react'

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

import { MdEmail, MdMarkEmailRead, MdOutlinePhoneAndroid } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ServicioCredencial } from '../../../service/ServicioCredencial';


const DatosContacto = (props) => {

    const serviCredencial = new ServicioCredencial()

    const formik = useFormik({
        initialValues: {
            correoUsuario: '',
            correoUsuario2: '',
            telefonoFijo: '',
            telefonoCelular: ''
        },
        validate: (data) => {
            let errors = {};

            if(errorBlur){
                errors.blur = 'Error Blur'
            }

            if (!data.correoUsuario) {
                errors.correoUsuario = 'El Correo es obligatorio.';
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.correoUsuario)){
                errors.correoUsuario = 'Debe ingresar un formato valido.';
            }

            if (!data.correoUsuario2){
                errors.correoUsuario2 = 'La Verificacion es obligatoria.';
            }else if(!(data.correoUsuario === data.correoUsuario2)){
                errors.correoUsuario2 = 'Los Campos no coinciden.';
            }

            if (!/^\d{0,20}$/.test(data.telefonoFijo)){
                errors.telefonoFijo = 'El Telefono debe ser un numero.';
            }

            if(!data.telefonoCelular){
                errors.telefonoCelular = 'El Celular es obligatorio.';
            }
            if (!/^\d{0,20}$/.test(data.telefonoCelular)){
                errors.telefonoCelular = 'El Celular debe ser un numero.';
            }



            return errors;
        },
        onSubmit: (data) => {
            props.guardarData(data)
        }
    });

    useEffect(() => {
        formik.setValues(props.data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const [errorBlur, setErrorBlur] = useState("")

    const handleBlur = () =>{
        serviCredencial.validateParam({nameParam:"correoUsuario",param:formik.values.correoUsuario}).then(res=>{
            if(!res.data.resul){
                setErrorBlur("El Correo ya esta registrado en el sistema")
            }else{
                setErrorBlur("")
            }
        })
    }

    return (

            <div className="p-d-flex p-jc-center">
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><MdEmail /></i>
                                    <InputText onBlur={handleBlur} tooltip="Ingrese Su Correo Personal" id="correoUsuario" name="correoUsuario" value={formik.values.correoUsuario} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario') })} />
                                    <label htmlFor="correoUsuario" className={classNames({ 'p-error': isFormFieldValid('correoUsuario') })}>Correo*</label>
                                </span>
                                {getFormErrorMessage('correoUsuario')}
                                {errorBlur && <small className="p-error">{errorBlur}</small>}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><MdMarkEmailRead/></i>
                                    <InputText tooltip="Confirme Su Correo" id="correoUsuario2" name="correoUsuario2" value={formik.values.correoUsuario2} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario2') })} />
                                    <label htmlFor="correoUsuario2" className={classNames({ 'p-error': isFormFieldValid('correoUsuario2') })}>Verificacion De Correo*</label>
                                </span>
                                {getFormErrorMessage('correoUsuario2')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><BsFillTelephoneFill/></i>
                                    <InputText tooltip="Ingrese Su Numero De Telefono" id="telefonoFijo" name="telefonoFijo" value={formik.values.telefonoFijo} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('telefonoFijo') })} />
                                    <label htmlFor="telefonoFijo" className={classNames({ 'p-error': isFormFieldValid('telefonoFijo') })}>Telefono</label>
                                </span>
                                {getFormErrorMessage('telefonoFijo')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><MdOutlinePhoneAndroid/></i>
                                    <InputText tooltip="Ingrese Su Numero Celular" id="telefonoCelular" name="telefonoCelular" value={formik.values.telefonoCelular} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('telefonoCelular') })} />
                                    <label htmlFor="telefonoCelular" className={classNames({ 'p-error': isFormFieldValid('telefonoCelular') })}>Telefono Celular*</label>
                                </span>
                                {getFormErrorMessage('telefonoCelular')}
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

export default DatosContacto
