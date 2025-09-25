required('C205107/event.js')

var C205107 = {
    tid: 'C205107',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205107'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205107.tid, 'ready', function () {
    C205107.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205107.tid, 'makeNode', function (params) {
    C205107.event.makeNode(params);
})
kitex.addEventListener(C205107.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205107.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205107.tid, 'viewableChange', function (viewable) {
    console.log('[C205107].viewableChange: ' + JSON.stringify(viewable));
    C205107.event.viewableChange(viewable);
})
