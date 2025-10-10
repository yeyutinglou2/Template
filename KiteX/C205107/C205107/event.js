C205107.event.ready = function () {
    console.log('[C205107].ready');
    //    console.log('[C205107].ad: ' + JSON.stringify(kitex.data));
    C205107.event.lottieWidgetEvent(C205107.lottie_widget);
}
C205107.event.viewableChange = function (viewable) {
    if (C205107.motion != null) {
        if (viewable) {
            C205107.motion.start();
        } else {
            C205107.motion.stop();
        }
    }
}
C205107.event.makeNode = function (params) {
    if (params.type == 'LottieView') {
        if (params.nodeId == "widget_id") {
            C205107.lottie_widget = new kitex.Lottie(params);
        }
        return;
    }
}
C205107.event.widgetId = function () {
    return C205107.widgetId;
}
C205107.event.lottieWidgetEvent = function (lottie) {
    let widgetId = C205107.event.widgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        C205107.event.interactiveEvent(lottie);
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

    lottie.textProvider({
        "_TEXT_ACT_01_": title,
        "_TEXT_ACT_02_": desc
    });
}
/** 互动事件处理 */
C205107.event.interactiveEvent = function (lottie) {
    // 互动挂件
    //    console.log('[C205107].ad: ' + JSON.stringify(kitex.data));
    let ad = kitex.data.ads[0];
    let material = ad.materials[0];
    let adSetting = ad.ad_setting;
    let widgetId = C205107.event.widgetId();
    let sensitivity = adSetting.sensitivity;
    C205107.motion = new kitex.Motion(0);
    C205107.event.motionEvent(C205107.motion);
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
                console.log('[C205107].widget.click: ' + JSON.stringify(params));
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

C205107.event.motionEvent = function (motion) {
    motion.start();
    motion.addEventListener("start", function (params) {
        console.log('[C205107].motion.start: ' + JSON.stringify(params));
    });
    motion.addEventListener("end", function (params) {
        params.sld = C205107.sld;
        params.click_area = 'component';
        console.log('[C205107].motion.end: ' + JSON.stringify(params));
        kitex.ad.open({
            tid: C205107.tid,
            dcParams: params
        });
    });

    motion.addEventListener("progress", function (params) {
        console.log('[C205107].motion.progress: ' + JSON.stringify(params));
    });
}


