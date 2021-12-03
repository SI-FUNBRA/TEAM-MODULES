import { Button } from 'primereact/button'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'
import React, { useEffect, useState } from 'react'
import { ServicioRolUsu } from '../../service/ServiocioRolUsu'
import { Dialog } from 'primereact/dialog'

const Permisos = () => {

    const [rolesUsus, setRolesUsus] = useState([])
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

    const [usuRol, setUsuRol] = useState({})

    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

    const serviRolUsu = new ServicioRolUsu()

    const [estado, setEstado] = useState(false)

    useEffect(() => {
        const serviRolUsu = new ServicioRolUsu()
        serviRolUsu.getUsuariosRol().then(res=>{
            console.log(res)
            let rolesXUsu = []
            let elid = 0
            if(res.data){
            res.data.forEach(el => {
                if(el.idUsuario !== elid){
                    el.UsuarioRol = [{...el.UsuarioRol}]
                    rolesXUsu.push(el)
                    elid = el.idUsuario
                }else{
                    let objeto = rolesXUsu.pop()
                    objeto.UsuarioRol = [...objeto.UsuarioRol,{...el.UsuarioRol}]
                    rolesXUsu.push(objeto)
                }
            });
            console.log(rolesXUsu)
            setRolesUsus(rolesXUsu)
            }
        }).catch(()=>{})
    }, [estado])

    const onSortChange = (event) => {
        const value = event.value;
        console.log(event)
        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };


    const dataviewHeader = (
        <div className="grid grid-nogutter">
            <div className="col-6" style={{ textAlign: 'left' }}>
                <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
            </div>
            <div className="col-6" style={{ textAlign: 'right' }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );

    const [dialogDelete, setDialogDelete] = useState(false)

    const showDialogDelete = () =>{
        setDialogDelete(true)
    }
    const hideDialogDelete = () =>{
        setDialogDelete(false)
    }

    const [userRolDelet, setUserRolDelet] = useState({
        usu:{
            nombreUsuario:""
        }
    })

    const quitarRolDialog = (usu, idRol) =>{
        showDialogDelete()
        setUserRolDelet({usu:usu, idRol:idRol})
    }

    const borrarRol = () =>{
        let funcion = () =>{
            serviRolUsu.deleteUsuarioRol({idUsuario:userRolDelet.usu.idUsuario, idRol:userRolDelet.idRol}).then(res=>{
            console.log("nice")
            })}
        showDialogConfirm(()=>funcion)
    }


    const rolAdimButton = (usu) =>{
        return (
            <Button onClick={()=>quitarRolDialog(usu,1)} tooltipOptions={{position:'left'}} tooltip="Administrador" icon="pi pi-user" className="p-button-rounded p-button-primary ml-2" />
        )
    }
    const rolGerenteButton = (usu) =>{
        return (
            <Button onClick={()=>quitarRolDialog(usu,2)} tooltipOptions={{position:'left'}} tooltip="Gerente" icon="pi pi-cog" className="p-button-rounded p-button-secondary ml-2" />
        )
    }
    const rolPartButton = (usu) =>{
        return (
            <Button onClick={()=>quitarRolDialog(usu,3)} tooltipOptions={{position:'left'}} tooltip="Participante" icon="pi pi-info" className="p-button-rounded p-button-warning ml-2" />
        )
    }
    const rolAddButton = (data) =>{
        return (
            <Button onClick={()=>showDialog(data)} tooltip="Agregar Rol" icon="pi pi-plus" tooltipOptions={{position:'left'}} className="p-button-rounded p-button-success ml-2" />
        )
    }

    const ButtonsRoles = (rol, usu) =>{

       return(
            <>
                {(rol.idRol === 1) && rolAdimButton(usu)}
                {(rol.idRol === 2) && rolGerenteButton(usu)}
                {(rol.idRol === 3) && rolPartButton(usu)}
            </>
        )
    }

    const dataviewListItem = (data) => {
        return (
            <div className="col-12">
                <div className="grid">
                    <div className="col-8 xl:col-10">
                        <div className="mt-2 mx-4 product-name">{data.nombreUsuario} {data.apellidoUsuario}</div>
                    </div>
                    <div className="col mx:col-2 mt-2">
                        {ButtonsRoles(data.UsuarioRol[0], data)}
                        {data.UsuarioRol[1] && ButtonsRoles(data.UsuarioRol[1], data)}
                        {data.UsuarioRol[2] && ButtonsRoles(data.UsuarioRol[2], data)}
                        {!data.UsuarioRol[2] && rolAddButton(data)}
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="text-center">
                        <div className="text-1xl font-bold">{data.nombreUsuario} {data.apellidoUsuario}</div>
                    </div>
                    <Divider/>
                    <div className="flex align-items-center justify-content-between">
                        {ButtonsRoles(data.UsuarioRol[0], data)}
                        {data.UsuarioRol[1] && ButtonsRoles(data.UsuarioRol[1], data)}
                        {data.UsuarioRol[2] && ButtonsRoles(data.UsuarioRol[2], data)}
                        {!data.UsuarioRol[2] && rolAddButton(data)}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        }
        else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    const [dialog, setDialog] = useState(false)

    const showDialog = (data) =>{
        console.log(data)
        setUsuRol(data)
        setDialog(true)
    }
    const hideDialog = () =>{
        setDialog(false)
    }

    const addRol = (idUsu, idRol) =>{
        let funcion = ()=>{
                serviRolUsu.newUsuarioRol({idUsuario:idUsu, idRol:idRol}).then(res=>{
                    console.log("nice")
                })
            }
        showDialogConfirm(()=>funcion)
    }

    const deleteDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialogDelete} />
            <Button label="Aceptar" onClick={borrarRol} icon="pi pi-check" className="p-button-text" type="button" />
        </>
    );

    const [changeStateDialog, setChangeStateDialog] = useState(false)


    const [confirmFunction, setConfirmFunction] = useState(()=>{})

    const hideDialogConfirm = () =>{
        setConfirmFunction(()=>{})
        setChangeStateDialog(false)
    }
    const showDialogConfirm = (funcion) =>{
        setConfirmFunction(funcion)
        setChangeStateDialog(true)
    }

    const confirmFun=()=>{
        confirmFunction()
        hideDialogConfirm()
        hideDialogDelete()
        hideDialog()
        setEstado(!estado)
    }

    const confirmDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDialogConfirm} />
            <Button onClick={confirmFun} label="Continuar" icon="pi pi-check" className="p-button-text" type="button" />
        </>
    );

    return (
        <div className="grid">

            <div className="col-12">
                <div className="card">
                    <h5>Gestion De Roles</h5>
                    <DataView value={rolesUsus} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
                </div>
            </div>

            <Dialog className="col-10 xl:col-6" header={`Seleccione el nuevo rol para ${usuRol.nombreUsuario} ${usuRol.apellidoUsuario}`} visible={dialog}  onHide={hideDialog}>
                <div className="text-center d-none d-xl-block">
                    <Button onClick={()=>addRol(usuRol.idUsuario, 1)} icon="pi pi-user" label="Administrador" className="p-button-rounded p-button-primary ml-2" />
                    <Button onClick={()=>addRol(usuRol.idUsuario, 2)} icon="pi pi-cog" label="Gerente" className="p-button-rounded p-button-secondary ml-2" />
                    <Button onClick={()=>addRol(usuRol.idUsuario, 3)} icon="pi pi-info" label="Participante" className="p-button-rounded p-button-warning ml-2" />
                </div>
                <div className="text-center d-block d-xl-none">
                    <Button onClick={()=>addRol(usuRol.idUsuario, 1)} icon="pi pi-user" className="p-button-rounded p-button-primary ml-2" />
                    <Button onClick={()=>addRol(usuRol.idUsuario, 2)} icon="pi pi-cog" className="p-button-rounded p-button-secondary mx-4" />
                    <Button onClick={()=>addRol(usuRol.idUsuario, 3)} icon="pi pi-info" className="p-button-rounded p-button-warning ml-2" />
                </div>
            </Dialog>

            <Dialog className="col-6" footer={deleteDialogFooter} header={`Quitar a ${userRolDelet.usu.nombreUsuario} el rol:`} visible={dialogDelete}  onHide={hideDialogDelete}>
                <div className="text-center">
                    {userRolDelet.idRol===1 && <Button disabled icon="pi pi-user" label="Administrador" className="p-button-rounded p-button-primary ml-2" />}
                    {userRolDelet.idRol===2 && <Button disabled icon="pi pi-cog" label="Gerente" className="p-button-rounded p-button-secondary ml-2" />}
                    {userRolDelet.idRol===3 && <Button disabled icon="pi pi-info" label="Participante" className="p-button-rounded p-button-warning ml-2" />}
                </div>
            </Dialog>

            <Dialog position="bottom" visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={confirmDialogFooter} onHide={hideDialogConfirm}>
                <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                    <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                    <span>¿Está seguro de realizar esta acción?</span>
                </div>
            </Dialog>
        </div>


    )
}

export default Permisos
