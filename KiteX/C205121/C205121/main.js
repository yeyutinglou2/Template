required('C205121/event.js')

var C205121 = {
    tid: 'C205121',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205121'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205121.tid, 'ready', function () {
    C205121.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205121.tid, 'makeNode', function (params) {
    C205121.event.makeNode(params);
})
kitex.addEventListener(C205121.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205121.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205121.tid, 'viewableChange', function (viewable) {
    console.log('[C205121].viewableChange: ' + JSON.stringify(viewable));
    C205121.event.viewableChange(viewable);
})
