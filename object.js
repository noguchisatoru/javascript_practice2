class Task{
    constructor(){
        this.tasks = [];
        this.id = "";
        this.comment = "";
        this.status = "";
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    get comment(){
        return this._comment;
    }

    set comment(value){
        this._comment = value;
    }

    get status(){
        return this._status;
    }

    set status(value){
        this._status = value;
    }

    get tasks(){
        return this._tasks;
    }

    set tasks(value){
        this._tasks = value;
    }
}
const btnAdd = document.getElementById('add-button');
const content = document.getElementById('content');
const todoList = document.getElementById('todo-list');
const element = document.getElementById("radioBtn");

//インスタンス生成
let task = new Task();
//ID用の変数の初期化
let index = 0;
//削除したときに配列のズレを修正する用
let counter = 0;
//削除したIDを保管
let removeIds = [];
//ラジオボタンの選択を取得
const radioNodeList = element["switchDisplay"]
let select = radioNodeList.value;

btnAdd.addEventListener('click', function () {
    if(removeIds.length === 0){
        task.id = index;
    }else{
        task.id = removeIds[0];
        removeIds.shift();
    }

    task.comment = content.value;
    task.status = "work";

    let taskData = {};
    taskData.id = task.id;
    taskData.comment = task.comment;
    taskData.status = task.status;
    task.tasks.push(taskData);
    

    task.tasks.sort(function(a,b){
        if(a.id < b.id) return -1;
        if(a.id > b.id) return 1;
        return 0;
    })

    content.value = "";
    if(counter > 0){
        counter--;
    }
    index++;
    
    refleshDisplay(select);
});

element.addEventListener("change", function () {
    select = radioNodeList.value;

    refleshDisplay(select);
});

let refleshDisplay = (test) => {
    //リセット
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    }
    //描写
    task.tasks.forEach((el) => {
        const tr = document.createElement('tr');
        tr.classList.add('list');

        //IDの生成
        const tdId = document.createElement('td');
        tdId.textContent = el.id;

        //コメントの生成
        const tdComment = document.createElement('td');
        tdComment.textContent = el.comment;

        //作業中ボタンの生成
        const tdWork = document.createElement('td');
        tdWork.classList.add('state');
        const btnWork = document.createElement('button');
        btnWork.classList.add(el.status);
        if (btnWork.classList.value === "work") {
            btnWork.textContent = "作業中";
        } else if (btnWork.classList.value === "end") {
            btnWork.textContent = "完了";
        }

        btnWork.addEventListener('click', function () {
            //完了に切り替え
            if (btnWork.classList.value === "work") {
                task.tasks[(this.parentNode.parentNode.childNodes[0].textContent) - counter].status = "end";
                btnWork.classList.value = "end";
                btnWork.textContent = "完了";
            } else if (btnWork.classList.value === "end") {
                //作業中に切り替え
                task.tasks[(this.parentNode.parentNode.childNodes[0].textContent) - counter].status = "work";
                btnWork.classList.value = "work";
                btnWork.textContent = "作業中";
            }
        });

        //removeボタン
        const tdRemove = document.createElement('td');
        const btnRemove = document.createElement('button');
        btnRemove.id = 'remove';
        btnRemove.textContent = '削除';
        btnRemove.addEventListener('click', function () {

            //削除処理   
            removeIds.push(Number(tdId.textContent));
            //並び替え
            removeIds.sort(function(a,b){
                if( a < b ) return -1;
                if( a > b ) return 1;
                return 0;
            });
            task.tasks.sort(function(a,b){
                if( a.id < b.id ) return -1;
                if( a.id > b.id ) return 1;
                return 0;
            })

            task.tasks.splice(this.parentNode.parentNode.childNodes[0].textContent - counter,1);
            counter++;
            index--;
            refleshDisplay(select);

        });

        //表示
        if (test === "all") {
            tdWork.appendChild(btnWork);
            tdRemove.appendChild(btnRemove);
            tr.appendChild(tdId);
            tr.appendChild(tdComment);
            tr.appendChild(tdWork);
            tr.appendChild(tdRemove);
            todoList.appendChild(tr);
        } else if(test === "working"){
            if(btnWork.classList.value === "work"){
                tdWork.appendChild(btnWork);
                tdRemove.appendChild(btnRemove);
                tr.appendChild(tdId);
                tr.appendChild(tdComment);
                tr.appendChild(tdWork);
                tr.appendChild(tdRemove);
                todoList.appendChild(tr);
            }
        }else{
            if(btnWork.classList.value === "end"){
                tdWork.appendChild(btnWork);
                tdRemove.appendChild(btnRemove);
                tr.appendChild(tdId);
                tr.appendChild(tdComment);
                tr.appendChild(tdWork);
                tr.appendChild(tdRemove);
                todoList.appendChild(tr);
            }
        }
    })
}