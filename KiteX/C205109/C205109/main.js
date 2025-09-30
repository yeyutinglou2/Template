required('C205109/event.js')

var C205109 = {
    tid: 'C205109',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205109'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205109.tid, 'ready', function () {
    C205109.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205109.tid, 'makeNode', function (params) {
    C205109.event.makeNode(params);
})
kitex.addEventListener(C205109.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205109.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205109.tid, 'viewableChange', function (viewable) {
    console.log('[C205109].viewableChange: ' + JSON.stringify(viewable));
    C205109.event.viewableChange(viewable);
})
