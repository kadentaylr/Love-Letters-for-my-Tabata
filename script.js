// ================================
// ENVELOPE ANIMATION
// ================================

function openLetter() {
    document.querySelector(".envelope").classList.add("open");

    setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("content").classList.remove("hidden");
    }, 900);
}


// ================================
// COUNTDOWN
// ================================

const target = new Date("2026-09-01T11:00:00");

function updateCountdown() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById("timer").innerHTML =
            "❤️ We're Together ❤️";
        return;
    }

    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById("timer").innerHTML =
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ================================
// LETTER LOADING
// ================================

// The timestamp prevents the browser/GitHub Pages from using an old
// cached copy of letters.json.
const lettersUrl = `letters.json?v=${Date.now()}`;

fetch(lettersUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(
                `Could not load letters.json (${response.status})`
            );
        }

        return response.json();
    })

    .then(letters => {

        if (!Array.isArray(letters) || letters.length === 0) {
            throw new Error("letters.json contains no letters.");
        }


        // ================================
        // FORMAT A LETTER
        // ================================

        function renderMessage(message) {

            // \n\n creates a new paragraph.
            // A single \n creates a line break.
            return message
                .split("\n\n")
                .map(paragraph => {

                    const formattedParagraph =
                        paragraph.replace(/\n/g, "<br>");

                    return `<p>${formattedParagraph}</p>`;

                })
                .join("");
        }


        // ================================
        // TODAY'S LETTER
        // ================================

        const newest = letters[0];

        document.getElementById("todayLetter").innerHTML = `
            <h3>${newest.title}</h3>

            <p>
                <em>${newest.date}</em>
            </p>

            ${renderMessage(newest.message)}

            <p class="signature">
                Love always,<br>
                Kaden ❤️
            </p>
        `;


        // ================================
        // LETTER ARCHIVE
        // ================================

        let archive = "";

        letters.slice(1).forEach(letter => {

            archive += `
                <details>

                    <summary>
                        <strong>${letter.date}</strong>
                        — ${letter.title}
                    </summary>

                    ${renderMessage(letter.message)}

                </details>
            `;

        });

        document.getElementById("archiveList").innerHTML = archive;

    })


    // ================================
    // ERROR HANDLING
    // ================================

    .catch(error => {

        console.error("Error loading letters:", error);

        document.getElementById("todayLetter").innerHTML = `
            <p>
                I'm sorry, my love — the letter couldn't be loaded. ❤️
            </p>

            <p>
                <small>${error.message}</small>
            </p>
        `;

        document.getElementById("archiveList").innerHTML = `
            <p>
                The letter archive couldn't be loaded.
            </p>
        `;
    });
