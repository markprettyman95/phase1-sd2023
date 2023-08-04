document.addEventListener("DOMContentLoaded", () => {
    const asanaCards = document.getElementById("asanaCards");
    const aboutBtn = document.getElementById("aboutBtn");
    const aboutInfo = document.getElementById("aboutInfo");
    const mantrasContainer = document.getElementById("mantras");
    const mantras = [
        "Namaste",
        "Nothing sacrifices your breathing",
        "Love and honor your body",
        "Let go of what no longer serves you",
        "You are your own guru",
        "The key to happiness is gratitude",
        "Your soul seeks nourishment",
        "Yoga is not a work-out, it's a work-in",
        "Listen to what your body needs",
        "Be kind to yourself",
    ];

    let index = 0;

    function displayMantra() {
        mantrasContainer.textContent = mantras[index];
        index++;

        if (index === mantras.length) {
            index = 0;
        }

        setTimeout(displayMantra, 5000);
    }

    displayMantra();

    aboutBtn.addEventListener("click", () => {
        aboutInfo.classList.toggle("hidden");
    });

    fetch(`http://localhost:3000/asanas`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const asanas = data;
            const randomIndex = Math.floor(Math.random() * asanas.length);
            const randomAsana = asanas[randomIndex];

            asanas.forEach((asana) => {
                if (asana === randomAsana) {
                    const card = document.createElement("div");
                    card.classList.add("card");

                    const h2 = document.createElement("h2");
                    h2.textContent = asana.name;
                    card.appendChild(h2);

                    const img = document.createElement("img");
                    img.src = asana.image;
                    img.classList.add("asana-pic");
                    card.appendChild(img);

                    const info = document.createElement("p");
                    info.classList.add("info");
                    info.textContent = asana.info;
                    card.appendChild(info);

                    const button = document.createElement("button");
                    button.classList.add("learn-more-btn");
                    button.id = asana.id;
                    button.textContent = "Let's Do It!";
                    card.appendChild(button);

                    button.addEventListener("click", () => {
                        window.open(asana.link, "_blank");
                    });

                    asanaCards.appendChild(card);
                }
            });
        });
});
