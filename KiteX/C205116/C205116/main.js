required('C205116/event.js')

var C205116 = {
    tid: 'C205116',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205116',
    sld: '2'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205116.tid, 'ready', function () {
    C205116.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205116.tid, 'makeNode', function (params) {
    C205116.event.makeNode(params);
})
kitex.addEventListener(C205116.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205116.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205116.tid, 'viewableChange', function (viewable) {
    console.log('[C205116].viewableChange: ' + JSON.stringify(viewable));
    C205116.event.viewableChange(viewable);
})
