required('C502001/event.js')

var C502001 = {
    tid: 'C502001',
    event: {},
    track: {},
    utils: {},
    lottie_bg: undefined,
    lottie_card: undefined,
    lottie_widget: undefined,
    motion: undefined,
    vpaid: undefined,
    setting: {
        creative_type: 0,
        resourceDirection: 0, // 0：竖版资源，1：横版资源,
        totolTime: 5, //倒计时时长
    },
    state: {
    },
    frameId: '502001'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C502001.tid, 'ready', function () {
    C502001.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C502001.tid, 'makeNode', function (params) {
    C502001.event.makeNode(params);
})
kitex.addEventListener(C502001.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C502001.tid, 'enterForeground', function () {

})
kitex.addEventListener(C502001.tid, 'viewableChange', function (viewable) {
    console.log('[C502001].viewableChange: ' + JSON.stringify(viewable));
    C502001.event.viewableChange(viewable);
})
