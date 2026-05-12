C205110.event.ready = function () {
    console.log("[C205110].ready");
    /* console.log('[C205110].ad: ' + JSON.stringify(kitex.data)); */
    C205110.event.lottieWidgetEvent(C205110.lottie_widget);
};

C205110.event.viewableChange = function (viewable) {
    if (C205110.motion != null) {
        if (viewable) {
            C205110.motion.start();
        } else {
            C205110.motion.stop();
        }
    }
};

C205110.event.makeNode = function (params) {
    if (params.type == "LottieView") {
        if (params.nodeId == "widget_id") {
            C205110.lottie_widget = new kitex.Lottie(params);
        }
        return;
    }
};

C205110.event.widgetId = function () {
    return C205110.widgetId;
};

C205110.event.lottieWidgetEvent = function (lottie) {
    let widgetId = C205110.event.widgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        C205110.event.interactiveEvent(lottie);
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
    let actionTitle = "";
    let interactTitle = "";
    for (const data of dataArr) {
        if (data.c_id == C205110.tid) {
            actionTitle = data.action_title;
            interactTitle = data.interact_title;
            break;
        }
    }
    if (!isValidString(actionTitle)) {
        actionTitle = "滑动手机";
    }
    if (!isValidString(interactTitle)) {
        interactTitle = "跳转详情页或第三方应用";
    }

    lottie.textProvider({
        _TEXT_ACT_01_: actionTitle,
        _TEXT_ACT_02_: interactTitle,
    });
    lottie.fontWeightProvider({
        _TEXT_ACT_01_: 500,
    });
};

/* 互动事件处理 */
C205110.event.interactiveEvent = function (lottie) {
    /* 互动挂件 */
    /* console.log('[C205110].ad: ' + JSON.stringify(kitex.data)); */
    let ad = kitex.data.ads[0];
    let material = ad.materials[0];
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
                params.dcParams.cpt_id = C205110.widgetId;
                params.dcParams.accpt_ids = C205110.widgetId;
                console.log(
                    "[C205110].widget.click: " + JSON.stringify(params)
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

C205110.event.distance = function () {
    /* console.log('[main].distance:' + JSON.stringify(kitex.data)); */
    let ad = kitex.data.ads[0];
    let adSetting = ad.ad_setting;
    let sensitivity = adSetting.sensitivity;
    let distance = C205110.event.getSlideDistance(sensitivity);
    return distance;
};

C205110.event.getSlideDistance = function (sensitivity) {
    const arr = [100, 90, 80, 70, 60, 50, 40, 30, 20, 0];
    let index = sensitivity - 1;
    let res = 0;
    if (index >= 0 && index < arr.length) {
        res = arr[index];
    }
    return res;
};

C205110.event.click = function (params) {
    params.sld = C205110.sld;
    params.click_area = "component";
    params.cpt_id = C205110.widgetId;
    params.accpt_ids = C205110.widgetId;
    console.log("[C205110].slide.click: " + JSON.stringify(params));
    kitex.ad.open({
        tid: C205110.tid,
        dcParams: params,
    });
};