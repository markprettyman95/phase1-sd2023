document.addEventListener('DOMContentLoaded', () => {
    const asanaCards = document.getElementById('asanaCards')
    const aboutBtn = document.getElementById('aboutBtn')
    const aboutInfo = document.getElementById('aboutInfo')

    aboutBtn.addEventListener('click', () => {
        aboutInfo.classList.toggle('hidden')
    })

    fetch(`http://localhost:3000/asanas`)
    .then(response => {
        if (!response.ok) {
            throw new Error ('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const asanas = data
        const randomIndex = Math.floor(Math.random() * asanas.length)
        const randomAsana = asanas[randomIndex]

        asanas.forEach(asana => {
            if (asana === randomAsana) {
                const card = document.createElement('div')
                card.classList.add('card')

                const h2 = document.createElement('h2')
                h2.textContent = asana.name
                card.appendChild(h2)

                const img = document.createElement('img')
                img.src = asana.image
                img.classList.add('asana-pic')
                card.appendChild(img)

                const info = document.createElement('p')
                info.classList.add('info')
                info.textContent = asana.info
                card.appendChild(info)


                const button = document.createElement('button')
                button.classList.add('learn-more-btn')
                button.id = asana.id
                button.textContent = "Let's Do It!"
                card.appendChild(button)

                button.addEventListener('click', () => {
                
                })
            

                asanaCards.appendChild(card)
            }        
        })
    })
})