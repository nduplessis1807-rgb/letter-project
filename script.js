// =========================================================
// FIND HTML ELEMENTS
// =========================================================

const envelope = document.getElementById("envelope");
const welcomeScreen = document.getElementById("welcomeScreen");
const letterScreen = document.getElementById("letterScreen");
const singleLetterScreen = document.getElementById("singleLetterScreen");

const letterList = document.getElementById("letterList");

const letterDate = document.getElementById("letterDate");
const letterTitle = document.getElementById("letterTitle");
const letterContent = document.getElementById("letterContent");

const backToLetters = document.getElementById("backToLetters");


// =========================================================
// LETTER DATA
// =========================================================

let letters = [];


// =========================================================
// LOAD LETTERS FROM JSON
// =========================================================

fetch("letters.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not find letters.json");
        }

        return response.json();
    })

    .then(data => {

        letters = data.letters;

        console.log("Letters loaded:", letters);

    })

    .catch(error => {

        console.error("Error loading letters:", error);

    });


// =========================================================
// CREATE LETTER COLLECTION
// =========================================================

function createLetterList() {

    // Remove anything currently in the list
    letterList.innerHTML = "";

    // Create a card for every letter
    letters.forEach(letter => {

        const card = document.createElement("button");

        card.classList.add("letter-card");

        card.innerHTML = `
            <span class="card-title">
                ${letter.title}
            </span>

            <span class="card-date">
                ${letter.date}
            </span>
        `;

        // Open this letter when clicked
        card.addEventListener("click", function () {

            displayLetter(letter);

        });

        letterList.appendChild(card);

    });
}


// =========================================================
// DISPLAY A LETTER
// =========================================================

function displayLetter(letter) {

    // Add title
    letterTitle.textContent = letter.title;

    // Add date
    letterDate.textContent = letter.date;

    // Clear previous letter
    letterContent.innerHTML = "";

    // Add each paragraph
    letter.content.forEach(paragraph => {

        const p = document.createElement("p");

        p.textContent = paragraph;

        letterContent.appendChild(p);

    });

    // Add signature
    const signature = document.createElement("p");

    signature.classList.add("signature");

    signature.textContent = letter.signature;

    letterContent.appendChild(signature);


    // Switch screens
    letterScreen.style.display = "none";

    singleLetterScreen.style.display = "flex";

}


// =========================================================
// OPEN ENVELOPE
// =========================================================

envelope.addEventListener("click", function () {

    // Prevent clicking the envelope multiple times
    if (envelope.classList.contains("opening")) {
        return;
    }

    envelope.classList.add("opening");
    envelope.classList.add("open");


    // Wait for envelope animation
    setTimeout(function () {

        // Create collection
        createLetterList();

        // Hide welcome screen
        welcomeScreen.style.display = "none";

        // Show collection
        letterScreen.style.display = "flex";

        // Remove opening state
        envelope.classList.remove("opening");

    }, 700);

});


// =========================================================
// BACK TO LETTER COLLECTION
// =========================================================

backToLetters.addEventListener("click", function () {

    // Hide individual letter
    singleLetterScreen.style.display = "none";

    // Show collection
    letterScreen.style.display = "flex";

});