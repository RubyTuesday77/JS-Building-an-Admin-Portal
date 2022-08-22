
// Function retrieves list of books from database (db.json)
async function main() {

    let response = await fetch('http://localhost:3001/listBooks')

    let books = await response.json()

    books.forEach(renderBook)
}

// Function displays each book on admin portal
function renderBook(book) {
    let root = document.querySelector('#root');

    let li = document.createElement('li');  // Create li element for each book in database
    li.textContent = book.title; // Displays title of book

    let quantityInput = document.createElement('input'); // Create text field next to book title
    quantityInput.value = book.quantity;  // Text field to accept quantity input

    let saveButton = document.createElement('button')  // Create save button to click after quantity entered
    saveButton.textContent = 'Save' // "Save" will be displayed on button

    // Add click event to <button> element, which will also update quantity on customer-facing page
    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })

    let deleteButton = document.createElement('button')  // Create delete button to remove book from admin portal
    deleteButton.textContent = 'Delete' // "Delete" will be displayed on button

    deleteButton.addEventListener('click', () => {
        fetch('http://localhost:3001/removeBook/{bookId}', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    })

    li.append(quantityInput, saveButton)
    root.append(li)
}

main()