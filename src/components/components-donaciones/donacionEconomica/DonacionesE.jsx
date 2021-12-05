import React, {useState} from 'react';
import styled from 'styled-components';
import {PayPalButton} from 'react-paypal-button-v2';
import { Buutton } from '../../components-homepage/Buutton';
import axios from 'axios';
import {BsPaypal} from 'react-icons/bs';

const Section=styled.section`

    margin-bottom: 50px;

    span{
        display:block;
        text-align:center;
    }

    p{
        padding:50px;
        text-align:justify;
        background-color:#C8C8C8;
        border-radius:10px 0 10px 0;
        margin:30px 30px 30px 5px;
    }

    .payMoney{
        border:1px solid #D3D3D3;
        padding:30px;
        margin: 2rem 20rem 2rem 20rem;
    }

    .pay{
        padding:.5rem;
        border:1px solid #D3D3D3;

        &:hover{
            border:1px solid #C0C0C0;
        }
    }
`;

const Bootton=styled.a`
    background: #253B80;
    white-space:nowrap;
    outline:none;
    border:none;
    min-width:100px;
    max-width:200px;
    cursor:pointer;
    text-decoration:none;
    transition:0.3s;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:2rem 37rem 2rem 37rem;
    padding:16px 40px;
    color:#fff;
    font-size: 20px;
    border-radius:3px;

    &:hover{
        transform: translateY(-2px);
        color:#fff;
    }
`;

const HeroHeading=styled.h1`
    color:#576975;
    text-align:center;
    font-size:48px;
`;

const PayPalSection=styled.div`
    margin:1rem 0 2rem 20rem ;
`;

const validateForm=(pay)=>{
    //Errores
    let errors={}

    //Validaciones

    if(!pay.trim()){
        errors.pay='El campo "Valor de donacion" es requerido';
    }

    return errors;
}

const DonacionesE = () => {

    const [checkout,setCheckOut]=useState(false);
    const [pay, setPay]=useState('');

    //Errors
    const[errors, setErrors]=useState({});


    const handleBlurPay=()=>{
        setErrors(validateForm(pay));
    }


    const URL='http://localhost:3005/api/donacionEconomica';

    return (
        <Section>
            <HeroHeading>Donación Economica</HeroHeading>
            <span>Para realizar donaciones económicas puedes hacerlo por los siguientes medios:</span>
            <div className="payMoney">
                <label htmlFor="pay">Ingrese el valor de la donación <span className="text-danger d-inline">*</span> </label><br />
                <input type="number" className="pay" name="pay" value={pay} id="pay" onChange={(e) =>setPay(e.target.value)} onBlur={handleBlurPay} />

                {errors.pay&&<span className="text-start text-danger ">{errors.pay}</span>}
            </div>

            {checkout ? (
                <PayPalSection>
                    <PayPalButton
                        createOrder={(data, actions) => {
                            return actions.order.create({
                            purchase_units: [{
                                amount: {
                                currency_code: "USD",
                                value: pay
                                }
                            }],
                                application_context: {
                                    brand_name: `FUNBRA-ZOOPPORT.com`,
                                    landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                                    user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                                    // return_url: `http://localhost:3000/execute-payment`, // Url despues de realizar el pago
                                    // cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
                                }
                            });
                        }}

                        onApprove={(data, actions) => {

                            const datosPaypal = {}
                            // Capturar los fondos de la transacción
                            return actions.order.capture().then(function(details) {
                            // Muestre un mensaje de éxito al donador
                            // alert(`${details.payer.name.given_name} su transacción fue exitosa!`);
                            // console.log({details, data});

                            datosPaypal.fechaDonacion=details.create_time;
                            datosPaypal.montoDonacion=details.purchase_units[0].payments.captures[0].amount.value;

                            /*
                            console.log(`La fecha de la transaccion fue el: ${details.create_time}, Lo realizo ${details.payer.name.given_name} ${details.payer.name.surname}, con correo electronico: ${details.payer.email_address}, por un valor de ${details.purchase_units[0].payments.captures[0].amount.value} dolares`); */

                            console.log(datosPaypal);
                            console.log(URL);
                            axios.post(URL, datosPaypal).then(res=>{
                                alert(`${details.payer.name.given_name} su transacción fue exitosa!`);
                            })
                            });
                        }}
                    />
                </PayPalSection>
            ) : (
                <Bootton onClick={()=>{
                    setCheckOut(true);
                }}
                >
                    <BsPaypal /> Paypal
                </Bootton>
            )}
            {/* <Buutton to='/donacionEconomica/listDonEcon' style={{'margin': '0 auto'}}>Ir</Buutton> */}
        </Section>
    )
}

export default DonacionesE;
