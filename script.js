const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task
const addTask = () => {
    if (inputBox.value === "") {
        alert("You need to write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        addDeleteButton(li);
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
};

// Add delete button to each task
const addDeleteButton = (li) => {
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
};

// Add event listener for the "Enter" key
inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Enable editing tasks on double-click
listContainer.addEventListener(
    "dblclick",
    (e) => {
        if (e.target.tagName === "LI") {
            editTask(e.target);
        }
    },
    false
);

// Function to edit task
const editTask = (li) => {
    const currentText = li.firstChild.nodeValue;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-task";

    // Replace the li content with input for editing
    li.innerHTML = "";
    li.appendChild(input);

    // Focus on the input and save on "Enter" or blur
    input.focus();
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") saveTask(li, input);
    });
    input.addEventListener("blur", () => saveTask(li, input));
};

// Save edited task
const saveTask = (li, input) => {
    if (input.value.trim() !== "") {
        li.innerHTML = input.value;
        addDeleteButton(li);
        saveData();
    }
};

listContainer.addEventListener(
    "click",
    (e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    },
    false
);

const saveData = () => {
    localStorage.setItem("data", listContainer.innerHTML);
};

const showTask = () => {
    listContainer.innerHTML = localStorage.getItem("data");
    listContainer.querySelectorAll("li").forEach(addDeleteButton); // Re-add delete buttons
};
showTask();