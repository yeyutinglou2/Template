C205112.event.ready = function () {
    console.log('[C205112].ready');
    //    console.log('[C205112].ad: ' + JSON.stringify(kitex.data));
    C205112.event.lottieWidgetEvent(C205112.lottie_widget);
}
C205112.event.viewableChange = function (viewable) {
    if (C205112.motion != null) {
        if (viewable) {
            C205112.motion.start();
        } else {
            C205112.motion.stop();
        }
    }
}
C205112.event.makeNode = function (params) {
    if (params.type == 'LottieView') {
        if (params.nodeId == "widget_id") {
            C205112.lottie_widget = new kitex.Lottie(params);
        }
        return;
    }
    if (params.type == 'TextTimer') {
        if (params.nodeId == "time_id") {
            let ad = kitex.data.ads[0];
            let totalTime = ad.slot_ad_setting.splash_setting.show_duration;
            let control = new kitex.TextTimerControl(params);
            control.setTime(totalTime);
        }
    }
}
C205112.event.widgetId = function () {
    return C205112.widgetId;
}
C205112.event.lottieWidgetEvent = function (lottie) {
    let widgetId = C205112.event.widgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        C205112.event.interactiveEvent(lottie);
        let containerPath = "_BG_COUNTDOWN_";
        lottie.addNode(containerPath, "time_id");
    });
    lottie.addEventListener("completed", function (event) {
        console.log("lottie.animation.completed");
    });
    let imageProviderPath = kitex.path + "/" + widgetId + "/images/";
    let filepath = kitex.path + "/" + widgetId + "/" + widgetId + ".json";
    lottie.imageProvider(imageProviderPath);
    lottie.filepath(filepath);
    let ad = kitex.data.ads[0];
    let material = ad.materials[0];
    let title = material.title;
    let desc = material.desc;
    if (!isValidString(title)) {
        title = "摇一摇";
    }
    if (!isValidString(desc)) {
        desc = "跳转详情页或第三方应用";
    }
    let creativeTitle = material.creative_title;
    if (!isValidString(creativeTitle)) {
        creativeTitle = "限时获取 名额有限";
    }
    let creativeDesc = material.creative_desc;
    if (!isValidString(creativeDesc)) {
        creativeDesc = "超级福利火热领取中";
    }
    let tipLeft = '';
    let tipRight = '';
    let componentLibrary = material.component_library;
    let components = componentLibrary.components;
    for (const component of components) {
        if (component.component_type == 2) {
            tipLeft = component.tip_left;
            tipRight = component.tip_right;
        }
    }
    if (!isValidString(tipLeft)) {
        tipLeft = "恭喜获得奖励";
    }
    if (!isValidString(tipRight)) {
        tipRight = "后结束";
    }

    lottie.textProvider({
        "_TEXT_ACT_01_": title,
        "_TEXT_ACT_02_": desc,
        "_TIP_TEXT_LEFT_": tipLeft,
        "_TIP_TEXT_RIGHT_": tipRight,
        "_AD_TITLE_": creativeTitle,
        "_AD_DESC_": creativeDesc,
        "_INT_TEXT_": title + desc,
        "_TIME_": ""
    });
    lottie.fontWeightProvider({
        "_TEXT_ACT_01_": 500,
        "_AD_DESC_": 600,
        "_INT_TEXT_": 300
    });
}
/** 互动事件处理 */
C205112.event.interactiveEvent = function (lottie) {
    // 互动挂件
    //    console.log('[C205112].ad: ' + JSON.stringify(kitex.data));
    let ad = kitex.data.ads[0];
    let material = ad.materials[0];
    C205112.motion = new kitex.Motion(0);
    C205112.event.motionEvent(C205112.motion);
    // 互动组件点击
    if (material.click_type == 1) {
        // 挂件点击
        let clickAreas = [
            "_CLICK_",
            "_CLICK_01_",
            "_CLICK_02_",
        ];
        clickAreas.forEach((val, index) => {
            lottie.addClick(val, function (params) {
                params.dcParams.sld = '0';
                params.dcParams.click_area = 'companion';
                params.dcParams.down_point = '{' + params.touchEvent.downX + ',' + params.touchEvent.downY + '}';
                params.dcParams.up_point = '{' + params.touchEvent.upX + ',' + params.touchEvent.upY + '}';
                params.dcParams.up_timestamp = params.touchEvent.upTimestamp;
                params.dcParams.down_timestamp = params.touchEvent.downTimestamp;
                params.dcParams.cpt_id = C205112.widgetId;
                params.dcParams.accpt_ids = C205112.widgetId;
                console.log('[C205112].widget.click: ' + JSON.stringify(params));
                kitex.ad.openByVid(params);
            });
        });
    }
}

function isValidString(val) {
    if (val == null || !(typeof val === "string") || (typeof val === "string" && val.length == 0)) {
        return false
    }
    return true
}

C205112.event.motionEvent = function (motion) {
    motion.start();
    motion.addEventListener("start", function (params) {
        console.log('[C205112].motion.start: ' + JSON.stringify(params));
    });
    motion.addEventListener("end", function (params) {
        params.sld = C205112.sld;
        params.click_area = 'component';
        params.cpt_id = C205112.widgetId;
        params.accpt_ids = C205112.widgetId;
        console.log('[C205112].motion.end: ' + JSON.stringify(params));
        kitex.ad.open({
            tid: C205112.tid,
            dcParams: params
        });
    });
    motion.addEventListener("progress", function (params) {
        console.log('[C205112].motion.progress: ' + JSON.stringify(params));
    });
}

