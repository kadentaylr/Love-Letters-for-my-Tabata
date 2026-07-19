// Envelope animation
function openLetter() {
    document.querySelector(".envelope").classList.add("open");

    setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("content").classList.remove("hidden");
    }, 900);
}

// Countdown
const target = new Date("2026-07-28T11:00:00");

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


// Load letters
fetch("letters.json")
.then(response => response.json())
.then(letters => {

    const newest = letters[0];

    document.getElementById("todayLetter").innerHTML = `

        <h3>${newest.title}</h3>

        <p><em>${newest.date}</em></p>

        ${
            newest.message
                .split("\n\n")
                .map(p => `<p>${p}</p>`)
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

            ${
                letter.message
                    .split("\n\n")
                    .map(p => `<p>${p}</p>`)
                    .join("")
            }

        </details>

        `;

    });

    document.getElementById("archiveList").innerHTML = archive;

});
