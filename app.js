const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const isCompleteInput = document.getElementById('isComplete'); // Ubah ID sesuai dengan yang ada di HTML
const addButton = document.getElementById('addButton');
const unfinishedBookshelf = document.getElementById('unfinishedBookshelf');
const finishedBookshelf = document.getElementById('finishedBookshelf');

let books = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks() {
    unfinishedBookshelf.innerHTML = '';
    finishedBookshelf.innerHTML = '';

    books.forEach((book) => {
        const bookItem = document.createElement('li');
        bookItem.innerHTML = `
            <span>${book.title} - ${book.author} (${book.year})</span>
        `;

        const actionButtons = document.createElement('div'); // Buat elemen div untuk tombol "Selesai" dan "Hapus"
        actionButtons.classList.add('action-buttons');

        if (book.isComplete) {
            const undoButton = document.createElement('button');
            undoButton.textContent = "Belum Selesai";
            undoButton.onclick = () => moveToUnfinished(book.id);
            actionButtons.appendChild(undoButton);
            finishedBookshelf.appendChild(bookItem);
        } else {
            const moveButton = document.createElement('button');
            moveButton.textContent = "Selesai";
            moveButton.onclick = () => moveToCompleted(book.id);
            actionButtons.appendChild(moveButton);
            unfinishedBookshelf.appendChild(bookItem);
        }

        // Tombol "Hapus" akan selalu ditampilkan
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => deleteBook(book.id);
        actionButtons.appendChild(deleteButton);

        bookItem.appendChild(actionButtons);
    });
}

function addBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);
    const isComplete = isCompleteInput.checked;

    if (title && author && !isNaN(year)) {
        const newBook = {
            id: Date.now(),
            title,
            author,
            year,
            isComplete,
        };

        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));

        titleInput.value = '';
        authorInput.value = '';
        yearInput.value = '';
        isCompleteInput.checked = false;

        displayBooks();
    }
}

function moveToUnfinished(id) {
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex !== -1) {
        books[bookIndex].isComplete = false;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
}

function moveToCompleted(id) {
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex !== -1) {
        books[bookIndex].isComplete = true;
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
    }
}

function deleteBook(id) {
    books = books.filter((book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

addButton.addEventListener('click', addBook);

displayBooks();