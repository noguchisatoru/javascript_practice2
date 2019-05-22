class Task{
    constructor(){
        //this._tasksがうごかない（any型）
        this._tasks = [];
        this._id = "";
        this._comment = "";
        this._status = "";
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
let tasks = [];


//ID用の変数の初期化
let index = 0;
let counter = 0;
let removeIds = [];
let taskId = index;

btnAdd.addEventListener('click', function () {
    if(removeIds.length === 0){
        taskId = index;
    }else{
        taskId = removeIds[0];
        removeIds.shift();
    }

    task.id = taskId;
    task.comment = content.value;
    task.status = "work";

    let taskData = {};
    taskData.id = task.id;
    taskData.comment = task.comment;
    taskData.status = task.status;
    tasks.push(taskData);

    tasks.sort(function(a,b){
        if( a.id < b.id ) return -1;
        if( a.id > b.id ) return 1;
        return 0;
    })

    content.value = "";
    if(counter > 0){
        counter--;
    }
    index++;

    refleshDisplay();
    
    

});

element.addEventListener('change', function () {

    const radioNodeList = element["switchDisplay"];
    const select = radioNodeList.value;
    const allList = document.getElementsByClassName("state");

    if (select === "all") {
        for (let j = 0; j < allList.length; j++) {
            if (allList[j].childNodes[0].className === "work") {
                allList[j].parentNode.style.display = "";
            } else {
                allList[j].parentNode.style.display = "";
            }
        }
    } else if (select === "working") {
        for (let j = 0; j < allList.length; j++) {
            if (allList[j].childNodes[0].className === "work") {
                allList[j].parentNode.style.display = "";
            } else {
                allList[j].parentNode.style.display = "none";
            }
        }
    } else if (select === "complete") {
        for (let j = 0; j < allList.length; j++) {
            if (allList[j].childNodes[0].className === "work") {
                allList[j].parentNode.style.display = "none";
            } else {
                allList[j].parentNode.style.display = "";
            }
        }
    }

});

let refleshDisplay = () => {
    //リセット
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    }
    //描写
    tasks.forEach((task) => {
        const tr = document.createElement('tr');
        tr.classList.add('list');

        //IDの生成
        const tdId = document.createElement('td');
        tdId.textContent = task.id;

        //コメントの生成
        const tdComment = document.createElement('td');
        tdComment.textContent = task.comment;

        //作業中ボタンの生成
        const tdWork = document.createElement('td');
        tdWork.classList.add('state');
        const btnWork = document.createElement('button');
        btnWork.classList.add(task.status);
        if (btnWork.classList.value === "work") {
            btnWork.textContent = "作業中";
        } else if (btnWork.classList.value === "end") {
            btnWork.textContent = "完了";
        }

        btnWork.addEventListener('click', function () {
            //完了に切り替え
            if (btnWork.classList.value === "work") {
                tasks[this.parentNode.parentNode.childNodes[0].textContent].status = "end";
                console.log(tasks);
                btnWork.classList.value = "end";
                btnWork.textContent = "完了";
            } else if (btnWork.classList.value === "end") {
                //作業中に切り替え
                tasks[this.parentNode.parentNode.childNodes[0].textContent].status = "work";
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
            tasks.sort(function(a,b){
                if( a.id < b.id ) return -1;
                if( a.id > b.id ) return 1;
                return 0;
            })
            
            tasks.splice(this.parentNode.parentNode.childNodes[0].textContent - counter,1);
            counter++;
            index--;
            console.log(tasks);
            this.parentNode.parentNode.remove();
            
        });

        //表示
        tdWork.appendChild(btnWork);
        tdRemove.appendChild(btnRemove);
        tr.appendChild(tdId);
        tr.appendChild(tdComment);
        tr.appendChild(tdWork);
        tr.appendChild(tdRemove);
        todoList.appendChild(tr);
    })
}





