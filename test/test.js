import Vue from 'vue'

import datePicker from '../src/vue-simple-datepicker.vue'

import * as _ from '../src/util'

new Vue({
    el: 'body',
    data () {
        return {
            today: _.getFormatDate(new Date(),'YYYY/MM/DD')
        }
    },
    components: {
        'simple-datepicker': datePicker,
    }
})