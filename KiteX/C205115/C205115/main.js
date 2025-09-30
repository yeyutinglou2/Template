required('C205115/event.js')

var C205115 = {
    tid: 'C205115',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205115'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205115.tid, 'ready', function () {
    C205115.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205115.tid, 'makeNode', function (params) {
    C205115.event.makeNode(params);
})
kitex.addEventListener(C205115.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205115.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205115.tid, 'viewableChange', function (viewable) {
    console.log('[C205115].viewableChange: ' + JSON.stringify(viewable));
    C205115.event.viewableChange(viewable);
})
