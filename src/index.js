document.addEventListener("DOMContentLoaded", () => {
  // your code here

  let form = document.getElementById("create-task-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    addItemToList();

  });


  function addItemToList(){
    let input = document.getElementById("new-task-description");
    let table = document.getElementById("list");
    let tr = document.createElement("tr");
    let trId = Math.random().toString(36).substring(7);
    tr.id = trId;

    if (input.value === ''){
      alert('Please try again: text is empty!');
    }else{
      table.appendChild(addTextToRow(tr, input));
      table.appendChild(addDeleteToRow(tr));
      table.appendChild(addUpdateToRow(tr));
      table.appendChild(prioritize(tr));
      input.value = '';
    }

  }

  function addTextToRow(tr, input){
    let td = document.createElement("td");
    let tdId = Math.random().toString(36).substring(7);
    td.id = tdId;
    td.appendChild(document.createTextNode(input.value));
    tr.appendChild(td);
    return tr;
  }

  function addDeleteToRow(tr){
    let erase = document.createElement("button");
    erase.className = 'button';
    erase.innerText = 'X';
    let tdErase = document.createElement("td");
    let tdEraseId = Math.random().toString(36).substring(7);
    tdErase.id = tdEraseId;
    erase.onclick = function(){
      removeItemFromList(tr.id);
    }
    tdErase.appendChild(erase);
    tr.appendChild(tdErase);
    return tr;
  }


  function addUpdateToRow(tr){
    let update = document.createElement("button");
    update.className = 'button';
    update.innerText = 'Update';
    update.id = Math.random().toString(36).substring(7);
    let tdUpdate = document.createElement("td");
    let tdUpdateId = Math.random().toString(36).substring(7);
    tdUpdate.id = tdUpdateId;
    tdUpdate.appendChild(update);
    tr.appendChild(tdUpdate);

    update.onclick = function(){
      tr = updateItemFromRow(tr, update.id);
    }
    return tr;
  }

  function updateItemFromRow(tr, updateButtonId){
    document.getElementById(updateButtonId).style.display = "none";

    let save = document.createElement("button");
    save.className = 'button';
    save.innerText = 'Save';
    save.id = Math.random().toString(36).substring(7);
    let tdSave = document.createElement("td");
    let tdSaveId = Math.random().toString(36).substring(7);
    tdSave.id = tdSaveId;


    let todoText = tr.firstChild.innerHTML;
    tr.firstChild.innerHTML = "<input type='text' id='name_text' value='"+todoText+"'>";
    // tdSave.appendChild(save);
    tr.childNodes[2].appendChild(save);
    // tr.appendChild(tdSave);
    // updateButton.style.display = "block";

    save.onclick = function(){
      text = document.getElementById('name_text').value;
      tr = saveItem(tr, text, updateButtonId, save.id);
    };

  return tr;

  }



  function removeItemFromList(id){
      let elem = document.getElementById(id);
      elem.parentNode.removeChild(elem);

    }

  function saveItem(tr, text, updateButtonId, saveButtonId){
     tr.firstChild.innerHTML = text;
     document.getElementById(saveButtonId).style.display = "none";
     document.getElementById(updateButtonId).style.display = "block";
     return tr;
  }

  function prioritize(tr){
    //priority button
    let priority = document.createElement("button");
    // priority.className = 'button';
    priority.className = 'dropdown';
    priority.innerText = 'Urgency';

    let tdPriority = document.createElement("td");
    let tdPriorityId = Math.random().toString(36).substring(7);
    tdPriority.id = tdPriorityId;


    //dropdown div
    let dropDownDiv = document.createElement('div');
    dropDownDiv.className = 'dropdown-content';
    let dropDownDivId = Math.random().toString(36).substring(7);
    dropDownDiv.id = dropDownDivId;

    priority.appendChild(buildDropDownMenu(dropDownDiv));
    tdPriority.appendChild(priority);
    tr.appendChild(tdPriority);

    return tr;
  }

function changeTextColor(id, priority) {
  let el = document.getElementById(id).closest('tr').firstChild;

    switch(priority) {
    case 'high-priority':
      el.style.backgroundColor = "red";
      break;
    case 'moderate-proirity':
      el.style.backgroundColor = "yellow";
      break;
    case 'low-priority':
      el.style.backgroundColor = "green";
      break;
    default:
      alert("element not found!");

  }
}

function buildDropDownMenu(dropDownDiv){

  //Build ul
  let dropDownUl = document.createElement('ul');

  //Build li(s)
  let dropDownFirstLi = document.createElement('li');
  let dropDownFirstLiId = Math.random().toString(36).substring(7);
  dropDownFirstLi.setAttribute('id',dropDownFirstLiId);
  dropDownFirstLi.innerHTML = "High";




  let dropDownSecondLi = document.createElement('li');
  let dropDownSecondLiId = Math.random().toString(36).substring(7);
  dropDownSecondLi.setAttribute('id',dropDownSecondLiId);
  dropDownSecondLi.innerHTML = "Moderate";

  let dropDownThirdLi = document.createElement('li');
  let dropDownThirdLiId = Math.random().toString(36).substring(7);
  dropDownThirdLi.setAttribute('id',dropDownThirdLiId);
  dropDownThirdLi.innerHTML = "Low";

  dropDownUl.appendChild(dropDownFirstLi);
  dropDownUl.appendChild(dropDownSecondLi);
  dropDownUl.appendChild(dropDownThirdLi);
  dropDownDiv.appendChild(dropDownUl);
  dropDownFirstLi.onclick = function(){
    changeTextColor(dropDownFirstLiId, 'high-priority');
  };

  dropDownSecondLi.onclick = function(){
    changeTextColor(dropDownSecondLiId, 'moderate-proirity');
  };

  dropDownThirdLi.onclick = function(){
    changeTextColor(dropDownThirdLiId, 'low-priority');
  };

  return dropDownDiv;
}


});


