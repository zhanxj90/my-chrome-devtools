console.log('这是背景页也是后台页')
console.log('这是通过background注入的js，定义的变量是pages',chrome)
var pages={
    c:1,
    bgcolor:'black'
}
function setBg(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log(tabs,'tabs========')
        chrome.tabs.sendMessage(tabs[0].id, { type: "setbg", val: "#FF0000" }, function(response) {
            console.log('修改背景请求发送结果：' + response)
        })
    });
    // chrome.tabs.sendMessage({type:'setbg',val:'red'}, function(response) {
    //     console.log('修改背景请求发送结果：' + response)
    // });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('触发了接口监听1 ',request)
    if(request.type == 'setbg1'){
        sendResponse({code:200,msg:'设置背景成功'});
        tools.dom.setAttribute('background',request.val)
    }
})