import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { ServicioDonacionEconomica } from '../../service/ServicioDonacionEconomica';
const IndexUsu = () => {

    const [usuarios, setUsuarios] = useState(null);
    //editar o mostrar uno nomas
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);



    //Obtener la data para llenar las tables
    useEffect(() => {
        const servicioDonE = new ServicioDonacionEconomica();
        servicioDonE.getDonacionesE().then(res => setUsuarios(res.data)).catch(()=>{});
    },[]);


    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }


    //Codigo de las acciones de la tabla
    const leftToolbarTemplate = () => {
        return (
            //retorna un fragmento de codigo con botones, parte superior izquierda
            <React.Fragment>
                <div className="my-2">
                </div>
            </React.Fragment>
        )
    }

    //Esto al parecer son las acciones disponibles de exportacion, parte superior derecha
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Generar CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.Usuario.nombreUsuario}
            </>
        );
    }

    const apellidoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Apellido</span>
                {rowData.Usuario.apellidoUsuario}
            </>
        );
    }


    const celularBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Celular</span>
                {rowData.montoDonacion}
            </>
        );
    }

    const documentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Documento</span>
                {rowData.metododepago.nombreMetodoPago}
            </>
        );
    }

    const barrioBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Ciudad</span>
                {rowData.fechaDonacion}
            </>
        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    //aqui ya empieza el codigo normal :D
    return (

        <div className="grid crud-demo">

            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} position="bottom-right"/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <div className="card p-0">
                    <DataTable ref={dt} value={usuarios}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column field="nombreUsuario" header="Nombre" sortable body={nombreBodyTemplate}></Column>
                        <Column field="apellidoUsuario" header="Apellido" sortable body={apellidoBodyTemplate}></Column>
                        <Column field="telefonoCelular" header="Monto" body={celularBodyTemplate} sortable></Column>
                        <Column field="numeroDocumento" header="Metodo De Pago" sortable body={documentoBodyTemplate}></Column>
                        <Column field="Ciudad.nombreCiudad" header="Fecha Donación" body={barrioBodyTemplate} sortable></Column>
                    </DataTable>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default IndexUsu
