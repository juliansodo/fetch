import Vue from 'vue';
import indexSync from './componentes/indexSync.vue';
import indexNoSync from './componentes/indexNoSync.vue';
import MiPerfil from './componentes/MiPerfil.vue';
import registro from './componentes/registro.vue';

new Vue({
    render: h => h(indexSync)
}).$mount("#indexSync");


new Vue({

    render: h => h(indexNoSync)
}).$mount("#indexNoSync");

new Vue({

    render: h => h(registro)
}).$mount("#registro");

new Vue({
    render: h => h(MiPerfil)
}).$mount("#MiPerfil");
