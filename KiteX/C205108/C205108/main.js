required('C205108/event.js')

var C205108 = {
    tid: 'C205108',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205108',
    sld: '5'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205108.tid, 'ready', function () {
    C205108.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205108.tid, 'makeNode', function (params) {
    C205108.event.makeNode(params);
})
kitex.addEventListener(C205108.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205108.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205108.tid, 'viewableChange', function (viewable) {
    console.log('[C205108].viewableChange: ' + JSON.stringify(viewable));
    C205108.event.viewableChange(viewable);
})
