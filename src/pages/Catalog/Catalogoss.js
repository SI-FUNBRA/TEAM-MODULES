import React from 'react';
import Cards from '../../components/components-catalogo/Cards';

// import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

import Navbar from '../../components/components-catalogo/Navbar';
import HeroCatalog from '../../components/components-catalogo/HeroCatalog';
import Footer from '../../components/components-homepage/Footer';

const Catalogos = () => {
    return (
        <div id='/catalogoAnimales'>
            <Navbar />
            <HeroCatalog />
            <Cards />
            <Footer />
        </div>
    )
}

export default Catalogos;
