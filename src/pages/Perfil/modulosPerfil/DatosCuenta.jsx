import classNames from 'classnames';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'

import { ServicioCredencial } from '../../../service/ServicioCredencial';
import { Password } from 'primereact/password';
import { Tooltip } from 'primereact/tooltip';

import { RiShieldUserFill } from "react-icons/ri";
import { Divider } from 'primereact/divider';

const DatosCuenta = (props) => {

    props.data.correoUsuario2 = props.data.correoUsuario

    const headerPass = <h6>Contraseña</h6>;
    const footerPass = (
        <React.Fragment>
        <Divider />
        <p className="p-mt-2">Condiciones de seguridad:</p>
        <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
            <li>Se necesita una letra minuscula</li>
            <li>Se necesita una letra mayuscula</li>
            <li>Se necesita un numero</li>
            <li>Minimo 8 caracteres</li>
        </ul>
        </React.Fragment>
    );

    const formik = useFormik({
        initialValues: props.data,
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
    }, [props.data]); // eslint-disable-line react-hooks/exhaustive-deps


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const serviCredencial = new ServicioCredencial()

    const [errorBlur, setErrorBlur] = useState("")

    const handleBlur = () =>{
        serviCredencial.validateParam({nameParam:"correoUsuario",param:formik.values.correoUsuario, id:formik.values.idUsuario}).then(res=>{
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
                        <div className="formgrid grid mt-5 mx-1">
                                <span className="p-float-label p-input-icon-right">
                                    <i><RiShieldUserFill/></i>
                                    <InputText onBlur={handleBlur} tooltipOptions={{position:"left"}} tooltip="Ingrese Nombre De Usuario Para El Acceso" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                    <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Nombre De usuario*</label>
                                </span>
                                {getFormErrorMessage('username')}
                                {errorBlur && <small className="p-error">{errorBlur}</small>}
                        </div>

                        <Button type="submit" label="Actualizar" className="mt-5" />
                    </form>
                </div>
    );

}

export default DatosCuenta
