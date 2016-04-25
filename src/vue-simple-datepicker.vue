<template>
    <div class="datepicker-container" @click.stop="showPanel">
        <div class="datepicker-input">
            <input readonly type="text"
            v-model="value"
            @focus="showPanel"
            >
        </div>
        <div class="datepicker-panel" v-show="show" :style="style">
            <div class="datepicker-header">
                <a class="prev" @click.stop="prevMonth"></a>
                <div class="title">
                    <a @click.stop="showYears">{{currentYear}}</a>
                    <a @click.stop="showMonths">{{months[currentMonth]}}</a>
                </div>
                <a class="next" @click.stop="nextMonth"></a>
            </div>
            <div class="datepicker-body">
                <ul class="datepicker-list" id="year-list" v-show="currentSelect=='year'" @scroll="addYear">
                    <li v-for="year in years" @click="selectYear($index)">{{year}}</li>
                </ul>
                <ul class="datepicker-list" v-show="currentSelect=='month'">
                    <li v-for="month in months" @click="selectMonth($index)">{{month}}</li>
                </ul>
                <table v-show="currentSelect=='day'">
                    <thead>
                        <tr><th v-for="week in weeks">{{week}}</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in 6">
                            <td
                            v-for="j in 7"
                            :class="{
                            'active': days[i * 7 + j].isSameDay,
                            'disabled': days[i * 7 + j].isDisabled,
                            'current': days[i * 7 + j].isSameMonth
                            }"
                            @click.stop="seletedDay(days[i * 7 + j])">{{days[i * 7 + j].text}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style>
.datepicker-container {
    display: inline-block;
    position: relative;
}
.datepicker-container a{
    color: #666;
    text-decoration: none;
}
.datepicker-container a:hover{
    color: #666;
    text-decoration: none;
}
.datepicker-container [disabled] {
    cursor: not-allowed;
}
.datepicker-panel {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    width: 240px;
    color: #666;
    box-shadow: 1px 0px 6px rgba(0,0,0,0.2);
}
.datepicker-header {
    position: relative;
    height: 40px;
    text-align: center;
    background-color: #2db7f5;
    color: #fff;
}
.datepicker-header .title {
    width: 140px;
    margin: 0 auto;
}
.datepicker-header .title a {
    display: block;
    line-height: 20px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}
.datepicker-header .title a:hover {
    background-color: #70caf1;
}
.datepicker-header .prev,
.datepicker-header .next {
    position: absolute;
    top: 0;
    width: 50px;
    height: 40px;
    cursor: pointer;
}
.datepicker-header .prev {
    left: 0;
}
.datepicker-header .next {
    right: 0;
}
.datepicker-header .next:hover,
.datepicker-header .prev:hover {
    background-color: #70caf1;
}
.datepicker-header .prev:before,
.datepicker-header .prev:after,
.datepicker-header .next:before,
.datepicker-header .next:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 2px;
    left: 50%;
    top: 50%;
    background-color: #fff;
}
.datepicker-header .prev:before,
.datepicker-header .prev:after {
    transform-origin: 0 0;
}
.datepicker-header .prev:before {
    transform: rotate(-45deg);
    margin-left: -3px;
}
.datepicker-header .prev:after {
    transform: rotate(45deg);
    margin-left: -2px;
    margin-top: -1px;
}
.datepicker-header .next:before,
.datepicker-header .next:after {
    transform-origin: 12px 0;
}
.datepicker-header .next:before {
    transform: rotate(-45deg);
    margin-left: -8px;
    margin-top: -1px;
}
.datepicker-header .next:after {
    transform: rotate(45deg);
    margin-left: -7px;
}
.datepicker-body .datepicker-list {
    max-height: 200px;
    overflow-y: scroll;
    padding: 0;
    margin: 0;
    list-style-type: none;
}
.datepicker-body .datepicker-list li {
    line-height: 2;
    text-align: center;
    cursor: pointer;
}
.datepicker-body .datepicker-list li:hover {
    background-color: #f3f3f3;
}
.datepicker-body table {
    border-collapse: collapse;
    max-width: 100%;
    background-color: transparent;
    width: 100%
}
.datepicker-body th, .datepicker-body td {
    line-height: 1.5;
    text-align: center;
}
.datepicker-body td {
    color: #999;
    cursor: pointer;
    line-height: 1.5;  
}
.datepicker-body td.current {
    color: #333;
}
.datepicker-body td:hover {
    background-color: #eee;
    cursor: pointer;
}
.datepicker-body td.active {
    background: #2db7f5;
    color: #fff;
    border: 1px solid transparent;
}
.datepicker-body td.disabled {
    cursor: not-allowed;
    color: #bcbcbc;
    background: #f3f3f3;
}
</style>
<script>
var isSameDay = function(a, b) {
    return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}
