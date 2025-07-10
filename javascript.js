
class Library { 
    constructor() {
        this.myLibrary = []
    }

    addBookToLibrary = (title, author, pages, haveRead) => {
        const newBook = new Book(title, author, pages, haveRead);
        this.myLibrary.push(newBook); 
    }

    getmyLibrary = () => {
        return this.myLibrary;
    }

    removeBook = (idx) => { 
        this.myLibrary.splice(idx, 1);
    }
}

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

    toggleRead = () => {
        this.haveRead = !this.haveRead;
    }
}

class DisplayControl { 
    constructor(library) { 
        this.library = library;
        this.container = document.querySelector(".container");
        this.libWindow = document.querySelector(".library");
        this.butt = document.createElement("button");
        this.butt.textContent = "New Book"; 
        this.butt.setAttribute("class", "new-butt")
        this.container.appendChild(this.butt);
        this.dialog = document.querySelector("dialog");
        this.closeButton = document.querySelector("#cancel");
        this.submitButton = document.querySelector("#sub");
        this.libWindow.addEventListener(("click"), e => this.toggleReadHandler(e));
        this.submitButton.addEventListener(("click"), e => this.addBookHandler(e));
        this.butt.addEventListener(("click"), () => this.showModalHandler());
        this.libWindow.addEventListener(("click"), e=> this.removeBookHandler((e)));
    }

    createCard = (book) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card")
    card.setAttribute("data-id", book.id);
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const read = document.createElement("div");
    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    read.textContent = `Have Read: ${book.haveRead}`;
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
    this.libWindow.appendChild(card);
}
    reset = () => {  
        this.libWindow.innerHTML = '';
    }

    displayBooks = () => {
    //clear dom and then reisplay
    this.reset();
    this.library.getmyLibrary().forEach(book => {
        this.createCard(book)}
        );
}
    addBookHandler = (e) => { 
            e.preventDefault();
            const title = document.querySelector("#title").value;
            const author = document.querySelector("#author").value;
            const pages = document.querySelector("#pages").value;
            const haveRead = document.querySelector("#read").value;
            this.library.addBookToLibrary(title, author, pages, haveRead);
            this.displayBooks();
            this.dialog.close();
            // could also ismply just remove everything and redisplay
    }

    removeBookHandler = (e) => { 
    if (!e.target.matches(".remove")) {
        return;
    }

    // traverses parents find closest element with that class
    const id = e.target.closest(".card").dataset.id;
    const idx = this.library.getmyLibrary().findIndex(book => book.id ==id);
    this.library.removeBook(idx);
    console.log(`${this.library.getmyLibrary()}`);
    this.displayBooks();
    // access the data-attibute 
    }


    toggleReadHandler = (e) => { 
            if (!e.target.matches(".readStat")){
                return;
            }
            const id = e.target.closest(".card").dataset.id;
            // need to get the book so i can toggle 
            const book = this.library.getmyLibrary().find(book => book.id == id);
            book.toggleRead(); 
            this.displayBooks();
        }

    showModalHandler = () => { 
       this.dialog.showModal();
    }
}

const library = new Library();
library.addBookToLibrary("Harry Potter", "JK Rowling", 200, false);
library.addBookToLibrary("Lebron James", "LBJ", 300, false);
library.addBookToLibrary("I Know Why the Caged Bird Sings", "Maya Angelou", 400, false);

const display = new DisplayControl(library);
display.displayBooks();
