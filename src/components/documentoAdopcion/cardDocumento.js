import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ServicioDocumento from '../../service/ServicioDocumento';


const CardDocumento =  ({documento}) => {

    const [changeStateDialog, setchangeStateDialog] = useState(false);
    const toast = useRef(null);


    const hidechangeStateDialog = () => {
        setchangeStateDialog(false);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = () =>{
        setchangeStateDialog(true);
    }

    //funcion para cambiar el estado de un usuario
    const deleteDocumento = () => {
            const servicioDocumento = new ServicioDocumento
            servicioDocumento.deleteDocumento(documento.idDocumentoSolicitud).then(res=>{
            //Mostrar mensaje de Proceso realizado
            //toast.current.show({ severity: 'warn', summary: '¡Acción Exitosa!', detail: `Registro eliminado exitosamente`, life: 3000 });
            alert('Registro eliminado')
            window.location.reload(true)
        })
        hidechangeStateDialog();
    }

    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteTipoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="De acuerdo" icon="pi pi-check" className="p-button-text" onClick={deleteDocumento} />
        </>
    );



    return(
        <div>
            <div className="p-col-12">
                <div className="product-list-item">
                <iframe style={{width: '100%'}}
                                        src={`${documento.file}`}
                                        onError={(e) => e.target.src='http://localhost:3005/FORMULARIO_DE_ADOPCIÓN_FUNBRA.docx'}
                                        />
                    <div className="product-list-detail">
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{documento.idDocumento}</span>
                    </div>
                    <div className="product-list-action">
                    <Button className="p-button-danger" icon="pi pi-trash" label="Eliminar documento" onClick={confirmChangeState}></Button>
                    </div>
                </div>
            </div>

            <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteTipoDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {<span>¿Está seguro de eliminar el registro?</span>}
                        </div>
            </Dialog>
        </div>

    )
}

export default CardDocumento
