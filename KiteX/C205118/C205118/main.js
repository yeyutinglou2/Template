required('C205118/event.js')

var C205118 = {
    tid: 'C205118',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205118'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205118.tid, 'ready', function () {
    C205118.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205118.tid, 'makeNode', function (params) {
    C205118.event.makeNode(params);
})
kitex.addEventListener(C205118.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205118.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205118.tid, 'viewableChange', function (viewable) {
    console.log('[C205118].viewableChange: ' + JSON.stringify(viewable));
    C205118.event.viewableChange(viewable);
})
