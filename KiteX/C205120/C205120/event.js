C205120.event.ready = function () {
    console.log('[C205120].ready');
    //    console.log('[C205120].ad: ' + JSON.stringify(kitex.data));
    C205120.event.lottieWidgetEvent(C205120.lottie_widget);
}
C205120.event.viewableChange = function (viewable) {

}
C205120.event.makeNode = function (params) {
    if (params.type == 'LottieView') {
        if (params.nodeId == "widget_id") {
            C205120.lottie_widget = new kitex.Lottie(params);
        }
        return;
    }
}
C205120.event.widgetId = function () {
    return C205120.widgetId;
}
C205120.event.lottieWidgetEvent = function (lottie) {
    let widgetId = C205120.event.widgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        C205120.event.interactiveEvent(lottie);
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
    let buttonText = material.button_text;
    lottie.textProvider({
        "_CTA_TEXT_": buttonText.length ? buttonText : "点击查看详情"
    });
    let buttonColor = material.button_color;
    lottie.colorProvider("点击动效._CTA_BG_.矩形 1.填充 1.Color", buttonColor);
    lottie.colorProvider("上滑._BG_BTN_.矩形 1.填充 1.Color", buttonColor);
}
/** 互动事件处理 */
C205120.event.interactiveEvent = function (lottie) {
    // 互动挂件
    //    console.log('[C205120].ad: ' + JSON.stringify(kitex.data));
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
            params.dcParams.cpt_id = C205120.widgetId;
            params.dcParams.accpt_ids = C205120.widgetId;
            console.log('[C205120].widget.click: ' + JSON.stringify(params));
            kitex.ad.openByVid(params);
        });
    });
}

function isValidString(val) {
    if (val == null || !(typeof val === "string") || (typeof val === "string" && val.length == 0)) {
        return false
    }
    return true
}

C205120.event.distance = function () {
    //     console.log('[main].distance:' + JSON.stringify(kitex.data));
    let ad = kitex.data.ads[0];
    let adSetting = ad.ad_setting;
    let sensitivity = adSetting.sensitivity;
    let distance = C205120.event.getSlideDistance(sensitivity);
    return distance;
}

C205120.event.getSlideDistance = function (sensitivity) {
    const arr = [
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        0
    ];
    let index = sensitivity - 1;
    let res = 0;
    if (index >= 0 && index < arr.length) {
        res = arr[index];
    }
    return res;
}

C205120.event.click = function (params) {
    params.sld = C205120.sld;
    params.click_area = 'component';
    params.cpt_id = C205120.widgetId;
    params.accpt_ids = C205120.widgetId;
    console.log('[C205120].slide.click: ' + JSON.stringify(params));
    kitex.ad.open({
        tid: C205120.tid,
        dcParams: params
    });
}


