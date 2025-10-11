required('C205114/event.js')

var C205114 = {
    tid: 'C205114',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205114',
    sld: '5'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205114.tid, 'ready', function () {
    C205114.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205114.tid, 'makeNode', function (params) {
    C205114.event.makeNode(params);
})
kitex.addEventListener(C205114.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205114.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205114.tid, 'viewableChange', function (viewable) {
    console.log('[C205114].viewableChange: ' + JSON.stringify(viewable));
    C205114.event.viewableChange(viewable);
})
