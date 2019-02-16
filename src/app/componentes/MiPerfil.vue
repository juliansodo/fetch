<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
asds
            </div>
            <div class="col-md-7">
                    <mis-estadisticas></mis-estadisticas>
            </div>
            <div class="col-md-2">
                <perfilesRecomendados> </perfilesRecomendados>
            </div>
        </div>
</div>
</template>

<script>
    import * as perfilesRecomendados from "./mod_PerfilesRecomendados.vue";
    import * as MisEstadisticas from "./mod_MisEstadisticas.vue";

export default {
        components: {
        'perfilesRecomendados': perfilesRecomendados,
        'mis-estadisticas' : MisEstadisticas
    },
    data(){
        return{

        }
    },
    methods:
    {
        
    }

}
</script>

