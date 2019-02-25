

<template>

    <div class="container-fluid  m-0 p-0">
        <div class="col-md-12"  v-if="errorSesion.Puerta!=false">
            <div class="alert mt-2 alert-danger"  role="alert">
        {{errorSesion.Error}}
        </div>
        </div>
        <div class="card">
            <div class="card-header  teal lighten-2 ">
                <div class="card-title text-center duro white-text "><h1>Servicios</h1></div>
            </div>
            <div class="card-body">
                <div class="card-group">
                    <div class="col-md-3 col-sm-12 col-12 col-xl-3 mb-sm-4" v-for="servicio of servicios" :key="servicio +'-1'">
                        <div class="card">
                            <div class="card-header teal lighten-2 text-white">
                                <div class="card-title text-center p-0 "><h4 class="m-0" :key="servicio.titulo  +'-2'">{{servicio.titulo}}</h4></div>
                            </div>
                            <div class="card-body">
                                <p class="card-text" :key="servicio.descripcion +'-3'">
                                    {{servicio.descripcion}}
                                </p>
                            </div>
                            <div class="card-footer p-3">
                                <button class="btn btn-success btn-sm btn-block" :key="servicio.id  +'-4'" v-on:click="showModal(servicio.id)">Añadir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div :class="{'d-block':modalServicio.estado == true}" style="opacity:1; background:rgb(181, 206, 203, .4);" class="modal fade mt-4 p-4" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Iniciar sesión en {{modalServicio.informacion.titulo}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal()">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-0">
                <button class="btn rounded-0 btn-block text-center white-text" style="background:#4267b1;" id="btnLoguearFB" v-on:click="iniciarSesionFB" scope="public_profile,email,groups">Iniciar sesión con Facebook</button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeModal()"> Salir</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>




<script>

export default {
    data()
    {
        return{
            servicios:[],
            modalServicio:
            {
                "estado":false,
                "informacion":[]
            },
            errorSesion:
            {
                Puerta:false,
                Error:""
            }
        }
    },
    created()
    {
        this.getServicios()
    },
    methods:
    {
        getServicios()
        {
            fetch("/getServicios")
            .then(res => res.json())
            .then(data =>
            {
                this.servicios = data;
            });
        },
        showModal(id)
        {
           
            this.modalServicio.estado=true;
            for(var servicio of this.servicios)
            {
                if(servicio.id == id)
                {
                    this.modalServicio.informacion = servicio
                }
            }
        },
        closeModal()
        {
            this.modalServicio.informacion = [];
            this.modalServicio.estado=false;
        },
        iniciarSesionFB()
        {
            FB.init({
            appId  : '319173528950567',
            status : true, 
            cookie : true, 
            xfbml  : true  
            });
            FB.login((res)=>
            {
                if(res.status=="connected")
                {
                    let body = {
                        tipo:this.modalServicio.informacion.id,
                        token:res.authResponse.accessToken
                    }
                  
                    fetch("/NuevoServicio",
                    {
                        method:"post",
                        body:JSON.stringify(body),
                        headers:
                        {
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        }
                    })
                    .then(res=>res.json())
                    .then(data=>
                    {
                      this.errorSesion = data;
                    })
                }
            });
        }
        
    }
}
</script>

