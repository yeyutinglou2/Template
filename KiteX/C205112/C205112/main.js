required('C205112/event.js')

var C205112 = {
    tid: 'C205112',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205112',
    sld: '2'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205112.tid, 'ready', function () {
    C205112.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205112.tid, 'makeNode', function (params) {
    C205112.event.makeNode(params);
})
kitex.addEventListener(C205112.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205112.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205112.tid, 'viewableChange', function (viewable) {
    console.log('[C205112].viewableChange: ' + JSON.stringify(viewable));
    C205112.event.viewableChange(viewable);
})
