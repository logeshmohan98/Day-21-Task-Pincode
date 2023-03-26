// Get the form and results elements
const form = document.querySelector('form');
const results = document.getElementById('results');

// Attach an event listener to the form submit event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get the input value and clear the results
    const input = document.getElementById('postal-code').value;
    results.innerHTML = '';
    
    // Check if the input is a postal code or post office name
    if (input.match(/^\d{6}$/)) {
        // If it's a postal code, use the pincode API
        fetch(`https://api.postalpincode.in/pincode/${input}`)
            .then(response => response.json())
            .then(data => {
                const postOfficeData = data[0].PostOffice;
                displayResults(postOfficeData);
            })
            .catch(error => console.error(error));
    } else {
        // If it's a post office name, use the post office API
        fetch(`https://api.postalpincode.in/postoffice/${input}`)
            .then(response => response.json())
            .then(data => {
                const postOfficeData = [data];
                displayResults(postOfficeData);
            })
            .catch(error => console.error(error));
    }
});

// Display the results on the page
function displayResults(data) {
    // Create a table to display the results
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    
    // Add a header row to the table
    const headerRow = table.insertRow();
    const headerCell1 = headerRow.insertCell();
    const headerCell2 = headerRow.insertCell();
    headerCell1.textContent = 'Name';
    headerCell2.textContent = 'Details';
    
    // Add a row for each post office in the data
    data.forEach(postOffice => {
        const row = table.insertRow();
        const nameCell = row.insertCell();
        const detailsCell = row.insertCell();
        nameCell.textContent = postOffice.Name;
        detailsCell.innerHTML = `<p>Branch Type: ${postOffice.BranchType}</p>
                                  <p>Delivery Status: ${postOffice.DeliveryStatus}</p>
                                  <p>Circle: ${postOffice.Circle}</p>
                                  <p>Division: ${postOffice.Division}</p>
                                  <p>Region: ${postOffice.Region}</p>
                                  <p>State: ${postOffice.State}</p>
                                  <p>Country: ${postOffice.Country}</p>`;
    });
    
    // Append the table to the results element
    results.appendChild(table);
}