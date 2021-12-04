 export class DashMenuOptions {

    optionsMenu(idRol){
        switch (idRol) {
            case 1:
                return [
                        {
                            label: 'Principal',
                            items: [
                                {label:'Inicio', icon: 'pi pi-fw pi-home', to:'/dash'},
                                {label:'Perfil', icon: 'pi pi-fw pi-id-card', to:'/dash/perfil'}
                            ]
                        },
                        {
                            label: "Admin",
                            items:[
                                {label:'Permisos', icon: 'pi pi-fw pi-pencil', to:'/dash/permisos'},
                                {label:'Extra Usuarios', icon:'pi pi-fw pi-th-large', to:'/dash/otrosmodulos'},
                                {label:'Paises y Ciudades', icon:'pi pi-fw pi-globe', to:'/dash/otrosmodulosPaisCiudad'}
                            ]
                        },
                        {
                            label: 'Modulos',
                            items: [
                                {label:'Usuarios', icon:'pi pi-fw pi-users', to:'/dash/usuarios'},
                                {label:'Donacion Economica', icon:'pi pi-fw pi-money-bill', to:'/dash/donacionEconomica'},
                                {label:'Donacion Especie', icon:'pi pi-fw pi-wallet', to:'/dash/donacionEspecie'}
                            ]
                        }
                    ];
            case 2:
                return [
                        {
                            label: 'Principal',
                            items: [
                                {label:'Inicio', icon: 'pi pi-fw pi-home', to:'/dash'},
                                {label:'Perfil', icon: 'pi pi-fw pi-id-card', to:'/dash/perfil'}
                            ]
                        },
                        {
                            label: 'Modulos',
                            items: [
                                {label:'Usuarios', icon:'pi pi-fw pi-users', to:'/dash/usuarios'},
                                {label:'Donacion Economica', icon:'pi pi-fw pi-money-bill', to:'/dash/donacionEconomica'},
                                {label:'Donacion Especie', icon:'pi pi-fw pi-wallet', to:'/dash/donacionEspecie'}

                            ]
                        }
                    ];

            default:
                return [
                        {
                            label: 'Principal',
                            items: [
                                {label:'Inicio', icon: 'pi pi-fw pi-home', to:'/dash'},
                                {label:'Perfil', icon: 'pi pi-fw pi-id-card', to:'/dash/perfil'}
                            ]
                        }
                ]
        }
    }

}
