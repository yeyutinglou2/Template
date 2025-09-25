const MotionType =  {
    /** 未知 */
    unknown: -1,
    /** 摇一摇 */
    snake: 0,
    /** 扭一扭 */
    wring: 1,
    /** 左右摇摆 */
    swing: 2,
    /** 前倾 */
    slope: 3,
}

const InteractiveType = {
    /** 陀螺仪 */
    motion: 0,
    /** 滑动 */
    slide: 1,
    /** 点击 */
    click: 2,
    /** 点击或者滑动 */
    clickOrSlide: 3,
}

const BGName = {
    /** 无边框 */
    noneFrmae: "502001",
    /** 蓝色边框 */
    blueFrame: "502002",
    /** 红色边框 */
    redFrame: "502003",
    /** 红包边框 */
    redPacketFrame: "502004",
    /** 报纸边框 */
    paparFrame: "502005",
}

const WidgetName = {
    /** 摇一摇 */
    snake: "205107",
    /** 扭一扭 */
    wring: "205108",
    /** 前倾 */
    slope: "205109",
    /** 滑动 */
    slide: "205110",
    /** 左右摇摆 */
    swing: "205111",
    /** 摇一摇banner */
    snakeBanner: "205112",
    /** 扭一扭banner */
    wringBanner: "205113",
    /** 前倾banner */
    slopeBanner: "205114",
    /** 滑动banner */
    slideBanner: "205115",
    /** 左右摇摆banner */
    swingBanner: "205116",
    /** 白色扩散卡片 */
    whileDiffusionCard: "205117",
    /** 黑色摇摆卡片 */
    blackWringCard: "205118",
    /** 红包代金券 */
    redPacketsVoucher: "205119",
    /** 点击或者上滑 */
    clickOrSlide: "205120",
    /** 点击 */
    click: "205121",
}

/**
 * 根据组件id返回互动类型
 * @param {*} widgetId
 * @returns 互动类型
 */
 main.utils.getMotionType = function(widgetId) {
    var type = MotionType.unknown;
    switch (widgetId) {
        case  WidgetName.snake:
        case WidgetName.snakeBanner:
            type = MotionType.snake;
            break;
        case WidgetName.wring:
        case WidgetName.wringBanner:
            type = MotionType.wring;
            break;
        case WidgetName.slope:
        case WidgetName.slopeBanner:
            type = MotionType.slope;
            break;
        case WidgetName.swing:
        case WidgetName.swingBanner:
            type = MotionType.swing;
            break;
        default:
            break;
    }
    return type;
}

main.utils.getInteractiveType = function(widgetId) {
    var type = InteractiveType.click;
    switch (widgetId) {
        case "205107":
        case "205108":
        case "205109":
        case "205111":
        case "205112":
        case "205113":
        case "205114":
        case "205116":
            type = InteractiveType.motion;
            break;
        case "205110":
        case "205115":
            type = InteractiveType.slide;
            break;
        case "205117":
        case "205118":
        case "205119":
        case "205121":
            type = InteractiveType.click;
            break;
        case "205120":
            type = InteractiveType.clickOrSlide
        default:
            break;
    }
    return type;
}

main.utils.getDefaultTitle = function(widgetId) {
    switch (widgetId) {
        case WidgetName.snake:
            return "摇一摇";
        case WidgetName.wring:
            return "扭动手机";
        case WidgetName.slope:
            return "前倾手机";
        case WidgetName.slide:
            return "滑动手机";
        case WidgetName.swing:
            return "晃动手机";
        default:
            return "";
    }
}

main.utils.getDefaultDesc = function() {
    return "跳转详情页或第三方应用";
}

main.utils.isUseDefaultText = function(widgetId) {
    let arr = [
       WidgetName.snake,
       WidgetName.wring,
       WidgetName.slope,
       WidgetName.slide,
       WidgetName.swing,
       WidgetName.snakeBanner,
       WidgetName.wringBanner,
       WidgetName.slopeBanner,
       WidgetName.slideBanner,
       WidgetName.swingBanner
    ];
    return arr.includes(widgetId);
}

main.utils.getSlideDistance = function(sensitivity) {
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

main.utils.bannerTimer = function(widgetId) {
    let res = false;
    switch (widgetId) {
        case WidgetName.snakeBanner:
        case WidgetName.wringBanner:
        case WidgetName.slopeBanner:
        case WidgetName.slideBanner:
        case WidgetName.swingBanner:
            res = true;
            break;
        default:
            break;
    }
    return res
}

main.utils.currentDate = function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

main.utils.isSlide = function(widgetId) {
    let res = false;
    switch (widgetId) {
        case WidgetName.slide:
        case WidgetName.slideBanner:
        case WidgetName.clickOrSlide:
            res = true;
            break;
        default:
            break;
    }
    return res
}
