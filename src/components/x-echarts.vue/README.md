# XECharts

对 ECharts 进行了 Vue 封装，详细配置可以参考[配置项手册](https://www.echartsjs.com/option.html#series)。

## 使用方法

## 安装

``` shell
npm i --save x-echarts.vue
```

## 引入

``` js
import XEcharts from 'x-echarts.vue';

Vue.component('x-echarts', XEcharts);
```

## 示例
### 基本形式

``` vue
<template>
    <x-echarts :options="options"></x-echarts>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    title: {
                        text: '每星期访问量'
                    },
                    tooltip: {},
                    legend: {
                        data:['访问量']
                    },
                    xAxis: {
                        data: ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
                    },
                    yAxis: {},
                    series: [{
                        name: '访问量',
                        type: 'bar',
                        data: [250, 50, 350, 500, 100, 80, 460]
                    }],
                },
            };
        },
    };
</script>
```

### 主题


``` vue
<template>
    <x-echarts :options="options" theme="dark"></x-echarts>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    title: {
                        text: '每星期访问量'
                    },
                    tooltip: {},
                    legend: {
                        data:['访问量']
                    },
                    xAxis: {
                        data: ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
                    },
                    yAxis: {},
                    series: [{
                        name: '访问量',
                        type: 'bar',
                        data: [250, 50, 350, 500, 100, 80, 460]
                    }],
                },
            };
        },
    };
</script>
```

### 事件

``` vue
<template>
    <x-echarts :options="options" @legendselectchanged="legendselectchanged"></x-echarts>
</template>

<script>
    export default {
        data() {
            return {
                options: {
                    title: {
                        text: '每星期访问量'
                    },
                    tooltip: {},
                    legend: {
                        data:['访问量']
                    },
                    xAxis: {
                        data: ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
                    },
                    yAxis: {},
                    series: [{
                        name: '访问量',
                        type: 'bar',
                        data: [250, 50, 350, 500, 100, 80, 460]
                    }],
                },
            };
        },
        methods: {
            legendselectchanged(params) {
                console.log(params);
            },
        },
    };
</script>
```

## API
### Props/Attrs
| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| initOptions | Object | | 初始化时传入的附加参数 |
| options | Object | | 配置项 |
| theme | String,Object |  | 应用的主题 |
| group | String,Number |  | 图表的分组 |
| watchShallow | Boolean | `false` | 是否关闭对options的深度监听。 关闭后，options属性的变化不会触发图表更新，可用于大量数据的图表。|

### Methods

- setOption
- getWidth
- getHeight
- getOption
- resize
- dispatchAction
- convertToPixel
- convertFromPixel
- containPixel
- showLoading
- hideLoading
- getDataURL
- getConnectedDataURL
- appendData
- clear
- dispose
- isDisposed

### Static Methods

- connect
- disconnect
- registerMap
- getMap
- registerTheme
- graphic.clipPointsByRect
- graphic.clipRectByRect

### Events

- legendselectchanged
- legendselected
- legendunselected
- legendscroll
- datazoom
- datarangeselected
- timelinechanged
- timelineplaychanged
- restore
- dataviewchanged
- magictypechanged
- geoselectchanged
- geoselected
- geounselected
- pieselectchanged
- pieselected
- pieunselected
- mapselectchanged
- mapselected
- mapunselected
- axisareaselected
- focusnodeadjacency
- unfocusnodeadjacency
- brush
- brushselected
- rendered
- finished
- click
- dblclick
- mouseover
- mouseout
- mousedown
- mouseup
- globalout
