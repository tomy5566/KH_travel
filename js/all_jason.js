
// ### <引入JSON資料 法1> 使用自己的資料夾方法
// //以下引入Json 原理不太明瞭
// //方法來自網路 https://bobbyhadz.com/blog/javascript-import-json-file
// //注意有動到HTML中 增加 type="module"
import jsonData from '../KHtravelJsonUse.json' assert {type: 'json'};
// console.log('jsonData', jsonData);                     //測試
// let parsedData = JSON.parse(jsonData);              //此行會錯誤
let travelData = jsonData.result.records;
// console.log('travelData', travelData);                 //測試
// console.log('travelData[0].Name', travelData[0].Name); //測試
// console.log('travelData.length', travelData.length);   //測試
// console.log('travelData.Zone', travelData[0].Zone);    //測試

// ### <引入JSON資料 法2> 使用AJAX方法 -->請見 all_ajax.js 檔案

// ###建立 區(Zone) 的清單

let mySet = new Set(); //建立新的set
function FindZone() {
  for ( let i=0; i<travelData.length; i++){
    // console.log(i, travelData[i].Zone) //印出測試
    mySet.add(travelData[i].Zone);   //不要重複的值
  }
  
  // console.log('mySet1',mySet);          //測試
  let myArray = Array.from(mySet);     //把set轉成陣列Array，重要
  // console.log('myArray',myArray);   //測試
  return myArray;
}

FindZone();
let zoneData = FindZone();
// console.log('zoneData', zoneData)
// console.log('zoneData.length', zoneData.length)


// ### <法一> 把 "區" 動態插入選單 使用innerHTML

// var arealist = document.querySelector('.zonelist');
// function updateList() {
//   var str = "";
//   for (var i = 0; i < myArray.length; i++) {
//       str = str + "<option value =" + myArray[i] + ">" + myArray[i] + "</option>";
//       // str += '<li> ' +myArray[i]+' </li>';
//   }
//   arealist.innerHTML = str;
// }
// updateList()


// ### <法二> 把 "區" 動態插入選單 使用用createElement 

var zonelist = document.querySelector('.zonelist');
function updateList() {  
  for (var i = 0; i <zoneData.length; i++) {
      let str = document.createElement('option')
      str.textContent = zoneData[i];
      str.value = zoneData[i]
      zonelist.appendChild(str);      
  }  
}
updateList();


// (此區故意保留錯誤，提醒自己)
//把 全部 風景區名稱 動態插入card 使用innerHTML  以下是有問題的 會出現前面一包疊加

// var card = document.querySelector('.card');

// function updatecardlist() {
//   var strphoto =""
//   var strInfo = "";
//   for (var i = 0; i < travelData.length; i++) {
//       strphoto = strphoto + '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')>'+'<h2 class="cardname"> 景點名稱:' + travelData[i].Name +'</h2></div>';
//       strInfo = strInfo +'<div class="cardinfo"> '+ '<ul><li>地址:' +travelData[i].Add +'</li>'+' <li>電話:' +travelData[i].Tel +'</li></ul></div>';    
//   }
//   console.log(strphoto) ;
//   console.log(strInfo) ;
//   card.innerHTML = strphoto+strInfo;
// }

//把 全部 風景區名稱 動態插入card 使用innerHTML
//正確的寫法

let card = document.querySelector('.card');

function updatecardlist() {
  let strCardWrapper = '';
  for (var i = 0; i < travelData.length; i++) {
    let strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
    let strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
    let newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>';    
    //利用newCard 才不會前面一團strphoto ，後面一團strInfo，而是一列一列顯示
    strCardWrapper = strCardWrapper + newCard; 
  }
  // console.log(strCardWrapper);
  card.innerHTML = strCardWrapper;
}

updatecardlist();

// ### "更新" 選擇不同區 後 CARD 景點名單  動態插入選單 使用innerHTML
// let strCardWrapper = '';  //錯誤的位置，故意保留，不可以放在全域變數 ，否則會無限疊加

let zonename = document.querySelector('.zonename');

