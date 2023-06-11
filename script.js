document.addEventListener('DOMContentLoaded', () => {
    const asanaCards = document.getElementsByID('asanaCards');

    fetch(`http://localhost:3000/asanas`)
    .then(resp => {
        if (!response.ok) {
            throw new Error ('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const asanas = data

        asanas.forEach(asana => {
            const card = document.createElement('div')
            card.classList.add('card')

            const h2 = document.createElement('h2')
            h2.textContent = asana.name
            card.appendChild(h2)

            const img = document.createElement('img')
            img.src = asana.image
            img.classList.add('toy-avatar')
            card.appendChild(p)

            const button = document.createElement('button')
            button.classList.add('learn-more-btn')
            button.textConte4nt = 'Learn More!'
            card.appendChild('button')

        })
        
    })
})
