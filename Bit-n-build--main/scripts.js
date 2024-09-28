let items = [];
let usageData = {};

// Function to Add an Item to the Inventory
document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form inputs
    const itemName = document.getElementById('item-name').value;
    const category = document.getElementById('category').value;
    const condition = document.getElementById('condition').value;
    const purchaseDate = document.getElementById('purchase-date').value;

    // Get the tbody element where items will be added
    const inventoryList = document.getElementById('inventory-list');

    // Create a new table row element
    const newRow = document.createElement('tr');

    // Fill the row with the item data
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${category}</td>
        <td>${condition}</td>
        <td>${purchaseDate}</td>
    `;

    // Append the new row to the inventory list
    inventoryList.appendChild(newRow);

    // Clear the input fields for the next entry
    e.target.reset();
});





// Community Exchange functionality (dummy example)
const exchangeItems = [];

document.getElementById('exchange-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemName = document.getElementById('exchange-item-name').value;
    const category = document.getElementById('exchange-category').value;
    const condition = document.getElementById('exchange-condition').value;
    const exchangeType = document.getElementById('exchange-type').value;

    // Store item
    exchangeItems.push({ name: itemName, category: category, condition: condition, type: exchangeType });

    // Update exchange items display
    const exchangeList = document.getElementById('exchange-items');
    const newItem = document.createElement('li');
    newItem.innerHTML = `
        <strong>${itemName}</strong><br>
        Category: ${category}<br>
        Condition: ${condition}<br>
        Type: ${exchangeType}
        <button onclick="contactUser('${itemName}')">Inquire</button>
    `;

    exchangeList.appendChild(newItem);

    // Reset the form
    e.target.reset();
});

// Function to handle user inquiry
function contactUser(itemName) {
    alert(`Contact the owner of ${itemName} for more details!`);
}


// Style Inspiration - dummy data
/*const styledLooks = [];

// Function to render styled looks
function renderStyledLooks() {
    const styledContainer = document.getElementById('styled-looks');
    styledContainer.innerHTML = ''; // Clear previous looks

    styledLooks.forEach((look, index) => {
        const lookDiv = document.createElement('div');
        lookDiv.classList.add('styled-look');

        lookDiv.innerHTML = `
            <img src="${look.image}" alt="${look.title}" style="width:100px; height:auto;">
            <h3 class="look-title">${look.title}</h3>
            <p class="look-category">${look.category}</p>
            <button class="remove-look" type="button" data-index="${index}">Remove</button>
        `;

        styledContainer.appendChild(lookDiv);
    });

    // Show or hide the delete button based on the number of looks
    const deleteButton = document.getElementById('delete-look');
    if (styledLooks.length > 0) {
        deleteButton.classList.remove('hidden');
    } else {
        deleteButton.classList.add('hidden');
    }
}

// Function to upload a new look (this can be expanded to include file upload)
document.getElementById('upload-look').addEventListener('click', function() {
    const title = prompt("Enter the look title:");
    const image = prompt("Enter the image URL:");
    const category = prompt("Enter the category:");

    if (title && image && category) {
        styledLooks.push({ title, image, category });
        renderStyledLooks();
    }
});

// Function to delete a specific look
document.getElementById('styled-looks').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-look')) {
        const index = e.target.getAttribute('data-index');
        styledLooks.splice(index, 1); // Remove the item from the array
        renderStyledLooks();
    }
});

// Initial render call
renderStyledLooks();
*/



























const styledLooks = [];

// Sample looks (to be replaced with user-generated content)

function displayLooks(category = "all") {
    const styledLooksContainer = document.getElementById("styled-looks");
    styledLooksContainer.innerHTML = "";
    
    const filteredLooks = category === "all" ? styledLooks : styledLooks.filter(look => look.category === category);

    filteredLooks.forEach(look => {
        const lookDiv = document.createElement("div");
        lookDiv.classList.add("styled-look");
        lookDiv.innerHTML = `
            <h4>${look.title}</h4>
            <img src="${look.image}" alt="${look.title}">
        `;
        styledLooksContainer.appendChild(lookDiv);
    });
}

// Filter functionality
document.getElementById('style-category').addEventListener('change', function() {
    displayLooks(this.value);
});

// Handle look upload
document.getElementById('upload-look-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('look-title').value;
    const image = document.getElementById('look-image').files[0];
    
    const reader = new FileReader();
    reader.onload = function(event) {
        styledLooks.push({ title: title, image: event.target.result, category: 'custom' });
        displayLooks();
    };
    reader.readAsDataURL(image);
    
    e.target.reset();
});

// Initial display
displayLooks();







const usageSuggestions = document.getElementById('usage-suggestions');

// Function to log outfit usage
document.getElementById('log-outfit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const item = document.getElementById('outfit-item').value;
    const date = document.getElementById('outfit-date').value;
    
    // Log the usage
    if (!usageData[item]) {
        usageData[item] = { count: 0, dates: [] };
    }
    usageData[item].count++;
    usageData[item].dates.push(date);
    
    // Update the dashboard
    updateUsageDashboard();
    
    // Reset the form
    e.target.reset();
});

// Function to update the usage dashboard
function updateUsageDashboard() {
    const mostWorn = Object.entries(usageData)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5);
    const leastWorn = Object.entries(usageData)
        .sort((a, b) => a[1].count - b[1].count)
        .slice(0, 5);
    
    // Display most worn items
    const mostWornList = document.getElementById('most-worn');
    mostWornList.innerHTML = "";
    mostWorn.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item[0]} - Worn: ${item[1].count} times`;
        mostWornList.appendChild(listItem);
    });

    // Display least worn items
    const leastWornList = document.getElementById('least-worn');
    leastWornList.innerHTML = "";
    leastWorn.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item[0]} - Worn: ${item[1].count} times`;
        leastWornList.appendChild(listItem);
    });
    
    // Update the chart
    updateUsageChart();
    
    // Generate suggestions
    generateUsageSuggestions();
}

// Function to update the usage chart (using Chart.js or similar)
function updateUsageChart() {
    const ctx = document.getElementById('usageChart').getContext('2d');
    const labels = Object.keys(usageData);
    const data = Object.values(usageData).map(item => item.count);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Usage Frequency',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to generate usage suggestions
function generateUsageSuggestions() {
    usageSuggestions.innerHTML = "";
    const underusedItems = Object.entries(usageData).filter(item => item[1].count < 2);
    
    if (underusedItems.length > 0) {
        usageSuggestions.innerHTML = "<h4>Suggestions for Underused Items:</h4>";
        underusedItems.forEach(item => {
            const suggestion = document.createElement('p');
            suggestion.textContent = `Consider wearing your ${item[0]} more often! Try pairing it with different items.`;
            usageSuggestions.appendChild(suggestion);
        });
    } else {
        usageSuggestions.innerHTML = "<p>Great job using your wardrobe effectively!</p>";
    }
}

const wornCounts = {}; // Object to track worn counts

document.getElementById('log-outfit').addEventListener('click', function() {
    const itemName = prompt("Enter the name of the item you wore:"); // Get item name from user input
    if (itemName) {
        // Update the worn count
        if (wornCounts[itemName]) {
            wornCounts[itemName]++;
        } else {
            wornCounts[itemName] = 1;
        }
        updateWornTables();
    }
});

function updateWornTables() {
    const mostWornBody = document.getElementById('most-worn-body');
    const leastWornBody = document.getElementById('least-worn-body');
    
    // Clear previous contents
    mostWornBody.innerHTML = '';
    leastWornBody.innerHTML = '';

    // Sort items based on worn counts
    const wornItems = Object.entries(wornCounts).sort((a, b) => b[1] - a[1]);

    // Display most worn items (top 5)
    wornItems.slice(0, 5).forEach(([name, count]) => {
        const row = `<tr><td>${name}</td><td>${count}</td></tr>`;
        mostWornBody.innerHTML += row;
    });

    // Display least worn items (bottom 5)
    wornItems.slice(-5).forEach(([name, count]) => {
        const row = `<tr><td>${name}</td><td>${count}</td></tr>`;
        leastWornBody.innerHTML += row;
    });
}

