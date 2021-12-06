import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from '../../components/components-donaciones/Navbar';
import Hero from '../../components/components-donaciones/Hero';
import GlobalStyle from '../../components/components-homepage/GlobalStyle';
import DonacionesE from '../../components/components-donaciones/donacionEconomica/DonacionesE';
import Footer from '../../components/components-homepage/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';

const Donaciones = () => {

    const history = useHistory();

    const [dialogLogin, setDialogLogin] = useState(false)

    const showDialog = (ruta) =>{
        console.log(dialogLogin)
        if(localStorage.getItem('token')){
            history.push(ruta)
        }else{
        setDialogLogin(true)
        }
    }

    return (
        <>
        <GlobalStyle />
         <Navbar />
         <Hero showDialog={showDialog} />
         <div id='/donacionEconomica'>
            <DonacionesE />
         </div>;
        <Footer />
        </>
    )
}


export default Donaciones
