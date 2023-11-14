var galaxyMobileClient = {
	isNotInit:1,
	isInit:2,
	mobile:'',
	callMobile:'', //待呼叫号码，沃丰使用
	init:function()
	{
		setTimeout(function()
		{
			//CRM元素
			var element = $('#call-galaxy-to-yescloudy');

			//crm页面
			if(element.length > 0 ){

				//初始化状态
				var initStatus = element.attr('show-init-message');

				//初始化点击事件
				if(initStatus == galaxyMobileClient.isNotInit){

					if(typeof element.attr('mobile') != 'undefined'){
						//变更初始化状态
					    element.attr('show-init-message',galaxyMobileClient.isInit);

					    //客户手机号
					    galaxyMobileClient.mobile = element.attr('mobile').trim();

					    element.click(function(){

					        var callAction = confirm('确认给客户拨打电话？');

						    //拨打电话
						    if(callAction){
							    galaxyMobileClient.callAction();
						    }
					    })
					}					
				}
			}else if(galaxyMobileServer.urlIsYescloudy(window.location.href)){
				//沃锋页面
				
				//拨号键盘
				var callMainElement = $('.ue-call-variable .peer-status__dial[role="button"]');
				if(callMainElement.length > 0){
					//拨号准备就绪，请求待拨号的号码
				    galaxyMobileClient.getCallMobile();
					if(galaxyMobileClient.callMobile != ''){
						//获取到待呼叫号码，开始执行呼叫
						console.log('获取到待呼叫号码：' + galaxyMobileClient.callMobile);

						//获取键盘元素
						var mobilePanelElement = $('.call-state-dropdown[data-popper-placement="bottom"]');
						if(mobilePanelElement.length > 0){
							
							//判断当前拨号键盘是否展开
							var ariaHidden = mobilePanelElement.attr('aria-hidden');
							
							//点击展开拨号键盘
							if(ariaHidden == 'true'){
								callMainElement.trigger('click');
							}

							//设置号码
							var inputElement = $('.call-state-dropdown .el-scrollbar .el-input__inner[type="text"]');

							//捕获到输入框
							if(inputElement.length > 0){
								
								var inputElementTemp = document.querySelector('.recent-calls-box input[class="el-input__inner"]');

								if(inputElementTemp != null){

									//获取焦点
								    inputElement.trigger('click');

									//模拟输入
									var inputEvevt = new Event('input');
									inputElementTemp.value = galaxyMobileClient.callMobile;
									inputElementTemp.dispatchEvent(inputEvevt);

									
									//发起呼叫
								    var callButton =  $('.call-state-dropdown .el-scrollbar .recent-calls-box>.number>.btn .ue-cchujiaohuojieting');
								    if(callButton.length){
									    console.log('发起呼叫');
									    callButton.trigger('click');
								    }
									
								}
								
							}
						}

						//清空待呼叫号码
						galaxyMobileClient.callMobile = '';
						
					}
				}
			}

			galaxyMobileClient.init();
		},500);
	},
	callAction:function(){
		console.log('开始呼叫号码：' + galaxyMobileClient.mobile);
		chrome.runtime.sendMessage({type:galaxyMobileServer.setCallType,mobile:galaxyMobileClient.mobile}, function(response) {
			console.log('呼叫请求发送结果：' + response.code)
	    });
	},
	getCallMobile:function()
	{
		chrome.runtime.sendMessage({type:galaxyMobileServer.getCallType}, function(response) {
			galaxyMobileClient.callMobile = response.mobile;
	    });
		
		return galaxyMobileClient.callMobile;
	}
};

$(function(){
	galaxyMobileClient.init();
})