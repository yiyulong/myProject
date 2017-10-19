<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<title></title>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/vue/0.12.16/vue.min.js"></script>
</head>
<body>
<div id="demo" v-demo-directive="LightSlateGray : msg"></div>

<script>
    Vue.directive('demoDirective', {
        bind: function () {
            this.el.style.color = '#fff'
            this.el.style.backgroundColor = this.arg
        },
        update: function (value) {
            this.el.innerHTML =
                    'name - '       + this.name + '<br>' +
                    'raw - '        + this.raw + '<br>' +
                    'expression - ' + this.expression + '<br>' +
                    'argument - '   + this.arg + '<br>' +
                    'value - '      + value
        }
    });
    var demo = new Vue({
        el: '#demo',
        data: {
            msg: 'hello!'
        }
    })
</script>
</body>
</html>