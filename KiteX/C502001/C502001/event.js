

C502001.event.ready = function () {
    console.log('[C502001].ready');
//    console.log('[C502001].ad: ' + JSON.stringify(kitex.data));
}
C502001.event.viewableChange = function(viewable) {
}
C502001.event.makeNode = function (params) {
    if (params.type == 'Vpaid') {
        C502001.event.vpaidInit(params);
        return;
    }
}


function isValidString(val) {
    if (val == null || !(typeof val  === "string") || (typeof val === "string" && val.length == 0)) {
        return false
    }
    return true
}

C502001.event.vpaidInit = function (params) {
    let vpaid = new kitex.Vpaid(params);
    C502001.event.addVpaidEvent(vpaid);
    let video_url = kitex.data.ads[0].materials[0].video_url
    vpaid.assetURL(video_url);
    vpaid.muted(true);
    C502001.vpaid = vpaid;
}
C502001.event.vpaidReadyToPlay = function (vpaid) {
    vpaid.play();
}
C502001.event.vpaidPlayToEnd = function (vpaid) {
    kitex.postMessage({
        tid: vpaid.tid,
        type: vpaid.type,
        value: 'vpaidPlayToEnd',
        params: {
            nodeId: vpaid.nodeId
        }
    });
}
C502001.event.addVpaidEvent = function (vpaid) {
    vpaid.addEventListener('ready', function (params) {
        console.log('[C502001].prepareToPlay:' + JSON.stringify(params));
        C502001.event.vpaidReadyToPlay(vpaid);
        // C502001.event.loadBg(params);
    });
    vpaid.addEventListener('playStateChanged', function (params) {
        console.log('[C502001].playStateChanged:' + JSON.stringify(params));
    });
    vpaid.addEventListener('loadStateChanged', function (params) {
        console.log('[C502001].loadStateChanged:' + JSON.stringify(params));
    });
    vpaid.addEventListener('currentTime', function (params) {
        
    });
    vpaid.addEventListener('playEnd', function (params) {
        console.log('[C502001].playEnd:' + JSON.stringify(params));
        C502001.event.vpaidPlayToEnd(params);
    });
    vpaid.addEventListener('error', function (params) {
        console.log('[C502001].error:' + JSON.stringify(params));
    });
}