zonelist.addEventListener('change', function (e) {
  let strCardWrapper = '';     //不可以放在外面，否則會無限疊加
  let select = e.target.value;
  // console.log('select', select)
  for(let i=0;i<travelData.length;i++){
      if(select == travelData[i].Zone){
        let strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
        let strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
        let newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>'; 
        strCardWrapper = strCardWrapper + newCard; 
      }       
      
      else if(select == '全高雄各區'){
        let strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
        let strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
        let newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>'; 
        strCardWrapper = strCardWrapper + newCard; 
      } 
  } 
  card.innerHTML = strCardWrapper;
  zonename.innerHTML = select;
}, false);



// ### 監聽中間熱門區的按鈕
let menu = document.querySelector('.menu');
menu.addEventListener('click', function (e) {
  console.log(e);  //重要 看e裡面有什麼
  console.log(e.target);
  console.log(e.target.nodeName);  //找INPUT
  console.log(e.target.className); //找 例如 bt3
  console.log(e.target.defaultValue); //找 例如 大樹區
  if(e.target.nodeName == 'INPUT'){
    let strCardWrapper ='';

    for(let i=0;i<travelData.length;i++){
      
      if(e.target.defaultValue == travelData[i].Zone){
        let strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
        let strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
        let newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>'; 
        strCardWrapper = strCardWrapper + newCard; 
      }        
  } 
  card.innerHTML = strCardWrapper;
  zonename.innerHTML = e.target.defaultValue;
  zonelist.value =  e.target.defaultValue;
  }
}, false);





// 也可改用switch的方法，保留參考用

// switch (e.target.className) {
//   case 'bt1':{
//     alert('bt1');
//     break;
//   }
//   case 'bt2':{
//     alert('bt2');
//     break;
//   }
//   case 'bt3':{
//     alert('bt3');
//     break;
//   }
//   case 'bt4':{
//     alert('bt4');
//     break;
//   }
// alert('qqq');


// ## 訂閱電子報 AJAX練習  借用六角教學的API練習 密碼故意設為1234
// 六角說明頁 https://github.com/hexschool/nodejs_ajax_tutorial

let submitBtn = document.querySelector('.submit');
submitBtn.addEventListener("click", checkInput, false);

let data = {};
var xhr = '';
var transData='';

function checkInput(){
  // alert('qqq');
  let emailStr = document.querySelector('.email').value;
  let passwordStr = '1234';
  data = {}; //輸入的資料，填入空物件
  data.email = emailStr;
  data.password = passwordStr;
  console.log(data.email+'&'+data.password);
 
  xhr = new XMLHttpRequest();
  xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signup',true);
  //告訴後端傳送的資料格式

  xhr.setRequestHeader("Content-type","application/json");
  //把問號後的東西傳送過去，正常來說會取抓欄位的值
  transData = JSON.stringify(data); //因為格式是 JSON，所以要轉字串
  xhr.send(transData);

  xhr.onload = function () {
    var callbackData = JSON.parse(xhr.responseText); //因為輸入資料目前是字串，要轉成物件才能使用
    var str = callbackData.message;
    if (str == "帳號註冊成功") {
      alert('訂閱旅遊電子報成功');
    } else if (str == "此帳號已被使用"){
      alert('你曾經訂閱過囉，謝謝您');
    } else {
      alert('輸入有問題，'+str );
    }
  };
}







//-----------以下是練習區暫存區-----------


// ---以下練習用---
// // 把 全部 風景區名稱 動態插入頁面 使用innerHTML
// //練習用 隱藏起來!!
// var namelist = document.querySelector('.list');

// function updateNamelist() {
//   var str = "";
//   for (var i = 0; i < travelData.length; i++) {
//       str = str + '<h2> 景點名稱:' +travelData[i].Name +'</h2>' + "<li> 地址:"+ travelData[i].Add +"</li>";
//       // str += '<li> ' +myArray[i]+' </li>';
//   }
//   namelist.innerHTML = str;

// }

// updateNamelist()


// //"更新" 選擇不同區 後 景點名單  動態插入選單 使用innerHTML
// //練習用 隱藏起來!!

// zonelist.addEventListener('change', function (e) {
//   let select = e.target.value;
//   console.log('select', select)
//   var str = '';
//   for(let i=0;i<travelData.length;i++){
//       if(select == travelData[i].Zone){
//         str = str + '<h2> 景點名稱:' +travelData[i].Name +'</h2>' + "<li> 地址:"+ travelData[i].Add +"</li>";
     
//       }        
//   } 
//   namelist.innerHTML = str;
// //  alert('qq');
// }, false);

// ---以上練習用---