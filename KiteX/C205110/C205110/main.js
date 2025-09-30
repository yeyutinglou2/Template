required('C205110/event.js')

var C205110 = {
    tid: 'C205110',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205110'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205110.tid, 'ready', function () {
    C205110.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205110.tid, 'makeNode', function (params) {
    C205110.event.makeNode(params);
})
kitex.addEventListener(C205110.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205110.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205110.tid, 'viewableChange', function (viewable) {
    console.log('[C205110].viewableChange: ' + JSON.stringify(viewable));
    C205110.event.viewableChange(viewable);
})