var isSameMonth = function(a, b) {
    return a.getMonth() === currentMonth
}
var getOffsetDay = function(today, num) {
    return new Date(today.valueOf() + num * 86400000)
}
var zeroPadding = function(num) {
    var num = Number(num)
    return num < 10 ? '0' + num : num
}
var getFormatDate = function(day, format) {
    var tmp = {}
    tmp.YYYY = day.getFullYear().toString()
    tmp.MM = zeroPadding((day.getMonth() + 1))
    tmp.DD = zeroPadding(day.getDate())
    return format.replace(/([^/]+)/g, function(match) {
        return tmp[match]
    })
}
export default {
    props: {
        value: {
            type: String,
            required: false
        },
        format: {
            type: String,
            default: 'YYYY/MM/DD'
        },
        disabledDate: {
            type: Function,
            required: false
        },
        style: {
            type: Object,
            default () {
                return {
                    'z-index': 2,
                    'font-size': '14px',
                    'background-color': '#fff'
                }
            }
        }
    },
    data () {
        return {
            show: false,
            currentDay: null,
            currentYear: null,
            currentMonth: null,
            currentDate: null,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            years: [],
            weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            currentSelect: 'day'
        }
    },
    created () {
        if(this.value) {
            this.currentDay = new Date(this.value)
        } else {
            this.currentDay = new Date()
        }
        this.currentYear = this.currentDay.getFullYear()
        this.currentMonth = this.currentDay.getMonth()
        this.currentDate = this.currentDay.getDate()
    },
    ready () {
        document.addEventListener('click', () => {
            this.show = false
        }, false)
    },
    computed: {
        days () {
            var days = []
            var firstDay = new Date(this.currentYear, this.currentMonth, 1)
            var startDay = getOffsetDay(firstDay, -1 * firstDay.getDay())
            for (var i = 0; i < 42; i++) {
                var day = getOffsetDay(startDay, i)
                days.push({
                    day: day,
                    text: day.getDate(),
                    isDisabled: this.disabledDate(day),
                    isSameDay: isSameDay(day, this.currentDay),
                    isSameMonth: day.getMonth() === this.currentMonth
                })
            }
            return days
        }
    },
    watch: {
        value (newVal) {
            if(newVal) {
                this.currentDay = new Date(newVal)
            } else {
                this.currentDay = new Date()
            }
            this.currentYear = this.currentDay.getFullYear()
            this.currentMonth = this.currentDay.getMonth()
            this.currentDate = this.currentDay.getDate()
        }
    },
    methods: {
        disabledDate (day) {
            return day && day.getTime() > Date.now();
        },
        prevMonth () {
            if (this.currentMonth === 1) {
                this.currentMonth = 12
                this.currentYear -= 1
            } else {
                this.currentMonth -= 1
            }
        },
        nextMonth () {
            if (this.currentMonth === 12) {
                this.currentMonth = 1
                this.currentYear += 1
            } else {
                this.currentMonth += 1
            }
        },
        showYears () {
            let yearsArr = []
            for (let i = this.currentYear - 100; i < this.currentYear + 5; ++i) {
              yearsArr.push(i)
            }
            this.years = yearsArr
            this.$nextTick(() => {
                let listDom = document.getElementById('year-list');
                listDom.scrollTop = (listDom.scrollHeight - 100)
            })
            this.currentSelect = 'year'
        },
        showMonths () {
            this.currentSelect = 'month'
        },
        selectYear ($index) {
            this.currentYear = this.years[$index]
            this.currentSelect = 'month'
        },
        selectMonth ($index) {
            this.currentMonth = $index
            this.currentSelect = 'day'
        },
        seletedDay (date) {
            if(!date.isDisabled) {
                this.value = getFormatDate(date.day, this.format)
                this.show = false
            }
        },
        addYear (e) {
            let listDom = e.target
            if (listDom.scrollTop < listDom.scrollHeight - 100) {
                let len = this.years.length
                let lastYear = this.years[len - 1]
                this.years.push(lastYear + 1)
            }
        },
        showPanel () {
            this.show = true
        }
    }
}
</script>