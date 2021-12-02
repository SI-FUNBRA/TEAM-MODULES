import React from 'react';

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Tooltip } from 'primereact/tooltip';
import { useHistory } from 'react-router';
import { ServicioCredencial } from '../../service/ServicioCredencial';

export const Login = (props) => {

    const serviCredencial = new ServicioCredencial()

    const history = useHistory();

    const formik = useFormik({
        initialValues: {

            username: '',
            pass:'',


        },
        validate: (data) => {


            let errors = {};

            if (!data.username) {
                errors.username = 'Ingrese su usuario';
            }else if(!(data.username.length >= 3 && data.username.length <= 25)){
                errors.username = 'Cantidad de caracteres de 3 a 25 .';
            }

            if (!data.pass) {
                errors.pass = 'Ingrese su contraseña';
            }




            return errors;
        },
        onSubmit: (data) => {
            serviCredencial.Login(data).then(res=>{
                if(res.status===201){
                    localStorage.setItem('token', res.data.success)
                    history.push('/dash')
                }else{
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.error, life: 3000 });
                }
            }).catch(err=>{
                console.log(err)
            })

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleRegistrarse = () =>{
        history.push('/log/register/1')
    }

    const handleOlvideContra = () =>{
        history.push('/log/RecuperarContraseña')
    }

    return (
        <div className="flex align-items-center justify-content-center" style={{width: "100%", height: "100%", position: 'fixed'}}>
            <div className="card p-5">
                <div className="flex align-items-center justify-content-center">
                        <form onSubmit={formik.handleSubmit} className="p-fluid relative">
                            <h5 className="text-center">Iniciar Sesión</h5>
                            <div className="formgrid mt-5 mb-4 relative">
                                <div className="field col p-inputgroup m-0">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <span className="p-float-label">
                                        <InputText
                                        tooltip="Ingrese su nombre de usuario"
                                        tooltipOptions={{position: 'bottom'}}
                                        id="username"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('username') })}
                                        />
                                        <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Usuario:</label>
                                    </span>
                                </div>
                                <p className="mx-6 absolute" style={{top:'2.6rem'}}>{getFormErrorMessage('username')}</p>
                            </div>
                            <div className="formgrid relative mt-4 mb-5">
                                <div className="field col p-inputgroup m-0" >
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <span className="p-float-label">
                                        <Tooltip target=".passTooltip" position="bottom" >Ingrese su contraseña de acceso</Tooltip>
                                        <Password
                                        value={formik.values.pass}
                                        id="pass"
                                        name="pass"
                                        toggleMask
                                        feedback={false}
                                        onChange={formik.handleChange}
                                        className={"passTooltip "+classNames({ 'p-invalid': isFormFieldValid('pass') })}
                                        />
                                        <label htmlFor="pass" className={classNames({ 'p-error': isFormFieldValid('pass') })}>Contraseña:</label>
                                    </span>
                                </div>
                                <p className="mx-6 absolute" style={{top:'2.6rem'}}>{getFormErrorMessage('pass')}</p>
                            </div>
                            <Button type="button" onClick={handleOlvideContra} label="Olvidé mi contraseña" className="p-button-text absolute"  style={{bottom:"-18px"}}/>
                            <Button type="submit" label="Ingresar" className="mb-4"/>
                        </form>
                </div>
                <Divider align="center">
                    <small>¿Tienes una cuenta?</small>
                </Divider>

                <div className="flex align-items-center justify-content-center">
                    <Button onClick={handleRegistrarse} label="Registrarse" icon="pi pi-user-plus" style={{backgroundColor:'var(--green-300)', border:'var(--green-300)'}} ></Button>
                </div>

            </div>


        </div>
    );
}

export default Login



