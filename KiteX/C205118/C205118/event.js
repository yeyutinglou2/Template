C205118.event.ready = function () {
    console.log('[C205118].ready');
//    console.log('[C205118].ad: ' + JSON.stringify(kitex.data));
    C205118.event.lottieWidgetEvent(C205118.lottie_widget);
}
C205118.event.viewableChange = function (viewable) {
   
}
C205118.event.makeNode = function (params) {
    if (params.type == 'LottieView') {
        if (params.nodeId == "widget_id") {
            C205118.lottie_widget = new kitex.Lottie(params);
        }
        return;
    }
}
C205118.event.widgetId = function () {
    return C205118.widgetId;
}
C205118.event.lottieWidgetEvent = function (lottie) {
    let widgetId = C205118.event.widgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        C205118.event.interactiveEvent(lottie);
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
    let creativeTitle = material.creative_title;
    let buttonText = material.button_text;
    lottie.textProvider({
        "_AD_TITLE_": creativeTitle,
        "_CTA_TEXT_":buttonText.length ? buttonText : "点击查看详情"
    });
    let buttonColor = material.button_color;
    lottie.colorProvider("_CTA_BG_.矩形 1.填充 1.Color", buttonColor);
}
/** 互动事件处理 */
C205118.event.interactiveEvent = function (lottie) {
    // 互动挂件
    //    console.log('[C205118].ad: ' + JSON.stringify(kitex.data));
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
            params.dcParams.cpt_id = C205118.widgetId;
            params.dcParams.accpt_ids = C205118.widgetId;
            console.log('[C205118].widget.click: ' + JSON.stringify(params));
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


