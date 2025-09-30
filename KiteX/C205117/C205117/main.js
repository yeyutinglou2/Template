required('C205117/event.js')

var C205117 = {
    tid: 'C205117',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205117'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205117.tid, 'ready', function () {
    C205117.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205117.tid, 'makeNode', function (params) {
    C205117.event.makeNode(params);
})
kitex.addEventListener(C205117.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205117.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205117.tid, 'viewableChange', function (viewable) {
    console.log('[C205117].viewableChange: ' + JSON.stringify(viewable));
    C205117.event.viewableChange(viewable);
})
