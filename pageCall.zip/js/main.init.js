$(function(){

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if(typeof request.type != 'undefined'){
            //设置沃峰外呼号码
            if(request.type == galaxyMobileServer.setCallType){
                sendResponse({code:200,msg:'待呼叫号码接收成功:' + request.mobile});
                galaxyMobileServer.init(request.mobile);
            }else if(request.type == galaxyMobileServer.getCallType){
                //获取待呼叫号码
                sendResponse({code:200,msg:'号码获取成功',mobile:galaxyMobileServer.mobile});

                //获取后需要置空，避免重复呼叫
                galaxyMobileServer.init('');
            }
        }
    });

    //监听呼叫号码
    galaxyMobileServer.callCheck();
})