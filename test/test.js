import Vue from 'vue'

import datePicker from '../src/vue-simple-datepicker.vue'

new Vue({
    el: 'body',
    data () {
        return {
            today:'2016/04/26'
        }
    },
    components: {
        'simple-datepicker': datePicker,
    }
})