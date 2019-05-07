let btn_Add = document.getElementById('add-button');
let btn_Work = document.getElementById('work');
let i = 0;

btn_Add.addEventListener('click', function(){

let content = document.getElementById('content');
let todo_list = document.getElementById('todo-list');

const tr = document.createElement('tr');
const td_id = document.createElement('td');
const td_comment = document.createElement('td');
const td_work = document.createElement('td');
const td_remove = document.createElement('td');


//ID
td_id.textContent = i;
let id = tr.appendChild(td_id);
i++;

//コメント
td_comment.textContent = content.value;
let comment = tr.appendChild(td_comment);

//作業中ボタン
td_work.innerHTML = '<button id="work">作業中</button>'
let work = tr.appendChild(td_work);

//removeボタン
td_remove.innerHTML = '<button id="remove">削除</button>'
let remove = tr.appendChild(td_remove);

//表示
todo_list.appendChild(tr);
tr.appendChild(id);
tr.appendChild(comment);
tr.appendChild(work);
tr.appendChild(remove)

content.value = "";
},false);

//完了に切り替え
btn_Add.addEventListener('click', function(){
    const work_Mode = document.querySelector('#work');
    console.log(work_Mode.outerHTML);
},false);
