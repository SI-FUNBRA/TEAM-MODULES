import React from 'react';
import styled from 'styled-components';
import image from '../../images/bg-01.jpg';

import {useForm} from './Hook/useForm';

const ContactSection=styled.div`

    @font-face {
      src: url('../fonts/poppins/Poppins-Regular.ttf'); 
    }

    @font-face {
      src: url('../fonts/poppins/Poppins-Medium.ttf'); 
    }

    @font-face {
      src: url('../fonts/poppins/Poppins-Bold.ttf'); 
    }

    @font-face {
      src: url('../fonts/poppins/Poppins-SemiBold.ttf'); 
    }

    @font-face {
      src: url('../fonts/montserrat/Montserrat-Bold.ttf'); 
    }

    @font-face {
      src: url('../fonts/montserrat/Montserrat-SemiBold.ttf'); 
    }

    @font-face {
      src: url('../fonts/montserrat/Montserrat-Regular.ttf'); 
    }
    /*---------------------------------------------*/
    a {
      font-size: 14px;
      line-height: 1.7;
      color: #666666;
      margin: 0px;
      transition: all 0.4s;
      -webkit-transition: all 0.4s;
      -o-transition: all 0.4s;
      -moz-transition: all 0.4s;
    }

    a:focus {
      outline: none !important;
    }

    a:hover {
      text-decoration: none;
    }

    /*---------------------------------------------*/
    h1,h2,h3,h4,h5,h6 {
      margin: 0px;
    }

    p {
      font-size: 14px;
      line-height: 1.7;
      color: #666666;
      margin: 0px;
    }

    ul, li {
      margin: 0px;
      list-style-type: none;
    }


    /*---------------------------------------------*/
    input {
      outline: none;
      border: none;
    }

    textarea {
      outline: none;
      border: none;
    }

    textarea:focus, input:focus {
      border-color: transparent !important;
    }

    input:focus::-webkit-input-placeholder { color:transparent; }
    input:focus:-moz-placeholder { color:transparent; }
    input:focus::-moz-placeholder { color:transparent; }
    input:focus:-ms-input-placeholder { color:transparent; }

    textarea:focus::-webkit-input-placeholder { color:transparent; }
    textarea:focus:-moz-placeholder { color:transparent; }
    textarea:focus::-moz-placeholder { color:transparent; }
    textarea:focus:-ms-input-placeholder { color:transparent; }

    input::-webkit-input-placeholder { color: #adadad;}
    input:-moz-placeholder { color: #adadad;}
    input::-moz-placeholder { color: #adadad;}
    input:-ms-input-placeholder { color: #adadad;}

    textarea::-webkit-input-placeholder { color: #adadad;}
    textarea:-moz-placeholder { color: #adadad;}
    textarea::-moz-placeholder { color: #adadad;}
    textarea:-ms-input-placeholder { color: #adadad;}


    label {
      display: block;
      margin: 0;
    }

    /*---------------------------------------------*/
    button {
      outline: none !important;
      border: none;
      background: transparent;
    }

    button:hover {
      cursor: pointer;
    }

    iframe {
      border: none !important;
    }

    /*//////////////////////////////////////////////////////////////////
    [ utility ]*/

    /*==================================================================
    [ Text ]*/
    .txt1 {
      font-size: 18px;
      line-height: 1.2;
      color: #fff;
    }

    .txt2 {
      font-size: 15px;
      line-height: 1.6;
      color: #999999;
    }

    .txt3 {
      font-size: 15px;
      line-height: 1.6;
      color: #00ad5f;
    }

    /*==================================================================
    [ Size ]*/
    .size1 {
      width: 355px;
      max-width: 100%;
    }

    .size2 {
      width: calc(100% - 43px);
    }

    /*==================================================================
    [ Background ]*/
    .bg1 {background: #3b5998;}
    .bg2 {background: #1da1f2;}
    .bg3 {background: #cd201f;}


    /*//////////////////////////////////////////////////////////////////
    [ Contact ]*/

    .container-contact100 {
      width: 100%;  
      min-height: 100vh;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background: #f2f2f2;
      
    }

    .wrap-contact100 {
      width: 100%;
      background: #fff;
      overflow: hidden;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      flex-direction: row-reverse;

    }

    /*==================================================================
    [ Contact more ]*/
    .contact100-more {
      width: calc(100% - 560px);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      position: relative;
      z-index: 1;
      padding: 30px 15px 0px 15px;
    }

    .contact100-more::before {
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.1);
    }



    /*==================================================================
    [ Form ]*/

    .contact100-form {
      width: 560px;
      min-height: 100vh;
      display: block;
      padding: 110px 55px 55px 55px;
    }

    .contact100-form-title {
      width: 100%;
      display: block;
      font-size: 30px;
      color: #333333;
      line-height: 1.2;
      text-align: center;
      padding-bottom: 48px;
    }



    /*------------------------------------------------------------------
    [ Input ]*/

    .wrap-input100 {
      width: 100%;
      position: relative;
      border: 1px solid #e6e6e6;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .label-input100 {
      font-size: 11px;
      color: #666666;
      line-height: 1.2;
      text-transform: uppercase;
      padding: 15px 0 2px 24px;
    }

    .input100 {
      display: block;
      width: 100%;
      background: transparent;
      font-size: 18px;
      color: #404b46;
      line-height: 1.2;
      padding: 0 26px;
    }

    input.input100 {
      height: 48px;
    }

    textarea.input100 {
      min-height: 130px;
      padding-top: 14px;
      padding-bottom: 15px;
    }

    /*---------------------------------------------*/

    .focus-input100 {
      position: absolute;
      display: block;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      top: -1px;
      left: -1px;
      pointer-events: none;
      border: 1px solid #6675df;
      border-radius: 10px;

      visibility: hidden;
      opacity: 0;

      -webkit-transition: all 0.4s;
      -o-transition: all 0.4s;
      -moz-transition: all 0.4s;
      transition: all 0.4s;

      -webkit-transform: scaleX(1.1) scaleY(1.3);
      -moz-transform: scaleX(1.1) scaleY(1.3);
      -ms-transform: scaleX(1.1) scaleY(1.3);
      -o-transform: scaleX(1.1) scaleY(1.3);
      transform: scaleX(1.1) scaleY(1.3);
    }

    .input100:focus + .focus-input100 {
      visibility: visible;
      opacity: 1;

      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }

    .eff-focus-selection {
      visibility: visible;
      opacity: 1;

      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
    }

    /*------------------------------------------------------------------
    [ Button ]*/
    .container-contact100-form-btn {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-top: 10px;
    }

    .contact100-form-btn {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 50px;
      border-radius: 10px;
      background: #11B3C9;

      font-size: 12px;
      color: #fff;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 1px;

      -webkit-transition: all 0.4s;
      -o-transition: all 0.4s;
      -moz-transition: all 0.4s;
      transition: all 0.4s;
    }

    .contact100-form-btn:hover {
      background: #404b46;
    }



    /*------------------------------------------------------------------
    [ Responsive ]*/

    @media (max-width: 992px) {
      .contact100-form {
        width: 50%;
        padding: 110px 30px 55px 30px;
      }

      .contact100-more {
        width: 50%;
      }
    }

    @media (max-width: 768px) {
      .contact100-form {
        width: 100%;
      }

      .contact100-more {
        display: none;
      }
    }

    @media (max-width: 576px) {
      .contact100-form {
        padding: 110px 15px 55px 15px;
      }
    }


    /*------------------------------------------------------------------
    [ Alert validate ]*/

    .validate-input {
      position: relative;
    }

    .alert-validate::before {
      content: attr(data-validate);
      position: absolute;
      max-width: 70%;
      background-color: #fff;
      border: 1px solid #c80000;
      border-radius: 2px;
      padding: 4px 25px 4px 10px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 2px;
      pointer-events: none;

      color: #c80000;
      font-size: 13px;
      line-height: 1.4;
      text-align: left;

      visibility: hidden;
      opacity: 0;

      -webkit-transition: opacity 0.4s;
      -o-transition: opacity 0.4s;
      -moz-transition: opacity 0.4s;
      transition: opacity 0.4s;
    }

    .alert-validate::after {
      content: "\f12a";
      display: block;
      position: absolute;
      color: #c80000;
      font-size: 16px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
      right: 8px;
    }

    .alert-validate:hover:before {
      visibility: visible;
      opacity: 1;
    }

    @media (max-width: 992px) {
      .alert-validate::before {
        visibility: visible;
        opacity: 1;
      }
    }

    /*==================================================================
    [ Social ]*/
    .contact100-form-social {
      padding-top: 100px;
    }

    .contact100-form-social-item {
      width: 36px;
      height: 36px;
      font-size: 18px;
      color: #fff;
      border-radius: 50%;
    }

    .contact100-form-social-item:hover {
      background: #404b46;
      color: #fff;
    }

    .wrap-input100 .dropDownSelect2 .select2-container--open {
      width: 100% !important;
    }

    .wrap-input100 .dropDownSelect2 .select2-dropdown {
      width: calc(100% + 2px) !important;
    }
`;

