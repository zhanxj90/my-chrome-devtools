var galaxyMobileServer = {
    mobile:'', //待呼叫号码
    setCallType:'setCallMobile',
    getCallType:'getCallMobile',
    callBaseUrl:'kf.yescloudy.com', //沃峰地址
    changeTab:false,
    createTime:0,
    breakTime:300, //N秒电话还没呼叫则清空手机号
    getCurrentTime:function()
    {
        return Date.parse(new Date())/1000;
    },
    init:function(mobile)
    {
        galaxyMobileServer.mobile = mobile;

        if(mobile != ''){
            galaxyMobileServer.changeTab = true;
            galaxyMobileServer.createTime = galaxyMobileServer.getCurrentTime();
        }else{
            galaxyMobileServer.changeTab = false;
        }
    },
    urlIsYescloudy:function(_url)
    {
        //是否沃锋页面
        var checkResult = false;
        var baseUrlTemp1 = 'http://' + galaxyMobileServer.callBaseUrl;
        var baseUrlTemp2 = 'https://' + galaxyMobileServer.callBaseUrl;
        
        if(_url.indexOf(baseUrlTemp1) === 0 || _url.indexOf(baseUrlTemp2) === 0){
            checkResult = true;
        }

        return checkResult;
    },
    callCheck:function()
    {
        chrome.tabs.query({},function(tabs){

            //没有待呼叫号码，无需处理
            if(galaxyMobileServer.mobile == ''){
                return false;
            }

            var baseUrlTemp2 = 'https://' + galaxyMobileServer.callBaseUrl;

            var existsCallPage = false;
            for(var i in tabs){

                //已匹配到沃锋页面，多余的沃锋页面将关闭
                if(existsCallPage && galaxyMobileServer.urlIsYescloudy(tabs[i].url)){
                    chrome.tabs.remove(tabs[i].id);
                    continue;
                }

                //当前页面为沃峰页面
                if(galaxyMobileServer.urlIsYescloudy(tabs[i].url)){
                    existsCallPage = true;

                    //将当前tab激活
                    if(galaxyMobileServer.mobile != '' && galaxyMobileServer.changeTab){
                        chrome.tabs.update(tabs[i].id, {selected: true});
                        galaxyMobileServer.changeTab = false;
                    }
                }
            }

            //不存在沃峰页面，打开一个新的沃峰页面
            if(existsCallPage === false && galaxyMobileServer.mobile != '' && galaxyMobileServer.changeTab){
                console.log('当前不存在沃峰页面，尝试打开沃峰页面')
                var openUrl = baseUrlTemp2 + '/home';
                chrome.tabs.create({url:openUrl});
            }
        });

        //如果手机号超过3分钟没有呼叫，清空
        var currentTime = galaxyMobileServer.getCurrentTime();
        var breakTime = currentTime - galaxyMobileServer.createTime;
        if(galaxyMobileServer.mobile != '' && breakTime > galaxyMobileServer.breakTime){
            galaxyMobileServer.init('');
        }

        setTimeout(function()
		{
			galaxyMobileServer.callCheck();
		},500);
    }
};