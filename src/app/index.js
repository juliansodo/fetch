import Vue from 'vue';
import indexSync from './componentes/indexSync.vue';
import indexNoSync from './componentes/indexNoSync.vue';
<<<<<<< HEAD
import MiPerfil from './componentes/MiPerfil.vue';
=======
>>>>>>> 4028c9f66e76aaae23693a992219fb5cc9ec5885
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

<<<<<<< HEAD
new Vue({
    render: h => h(MiPerfil)
}).$mount("#MiPerfil");
=======

>>>>>>> 4028c9f66e76aaae23693a992219fb5cc9ec5885
