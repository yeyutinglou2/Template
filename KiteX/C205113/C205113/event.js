C205113.event.ready = function () {
    console.log("[C205113].ready");
    /* console.log('[C205113].ad: ' + JSON.stringify(kitex.data)); */
    C205113.event.lottieWidgetEvent(C205113.lottie_widget);
};

C205113.event.viewableChange = function (viewable) {
    if (C205113.motion != null) {
        if (viewable) {
            C205113.motion.start();
        } else {
            C205113.motion.stop();
        }
    }
};

C205113.event.makeNode = function (params) {
    if (params.type == "LottieView") {
        if (params.nodeId == "widget_id") {
            C205113.lottie_widget = new kitex.Lottie(params);
        }
        return;
    }
    if (params.type == "TextTimer") {
        if (params.nodeId == "time_id") {
            let totalTime = kitex.data.slot_ad_setting.splash_setting.show_duration;
            let control = new kitex.TextTimerControl(params);
            control.setTime(totalTime);
        }
    }
};

C205113.event.widgetId = function () {
    return C205113.widgetId;
};

C205113.event.lottieWidgetEvent = function (lottie) {
    let widgetId = C205113.event.widgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        C205113.event.interactiveEvent(lottie);
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
    let dataArr = material.kite_x.data;
    let actionTitle = material.desc;
    let interactTitle = material.title;
    let title = "";
    let desc = "";
    let tipLeft = "";
    let tipRight = "";
    for (const data of dataArr) {
        if (data.c_id == C205113.tid) {
            title = data.title;
            desc = data.desc;
            tipLeft = data.tip_left;
            tipRight = data.tip_right;
            break;
        }
    }
    if (!isValidString(interactTitle)) {
        interactTitle = "扭动手机";
    }
    if (!isValidString(actionTitle)) {
        actionTitle = "跳转详情页或第三方应用";
    }
    if (!isValidString(title)) {
        title = "限时获取 名额有限";
    }
    if (!isValidString(desc)) {
        desc = "超级福利火热领取中";
    }
    if (!isValidString(tipLeft)) {
        tipLeft = "恭喜获得奖励";
    }
    if (!isValidString(tipRight)) {
        tipRight = "后结束";
    }

    lottie.textProvider({
        _TEXT_ACT_01_: interactTitle,
        _TEXT_ACT_02_: actionTitle,
        _TIP_TEXT_LEFT_: tipLeft,
        _TIP_TEXT_RIGHT_: tipRight,
        _AD_TITLE_: title,
        _AD_DESC_: desc,
        _INT_TEXT_: interactTitle + actionTitle,
        _TIME_: "",
    });
    lottie.fontWeightProvider({
        _TEXT_ACT_01_: 500,
        _AD_DESC_: 600,
        _INT_TEXT_: 300,
    });
};

/* 互动事件处理 */
C205113.event.interactiveEvent = function (lottie) {
    /* 互动挂件 */
    /* console.log('[C205113].ad: ' + JSON.stringify(kitex.data)); */
    let ad = kitex.data.ads[0];
    let material = ad.materials[0];
    C205113.motion = new kitex.Motion(3);
    C205113.event.motionEvent(C205113.motion);
    /* 互动组件点击 */
    if (material.click_type == 1) {
        /* 挂件点击 */
        let clickAreas = ["_CLICK_", "_CLICK_01_", "_CLICK_02_"];
        clickAreas.forEach((val, index) => {
            lottie.addClick(val, function (params) {
                params.dcParams.sld = "0";
                params.dcParams.click_area = "companion";
                params.dcParams.down_point = "{" + params.touchEvent.downX + "," + params.touchEvent.downY + "}";
                params.dcParams.up_point = "{" + params.touchEvent.upX + "," + params.touchEvent.upY + "}";
                params.dcParams.up_timestamp = params.touchEvent.upTimestamp;
                params.dcParams.down_timestamp = params.touchEvent.downTimestamp;
                params.dcParams.cpt_id = C205113.widgetId;
                params.dcParams.accpt_ids = C205113.widgetId;
                console.log(
                    "[C205113].widget.click: " + JSON.stringify(params)
                );
                kitex.ad.openByVid(params);
            });
        });
    }
};

function isValidString(val) {
    if (val == null || !(typeof val === "string") || (typeof val === "string" && val.length == 0)) {
        return false;
    }
    return true;
}

C205113.event.motionEvent = function (motion) {
    motion.start();
    motion.addEventListener("start", function (params) {
        console.log("[C205113].motion.start: " + JSON.stringify(params));
    });

    motion.addEventListener("end", function (params) {
        params.sld = C205113.sld;
        params.click_area = "component";
        params.cpt_id = C205113.widgetId;
        params.accpt_ids = C205113.widgetId;
        console.log("[C205113].motion.end: " + JSON.stringify(params));
        kitex.ad.open({
            tid: C205113.tid,
            dcParams: params,
        });
    });
    
    motion.addEventListener("progress", function (params) {
        console.log("[C205113].motion.progress: " + JSON.stringify(params));
    });
};