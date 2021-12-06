import React from 'react';

import logo from './images/Logo.png'

export const DashFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? logo : 'assets/layout/images/logo.png'} alt="Logo" height="20" className="mr-2" />
        </div>
    );
}
