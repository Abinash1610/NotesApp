console.log("Happy");
showFunction();

let addbtn = document.getElementById("addBtn");
let inputText = document.getElementById("inputTextarea");
let title = document.getElementById("titleInput");

function showFunction() {
  let notesObj = JSON.parse(localStorage.getItem("notes"));
  let notesArea = document.getElementById("notesArea");
  if (notesObj == null || notesObj.length === 0) {
    notesObj = [];
    notesArea.innerHTML = `Nothing to show! Click on Add note to add a note!`;
  } else {
    let html = "";
    notesObj.forEach(function (element, index) {
      html += `
        <div class="notesCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p id="paraText" class="card-text">${element.note}</p>
                <button onClick="deleteNote(this.id)" class="btn btn-primary btn-sm my-2" id="${index}">Delete Note</button>
            </div>
        </div>`;
        
    });
    notesArea.innerHTML = html;
  }
}

addbtn.addEventListener("click", function (e) {
    let noteObj;
    let notesObj = JSON.parse(localStorage.getItem("notes"));
    if(inputText.value == ""){
        notesArea.innerHTML = `Add Something First!`;
        return;
    }
    if(notesObj == null){
        notesObj = [];
        noteObj = {
          title: title.value,
          note: inputText.value
        }
        notesObj.push(noteObj);
    }else{
      noteObj = {
        title: title.value,
        note: inputText.value
      }
      notesObj.push(noteObj);
    }
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    inputText.value = "";
    title.value = "";
    showFunction();
});

function deleteNote(index) {
    let notesObj = JSON.parse(localStorage.getItem("notes"));
    notesObj.splice(index , 1);
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    showFunction();
}

let search = document.getElementById("searchArea");

search.addEventListener("input" , function(e){
  let flag = 0;
    let cards = Array.from(document.getElementsByClassName("notesCard"));
    // console.log(cards);
    if(cards.length == 0){
      notesArea.innerHTML = `Nothing to search from! please enter some notes first!`;
    }else{
      cards.forEach(function(element){
        if(element.getElementsByTagName("p")[0].innerText.includes(search.value.toLowerCase()) || element.getElementsByTagName("h5")[0].innerText.includes(search.value.toLowerCase())){
          flag = 1;
           element.style.display = "block";
        }else{
           element.style.display = "none";
        }
      })
    }
    if(flag == 0){
      alert("No matching results found!");
    }
})

// class Library{
//   constructor(arr){
//     this.arr = arr;
//   }

//   getBookList(){
//     console.log("The Books available in the library are: ");
//     this.arr.forEach(element => {
//       console.log(element);
//     });
//   }

//   issueBook(bookName , userName){
//       let ele = arr.findIndex(element=>{
//         return element.toLowerCase() === bookName.toLowerCase();
//       })
//       if(ele !== -1){
//         // this.arr.splice(this.arr.indexOf(bookName) , 1);
//       arr.splice(ele , 1);
//       console.log(`${bookName} issued to ${userName}`);
//     }else{
//       console.log(`${bookName} not found in the library`);
//     }
    
//   }

//   returnBook(bookName){
//     this.arr.push(bookName);
//     console.log(`${bookName} is returned to the library`);
//   }

// }

// let arr = ["Reader's Delight" , "The White Tiger" , "Chronicles Of Narnia" , "Alladin" , "Economics" , "Maths"];
// lib1 = new Library(arr);
// lib1.getBookList();
// lib1.issueBook("chronicles Of Narnia" , "user1");
// lib1.getBookList();
// // lib1.returnBook("Chronicles Of Narnia");
// // lib1.getBookList();