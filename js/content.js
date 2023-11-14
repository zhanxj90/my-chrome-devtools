console.log('这是通过content_scripts注入的content.js，定义的变量是tools')
var tools={
    a:1,
    dom:document.documentElement
}
console.log(chrome)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('触发了接口监听 ',request)
    if(request.type == 'setbg'){
        sendResponse({code:200,msg:'设置背景成功'});
        tools.dom.style.background=request.val
    }
})

$('#root').click(()=>{
    console.log('00000')
    chrome.runtime.sendMessage({type:'setbg1',val:'green'}, function(response) {
        console.log('修改背景请求发送结果1：' + response)
    });
})