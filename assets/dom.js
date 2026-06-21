console.log("JS Connected");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const category = document.getElementById("category");
const taskContainer = document.getElementById("task-container");

let tasks = [];

taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = taskInput.value.trim();

    if(title === ""){
        alert("Enter Task");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        category: category.value,
        status: "pending"
    };

    tasks.push(task);

    createTask(task);

    taskInput.value = "";
});

function createTask(task){

    const card = document.createElement("div");

    card.classList.add("task-card");

    card.dataset.id = task.id;
    card.dataset.status = task.status;
    card.dataset.category = task.category;

    const title = document.createElement("h3");
    title.textContent = task.title;

    const cat = document.createElement("p");
    cat.textContent = task.category;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");

    card.append(
        title,
        cat,
        editBtn,
        completeBtn,
        deleteBtn
    );

    taskContainer.append(card);
}

taskContainer.addEventListener("click", function(e){

    const card = e.target.closest(".task-card");

    if(!card) return;

   
    if(e.target.classList.contains("delete")){

        card.remove();

    }

    
    if(e.target.classList.contains("complete")){

        card.dataset.status = "completed";

        card.classList.toggle("completed");

    }

   
    if(e.target.classList.contains("edit")){

        const titleElement = card.querySelector("h3");

        const newTitle = prompt(
            "Edit Task",
            titleElement.textContent
        );

        if(newTitle){

            titleElement.textContent = newTitle;

        }

    }

});
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        document.body.dataset.theme="dark";

    }else{

        document.body.dataset.theme="light";

    }

});
const checkBtn = document.getElementById("check-btn");
const demoInput = document.getElementById("demo-input");

checkBtn.addEventListener("click",()=>{

    console.log(
        "Property Value:",
        demoInput.value
    );

    console.log(
        "Attribute Value:",
        demoInput.getAttribute("value")
    );

    alert(
      "Check Console Output"
    );

});
const grandparent =
document.getElementById("grandparent");

const parent =
document.getElementById("parent");

const child =
document.getElementById("child");
grandparent.addEventListener("click",()=>{

    console.log("Grandparent Bubble");

});

parent.addEventListener("click",()=>{

    console.log("Parent Bubble");

});

child.addEventListener("click",()=>{

    console.log("Child Bubble");

});
grandparent.addEventListener("click",()=>{

    console.log("Grandparent Capture");

},true);

parent.addEventListener("click",()=>{

    console.log("Parent Capture");

},true);

child.addEventListener("click",()=>{

    console.log("Child Capture");

},true);

