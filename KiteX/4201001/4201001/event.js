

main.event.ready = function () {
    console.log('[main].ready');
//    console.log('[main].ad: ' + JSON.stringify(kitex.data));
}
main.event.getFrameId = function() {
    let material = kitex.data.ads[0].materials[0];
   let componentLibrary = material.component_library;
   let components = componentLibrary.components;
   for (const component of components) {
       if (component.frame_type == 1) {
          return component.c_id;
       }
   }
    return '';
}
main.event.getWidgetId = function() {
    let material = kitex.data.ads[0].materials[0];
   let componentLibrary = material.component_library;
   let components = componentLibrary.components;
   for (const component of components) {
       if (component.cpt_type == 1) {
           return component.c_id;
       }
   }
    return '';
}
main.event.viewableChange = function(viewable) {
    
}
main.event.makeNode = function (params) {
    if (params.type == 'SkipView') {
        let ad = kitex.data.ads[0];
        let totalTime = ad.slot_ad_setting.splash_setting.show_duration;
        let skipTime = totalTime;
        let control = new kitex.SkipViewControl(params);
         control.setTime(totalTime, skipTime);
        return;
    }
}


main.event.countDownListener = function() {
//    main.track.countdownFinish();
//    main.track.close();
    kitex.postMessage({
        tid: main.tid,
        type: 'ad',
        value: 'countdownFinish',
    });
}

main.event.skipClick = function (event) {
//    main.track.clickSkip();
//    main.track.close();
    kitex.ad.skip(event);
}
