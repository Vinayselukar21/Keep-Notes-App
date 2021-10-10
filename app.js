console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTtl = document.getElementById("addTtl");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj={
    title:addTtl.value,
    note:addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  addTtl.value = "";
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let string = "";
  notesObj.forEach(function (element, index) {
    string += ` <div class="noteCard my-2 mx-2" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.note}</p>
                <button id=${index} onclick=notesDelete(this.id) class="btn btn-primary">Delete Note</button>
              </div> 
              </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = string;
  } else {
    notesElm.innerHTML = "Your notes will show here";
  }
}

function notesDelete(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  console.log("You just deleted", index);
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let cards = document.getElementsByClassName("noteCard");

  Array.from(cards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerHTML;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
