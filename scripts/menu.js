document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const menu = document.getElementById("menu");
    const videoOverlay = document.querySelector(".video-overlay");
    const menuButtons = document.querySelectorAll(".menu-button");
    const asanaCards = document.getElementById("asanaCards");
    const creatorInfo = document.getElementById("creatorInfo");

    hamburgerBtn.addEventListener("click", () => {
        toggleMenu();
    });

    menuButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent.trim();
            if (buttonText === "Close") {
                closeMenu();
            } else if (buttonText === "Home") {
                window.location.href = "index.html";
            } else if (buttonText === "Asana Directory") {
                displayAsanas();
            } else if (buttonText === "About Us") {
                document.getElementById("asanaCards").innerHTML = "";
                document.getElementById("index").innerHTML = "";
                creatorInfo.classList.toggle("hidden");
                closeMenu();
            } else {
                const targetID = button.textContent
                    .toLowerCase()
                    .replace(" ", "-");
                const targetElement = document.getElementById(targetID);
                targetElement.scrollIntoView({ behavior: "smooth" });
                closeMenu();
            }
        });
    });

    const toggleMenu = () => {
        menu.classList.toggle("show");
        videoOverlay.classList.toggle("blur");
    };

    const closeMenu = () => {
        menu.classList.remove("show");
        videoOverlay.classList.remove("blur");
    };

    const displayAsanas = () => {
        const searchBar = document.getElementById("searchBar");
        menuButtons.forEach((button) => {
            button.style.display = "none";
        });

        fetch(`http://localhost:3000/asanas`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const asanas = data;
                asanaCards.innerHTML = "";

                const searchAsanas = (searchTerm) => {
                    return asanas.filter((asana) =>
                        asana.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    );
                };

                const renderFilteredAsanas = (filteredAsanas) => {
                    menu.innerHTML = "";
                    asanaCards.innerHTML = "";
                    renderAsanas(filteredAsanas);
                };

                searchBar.addEventListener("input", () => {
                    const searchTerm = searchBar.value.trim();
                    if (searchTerm === "") {
                        menuButtons.forEach((button, index) => {
                            button.style.display = "block";
                        });
                        renderAsanas(asanas);
                    } else {
                        const filteredAsanas = searchAsanas(searchTerm);
                        renderFilteredAsanas(filteredAsanas);
                    }
                });

                renderAsanas(asanas);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const addAsanaForm = document.getElementById("newAsanaForm");

    addAsanaForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const imageInput = document.getElementById("image");
        const infoInput = document.getElementById("info");
        const linkInput = document.getElementById("link");

        const newAsana = {
            name: nameInput.value,
            image: imageInput.value,
            info: infoInput.value,
            link: linkInput.value,
        };

        fetch(`http://localhost:3000/asanas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAsana),
        })
            .then((data) => {
                if (!response.ok) {
                    throw new Error("Failed to add new asana");
                }
                return response.json();
            })
            .then((data) => {
                displayAsanas(data.asanas);
                addAsanaForm.reset();
            })
            .catch((error) => {
                console.error("Error", error);
            });
    });

    const renderAsanas = (asanas) => {
        asanas.forEach((asana) => {
            const asanaButton = document.createElement("button");
            asanaButton.classList.add("menu-button");
            asanaButton.textContent = asana.name;

            asanaButton.addEventListener("click", () => {
                document.getElementById("index").innerHTML = "";

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

                document.getElementById("index").appendChild(card);

                closeMenu();
            });

            menu.appendChild(asanaButton);
        });
    };
});
