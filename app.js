let addbtn = document.getElementById("add");
let notesarea=document.querySelector(".notes")

addbtn.addEventListener("click", () => addNote());

// update the notes with local Storage , parse the notes data

const localnotes= JSON.parse(localStorage.getItem('notes'))

console.log(localnotes)


if(localnotes){
    localnotes.forEach(note => addNote(note))
}




function addNote(text = "") {
  //make a new note element

  let newnote = document.createElement("div");
  newnote.classList.add("note");

  //  if no text is there then hidden class should be  present in main div else in textarea div -->
  newnote.innerHTML = `
    <div class="tools">
            <button class="edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete">
                <i class="fas fa-trash-alt"></i>
            </button>
                
        </div>

        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea  class="${text ? "hidden" : " "}"></textarea>
    `;

  let editbtn = newnote.querySelector(".edit");
  let deletebtn = newnote.querySelector(".delete");

  let main = newnote.querySelector(".main");
  let textArea = newnote.querySelector("textarea");

  // add these text to textarea and main div
  textArea.value = text;
  main.innerHTML = marked(text);

  // listen for deletebtn

  deletebtn.addEventListener("click", () => {
    newnote.remove();

    //if you delete some notes then just call the updateLS function
    updateLS()
  });

  editbtn.addEventListener("click", () => {
    // check for hidden class
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  // if input is given then update the main div along
  textArea.addEventListener("input", (e) => {
    let inputtext = e.target.value;

    main.innerHTML = marked(inputtext);

    updateLS()
  });

 notesarea.appendChild(newnote);
}


// let us implement local storage

function updateLS(){

    //get all textarea
    const notesText=document.querySelectorAll('textarea')
   

    let  notes=[]

    // add all textarea value in notes array
    notesText.forEach(note=>notes.push(note.value))

    // stringfy the array bcz only strings are allowed as key-value pair
    localStorage.setItem('notes',JSON.stringify(notes))
}