import React from 'react';

export const DashFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logolargo.png' : 'assets/layout/images/logo.png'} alt="Logo" height="20" className="mr-2" />
        </div>
    );
}
