import React from 'react';

import DonacionEspecie from '../../components/components-donaciones/donacionEspecie/DonacionesEE';
import Navbar from '../../components/components-donaciones/Navbar';
import Hero from '../../components/components-donaciones/Hero';
import GlobalStyle from '../../components/components-homepage/GlobalStyle';
import Footer from '../../components/components-homepage/Footer';

const DonacionesEspecie = () => {
    return (
        <>
        <GlobalStyle />
         <Navbar />
         <Hero />
         <div id='/donacionEspecie'>
            <DonacionEspecie />
         </div>
        <Footer />
        </>
    )
}

export default DonacionesEspecie;
