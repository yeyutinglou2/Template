required('4201001/event.js')
required('4201001/track.js')
required('4201001/utils.js')

var main = {
    tid: '4201001',
    event: {},
    track: {},
    utils: {},
    widgetId: '205107',
    frameId: '502001'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(main.tid, 'ready', function () {
    main.event.ready();
    kitex.countDown.addEventListener('control_right_skipview_id', main.event.countDownListener);
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(main.tid, 'makeNode', function (params) {
    main.event.makeNode(params);
})
kitex.addEventListener(main.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(main.tid, 'enterForeground', function () {

})
kitex.addEventListener(main.tid, 'viewableChange', function (viewable) {
    console.log('[main].viewableChange: ' + JSON.stringify(viewable));
    main.event.viewableChange(viewable);
})
