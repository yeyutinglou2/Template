required('C205119/event.js')

var C205119 = {
    tid: 'C205119',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205119'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205119.tid, 'ready', function () {
    C205119.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205119.tid, 'makeNode', function (params) {
    C205119.event.makeNode(params);
})
kitex.addEventListener(C205119.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205119.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205119.tid, 'viewableChange', function (viewable) {
    console.log('[C205119].viewableChange: ' + JSON.stringify(viewable));
    C205119.event.viewableChange(viewable);
})
