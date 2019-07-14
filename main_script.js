
var app = new Vue({
    el: '#app',
    data: {
      message: '안녕하세요 Vue!'
    }
  })


var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
        { text: 'JavaScript 배우기' },
        { text: 'Vue 배우기' },
        { text: '무언가 멋진 것을 만들기' }
        ]
    }
})