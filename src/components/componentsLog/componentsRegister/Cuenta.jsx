import React, { useEffect, useState }  from 'react'

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Tooltip } from 'primereact/tooltip';
import { Divider } from 'primereact/divider';


import { RiShieldUserFill } from "react-icons/ri";
import { ServicioCredencial } from '../../../service/ServicioCredencial';


const Cuenta = (props) => {

    const serviCredencial = new ServicioCredencial()

    const formik = useFormik({
        initialValues: {
            username:'',
            pass:'',
            pass2:''
        },
        validate: (data) => {
            let errors = {};

            if(errorBlur){
                errors.blur = 'Error Blur'
            }

            if(!data.username){
                errors.username = 'El Nombre De Usuario es obligatorio.';
            }

            if(!data.pass){
                errors.pass = 'La Contraseña es obligatoria.';
            }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(data.pass)){
                errors.pass = 'La Contraseña es Poco Segura.';
            }

            if(!data.pass2){
                errors.pass2 = 'La Validacion de Contraseña es obligatoria.';
            }else if(!(data.pass === data.pass2)){
                errors.pass2 = 'Las Contraseñas no coinciden.';
            }



            return errors;
        },
        onSubmit: (data) => {
            props.RegistrarData(data)
        }
    });

    useEffect(() => {
        formik.setValues(props.data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

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

    const [errorBlur, setErrorBlur] = useState("")

    const handleBlur = () =>{
        serviCredencial.validateUser({param:formik.values.username}).then(res=>{

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
                        <div className="p-field my-4">
                                <span className="p-float-label p-input-icon-right">
                                    <i><RiShieldUserFill/></i>
                                    <InputText onBlur={handleBlur} tooltip="Ingrese Nombre De Usuario Para El Acceso" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                    <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Nombre De usuario*</label>
                                </span>
                                {getFormErrorMessage('username')}
                                {errorBlur && <small className="p-error">{errorBlur}</small>}
                        </div>
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Tooltip target=".passTooltip">Ingrese su contraseña de acceso</Tooltip>
                                    <Password
                                    value={formik.values.pass}
                                    id="pass"
                                    name="pass"
                                    toggleMask
                                    promptLabel="Ingrese la contraseña"
                                    weakLabel="Poco Segura"
                                    mediumLabel="Medianamente Segura"
                                    strongLabel="Muy Segura"
                                    onChange={formik.handleChange}
                                    header={headerPass}
                                    content=""
                                    footer={footerPass}
                                    className="passTooltip"
                                    />
                                    <label htmlFor="pass" className={classNames({ 'p-error': isFormFieldValid('pass') })}>Contraseña:</label>

                                </span>
                                 {getFormErrorMessage('pass')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Tooltip target=".pass2Tooltip">Verifique su contraseña de acceso</Tooltip>
                                    <Password
                                    value={formik.values.pass2}
                                    id="pass2"
                                    name="pass2"
                                    toggleMask
                                    onChange={formik.handleChange}
                                    feedback={false}
                                    className="pass2Tooltip"
                                    />
                                    <label htmlFor="pass2" className={classNames({ 'p-error': isFormFieldValid('pass2') })}>Contraseña:</label>

                                </span>
                                 {getFormErrorMessage('pass2')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <Button type="button" onClick={props.retrocederPage} label="Anterior" className="col mx-6" />
                            <Button type="submit" label="Registrarse" className="p-2 mx-6 col" />
                        </div>

                    </form>
                </div>
    );
}

export default Cuenta
