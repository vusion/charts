import ECharts from 'echarts';
import Vue from 'vue';

const EVENTS = [
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'legendscroll',
    'datazoom',
    'datarangeselected',
    'timelinechanged',
    'timelineplaychanged',
    'restore',
    'dataviewchanged',
    'magictypechanged',
    'geoselectchanged',
    'geoselected',
    'geounselected',
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'axisareaselected',
    'focusnodeadjacency',
    'unfocusnodeadjacency',
    'brush',
    'brushselected',
    'rendered',
    'finished',
    'click',
    'dblclick',
    'mouseover',
    'mouseout',
    'mousedown',
    'mouseup',
    'globalout',
];

export default {
    name: 'x-echarts',
    props: {
        initOptions: Object,
        options: Object,
        theme: [String, Object],
        group: [String, Number],
        watchShallow: Boolean,
    },
    data() {
        return {
            chart: null,
        };
    },
    watch: {
        group(group) {
            this.chart.group = group;
        },
        options: {
            handler(options) {
                !this.chart && options ? this.init() : this.setOption(options, true);
            },
            deep: !this.watchShallow,
        },
        initOptions: {
            handler() {
                this.refresh();
            },
            deep: true,
        },
        theme: {
            handler() {
                this.refresh();
            },
            deep: true,
        },
        watchShallow() {
            this.refresh();
        },
    },
    mounted() {
        if (this.options)
            this.init();
    },
    beforeDestroy() {
        if (!this.chart)
            return;
        this.destroy();
    },
    methods: {
        init() {
            if (this.chart)
                return;

            const chart = ECharts.init(this.$el, this.theme, this.initOptions);
            chart.setOption(this.options, true);

            if (this.group)
                chart.group = this.group;

            EVENTS.forEach((event) => {
                chart.on(event, (params) => {
                    this.$emit(event, params);
                });
            });

            this.chart = chart;
        },
        destroy() {
            this.dispose();
            this.chart = null;
        },
        refresh() {
            this.destroy();
            this.init();
        },
        setOption(options, notMerge, lazyUpdate) {
            this.delegateMethod('setOption', options, notMerge, lazyUpdate);
        },
        getWidth() {
            return this.delegateMethod('getWidth');
        },
        getHeight() {
            return this.delegateMethod('getHeight');
        },
        getOption() {
            return this.delegateMethod('getOption');
        },
        resize(options) {
            this.delegateMethod('resize', options);
        },
        dispatchAction(payload) {
            this.delegateMethod('dispatchAction', payload);
        },
        convertToPixel(finder, value) {
            return this.delegateMethod('convertToPixel', finder, value);
        },
        convertFromPixel(finder, value) {
            return this.delegateMethod('convertFromPixel', finder, value);
        },
        containPixel(finder, value) {
            return this.delegateMethod('containPixel', finder, value);
        },
        showLoading(type, options) {
            this.delegateMethod('showLoading', type, options);
        },
        hideLoading() {
            this.delegateMethod('hideLoading');
        },
        getDataURL(options) {
            return this.delegateMethod('getDataURL', options);
        },
        getConnectedDataURL(options) {
            return this.delegateMethod('getConnectedDataURL', options);
        },
        appendData(params) {
            this.delegateMethod('appendData', params);
        },
        clear() {
            this.delegateMethod('clear');
        },
        dispose() {
            this.delegateMethod('dispose');
        },
        getIsDispose() {
            return this.delegateMethod('isDisposed');
        },
        delegateMethod(name, ...args) {
            if (!this.chart) {
                Vue.util.warn(`Cannot call [${name}] before the chart is initialized. Set prop [options] first.`, this);
                return;
            }
            return this.chart[name](...args);
        },
    },
    connect(group) {
        ECharts.connect(group);
    },
    disconnect(group) {
        ECharts.disconnect(group);
    },
    registerMap(mapName, geoJSON, specialAreas) {
        ECharts.registerMap(mapName, geoJSON, specialAreas);
    },
    getMap(mapName) {
        ECharts.getMap(mapName);
    },
    registerTheme(name, theme) {
        ECharts.registerTheme(name, theme);
    },
    graphic: ECharts.graphic,
};
