/* Task 1: Organize opportunity data */

// Create an array to store opportunities
let opportunities = [

    {
        id: 1,
        name: "University Scholarship",
        type: "Scholarship",
        deadline: "2026-12-15",
        nextAction: "Prepare academic documents",
        status: "Interested"
    },

    {
        id: 2,
        name: "Community Pharmacy Internship",
        type: "Internship",
        deadline: "2026-12-20",
        nextAction: "Update my CV",
        status: "Preparing"
    },

    {
        id: 3,
        name: "Research Mentorship Program",
        type: "Mentorship",
        deadline: "2027-01-10",
        nextAction: "Write a motivation letter",
        status: "Submitted"
    }

];
/* Task 2: Display opportunities on the webpage */

// Create a function to display opportunities
function displayOpportunities() {

    // Select the opportunity list from HTML
    const opportunityList = document.getElementById("opportunity-list");

    // Clear the list before displaying opportunities
    opportunityList.innerHTML = "";

    // Check if there are no opportunities
    if (opportunities.length === 0) {

        opportunityList.innerHTML = `
            <p id="empty-message">
                No opportunities yet. Add your first opportunity
                using the form above.
            </p>
        `;

        return;
    }

    // Loop through the opportunities array
    for (let opportunity of opportunities) {

        // Create a card for each opportunity
        const card = document.createElement("div");

        card.className = "opportunity-card";

        // Add opportunity details to the card
        card.innerHTML = `
            <h3>${opportunity.name}</h3>

            <p>
                <strong>Type:</strong>
                ${opportunity.type}
            </p>

            <p>
                <strong>Application Deadline:</strong>
                ${opportunity.deadline}
            </p>

            <p>
                <strong>Next Action:</strong>
                ${opportunity.nextAction}
            </p>

            <p>
                <strong>Status:</strong>
                <span class="status status-${opportunity.status.toLowerCase()}">
                    ${opportunity.status}
                </span>
            </p>

            <label for="status-${opportunity.id}">
                Update Status
            </label>

            <select id="status-${opportunity.id}"
                    class="status-select"
                    data-id="${opportunity.id}">

                <option value="Interested"
                    ${opportunity.status === "Interested" ? "selected" : ""}>
                    Interested
                </option>

                <option value="Preparing"
                    ${opportunity.status === "Preparing" ? "selected" : ""}>
                    Preparing
                </option>

                <option value="Submitted"
                    ${opportunity.status === "Submitted" ? "selected" : ""}>
                    Submitted
                </option>

            </select>

            <button class="delete-button"
                    data-id="${opportunity.id}">
                Delete
            </button>
        `;

        // Add the card to the opportunity list
        opportunityList.appendChild(card);
    }
}
/* Task 3: Handle form submission and validate input */

// Select the opportunity form
const opportunityForm = document.getElementById("opportunity-form");

// Listen for form submission
opportunityForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById("opportunity-name").value.trim();

    const type = document.getElementById("opportunity-type").value;

    const deadline = document.getElementById("application-deadline").value;

    const nextAction = document.getElementById("next-action").value.trim();

    // Validate the form inputs
    if (!name || !type || !deadline || !nextAction) {

        alert("Please fill in all fields.");

        return;
    }

    // Create a new opportunity object
    const newOpportunity = {
        id: Date.now(),
        name: name,
        type: type,
        deadline: deadline,
        nextAction: nextAction,
        status: "Interested"
    };

    // Add the new opportunity to the array
    opportunities.push(newOpportunity);

    //save the updated data
    saveOpportunities();

    // Display the updated opportunities
    displayOpportunities();

    // Clear the form
    opportunityForm.reset();

    // Inform the user
    alert("Opportunity added successfully!");

});
/* Task 4: Update opportunity status */

// Listen for changes in the opportunity list
document.getElementById("opportunity-list").addEventListener("change", function(event) {

    // Check if the changed element is a status dropdown
    if (event.target.classList.contains("status-select")) {

        // Get the opportunity ID
        const opportunityId = Number(event.target.dataset.id);

        // Get the new status
        const newStatus = event.target.value;

        // Find the opportunity in the array
        const opportunity = opportunities.find(function(item) {
            return item.id === opportunityId;
        });

        // Update the opportunity status
        if (opportunity) {
            opportunity.status = newStatus;
        }

        //save the updated data
        saveOpportunities();

        // Refresh the opportunity cards
        displayOpportunities();

        //Refresh the progress summary
        updateSummary();
    }

});
/* Task 5: Delete an opportunity */

// Listen for clicks inside the opportunity list
document.getElementById("opportunity-list").addEventListener("click", function(event) {

    // Check if the clicked button is a Delete button
    if (event.target.classList.contains("delete-button")) {

        // Get the opportunity ID
        const opportunityId = Number(event.target.dataset.id);

        // Ask the user to confirm deletion
        const confirmation = confirm("Are you sure you want to delete this opportunity?");

        // Continue only if the user confirms
        if (confirmation) {

            // Remove the opportunity from the array
            opportunities = opportunities.filter(function(opportunity) {
                return opportunity.id !== opportunityId;
            });

            //save the updated data 
            saveOpportunities();

            //refresh the opportunity list 
            displayOpportunities();

            /* Initialize the application */

            // Load previously saved opportunities
            loadOpportunities();

            // Display opportunities and progress summary
            displayOpportunities();

            // Save initial sample data if no saved data exists
            if (localStorage.getItem("opportunities") === null) {
            saveOpportunities();
            }

            }

            }

});
/* Task 6: Calculate the progress summary */

function updateSummary() {

    // Calculate the total number of opportunities
    const total = opportunities.length;

    // Count opportunities being prepared
    const preparing = opportunities.filter(function(opportunity) {
        return opportunity.status === "Preparing";
    }).length;

    // Count submitted applications
    const submitted = opportunities.filter(function(opportunity) {
        return opportunity.status === "Submitted";
    }).length;

    // Update the total opportunities summary
    document.getElementById("total-opportunities").textContent = total;

    // Update the preparing opportunities summary
    document.getElementById("preparing-opportunities").textContent = preparing;

    // Update the submitted applications summary
    document.getElementById("submitted-opportunities").textContent = submitted;

}
/* Step 5: Save opportunities using localStorage */

// Save opportunity data
function saveOpportunities() {

    localStorage.setItem(
        "opportunities",
        JSON.stringify(opportunities)
    );

}
/* Load saved opportunities */

// Retrieve saved opportunity data
function loadOpportunities() {

    const savedData = localStorage.getItem("opportunities");

    // Check whether saved data exists
    if (savedData !== null) {

        opportunities = JSON.parse(savedData);

    }

}