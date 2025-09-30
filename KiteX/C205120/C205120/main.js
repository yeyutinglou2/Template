required('C205120/event.js')

var C205120 = {
    tid: 'C205120',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205120'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205120.tid, 'ready', function () {
    C205120.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205120.tid, 'makeNode', function (params) {
    C205120.event.makeNode(params);
})
kitex.addEventListener(C205120.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205120.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205120.tid, 'viewableChange', function (viewable) {
    console.log('[C205120].viewableChange: ' + JSON.stringify(viewable));
    C205120.event.viewableChange(viewable);
})
