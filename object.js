class Task{
    constructor(){
        this.tasks = [];
    }
    //taskデータを取得
    setTasks(comment, status){
        const task = [];
        
        task.comment = comment;
        task.status = status;

        this.tasks.push(task);
    }
    //taskデータを渡す
    getTasks(){
        return this.tasks;
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
//ラジオボタンの選択を取得
const radioNodeList = element["switchDisplay"]
//選択されている状態のデータを取得
let select = radioNodeList.value;

//追加ボタンを押された
btnAdd.addEventListener('click', function () {
    task.setTasks(content.value, "work");

    content.value = "";
    
    refleshDisplay(select);
});

//radioボタンが変わったとき
element.addEventListener("change", function () {
    select = radioNodeList.value;

    refleshDisplay(select);
});

//taskの表示
const refleshDisplay = (mode) => {
    //リセット
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    }
    //taskデータを取得
    const tasks = task.getTasks();
    //描写
    tasks.forEach((el, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('list');

        //IDの生成
        const tdId = document.createElement('td');
        tdId.textContent = index;

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

        //作業中or完了ボタンが押されたとき
        btnWork.addEventListener('click', function () {
            if (btnWork.classList.value === "work") {
                //完了に切り替え
                tasks[(this.parentNode.parentNode.childNodes[0].textContent) ].status = "end";
                btnWork.classList.value = "end";
                btnWork.textContent = "完了";
            } else if (btnWork.classList.value === "end") {
                //作業中に切り替え
                tasks[(this.parentNode.parentNode.childNodes[0].textContent) ].status = "work";
                btnWork.classList.value = "work";
                btnWork.textContent = "作業中";
            }
        });

        //removeボタン
        const tdRemove = document.createElement('td');
        const btnRemove = document.createElement('button');
        btnRemove.id = 'remove';
        btnRemove.textContent = '削除';
        //削除ボタンが押されたとき
        btnRemove.addEventListener('click', function () {
            tasks.splice(this.parentNode.parentNode.childNodes[0].textContent,1);
            index--;
            refleshDisplay(select);
        });

        //表示
        if (mode === "all") {
            tdWork.appendChild(btnWork);
            tdRemove.appendChild(btnRemove);
            tr.appendChild(tdId);
            tr.appendChild(tdComment);
            tr.appendChild(tdWork);
            tr.appendChild(tdRemove);
            todoList.appendChild(tr);
        } else if(mode === "working"){
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