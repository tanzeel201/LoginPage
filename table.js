function toggleSelectAll(checkbox) {
    var checkboxes = document.querySelectorAll('#tableBody input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = !checkbox.checked;
    });
  }
// Function to search and highlight words and characters
function searchTable() {
var input, filter, table, tr, td, i, j, txtValue, found;
input = document.getElementById("searchInput");
filter = input.value.toUpperCase();
table = document.getElementById("dataTable");
tr = table.getElementsByTagName("tr");

for (i = 0; i < tr.length; i++) {
    found = false;
    for (j = 1; j < tr[i].cells.length - 1; j++) { // Exclude the last cell which contains icons
        td = tr[i].cells[j];
        if (td) {
            txtValue = td.textContent || td.innerText;
            var startIndex = txtValue.toUpperCase().indexOf(filter);
            if (startIndex > -1) {
                var highlightedText = txtValue.substring(0, startIndex) + 
                    '<span style="background-color: yellow;">' + 
                    txtValue.substring(startIndex, startIndex + filter.length) + 
                    '</span>' + 
                    txtValue.substring(startIndex + filter.length);
                td.innerHTML = highlightedText;
                found = true;
            } else {
                // Reset cell content if not found
                td.innerHTML = txtValue;
            }
        }
    }
    if (!found) {
        tr[i].style.display = "none";
    } else {
        tr[i].style.display = "";
    }
}
}



// Add event listener to search input
document.getElementById("searchInput").addEventListener("input", searchTable);


  // Function to open popup for editing
  function openEditPopup(button) {
var popup = document.getElementById("editPopup");
var form = document.getElementById("editForm");
var row = button.closest("tr");
var cells = row.getElementsByTagName("td");

// Clear previous form data
form.innerHTML = "";

// Populate form fields with current row data and column names
var headers = document.getElementById("dataTable").querySelector("thead").querySelectorAll("th");
for (var i = 1; i < cells.length - 1; i++) {
// Excluding the first and last cells (checkbox and action buttons)
var cellData = cells[i].innerText;
var columnName = headers[i].innerText;
var label = document.createElement("label");
label.innerText = columnName + ": ";
form.appendChild(label);
var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("value", cellData);
form.appendChild(input);
form.appendChild(document.createElement("br")); // Line break for spacing
}

// Create the "Save Changes" button
var saveButton = document.createElement("button");
saveButton.setAttribute("type", "button");
saveButton.innerText = "Save Changes";
saveButton.onclick = saveChanges;
form.appendChild(saveButton);

// Display the popup
popup.style.display = "block";
}

// Function to save changes
function saveChanges() {
  var popup = document.getElementById("editPopup");
  var form = document.getElementById("editForm");
  var inputs = form.getElementsByTagName("input");
  var currentRow = popup.parentNode.parentNode; // Get the parent row of the popup
  var cells = currentRow.getElementsByTagName("td");

  // Update the current row with new values
  for (var i = 0; i < inputs.length; i++) {
    cells[i + 1].textContent = inputs[i].value; // Start from index 1 to skip checkbox column
  }

  // Close the popup
  popup.style.display = "none";

  // Clear the form inputs
  form.reset();
}

// Function to close the popup
function closePopup() {
  var popup = document.getElementById("editPopup");
  popup.style.display = "none";
}
// Function to delete a row
function deleteRow(button) {
var row = button.closest("tr"); // Get the parent row of the button
row.remove(); // Remove the row from the table
}