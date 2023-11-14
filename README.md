# my-chrome-devtools
> 谷歌插件开发dome

## 用法
    直接粘贴至谷歌扩展程序里，或者发布在谷歌应用商店上

## 目录结构
```bash
|-- manifest.json 必须，只要有这个就可以，其他的和正常的web开发一致；[配置字段说明](./readmes/manifest.md)
|-- pageCall.zip 一个拨打网页电话（沃丰坐席）的小插件
|-- README.md 说明文件
|-- readmes 插件配置项的一些具体说明文件
    |-- manifest_v2.md [v2版本配置字段说明](./readmes/manifest_v2.md)
    |-- manifest_v3.md [v3版本配置字段说明](./readmes/manifest_v3.md)
|-- img
|-- js 
|-- page
```

## 互相通信概览

    | 发送方\接收方 | injected-script | content-script | popup-js | background-js |
    |  ----  | ----  | ----  | ----  | ----  |
    | injected-script | - | window.postMessage | - | - |
    | content-script | window.postMessage | - | chrome.runtime.sendMessage、chrome.runtime.connect | chrome.runtime.sendMessage、chrome.runtime.connect |
    | popup-js | - | chrome.tabs.sendMessage、chrome.tabs.connect | - | chrome.extension. getBackgroundPage()、引入background-js直接拿数据 |
    | background-js | - | chrome.tabs.sendMessage chrome.tabs.connect | chrome.extension.getViews | - |
    | devtools-js | chrome.devtools.inspectedWindow.eval | - | chrome.runtime.sendMessage | chrome.runtime.sendMessage |

## chrome文献
    - [chrome扩展开发中文教程](https://chrome.cenchy.com/tabs.html#method-connect)