const initialForm={
  name:"",
  email:"",
  subject:"",
  message:""
};

const validationsForm=(form)=>{
  let errors={}

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  if(!form.name.trim()){
    errors.name='El campo "Nombre" es requerido.';
  }else if(!regexName.test(form.name.trim())){
    errors.name='El campo "Nombre" solo acepta letras y espacios en blanco';
  }

  if(!form.email.trim()){
    errors.email='El campo "Correo Electronico" es requerido.';
  }else if(!regexEmail.test(form.email.trim())){
    errors.email='El campo "Correo Electronico" es incorrecto';
  }

  if(!form.subject.trim()){
    errors.subject='Te recomendamos que ingreses el "Asunto" para contestar mas rapido tu mensaje.';
  }

  if(!form.message.trim()){
    errors.message='El campo "Mensaje" es requerido.';
  }else if(!regexComments.test(form.message.trim())){
    errors.message='El campo "Mensaje" no debe exceder los 255 caracteres';
  }

  return errors
};

const Contacto = () => {

  const{form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit}=useForm(initialForm, validationsForm);

    return (

        <ContactSection id='/contacto'>
            <div className="container-contact100">
              <div className="wrap-contact100">
                
              <div className="contact100-more flex-col-c-m" style={{
                  "background-image": `url(${image})`,
                  'width': '750px',
                  'margin-right': '30px',
                  'margin-bottom': '30px'
                }}>
                </div>
                <form className="contact100-form validate-form" onSubmit={handleSubmit}>
                  <span className="contact100-form-title">
                    Contáctenos
                  </span>


                  <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <label className="label-input100" for="name">Ingrese su nombre <p className="text-danger d-inline">*</p></label>
                    <input id="name" class="input100" type="text" name="name" placeholder="Ej: Camila Cruz" onChange={handleChange} onBlur={handleBlur} value={form.name} />
                    <span className="focus-input100"></span>
                    <hr />
                    {errors.name&&<p className="mx-3 text-danger font-weight-bold">{errors.name}</p>}
                  </div>
                  


                  <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <label className="label-input100" for="email">Ingrese su Correo Electronico <p className="text-danger d-inline">*</p></label>
                    <input id="email" class="input100" type="text" name="email" placeholder="Ej: example@dominio.com" onChange={handleChange} onBlur={handleBlur} value={form.email} />
                    <span className="focus-input100"></span>
                    <hr />
                    {errors.email&&<p className="mx-3 text-danger font-weight-bold">{errors.email}</p>}
                  </div>

                  <hr />

                  <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <label className="label-input100" for="email">Asunto </label>
                    <input id="subject" class="input100" type="text" name="subject" placeholder="Ej: Problema Donación" onChange={handleChange} onBlur={handleBlur} value={form.subject} />
                    <span className="focus-input100"></span>
                    <hr />
                    {errors.subject&&<p className="mx-3 text-danger font-weight-bold">{errors.subject}</p>}
                  </div>

                  <div className="wrap-input100 validate-input" data-validate = "Message is required">
                    <label className="label-input100" for="message">Ingrese su Mensaje <p className="text-danger d-inline">*</p></label>
                    <textarea id="message" class="input100" name="message" placeholder="Escribe el texto aqui..." onChange={handleChange} onBlur={handleBlur} value={form.message}></textarea>
                    <span className="focus-input100"></span>
                    <hr />
                    {errors.message&&<p className="mx-3 text-danger font-weight-bold">{errors.message}</p>}
                  </div>

                  <div className="container-contact100-form-btn">
                    <input type="submit" value="Enviar" className="contact100-form-btn" />
                  </div>
                </form>
              </div>
            </div>
        </ContactSection>
    );
};

export default Contacto;








   

    

    





