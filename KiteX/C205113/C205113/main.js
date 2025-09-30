required('C205113/event.js')

var C205113 = {
    tid: 'C205113',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205113'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205113.tid, 'ready', function () {
    C205113.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205113.tid, 'makeNode', function (params) {
    C205113.event.makeNode(params);
})
kitex.addEventListener(C205113.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205113.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205113.tid, 'viewableChange', function (viewable) {
    console.log('[C205113].viewableChange: ' + JSON.stringify(viewable));
    C205113.event.viewableChange(viewable);
})
