C205119.event.ready = function () {
    console.log('[C205119].ready');
    //    console.log('[C205119].ad: ' + JSON.stringify(kitex.data));
    C205119.event.lottieWidgetEvent(C205119.lottie_widget);
}
C205119.event.viewableChange = function (viewable) {

}
C205119.event.makeNode = function (params) {
    if (params.type == 'LottieView') {
        if (params.nodeId == "widget_id") {
            C205119.lottie_widget = new kitex.Lottie(params);
        }
        return;
    }
}
C205119.event.widgetId = function () {
    return C205119.widgetId;
}
C205119.event.gifImagePath = function () {
    let widgetId = C205119.event.widgetId();
    let imagePath = kitex.path + "/" + widgetId + "/red_packet.gif";
    return imagePath;
}
C205119.event.lottieWidgetEvent = function (lottie) {
    let widgetId = C205119.event.widgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        C205119.event.interactiveEvent(lottie);
        let containerPath = "_HB_GIF_";
        lottie.addNode(containerPath, "gif_id");
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
    let creativeDesc = material.creative_desc;
    lottie.textProvider({
        "_AD_TITLE_": creativeTitle,
        "_AD_DESC_": creativeDesc
    });
    lottie.fontWeightProvider({
        "_AD_TITLE_": 500,
        "_CTA_TEXT_": 700
    });
}
/** 互动事件处理 */
C205119.event.interactiveEvent = function (lottie) {
    // 互动挂件
    //    console.log('[C205119].ad: ' + JSON.stringify(kitex.data));
    let clickAreas = [
        "_CLICK_",
        "_CLICK_01_",
        "_CLICK_02_",
    ];
    let data = kitex.data;
    let noncomplianceMark = data.noncompliance_mark;
    if (!noncomplianceMark) {
        clickAreas = [
            "_CLICK_01_"
        ];
    }
    clickAreas.forEach((val, index) => {
        lottie.addClick(val, function (params) {
            params.dcParams.sld = '0';
            params.dcParams.click_area = 'companion';
            params.dcParams.down_point = '{' + params.touchEvent.downX + ',' + params.touchEvent.downY + '}';
            params.dcParams.up_point = '{' + params.touchEvent.upX + ',' + params.touchEvent.upY + '}';
            params.dcParams.up_timestamp = params.touchEvent.upTimestamp;
            params.dcParams.down_timestamp = params.touchEvent.downTimestamp;
            params.dcParams.cpt_id = C205119.widgetId;
            params.dcParams.accpt_ids = C205119.widgetId;
            console.log('[C205119].widget.click: ' + JSON.stringify(params));
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


