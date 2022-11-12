//自己寫
// 五步驟 
//  1. 指定DOM
//  2. 設定監聽和更新
//  3. 設定函示: 把新的值加入列表，同步更新  localstorage
//  4. 設定函示: 更新網頁
//  5. 設定函示: 處理刪除
 

//  //1. 指定DOM

//  let list = document.querySelector('.list'); 
//  let sendData = document.querySelector('.send');

 
 // 指定 dom
  var list = document.querySelector('.list');  // 1.指定 DOM 鎖定 .list 
  var sendData = document.querySelector('.send');
  var data = JSON.parse(localStorage.getItem('listData')) || [];  
  //宣告 data 用 JSON.parse 將瀏覽器資料庫撈出來的 sring 轉為 array，再加入 ||，若瀏覽器資料庫沒有內容資料就變成 [] 空陣列

  // 監聽與更新
  sendData.addEventListener('click', addData);
  list.addEventListener('click', toggleDone);
  updateList(data);  

  //加入列表，並同步更新網頁與 localstorage
  function addData(e) {
    e.preventDefault();
    var txt = document.querySelector('.text').value;
    var todo = {
      content: txt //?      
    };
    data.push(todo);//? 
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));//?   將資料轉為 JSON 格式的字串
  }
  // 更新網頁內容
  function updateList(items) {  //?   
    str = '';
    var len = items.length;
    for (var i = 0; len > i; i++) {
      str += '<li><a href="#" data-index=' + i + ' />刪除</a> <span>' + items[i].content + '</span></li>';
    }
    list.innerHTML = str;
  }
  // 刪除代辦事項
  function toggleDone(e) {
    e.preventDefault();
    if(e.target.nodeName !== 'A'){return};
    console.log('e.target', e.target)
    var index = e.target.dataset.index;   //?   
    data.splice(index, 1);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
  }