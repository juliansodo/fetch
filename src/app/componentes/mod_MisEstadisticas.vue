<template>
    <div class="card">
        <div class="card teal lighten-3">
            <div class="card-body  table-responsive ">
                <div class="card-title text-center duro   p-0"><h3>Estadisticas</h3></div>
                <div class="input-group">
                        <h2 class="form-control duro col-sm  red lighten-4 border border-warning">PREGUNTAS:        {{estadisticas.preguntas}}</h2>
                        <h2 class="form-control duro col-sm red lighten-4  border border-warning">RESPONDIDAS:        {{estadisticas.preguntas_respondidas}}</h2>
                        <h2 class="form-control duro col-sm red lighten-4  border border-warning">RECHAZADAS:        {{estadisticas.preguntas_rechazadas}}</h2>
                        <h2 class="form-control duro col-sm red lighten-4  border border-warning">PUNTAJE:       {{estadisticas.preguntas_puntaje}}</h2>
                </div>
                <div class="input-group mt-1">
                        <h2 class="form-control duro col-sm green lighten-4  border border-warning">POSTS: {{estadisticas.posts}} </h2>
                        <h2 class="form-control duro col-sm green lighten-4 border border-warning">RE-POST: {{estadisticas.reposts}}</h2>
                        <h2 class="form-control duro col-sm green lighten-4 border border-warning ">FAVORITOS: {{estadisticas.favoritos}}</h2>
                </div>
                <div class="input-group mt-1">
                        <h2 class="form-control duro col-sm blue lighten-4 border border-warning">SEGUIDAS: {{estadisticas.seguidos}}</h2>
                        <h2 class="form-control duro col-sm blue lighten-4 border border-warning">SEGUIDORES: {{estadisticas.seguidores}}</h2>
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
            estadisticas:[]
        }
    },
    created()
    {
        this.getEstadisticas()
    },
    methods:
    {
        getEstadisticas()
        {
            fetch("/getEstadisticas")
            .then(res=>res.json())
            .then(data=>
            {
                this.estadisticas = data;
            });
        }
    }
}
</script>
