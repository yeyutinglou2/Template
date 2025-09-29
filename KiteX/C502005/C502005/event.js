

C502005.event.ready = function () {
    console.log('[C502005].ready');
//    console.log('[C502005].ad: ' + JSON.stringify(kitex.data));
    let material = kitex.data.ads[0].materials[0];
    C502005.setting.creative_type = material.creative_type;
    if (C502005.setting.creative_type == 3) {
        C502005.setting.positionId = 'image_root_id'
        let imageSize = material.image_size;
        C502005.event.getResourceDirection(imageSize)
    }else if (C502005.setting.creative_type == 8) {
        C502005.setting.positionId = 'video_id'
        let videoSize = material.video_size;
        C502005.event.getResourceDirection(videoSize)
    }
     C502005.event.lottieCardEvent(C502005.lottie_card);
}
C502005.event.viewableChange = function(viewable) {
}
C502005.event.makeNode = function (params) {
    if (params.type == 'LottieView') {
        if (params.nodeId == "lottie_card_id") {
            C502005.lottie_card = new kitex.Lottie(params);
        }
        return;
    }
    if (params.type == 'Vpaid') {
        C502005.event.vpaidInit(params);
        return;
    }
}

C502005.event.getResourceDirection = function(params) {
    if (params.height < params.width) {
        C502005.setting.resourceDirection = 1;
    }
    console.log('[C502005].ad: ' + C502005.setting.resourceDirection);
    console.log('[C502005].ad: ' + C502005.setting.positionId);
}

C502005.event.bgWidgetId = function() {
    return C502005.frameId;
}
C502005.event.cardWidgetId = function() {
    return C502005.event.bgWidgetId();
}

C502005.event.bgImagePath = function() {
    let bgWidgetId = C502005.event.bgWidgetId();
    let imagePath = kitex.path + "/" + bgWidgetId + "/BG-V/images/_BG_.png";
    return imagePath;
}


C502005.event.lottieCardEvent = function (lottie) {
    let cardWidgetId = C502005.event.cardWidgetId();
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        if (C502005.setting.positionId) {
            let containerPath = "_BG_POSITION_";
            lottie.addNode(containerPath, C502005.setting.positionId);
        }
         let containerPath = "_APP_ICON_";
         lottie.addNode(containerPath, "card_icon_id");
    });
    lottie.addEventListener("completed", function (event) {
        console.log("lottieCard.animation.completed");
    });
    let resourceName = C502005.setting.resourceDirection == 0 ? "News-V" : "News-H";
    let imageProviderPath = kitex.path + "/" + cardWidgetId + "/" + resourceName + "/images/";
    let filepath = kitex.path + "/" + cardWidgetId + "/" + resourceName + "/" + cardWidgetId + ".json";

    lottie.imageProvider(imageProviderPath);
    lottie.filepath(filepath);
    
    // 替换lottie文本
    let ad = kitex.data.ads[0];
    let material = ad.materials[0];
    let frameTitle = '';
    let componentLibrary = material.component_library;
    let components = componentLibrary.components;
    for (const component of components) {
        if (component.component_type == 1) {
            frameTitle = component.frame_title;
        }
    }
    let appName = material.app_name;
    let appDesc = material.app_desc;

    if (!isValidString(frameTitle)) {
        frameTitle = "今日热门推荐";
    }
    lottie.textProvider({
        "_FRAME_TITLE_": frameTitle,
        "_APP_NAME_": appName,
        "_APP_DESC_": appDesc,
        "_DATE_": currentDate()
    });
}

 function currentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}


function isValidString(val) {
    if (val == null || !(typeof val  === "string") || (typeof val === "string" && val.length == 0)) {
        return false
    }
    return true
}

C502005.event.vpaidInit = function (params) {
    let vpaid = new kitex.Vpaid(params);
    C502005.event.addVpaidEvent(vpaid);
    let video_url = kitex.data.ads[0].materials[0].video_url
    vpaid.assetURL(video_url);
    vpaid.muted(true);
    C502005.vpaid = vpaid;
}
C502005.event.vpaidReadyToPlay = function (vpaid) {
    vpaid.play();
}
C502005.event.vpaidPlayToEnd = function (vpaid) {
    kitex.postMessage({
        tid: vpaid.tid,
        type: vpaid.type,
        value: 'vpaidPlayToEnd',
        params: {
            nodeId: vpaid.nodeId
        }
    });
}
C502005.event.addVpaidEvent = function (vpaid) {
    vpaid.addEventListener('ready', function (params) {
        console.log('[C502005].prepareToPlay:' + JSON.stringify(params));
        C502005.event.vpaidReadyToPlay(vpaid);
        // C502005.event.loadBg(params);
    });
    vpaid.addEventListener('playStateChanged', function (params) {
        console.log('[C502005].playStateChanged:' + JSON.stringify(params));
    });
    vpaid.addEventListener('loadStateChanged', function (params) {
        console.log('[C502005].loadStateChanged:' + JSON.stringify(params));
    });
    vpaid.addEventListener('currentTime', function (params) {
        
    });
    vpaid.addEventListener('playEnd', function (params) {
        console.log('[C502005].playEnd:' + JSON.stringify(params));
        C502005.event.vpaidPlayToEnd(params);
    });
    vpaid.addEventListener('error', function (params) {
        console.log('[C502005].error:' + JSON.stringify(params));
    });
}

