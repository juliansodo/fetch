<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title duro text-center"><h4>RECOMENDADOS</h4></div>
                <div class="card  border-0">
                    <div class="card-body" >
                        <div v-for="recomendado of perfilesrecomendados" :key="recomendado + '-first'"> 
                            <div class="row mt-1">
                <!-- PRIMER PERFIL RECOMENDADO -->
                                <div class="col-md-4 col-sm-2 col-3">
                                    <img v-bind:src="'/img/' + recomendado.perfil_img" alt="" class="img-responsive rounded-circle  h-75  w-100">
                                </div>
                                <div class="col-md-8 col-sm-8  col-8">
                                    <a :key="recomendado.usuario + '-first'" v-bind:href="'/perfiles/' + recomendado.usuario" ><h6>{{recomendado.nombre}}</h6></a>
                                    <a :key="recomendado.usuario + '-first'" v-bind:href="'/perfiles/' + recomendado.usuario" > <label for="" class="grey-text" :key="recomendado.usuario + '-third'">@{{recomendado.usuario}}</label></a>
                                </div>
                                <div class="col-md-12 text-right">
                                    <div class="col-md-12">
                                        <div class="row float-right">
                                            <div class="col-md-3 col-3 ml-5 col-sm-3">
                                                <a href=""><i class="material-icons green-text">person_add</i></a>
                                            </div>
                                            <div class="col-md-3 col-3 col-sm-3 ml-5">
                                            <a href=""><i class="material-icons orange-text">priority_high</i></a>
                                            </div>
                                        </div>
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
            perfilesrecomendados: []
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
        }
    }
}
</script>
