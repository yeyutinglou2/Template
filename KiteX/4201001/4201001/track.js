const Category = {
    skip: 'skip',
    complete: 'complete',
    close: 'ad_close',
};
main.track.clickSkip = function () {
    main.track.log(Category.skip);
    main.track.tracking(Category.skip);
}
main.track.countdownFinish = function () {
   main.track.log(Category.complete);
}
main.track.close = function () {
    main.track.log(Category.close);
    main.track.tracking(Category.close);
}

main.track.log = function (category) {
    kitex.addDclog({
        _ac_type: 5,
        category: category,
    }, kitex.data.ads[0].vid)
}
main.track.tracking = function(event, urls = [], data = {}) {
    kitex.tracking(urls, event, data);
}