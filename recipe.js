let abc;
let shoppingList = [];

function addToShoppingList(ingredient) {
    if (!shoppingList.includes(ingredient)) {
        shoppingList.push(ingredient);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    } else {
        alert('Ingredient already in the list.');
    }
}



function generateTable(recipe) {
    var result = "<table style= border-radius: 10px;>"
    for (var i = 0; i < recipe.length; i++) {
        result += "<tr>";
        result += "<td><span class='ingredient'>" + recipe[i] + "</span><button class='add-to-list'>Add to List</button></td>";
        result += "</tr>";
    }
    result += "</table>";
    document.getElementById('tableContainer').innerHTML = result;
    document.getElementById("title").style.display = "none";
    document.getElementById("myButton").style.display = "none";
    document.getElementById("goal").style.display = "none";
    document.getElementById("tableContainer").style.display = "block";

    // Add event listeners after generating the table
    var addToListButtons = document.querySelectorAll('.add-to-list');
    addToListButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var ingredient = this.previousElementSibling.textContent;
            addToShoppingList(ingredient);
        });
    });
}
function clearAndReturn() {
    localStorage.setItem('shoppingList', JSON.stringify([]));
}

document.getElementById('returnButton').addEventListener('click', clearAndReturn);


function getTextField() {
    console.log("button onclick");
    abc = document.getElementById('goal').value.toLowerCase();
    $.ajax({
        url: "https://api.edamam.com/search?app_id=5b48deba&app_key=08443aa8b4d626f60fd5e08a3c78d90c&q=" + abc,
        type: "GET",
        success: function(res) {
            console.log(res);
            console.log(res.hits[0].recipe.ingredientLines);
            generateTable(res.hits[0].recipe.ingredientLines);
        }
    });
}