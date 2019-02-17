<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title duro text-center"><h4>RECOMENDADOS</h4></div>
                <div class="card  border-0 mb-0">
                    <div class="card-body p-0" >
                        <div v-for="recomendado of perfilesrecomendados" :key="recomendado + '-first'"> 
                            <div class="row mt-1">
                <!-- PRIMER PERFIL RECOMENDADO -->
                                <div class="col-md-3 col-sm-3 col-3">
                                    <img :key="recomendado.perfil_img + '-first'" v-bind:src="'/img/' + recomendado.perfil_img" alt="" class=" rounded-circle  h-100  w-100">
                                </div>
                                <div class="col-md-9 col-sm-9  col-9 row">
                                    <a :key="recomendado.usuario + '-first'" v-bind:href="'/perfiles/' + recomendado.usuario" ><label :key="recomendado.nombre + '-first'">{{recomendado.nombre}}</label></a>
                                    <a class="ml-1" :key="recomendado.usuario + '-second'" v-bind:href="'/perfiles/' + recomendado.usuario" > <small for="" class="grey-text" :key="recomendado.usuario + '-third'">@{{recomendado.usuario}}</small></a>
                                 </div>
                                <div class="row mx-auto">
                                 <div class="float-right">
                                    <button class="btn btn-sm ml-1 btn-outline-primary"  v-on:click="Seguir(recomendado.id, this)">Seguir</button>
                                    <button class="btn btn-outline-warning btn-sm ml-1">Preguntar</button>
                                 </div>
                                 </div>
                            </div>
                         <hr>
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
            perfilesrecomendados: [],
            Perfil_Seguido:{
                'active':true,
                'btn-outline-primary':false
            }
        }
    },
    created(){
        this.cargarRecomendados()
    },
    methods:
    {
        cargarRecomendados()
        {
            fetch("/cargarRecomendados")
            .then(res => res.json())
            .then(data => 
            {
                this.perfilesrecomendados = data;
            })
        },
        Seguir(id, objeto)
        {
            this.body = 
            {
                id:id
            }
           fetch("/seguirusuario",
           {
               method:"POST",
               body:JSON.stringify(this.body),
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
           })
            .then(res=>res.json())
            .then(data=>
           {
                this.cargarRecomendados()
           })
        }
    }
}
</script>
