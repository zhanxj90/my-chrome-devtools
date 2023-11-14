const bgData=chrome.extension.getBackgroundPage();
console.log('这是通过popup注入的js，',setBg,chrome,JSON.stringify(chrome.extension.getBackgroundPage))

console.log('popup.js',bgData)
function popupSetBg(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log(tabs,'tabs========')
        chrome.tabs.sendMessage(tabs[0].id, { type: "setbg", val: "#FF0000" }, function(response) {
            console.log('修改背景请求发送结果：' + response)
        })
    });
}
$('#btn').click(()=>{
    // setBg()
    popupSetBg()
})