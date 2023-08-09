const apiUrl = "https://crudcrud.com/api/a5d92b4b6ba44295b2fcd3f99260fd39"; // Replace with your actual API key
const itemsList = document.getElementById("itemsList");

// Fetch items from API and populate the list on page load
async function fetchItems() {
    try {
        const response = await axios.get(`${apiUrl}/items`);
        const items = response.data;

        itemsList.innerHTML = ""; // Clear existing list

        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} - $${item.price} - Table: ${item.table}
                <button class="delete-button" data-id="${item._id}">Delete Item</button>
            `;
            itemsList.appendChild(listItem);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => button.addEventListener("click", deleteItem));
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

async function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);
    const selectedTable = document.getElementById("tableSelect").value;

    const item = {
        name: itemName,
        price: itemPrice,
        table: selectedTable
    };

    try {
        // Send a POST request to add the item to the API
        await axios.post(`${apiUrl}/items`, item);
        fetchItems(); // Fetch items again to update the list
        clearInputs();
    } catch (error) {
        console.error("Error adding item:", error);
    }
}

async function deleteItem(event) {
    const itemId = event.target.getAttribute("data-id");

    try {
        // Send a DELETE request to remove the item from the API
        await axios.delete(`${apiUrl}/items/${itemId}`);
        fetchItems(); // Fetch items again to update the list
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    fetchItems();
    const addItemButton = document.getElementById("addItem");
    addItemButton.addEventListener("click", addItem);
});
