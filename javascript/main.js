const library = document.getElementById('library');
const addBookButton = document.getElementById('new-book');
const readButtons = document.getElementsByClassName('read-book')
const removeButtons = document.getElementsByClassName('remove-book')
const overlay = document.getElementById('overlay');
const formSubmitButton = document.getElementById('submit');

let books = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = books.length;
}

addBookButton.addEventListener('click', function() {
    overlay.style.display = "flex";
});

formSubmitButton.addEventListener('click', function() {
    const form = new FormData(document.getElementById('book-prompt'));
    if (form.get('prompt-title') !== "" && form.get('prompt-author') !== "" && form.get('prompt-pages') !== "") {
        // console.log(form.get('prompt-title'));
        // console.log(form.get('prompt-author'));
        // console.log(form.get('prompt-pages'));
        generateBook();
    }
});

function generateBook() {
    const form = new FormData(document.getElementById('book-prompt'));
    // for (let pair of form.entries()) {
    // }

    let hasRead = form.has('prompt-read');

    const newBook = new Book(form.get('prompt-title'), form.get('prompt-author'), form.get('prompt-pages'), hasRead);
    addBookToLibrary(newBook);
}

function addBookToLibrary(bk) {
    books.push(bk);

    const book = document.createElement('article');
    book.classList.add('book');
    
    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.innerHTML = bk.title;
    book.appendChild(bookTitle);

    const bookAuthor = document.createElement('h3');
    bookAuthor.classList.add('book-author');
    bookAuthor.innerHTML = bk.author;
    book.appendChild(bookAuthor);

    const bookPages = document.createElement('h3');
    bookPages.classList.add('book-pages');
    bookPages.innerHTML = bk.pages;
    book.appendChild(bookPages);

    const btnRead = document.createElement("button");
    btnRead.classList.add("read-book");
    if (!bk.read) {
        btnRead.classList.add('toggled'); //toggled means not read!
        btnRead.innerHTML = "Not Read";
    }
    else {
        btnRead.innerHTML = "Read";
    }
    book.appendChild(btnRead);

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("remove-book");
    btnRemove.classList.add("bold");
    btnRemove.innerHTML = "Remove";
    book.appendChild(btnRemove);

    library.appendChild(book);

    btnRead.addEventListener('click', function() {
        btnRead.classList.toggle('toggled');
        if (btnRead.classList.contains('toggled')) {
            btnRead.innerHTML = "Not Read";
        }
        else {
            btnRead.innerHTML = "Read";
        }
        console.info("toggled!");
    });
    
    
    btnRemove.addEventListener('click', function() {
        removeBookFromLibrary(btnRemove);
    });

    document.getElementById('book-prompt').reset();
    overlay.style.display = "none";

    // <article class="book">
        // <h2 class="book-title">Invisible Man</h2>
        // <h3 class="book-author">HG Wells</h3>
        // <h3 class="book-pages">69 Pages</h3>
        // <button class="read-book">Read</button>
        // <button class="remove-book bold">Remove</button>
    // </article>

}

function removeBookFromLibrary(book) {
    books.pop(book.index);
    book.parentNode.remove();
}


//start of MAIN
document.getElementById('book-prompt').reset();

for (let i=0; i < readButtons.length; i++) {
    let button = readButtons[i];
    button.addEventListener('click', function() {
        button.classList.toggle('toggled');
        if (button.classList.contains('toggled')) {
            button.innerHTML = "Not Read";
        }
        else {
            button.innerHTML = "Read";
        }
        console.info("toggled!");
    });
}


for (let i=0; i < removeButtons.length; i++) {
    let button = removeButtons[i];
    button.addEventListener('click', function() {
        removeBookFromLibrary(button);
    });
}