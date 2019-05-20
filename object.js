class Task{
    constructor(id,comment,status){
        this._id = id;
        this._comment = comment;
        this._status = status;
    }
    get id(){
        return this._id;
    }

    get comment(){
        return this._comment;
    }

    get status(){
        return this._status;
    }
}

const btnAdd = document.getElementById('add-button');
const content = document.getElementById('content');
const todoList = document.getElementById('todo-list');
const element = document.getElementById("radioBtn");

//ID用の変数の初期化
let index = 0;
let removeIds = [];
let taskId = index;

btnAdd.addEventListener('click', function () {
    if(removeIds.length === 0){
        taskId = index;
    }else{
        taskId = removeIds[0];
        removeIds.shift();
    }
    let task = new Task(taskId, content.value, 'work');

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
    btnWork.textContent = '作業中';
    btnWork.classList.add(task.status);
    btnWork.addEventListener('click', function () {
        //完了に切り替え
        if (btnWork.classList.value === "work") {
            btnWork.classList.value = "end";
            btnWork.textContent = "完了";
        } else if (btnWork.classList.value === "end") {
            //作業中に切り替え
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
        this.parentNode.parentNode.remove();
        index--;
    });

    //表示
    tdWork.appendChild(btnWork);
    tdRemove.appendChild(btnRemove);
    tr.appendChild(tdId);
    tr.appendChild(tdComment);
    tr.appendChild(tdWork);
    tr.appendChild(tdRemove);
    todoList.appendChild(tr);

    content.value = "";
    index++;

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

    /*forEachを
    if (select === "all") {
        const workBtnList = document.getElementsByClassName("work");
        //workBtnList.from()
        workBtnList.forEach(workBtn => {
            workBtn.style.visibility = "visible";
        });
        const endBtnList = document.getElementsByClassName("end");
        endBtnList.array.forEach(endBtn => {
            endBtn.style.visibility = "visible";
        });
    } else if (select === "working") {
        const workBtnList = document.getElementsByClassName("work");
        workBtnList.array.forEach(workBtn => {
            workBtn.style.visibility = "visible";
        });
        const endBtnList = document.getElementsByClassName("end");
        endBtnList.array.forEach(endBtn => {
            endBtn.style.visibility = "hidden";
        });
    } else if (select === "complete") {
        const workBtnList = document.getElementsByClassName("work");
        workBtnList.array.forEach(workBtn => {
            workBtn.style.visibility = "hidden";
        });
        const endBtnList = document.getElementsByClassName("end");
        endBtnList.array.forEach(endBtn => {
            endBtn.style.visibility = "visible";
        });
    }
            */
});





