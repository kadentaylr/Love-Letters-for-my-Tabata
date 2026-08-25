// Envelope animation
function openLetter() {
    document.querySelector(".envelope").classList.add("open");

    setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("content").classList.remove("hidden");
    }, 900);
}

// Countdown
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

// Load letters.
// JSON permits whitespace between tokens, so converting ALL real line breaks
// to spaces safely fixes multiline messages without touching the literal \\n// escape sequences used for paragraph breaks.
fetch("letters.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Could not load letters.json (${response.status})`);
        }
        return response.text();
    })
    .then(text => {
        // The letters file contains some accidental real line breaks inside
        // quoted messages. JSON cannot contain those raw line breaks, but it
        // is perfectly valid to replace them with spaces before parsing.
        const normalized = text.replace(/\r?\n/g, " ");
        return JSON.parse(normalized);
    })
    .then(letters => {
        if (!Array.isArray(letters) || letters.length === 0) {
            throw new Error("letters.json contains no letters.");
        }

        const newest = letters[0];

        document.getElementById("todayLetter").innerHTML = `
            <h3>${newest.title}</h3>
            <p><em>${newest.date}</em></p>
            ${newest.message
                .split("\\n\\n")
                .map(p => `<p>${p.replace(/\\n/g, "<br>")}</p>`)
                .join("")
            }
            <p class="signature">
                Love always,<br>
                Kaden ❤️
            </p>
        `;

        let archive = "";

        letters.slice(1).forEach(letter => {
            archive += `
                <details>
                    <summary>
                        <strong>${letter.date}</strong>
                        — ${letter.title}
                    </summary>
                    ${letter.message
                        .split("\\n\\n")
                        .map(p => `<p>${p.replace(/\\n/g, "<br>")}</p>`)
                        .join("")
                    }
                </details>
            `;
        });

        document.getElementById("archiveList").innerHTML = archive;
    })
    .catch(error => {
        console.error("Error loading letters:", error);

        document.getElementById("todayLetter").innerHTML = `
            <p>I'm sorry, my love — the letter couldn't be loaded. ❤️</p>
            <p><small>${error.message}</small></p>
        `;

        document.getElementById("archiveList").innerHTML = `
            <p>The letter archive couldn't be loaded.</p>
        `;
    });
