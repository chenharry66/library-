const myLibrary = []

const container = document.querySelector(".container");
const libWindow = document.querySelector(".library");


class Book {
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
        this.id = crypto.randomUUID();
    }

    // name the funciton use this. but when you call still function syntax
    info = () => { 
        var hasReadStr = "not read yet"; 
        if (this.haveRead) {
            hasReadStr = "read";
        }
        const str = `${this.title} by ${this.author}, ${this.pages}, ${hasReadStr}.`
        return str;
    }
}

function addBookToLibrary(title, author, pages, haveRead) {
    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook); 
}

addBookToLibrary("Harry Potter", "JK Rowling", 200, false);
addBookToLibrary("Lebron James", "LBJ", 300, false);
addBookToLibrary("I Know Why the Caged Bird Sings", "Maya Angelou", 400, false);


function createCard(bookTitle, bookAuthor, bookPages, bookRead, bookId) {
        const card = document.createElement("div");
        card.setAttribute("class", "card")
        card.setAttribute("data-id", bookId);
        const title = document.createElement("div");
        const author = document.createElement("div");
        const pages = document.createElement("div");
        const read = document.createElement("div");
        title.textContent = `Title: ${bookTitle}`;
        author.textContent = `Author: ${bookAuthor}`;
        pages.textContent = `Pages: ${bookPages}`;
        read.textContent = `Have Read: ${bookRead}`;
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("class", "remove");
        card.appendChild(removeButton);
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle Read"
        toggleButton.setAttribute("class", "readStat");
        card.appendChild(toggleButton);
        libWindow.appendChild(card);
}
function displayBooks() {
    //clear dom and then reisplay
    reset();
    myLibrary.forEach(book => createCard(book.title, book.author,
        book.pages, book.haveRead, book.id));
}

function reset() { 
    libWindow.innerHTML = '';
}

console.log(myLibrary);
displayBooks();


const butt = document.createElement("button");
butt.textContent = "New Book"; 
butt.setAttribute("class", "new-butt")
container.appendChild(butt);

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#cancel");
const submitButton = document.querySelector("#sub");
butt.addEventListener("click", () => { 
    dialog.showModal();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const haveRead = document.querySelector("#read").value;
    addBookToLibrary(title, author, pages, haveRead);
    displayBooks();
    dialog.close();
    // could also ismply just remove everything and redisplay
});

// use bubbling for container

libWindow.addEventListener("click", (e) => 
{
    if (!e.target.matches(".remove")) {
        return;
    }
    // traverses parents find closest element with that class
    const id = e.target.closest(".card").dataset.id;
    const idx = myLibrary.findIndex(book => book.id ==id);
    myLibrary.splice(idx, 1);
    displayBooks();
    // access the data-attibute 
}
)


Book.prototype.toggleRead = function() { 
    this.haveRead = !this.haveRead;
}

// bubbling dont need one for every single toggle butotn 
libWindow.addEventListener("click", (e) => {
    if (!e.target.matches(".readStat")){
        return;
    }
    const id = e.target.closest(".card").dataset.id;
    // need to get the book so i can toggle 
    const book = myLibrary.find(book => book.id == id);
    book.toggleRead(); 
    displayBooks();
})


