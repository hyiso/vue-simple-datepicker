import Vue from 'vue'

import datePicker from '../src/vue-simple-datepicker.vue'

new Vue({
    el: 'body',
    data () {
        return {
            today:'2016/26/04',
            format: 'YYYY/DD/MM'
        }
    },
    components: {
        'simple-datepicker': datePicker,
    }
})