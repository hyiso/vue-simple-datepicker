# vue-simple-datepicker
a simple datepicker component based on vue
# Test
```
npm install .
npm run test
```
# Usage
```
npm install vue-simple-datepicker
```
In your *.html page,use:
```
<body>
    <simple-datepicker
    :value.sync="today"
    format="YYYY/MM/DD"></simple-datepicker>
    <p>date picked: {{today}}</p>
</body>
```
In your app.js,use it like the:
```
import simpleDatepicker from 'vue-simple-datepicker'

new Vue({
    el: 'body',
    data () {
        return {
            today: '2016/04/26'
        }
    },
    components: {
        'simple-datepicker': simpleDatepicker
    }
})
```
# License
MIT