import React,{useState} from 'react';
import {PayPalButton} from 'react-paypal-button-v2';

import styled from 'styled-components';
import DonacionesE from './DonacionesE';

const PayPalSection=styled.section`  

    margin:1rem 0 2rem 20rem ;
    .inputPay{
        padding:.5rem;
        margin: .5rem 0 1rem 0;
    }
`;  


const PayPal = () => {

    // const [pay, setPay]=useState();

    // const [dataPayPal, setDataPaypal]=useState();

    // const handleChange=({target})=>{
    //     setDataPaypal({
    //         ...dataPayPal,
    //         [target.name]:target.value,
    //         "pay":document.getElementById('pay').value
    //     })
    // }

    return (
        <PayPalSection>
            {/* Ingrese el valor de la donación: <input type="number" className='inputPay' value={pay} onChange={(e) =>setPay(e.target.value)}  /> */}
            <PayPalButton
                // createOrder={(data, actions) => {
                //     return actions.order.create({
                //       purchase_units: [{
                //         amount: {
                //           currency_code: "USD",
                //           value: <DonacionesE nameForm={'pay'} handleChange={handleChange} />
                //         }
                //       }],
                //         application_context: {
                //             brand_name: `FUNBRA-ZOOPPORT.com`,
                //             landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                //             user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                //             // return_url: `http://localhost:3000/execute-payment`, // Url despues de realizar el pago
                //             // cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
                //         }
                //     });
                // }}

                // onApprove={(data, actions) => {
                //     // Capturar los fondos de la transacción
                //     return actions.order.capture().then(function(details) {
                //       // Muestre un mensaje de éxito al donador
                //       alert(`${details.payer.name.given_name} su transacción fue exitosa!`);
                //       console.log({details, data});
                //       console.log(`La fecha de la transaccion fue el: ${details.create_time}, Lo realizo ${details.payer.name.given_name} ${details.payer.name.surname}, con correo electronico: ${details.payer.email_address}, por un valor de ${details.purchase_units[0].payments.captures[0].amount.value} dolares`);
                //     });
                // }}
            />
        </PayPalSection>
    )
}

export default PayPal;
