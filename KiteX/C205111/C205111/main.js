required('C205111/event.js')

var C205111 = {
    tid: 'C205111',
    event: {},
    lottie_widget: undefined,
    motion: undefined,
    widgetId: '205111',
    sld: '2'
}
// 监听事件 模版环境初始化完成
kitex.addEventListener(C205111.tid, 'ready', function () {
    C205111.event.ready();
})
// 监听事件 处理自定义组件的创建
kitex.addEventListener(C205111.tid, 'makeNode', function (params) {
    C205111.event.makeNode(params);
})
kitex.addEventListener(C205111.tid, 'enterBackground', function () {
    
})
kitex.addEventListener(C205111.tid, 'enterForeground', function () {

})
kitex.addEventListener(C205111.tid, 'viewableChange', function (viewable) {
    console.log('[C205111].viewableChange: ' + JSON.stringify(viewable));
    C205111.event.viewableChange(viewable);
})
