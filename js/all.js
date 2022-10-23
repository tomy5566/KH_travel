

// //以下引入Json 看不太懂
// //來自https://bobbyhadz.com/blog/javascript-import-json-file
// //注意有動到HTML 增加
import jsonData from '../KHtravelJsonUse.json' assert {type: 'json'};
// console.log('jsonData', jsonData);
// const parsedData = JSON.parse(jsonData);
let travelData = jsonData.result.records;
// console.log('travelData', travelData);                 //測試
// console.log('travelData[0].Name', travelData[0].Name); //測試
// console.log('travelData.length', travelData.length);   //測試
// console.log('travelData.Zone', travelData[0].Zone);    //測試

// 建立 區(Zone) 的清單

let mySet = new Set(); //建立新的set


function FindZone() {
  for ( let i=0; i<travelData.length; i++){
    // console.log(i, travelData[i].Zone) //印出測試
    mySet.add(travelData[i].Zone);   //不要重複的
  }
  
  // console.log('mySet1',mySet);
  let myArray = Array.from(mySet);     //把set轉成陣列
  // console.log('myArray',myArray);   //測試
  return myArray;
}

FindZone();
const zoneData = FindZone();
// console.log('zoneData', zoneData)
// console.log('zoneData.length', zoneData.length)





// 把 區 動態插入選單 使用innerHTML

// var arealist = document.querySelector('.arealist');

// function updateList() {
//   var str = "";
//   for (var i = 0; i < myArray.length; i++) {
//       str = str + "<option value =" + myArray[i] + ">" + myArray[i] + "</option>";
//       // str += '<li> ' +myArray[i]+' </li>';
//   }
//   arealist.innerHTML = str;

// }

// updateList()


// 把 區 動態插入選單 使用用createElement 

var zonelist = document.querySelector('.zonelist');
function updateList() {
  
  for (var i = 0; i <zoneData.length; i++) {
      let str = document.createElement('option')
      str.textContent = zoneData[i];
      str.value = zoneData[i]
      zonelist.appendChild(str);      
  }
  
}
updateList()

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


// 把 全部 風景區名稱 動態插入card 使用innerHTML  以下是有問題的 會出現前面一包疊加

// var card = document.querySelector('.card');

// function updatecardlist() {
//   var strphoto =""
//   var strInfo = "";
//   for (var i = 0; i < travelData.length; i++) {
//       strphoto = strphoto + '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')>'+'<h2 class="cardname"> 景點名稱:' + travelData[i].Name +'</h2></div>';
//       strInfo = strInfo +'<div class="cardinfo"> '+ '<ul><li>地址:' +travelData[i].Add +'</li>'+' <li>電話:' +travelData[i].Tel +'</li></ul></div>';
       
//   }
//   // cardname.innerHTML = str;
//   card.innerHTML = strphoto+strInfo;

// }

//正確的寫法

let card = document.querySelector('.card');
let zonename = document.querySelector('.zonename');

function updatecardlist() {
  let strCardWrapper = '';
  // var strphoto ="";
  // var strInfo = "";
  for (var i = 0; i < travelData.length; i++) {
    const strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
    const strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
      const newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>'; 
      strCardWrapper = strCardWrapper + newCard; 
  }
  // console.log(strCardWrapper);
  // cardname.innerHTML = str;
  card.innerHTML = strCardWrapper;

}

updatecardlist();

//"更新" 選擇不同區 後 CARD 景點名單  動態插入選單 使用innerHTML

// let strCardWrapper = '';  //錯誤的位置 



zonelist.addEventListener('change', function (e) {
  let strCardWrapper = '';     //不可以放在外面，否則會無限疊加
  let select = e.target.value;
  // console.log('select', select)
  var strInfo = '';
  for(let i=0;i<travelData.length;i++){
      if(select == travelData[i].Zone){
        const strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
        const strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
        const newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>'; 
        strCardWrapper = strCardWrapper + newCard; 
      }       
      
      else if(select == '全高雄各區'){
        const strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
        const strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
        const newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>'; 
        strCardWrapper = strCardWrapper + newCard; 
      } 

  } 
  card.innerHTML = strCardWrapper;
  zonename.innerHTML = select;

//  alert('qq');

}, false);



//會有狀況的寫法
// for(let i=0;i<travelData.length;i++){
//   if(select == travelData[i].Zone){
//     strInfo = strInfo +'<div class="cardinfo"> '+ '<img src="'+travelData[i].Picture1+'" alt="'+travelData[i].Name+'"> '+'<h2> 景點名稱:' +travelData[i].Name +'</h2>'+' <ul><li>地址:' +travelData[i].Add +'</li>'+' <li>電話:' +travelData[i].Tel +'</li></ul></div>';
      
//   }        
// } 




//監聽中間的按鈕
let menu = document.querySelector('.menu');
menu.addEventListener('click', function (e) {
  console.log(e);
  console.log(e.target);
  console.log(e.target.nodeName);
  console.log(e.target.className);
  if(e.target.nodeName == 'INPUT'){
    let strCardWrapper ='';

    for(let i=0;i<travelData.length;i++){
      
      if(e.target.defaultValue == travelData[i].Zone){
        
        const strphoto = '<div class="cardphoto" style="background-image: url(' + travelData[i].Picture1 + ')">'+'<div class="zoneflex"><h2 class="cardname">' + travelData[i].Name +'</h2><p>'+ travelData[i].Zone+'</p></div></div>';
        const strInfo = '<div class="cardinfo"> '+ '<ul><li><img src="images/icons_clock.png" alt="開放時間"> 開放時間:'+ travelData[i].Opentime +'</li>'+ '<li><img src="images/icons_pin.png" alt="地址"> 地址:' +travelData[i].Add +'</li>'+' <li><img src="images/icons_phone.png" alt="電話">&nbsp;&nbsp;電話:' +travelData[i].Tel +'</li><li class="Ticket"><img src="images/icons_tag.png" alt="收費">&nbsp;&nbsp;' +travelData[i].Ticketinfo +'&nbsp;&nbsp;</li></ul></div>';
        const newCard = '<div class="card-wrapper">' + strphoto + strInfo + '</div>'; 
        strCardWrapper = strCardWrapper + newCard; 
      }        
  } 
  card.innerHTML = strCardWrapper;
  zonename.innerHTML = e.target.defaultValue  ;
  }

}, false);







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
