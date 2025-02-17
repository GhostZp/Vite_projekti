const getEntries = async () => {
  const url = 'http://localhost:3000/api/entries';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6Im5ld3VzZXJuYW1lMiIsInBhc3N3b3JkIjoiJDJhJDEwJGtscUN2Qno5cE9kZFFpbDYxTG9mT3V6U1I3RjhsdGpSek1yQUlGb0xnblIyOEJITzh3bzdPIiwiZW1haWwiOiJuZXdlbWFpbDJAZXhhbXBsZS5jb20iLCJjcmVhdGVkX2F0IjoiMjAyNS0wMi0xN1QxMToxMDo1NC4wMDBaIiwidXNlcl9sZXZlbCI6InJlZ3VsYXIiLCJpYXQiOjE3Mzk3OTA2NjUsImV4cCI6MTczOTg3NzA2NX0.PsmMxSfjvhbkCnTxyMWCxlzfFvDOuUOs9bFjYsrwJik'; // Replace with your actual token

  // Make the request with the Authorization header
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const entries = await response.json();

  if (entries.error) {
    console.log('Error fetching diary entries!');
    return;
  }

  // Display the diary entries in console
  console.log(entries);

  // Get the section that holds the cards
  const section = document.querySelector('.card-area2');
  section.style.display = 'w';  // Make sure the section is visible

  // Clear any existing cards before adding new ones
  section.innerHTML = ''; 

  // Loop through each entry and create a card
  entries.forEach(entry => {
    // Create a new card element
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");

    // Create the left side (image)
    const childLeftDiv = document.createElement("div");
    childLeftDiv.classList.add("child-left");

    const img = document.createElement("img");
    img.src = "/src/img/Diarypink.png"; // Example image
    img.classList.add("Book");
    img.alt = "Diary";

    childLeftDiv.appendChild(img);

    // Create the right side (content)
    const childRightDiv = document.createElement("div");
    childRightDiv.classList.add("child-right");
    
    // Populate with actual diary entry content
    childRightDiv.innerHTML = `
      <h3>Entry Date: ${new Date(entry.entry_date).toLocaleDateString()}</h3> 
      <p><strong>Mood:</strong> ${entry.mood || "No mood data"}</p> 
      <p><strong>Weight:</strong> ${entry.weight ? `${entry.weight} kg` : "No weight data"}</p> 
      <p><strong>Sleep Hours:</strong> ${entry.sleep_hours || "No sleep data"}</p> 
      <p><strong>Notes:</strong> ${entry.notes || "No notes"}</p>
    `;

    // Append left and right divs to the card
    parentDiv.appendChild(childLeftDiv);
    parentDiv.appendChild(childRightDiv);

    // Append the card to the section
    section.appendChild(parentDiv);
  });
};

export { getEntries };
