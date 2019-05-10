let btnAdd = document.getElementById('add-button');

let i = 0;

btnAdd.addEventListener('click', function(){

let content = document.getElementById('content');
let todoList = document.getElementById('todo-list');

const tr = document.createElement('tr');
tr.id = 'list';

//ID
const tdId = document.createElement('td');
tdId.textContent = i;
let id = tr.appendChild(tdId);
i++;

//コメント
const tdComment = document.createElement('td');
tdComment.textContent = content.value;
let comment = tr.appendChild(tdComment);

//作業中ボタン
const tdWork = document.createElement('td');
const btnWork = document.createElement('button');
const textWork = document.createTextNode('作業中');

tdWork.id = 'state';
btnWork.id = 'work';
btnWork.appendChild(textWork);
tdWork.appendChild(btnWork);

let work = tr.appendChild(tdWork);

//removeボタン
const tdRemove = document.createElement('td');
const btnRemove = document.createElement('button');
const textRemove = document.createTextNode('削除');

btnRemove.id = 'remove';
btnRemove.appendChild(textRemove);
tdRemove.appendChild(btnRemove);

let remove = tr.appendChild(tdRemove);

//表示
todoList.appendChild(tr);
tr.appendChild(id);
tr.appendChild(comment);
tr.appendChild(work);
tr.appendChild(remove);
 
content.value = "";

let btnWorking = document.getElementById('work');
    //完了に切り替え
    btnWorking.addEventListener('click', function(){
        const target = document.getElementById('state');
        const currentBtn = document.getElementById('work');
        const newBtn = document.createElement('button');
        newBtn.id = 'end';
        newBtn.textContent = '完了';
        target.replaceChild(newBtn, currentBtn);
    },false);

    let btnRemoving = document.getElementById('remove');
    //削除
    btnRemoving.addEventListener('click', function(){
        const listElement = document.querySelector('#list');
        listElement.remove();
    },false);


},false);


