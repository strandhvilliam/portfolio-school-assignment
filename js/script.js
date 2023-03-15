const grainOverlay = document.querySelector('.grain-overflow')
const codeContainer = document.querySelector('.hero__code')
const mobileMenu = document.querySelector('.nav__menu')
const startPortfolioItems = document.querySelectorAll('.projects__item')
const wrapper = document.querySelector('.wrapper')

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('style', 'opacity: 1');
            entry.target.classList.add('fade-in')
        }
    })
})

const fadeElements = document.querySelectorAll('.fade-in-element')
fadeElements.forEach((el) => {
    fadeObserver.observe(el)
})

const slideFromLeftObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('style', 'opacity: 1');
            entry.target.classList.add('slide-from-left')
        }
    })
})

const slideFromLeftElements = document.querySelectorAll('.slide-from-left-element')
slideFromLeftElements.forEach((el) => {
    slideFromLeftObserver.observe(el)
})

const slideFromRightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('style', 'opacity: 1');
            entry.target.classList.add('slide-from-right')
        }
    })
})

const slideFromRightElements = document.querySelectorAll('.slide-from-right-element')
slideFromRightElements.forEach((el) => {
    slideFromRightObserver.observe(el)
})


const reactCode = (`
    import React from 'react'
    
    const Developer = () => {
    
        const ctx = React.useContext(NetworkingContext)
    
        const skills = [
            'TypeScript','React', 'Node.js',
            'Java', 'Kotlin', 'Spring Boot'
        ]
        
        const contactHandler = () => ctx.addContact()
        const seePortfolioHandler = () => ctx.presentPortfolio()
        
        return (
            <>
                <Title text="Villiam Strandh">
                <p>Software Developer</p>
                <p>Skills: {skills}</p>
                <Button onClick={contactHandler}>Get in touch</Button>
                <Button onClick={seePortfolioHandler}>View Portfolio</Button>
            </>
        )
    }
    
    export default Developer`)

const javaCode = `
    public class Developer {
        private final String name = "Villiam Strandh"
        private final String[] skills = {
            "TypeScript", "React", "Node.js",
            "Java", "Kotlin", "Spring Boot"
        }
        
        public void getInTouch(String yourName, String yourEmail) {
            Networking networking = Networking.getInstance()
            networking.addContact(new Contact(yourName, yourEmail)
        }
        
        public void presentPortfolio() {
            System.out.println("Please click the link below")
        }
        
        public void learnMore() {
            System.out.println("Please navigate to the nav link")
        }
           
    }
`

const phraseContainer = document.querySelector('#animate-phrase')

const animatePhrase = (phrase) => {
    phrase.split('').forEach((char, i) => {
        const el = document.createElement('span')
        el.innerText = char
        el.setAttribute('data-index', i.toString())
        el.classList.add('.hover-char')

        phraseContainer.appendChild(el)
    })

    const hoverChars = [...document.getElementsByClassName('.hover-char')]

    const removeClasses = () => {
        hoverChars.forEach((char) => {
            char.classList.remove('char-hovered')
            char.classList.remove('char-adjacent')
        })
    }

    hoverChars.forEach((char) => {
        char.addEventListener('mouseover', (e) => {
            removeClasses()
            const currentElement = e.target
            const index = parseInt(currentElement.getAttribute('data-index'), 10)
            const prevIndex = index === 0 ? null : index - 1
            const nextIndex = index === phrase.length - 1 ? null : index + 1

            const prevEl = prevIndex !== null && document.querySelector(`[data-index="${prevIndex}"]`)
            const nextEl = prevIndex !== null && document.querySelector(`[data-index="${nextIndex}"]`)

            e.target.classList.add('char-hovered')
            if (prevEl) prevEl.classList.add('char-adjacent')
            if (nextEl) nextEl.classList.add('char-adjacent')
        })
    })

    document.querySelector('#animate-phrase').addEventListener('mouseleave', () => {
        removeClasses()
    });
}

const grainAnimation = () => {
    let x = 0
    let y = 200
    setInterval(() => {
        if (x === 0) x = 200
        else if (x === 200) x = 0

        grainOverlay.setAttribute(
            'style',
            'background-position: ' + x + 'px ' + y + 'px;')
    }, 400)

    setInterval(() => {
        if (y === 0) y = 200
        else if (y === 200) y = 0

        grainOverlay.setAttribute(
            'style',
            'background-position: ' + x + 'px ' + y + 'px;')
    }, 200)

}

const writeCode = async () => {
    const speed = 3

    const typeWriter = (txt, i = 0) => {
        return new Promise((resolve) => {
            if (i < txt.length) {
                const char = txt.charAt(i)
                if (char === '\n') {
                    codeContainer.innerHTML += '<br />'
                } else if (char === ' ') {
                    codeContainer.innerHTML += '&nbsp;'
                } else {
                    codeContainer.innerHTML += txt.charAt(i)
                }
                setTimeout(() => {
                    typeWriter(txt, ++i).then(() => {
                        resolve()
                    })
                }, speed)
            } else {
                setTimeout(() => {
                    resolve()
                }, 3000)
            }
        })

    }

    await typeWriter(reactCode)
}

const initMobileMenu = () => {
    setTimeout(() => {
        mobileMenu.setAttribute('style', 'display: block')
    }, 300)
}

const mouseCursor = () => {
    const cursor = document.getElementById('cursor')

    document.addEventListener('mousemove', (e) => {
        cursor.setAttribute('style', `top: ${e.pageY}px; left: ${e.pageX}px;`)
    })

    startPortfolioItems.forEach((item) => {
        item.addEventListener('mouseover', () => {
            cursor.classList.add('cursor')
        })
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor')
        })
    })

}

const openPortfolioDetails = (e) => {
    const link = e.target.parentElement
    const project = link.nextElementSibling

    project.classList.toggle('portfolio__case--open')

    setTimeout(() => {
        link.scrollIntoView({ behavior: 'smooth', block: 'start' })

    }, 100)
}


grainAnimation();
(document.URL.includes('portfolio') && animatePhrase("Portfolio"));
(document.URL.includes('contact') && animatePhrase("Contact"));
(document.URL.includes('index.html') && animatePhrase("Villiam Strandh"));
(document.URL.includes("index") && writeCode());

initMobileMenu()
mouseCursor()

const portfolioItems = document.querySelectorAll('.portfolio__item-link')
portfolioItems.forEach((item) => {
    item.addEventListener('click', openPortfolioDetails)
})


