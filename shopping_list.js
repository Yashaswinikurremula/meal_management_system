let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || []; 

function displayShoppingList() {
    let tableBody = document.getElementById("shoppingListBody");
    tableBody.innerHTML = "";

    shoppingList.forEach(ingredient => {
        let row = document.createElement("tr");
        let ingredientCell = document.createElement("td");
        ingredientCell.textContent = ingredient;
        let checkboxCell = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkboxCell.appendChild(checkbox);

        row.appendChild(ingredientCell);
        row.appendChild(checkboxCell);
        tableBody.appendChild(row);
    });
}

function downloadShoppingList() {
    // Convert shoppingList array to string
    let listAsString = shoppingList.join("\n");

    // Create a blob from the string
    let blob = new Blob([listAsString], { type: "text/plain" });

    // Create a URL for the blob
    let url = URL.createObjectURL(blob);

    // Create a link element and trigger a click to download
    let link = document.createElement("a");
    link.href = url;
    link.download = "grocery_list.txt";
    link.click();
}


document.addEventListener("DOMContentLoaded", function() {
    displayShoppingList();
    document.getElementById("downloadButtong").addEventListener("click", downloadShoppingList);
});