<template>
    <div class="card">
        <div class="card-header">
            <div class="card-img-top col-12 col-sm-12 col-md-12 mx-auto text-center">
                <img :src="'/img/' + mi_perfil.perfil_img" class="img-responsive rounded-circle w-75 img-circle" alt="" style="border:3px white solid;">
            </div>
            <div class="card-img-top col-12 col-sm-12 col-md-12 col-xs-12 col-xl-12 mx-auto text-center">
                <div class="card-body col-md-12 col-sm-12 col-12 ">
                    <div class="card-title"><h4>{{mi_perfil.nombre}}</h4></div>
                    <h6 class="text-muted">@{{mi_perfil.usuario}}</h6>
                    <div class="text-muted col-12 col-md-12 col-sm-12">
                        <small>
                            {{mi_perfil.header}}
                        </small>
                    </div>
                    <a href="/editarPerfil/" class="btn teal mt-1 white-text btn-rounded">
                        Editar perfil
                    </a>
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
            mi_perfil:[]
        }
    },
    created()
    {
        this.CargarMiPerfil()
    },
    methods:
    {
        CargarMiPerfil()
        {
            fetch("/CargarMiPerfil")
            .then(res=>res.json())
            .then(data=>
            {
                this.mi_perfil = data;
            })
        }
    }
}
</script>
