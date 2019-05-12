let btnAdd = document.getElementById('add-button');

let i = 0;

btnAdd.addEventListener('click', function(){

let content = document.getElementById('content');
let todoList = document.getElementById('todo-list');

const tr = document.createElement('tr');
tr.classList.add('list');

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

tdWork.classList.add('state');
btnWork.classList.add('work');
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

    
    btnWork.addEventListener('click', function(){
        //完了に切り替え
        if(btnWork.classList.value === "work"){
            btnWork.classList.value = "end";
            btnWork.textContent = "完了";
        }else if(btnWork.classList.value === "end"){
            //作業中に切り替え
            btnWork.classList.value = "work";
            btnWork.textContent = "作業中";
        }
    },false);

    //削除
    btnRemove.addEventListener('click', function(){
        const listElement = document.querySelector('.list');
        listElement.remove();
    },false);


},false);

let element = document.getElementById("radioBtn");

element.addEventListener('change',function(){
    
    let radioNodeList = element["switchDisplay"];
    let select = radioNodeList.value;
    let allList = document.getElementsByClassName("state");
    console.log(allList);
    if(select === "all"){
        for(let j = 0; j < allList.length; j++){
            if(allList[j].childNodes[0].className === "work"){
                allList[j].parentNode.style.visibility="visible";
            }else{
                allList[j].parentNode.style.visibility="visible";
            }
        }
    }else if(select === "working"){
        for(let j = 0; j < allList.length; j++){
            if(allList[j].childNodes[0].className === "work"){
                allList[j].parentNode.style.visibility="visible";
            }else{
                allList[j].parentNode.style.visibility="hidden";
            }
        }
    }else if(select === "complete"){
        for(let j = 0; j < allList.length; j++){
            if(allList[j].childNodes[0].className === "work"){
                allList[j].parentNode.style.visibility="hidden";
            }else{
                allList[j].parentNode.style.visibility="visible";
            }
        }
    }
},false);


