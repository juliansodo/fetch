<template>
    <p>{{estadisticas}}</p>
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
            })
        }
    }
}
</script>
