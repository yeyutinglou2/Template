

C502004.event.ready = function () {
    console.log('[C502004].ready');
//    console.log('[C502004].ad: ' + JSON.stringify(kitex.data));
    let material = kitex.data.ads[0].materials[0];
    C502004.setting.creative_type = material.creative_type;
    if (C502004.setting.creative_type == 3) {
        C502004.setting.positionId = 'image_root_id'
        let imageSize = material.image_size;
        C502004.event.getResourceDirection(imageSize)
    }else if (C502004.setting.creative_type == 8) {
        C502004.setting.positionId = 'video_id'
        let videoSize = material.video_size;
        C502004.event.getResourceDirection(videoSize)
    }
     C502004.event.lottieBgEvent(C502004.lottie_bg);
}
C502004.event.viewableChange = function(viewable) {
}
C502004.event.makeNode = function (params) {
    if (params.type == 'LottieView') {
        if (params.nodeId == "lottie_bg_id") {
            C502004.lottie_bg = new kitex.Lottie(params);
        }
        return;
    }
    if (params.type == 'Vpaid') {
        C502004.event.vpaidInit(params);
        return;
    }
}

C502004.event.getResourceDirection = function(params) {
    if (params.height < params.width) {
        C502004.setting.resourceDirection = 1;
    }
    console.log('[C502004].ad: ' + C502004.setting.resourceDirection);
    console.log('[C502004].ad: ' + C502004.setting.positionId);
}

C502004.event.bgWidgetId = function() {
    return C502004.frameId;
}
C502004.event.cardWidgetId = function() {
    return C502004.event.bgWidgetId();
}

C502004.event.bgImagePath = function() {
    let bgWidgetId = C502004.event.bgWidgetId();
    let imagePath = kitex.path + "/" + bgWidgetId + "/BG-V/images/_BG_.png";
    return imagePath;
}
C502004.event.lottieBgEvent = function (lottie) {
    let bgWidgetId = C502004.event.bgWidgetId();
    let containerPath = "_BG_POSITION_";
    lottie.addEventListener("animationLoaded", function (event) {
        lottie.play(0, 1, 0);
        if (C502004.setting.positionId) {
            lottie.addNode(containerPath, C502004.setting.positionId);
        }
        console.log("lottieBg.animation.completed");
    });
    lottie.addEventListener("completed", function (event) {
        console.log("lottieBg.animation.completed");
    });
    let resourceName = C502004.setting.resourceDirection == 0 ? "BG-V" : "BG-H";
    let imageProviderPath = kitex.path + "/" + bgWidgetId + "/" + resourceName + "/images/";
    let filepath = kitex.path + "/" + bgWidgetId + "/" + resourceName + "/"+ bgWidgetId + ".json";

    lottie.imageProvider(imageProviderPath);
    lottie.filepath(filepath);
    // 更改标题
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

    if (!isValidString(frameTitle)) {
            frameTitle = "今日热门推荐";
    }
    lottie.textProvider({
        "_FRAME_TITLE_":frameTitle
    });
}


function isValidString(val) {
    if (val == null || !(typeof val  === "string") || (typeof val === "string" && val.length == 0)) {
        return false
    }
    return true
}

C502004.event.vpaidInit = function (params) {
    let vpaid = new kitex.Vpaid(params);
    C502004.event.addVpaidEvent(vpaid);
    let video_url = kitex.data.ads[0].materials[0].video_url
    vpaid.assetURL(video_url);
    vpaid.muted(true);
    C502004.vpaid = vpaid;
}
C502004.event.vpaidReadyToPlay = function (vpaid) {
    vpaid.play();
}
C502004.event.vpaidPlayToEnd = function (vpaid) {
    kitex.postMessage({
        tid: vpaid.tid,
        type: vpaid.type,
        value: 'vpaidPlayToEnd',
        params: {
            nodeId: vpaid.nodeId
        }
    });
}
C502004.event.addVpaidEvent = function (vpaid) {
    vpaid.addEventListener('ready', function (params) {
        console.log('[C502004].prepareToPlay:' + JSON.stringify(params));
        C502004.event.vpaidReadyToPlay(vpaid);
        // C502004.event.loadBg(params);
    });
    vpaid.addEventListener('playStateChanged', function (params) {
        console.log('[C502004].playStateChanged:' + JSON.stringify(params));
    });
    vpaid.addEventListener('loadStateChanged', function (params) {
        console.log('[C502004].loadStateChanged:' + JSON.stringify(params));
    });
    vpaid.addEventListener('currentTime', function (params) {
        
    });
    vpaid.addEventListener('playEnd', function (params) {
        console.log('[C502004].playEnd:' + JSON.stringify(params));
        C502004.event.vpaidPlayToEnd(params);
    });
    vpaid.addEventListener('error', function (params) {
        console.log('[C502004].error:' + JSON.stringify(params));
    });
}

