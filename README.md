# 高雄旅遊網 練習專案 Readme

## 主要介紹
使用高雄市政府開放資料，迅速查看各區的主要旅遊景點資訊。

## DEMO link
[https://tomy5566.github.io/KH_travel/](https://tomy5566.github.io/KH_travel/)

## 使用技術
- HTML
- CSS: [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
- JavaScript
- AJAX 

## JavaScript 使用技術介紹

1. 使用 [Ajax](https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX) 串接六角學院 API，取得高雄市政府旅遊資料(開放資料)
2. 使用資料結構 [Set](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Set) 與 [Array.from()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 找出不重複的行政區域資料，並建立下拉式選單
3. 使用**迴圈**比對行政區域，利用 [Element.innerHTML](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/innerHTML) 與 [Document.createElement()](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/createElement) 方法建立旅遊資訊卡片
4. 使用 [EventListener](https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener) 製作網頁互動效果與更新旅遊卡片功能
5. 使用 Ajax 串接六角學院 API，在頁末模擬**訂閱旅遊電子報**的功能

## 功能介紹
- 顯示串接高雄開放資料的旅遊相關資訊，用圖卡列出相關資訊。
- 使用中間選單，可直接選取想要查詢的行政區查詢資料。
- 使用熱門行政區案鳥，可查詢該行政區，且上方選單會一併跳轉。
- 右下角設計浮動"回到上方"的書籤超連結。
- 表尾模擬訂閱電子報功能，會顯示訂閱成功或是已經訂閱過的資訊。

## 介面展示
![image](https://github.com/tomy5566/KH_travel/blob/main/KH_readmegif.gif)


## 參考資料
六角學院JavaScrip線上課程
