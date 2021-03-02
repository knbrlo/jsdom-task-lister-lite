document.addEventListener("DOMContentLoaded", () => {
  addEventListenerToForm();
});


function addEventListenerToForm() {
  document.getElementById("create-task-form").addEventListener("submit", function(e){
    formSubmitted(e);
  });
}

function formSubmitted(event) {
  event.preventDefault();

  var object = {};

  const formData = new FormData(event.target);
  formData.forEach(function(value, key){
      object[key] = value;
  });

  var jsonDataFromForm = JSON.stringify(object);
  var parsedFormData = JSON.parse(jsonDataFromForm);

  var newTaskDescription = "";

  for (const [key, value] of Object.entries(parsedFormData)) {
    console.log(key, value);
    if (key == "new-task-description") {
      newTaskDescription = value
    }
  }

  if (newTaskDescription.length > 0) {
    let doesTaskExist = doesTaskAlreadyExist(newTaskDescription);
    console.log({doesTaskExist})

    if (doesTaskExist == false) {
      addItemToTasksList(newTaskDescription);
    }
    
  } else {
    console.log("The task has no name");
  }
}

function addItemToTasksList(newTaskDescription){
  let newTaskElement = document.createElement("li");
  newTaskElement.appendChild(document.createTextNode(newTaskDescription));
  
  let taskListElement = document.getElementById('tasks');
  taskListElement.appendChild(newTaskElement);
}

function doesTaskAlreadyExist(newTaskDescription) {

  // get the ul
  let taskListElement = document.getElementById('tasks');

  // get the li items in an HTMLCollection
  let listItem = taskListElement.getElementsByTagName("li");

  // array of values
  let arrayTaskValues = [];

  // final return value
  let finalReturnValue = false;

  // make sure the list contains items
  if (listItem.length > 0) {
    
    // for each item, get the raw value
    for (let t=0; t < listItem.length; t++) {
      let valueToCheck = listItem[t].innerHTML;
      arrayTaskValues.push(valueToCheck);
    } 

    // check to see if that value is already in our array 
    if (arrayTaskValues.includes(newTaskDescription)) {
      finalReturnValue = true;
    } 

  } else {
    // the list didn't contain anything.
    return false;
  }

  return finalReturnValue;
}
