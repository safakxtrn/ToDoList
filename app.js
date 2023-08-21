
updateScreen()


// Checks the name of new task for usability
function addNewTask(){
    let taskName = document.querySelector('#task').value
    
    if(taskName.trim() != ""){
       document.querySelector('#task').value = ""
       let task = { 
        name:taskName, 
        isOk:false 
        }
       _add(task)
    }
    else{
        $(document.querySelector(`.toast.error`)).toast(`show`);
    }
    
}

//Adds new task to local storage
function _add(task){

    let tasks = []

    if(localStorage.length != 0 ){
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    
    tasks.push(task)
    localStorage.setItem("tasks",JSON.stringify(tasks))
    updateScreen()

    $(document.querySelector(`.toast.success`)).toast(`show`);
}

//Deletes the selected task from local storage
function _delete(taskName){
    let tasks = []
    tasks = JSON.parse(localStorage.getItem("tasks"))

    tasks = tasks.filter(task => task.name != taskName)
    localStorage.setItem("tasks",JSON.stringify(tasks))
    updateScreen()
}

//Updates the selected task okey or not okey
function setOk(taskName){
    let tasks = []
    tasks = JSON.parse(localStorage.getItem("tasks"))

    tasks.forEach(task => {
        if(task.name == taskName){
            task.isOk = !task.isOk
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))

    updateScreen()
}
// Updates the table
function updateScreen(){

    if(localStorage.length != 0 ){

        let tasks = []
        tasks = JSON.parse(localStorage.getItem("tasks"))

        var ul = document.querySelector('#list')
        ul.innerHTML=""

        tasks.forEach(task => {
            let li = document.createElement("li");
            
            if(task.isOk){
                li.classList.add("checked")
            }

            li.addEventListener("click",
            function(){
                setOk(this.innerText.replace("\n×",""))
            })

            li.appendChild(document.createTextNode(task.name));
            
            let span = document.createElement('span');
            span.classList.add('close');
            span.classList.add('lst_cls');
            span.addEventListener("click", 
            function(){
                _delete(this.parentElement.innerText.replace("\n×",""))
            })
            span.appendChild(document.createTextNode("×"))

            li.appendChild(span)


            ul.appendChild(li);
        });

    }
    
}