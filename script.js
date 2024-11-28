

const listItems = []

// Get references to the button and modal elements
const addItemButton = document.getElementById("new-item");
const saveItemButton = document.getElementById("btnSalvar");
const addTaskButton = document.getElementById("btnSalvar");

const addItemForm = document.getElementById('addItemForm')

const addModal = document.getElementById("add-modal");
const taskmodal = document.getElementById("task-modal");


// When the open modal button is clicked, show the modal
addItemButton.addEventListener("click", ()  => {
    addModal.style.display = "flex"; 
});


// When the add button is clicked, add task and hide the modal
addTaskButton.addEventListener("click", () => {
    taskmodal.style.display = "none"; 
});

// Optionally, close the modal if the user clicks outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === addModal) {
        addModal.style.display = "none"; 
    }
    if (event.target === taskmodal) {
        taskmodal.style.display = "none"; 
    }
});


addItemForm.addEventListener("submit", (event) =>{
    event.preventDefault(); 

    // Get values from the form inputs
    const nome = document.getElementById('name').value;
    const sobrenome = document.getElementById('lastName').value;
    const produto = document.getElementById('product').value;
    const status = document.getElementById('status').value;

    // Create a new item object
    const newItem = { nome, sobrenome, produto, status };

    // Add the new item to the array
    listItems.push(newItem);

    // When the save button is clicked, hide the modal
    addModal.style.display = "none"; 

    // Re-render the table to show the new item
    renderTable();

    // Clear the form inputs after submission
    document.getElementById('addItemForm').reset();
})

// Function to delete an item from the list
const deleteItem = (itemToDelete) => {
    const index = listItems.findIndex(item => item === itemToDelete);
    if (index !== -1) {
        listItems.splice(index, 1); // Remove the item from the array
        renderTable(); // Re-render the table after deletion
    }
}

// Function to render the table rows
const renderTable = () => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    listItems.forEach(item => {
        const row = document.createElement('tr');
        
        const nomeCell = document.createElement('td');
        nomeCell.textContent = item.nome;
        row.appendChild(nomeCell);
        
        const sobrenomeCell = document.createElement('td');
        sobrenomeCell.textContent = item.sobrenome;
        row.appendChild(sobrenomeCell);
        
        const produtoCell = document.createElement('td');
        produtoCell.textContent = item.produto;
        row.appendChild(produtoCell);
        
        const statusCell = document.createElement('td');
        statusCell.textContent = item.status;
        row.appendChild(statusCell);
        
        const acaoCell = document.createElement('td');
        

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Excluir";
        deleteButton.className = "delete-action";
        deleteButton.onclick = function() {
            if (confirm('Tem certeza que deseja excluir este item?')) {
                deleteItem(item);
            }
        };

        acaoCell.appendChild(deleteButton);
        row.appendChild(acaoCell);
        
        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

renderTable()