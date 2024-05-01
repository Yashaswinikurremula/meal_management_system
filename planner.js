document.getElementById('mealForm').addEventListener('submit', mealForm);

function mealForm(event) {
    event.preventDefault();

    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const gender = document.getElementById('gender').value;
    const activityLevel = document.getElementById('activityLevel').value;
    const numOfMeals = document.getElementById('numOfMeals').value;
    const healthSpec = document.getElementById('healthSpec').value;

    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const calories = Math.round(bmr * activityLevel);
    const totalMeals = numOfMeals * 7; // Fetch enough meals for a week

    // Edamam API details
    const APP_ID = "91e5fed9";
    const APP_KEY = "9b75e0663c86e94c6efc588102973a16";

    // API endpoint
    // API endpoint
    const apiUrl = `https://api.edamam.com/search?q=indian&cuisineType=indian&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=${totalMeals}&calories=${calories}&health=${healthSpec}`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => mealTab(data.hits, numOfMeals))
        .catch(error => console.error('Error:', error));
    }

    function mealTab(meals, numOfMeals) {
    const mealTab= document.getElementById('mealTab');
    mealTab.innerHTML = '';  // Clear previous meal plan

    // Create table and headings
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const headerRow = document.createElement('tr');
    days.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

  // Fill table with meal data
for (let i = 0; i < numOfMeals; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
        const meal = meals[i * 7 + j].recipe;
        const cell = document.createElement('td');
        cell.innerHTML = `
                    <h3>${meal.label}</h3>
                    <img src="${meal.image}" alt="${meal.label}" style="width: 100%; max-width: 200px;">
                    <a href="${meal.url}" target="_blank">View Recipe</a>
                `;
        row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    mealTab.appendChild(table);
    }

document.getElementById('downloadButton').addEventListener('click', downloadMealPlan);
function downloadMealPlan() {
    const table = document.querySelector('table');
    const tableContent = table.outerHTML;
    const blob = new Blob([tableContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'meal_plan.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
