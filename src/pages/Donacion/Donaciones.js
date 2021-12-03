import React from 'react';

import Navbar from '../../components/components-donaciones/Navbar';
import Hero from '../../components/components-donaciones/Hero';
import GlobalStyle from '../../components/components-homepage/GlobalStyle';
import DonacionesE from '../../components/components-donaciones/donacionEconomica/DonacionesE';
import Footer from '../../components/components-homepage/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';

const Donaciones = () => {
    return (
        <>
        <GlobalStyle />
         <Navbar />
         <Hero />
         <div id='/donacionEconomica'>
            <DonacionesE />
         </div>
        <Footer />
        </>
    )
}

export default Donaciones
