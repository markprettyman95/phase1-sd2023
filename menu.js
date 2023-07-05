document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn')
    const menu = document.getElementById('menu')
    const videoOverlay = document.querySelector('.video-overlay')
    const menuButtons = document.querySelectorAll('.menu-button')

    hamburgerBtn.addEventListener('click', () => {
        toggleMenu()
    });

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim()
            if (buttonText === 'Close') {
                closeMenu()
            } else {
                const targetID = button.textContent.toLowerCase().replace(' ', '-')
                const targetElement = document.getElementById(targetID)
                targetElement.scrollIntoView({ behavior: 'smooth' })
                closeMenu()
            }
        })
    })

    const toggleMenu = () => {
        menu.classList.toggle('show')
        videoOverlay.classList.toggle('blur')
    };

    const closeMenu = () => {
        menu.classList.remove('show')
        videoOverlay.classList.remove('blur')
    }
})



  
  