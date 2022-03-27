let bgColor = [];
const banner = document.querySelector('h1');
const hidden = document.querySelector('h1 span');
const message = document.querySelector('#message');
let tiles = 6;
let goal;
const choices = document.querySelectorAll('#choices div');

const gameSetup = (x) => {
    for (let index = 0; index < x; index++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        bgColor[index] = `rgb(${r}, ${g}, ${b})`;
    }

    let random = () => Math.floor((Math.random() * x));
    goal = `${bgColor[random()]}`;
    hidden.textContent = goal.toUpperCase();
}

const setUpChoices = (x) => {
    for (let index = 0; index < x; index++) {
        choices[index].style.backgroundColor = `${bgColor[index]}`;
        choices[index].addEventListener('click', e => {
            if (choices[index].style.backgroundColor === goal) {
                for (let i = 0; i < x; i++) {
                    choices[i].style.backgroundColor = goal;
                    banner.style.backgroundColor = goal;
                    banner.style.transition = 'background-color 0.5s';
                    message.textContent = 'CORRECT!';
                    loadBtn.textContent = 'PLAY AGAIN?';
                }
            } else {
                choices[index].style.backgroundColor = 'var(--bg-color)';
                message.textContent = 'TRY AGAIN!';
            }
        });
    }
}
const loadGame = (x) => {
    gameSetup(x);
    setUpChoices(x);
}
loadGame(tiles);

const trimChoices = (x) => {
    if (x === 3) {
        for (let index = 3; index < 6; index++) {
            choices[index].style.display = 'none';
        }
    } else {
        for (let index = 0; index < 6; index++) {
            choices[index].style.display = 'block';
        }
    }
}

const loadBtn = document.querySelector('#tool-bar>button');
loadBtn.addEventListener('click', () => {
    if (loadBtn.textContent === 'PLAY AGAIN?') {
        loadBtn.textContent = 'NEW COLORS';
    }
    loadGame(tiles);
    banner.style.backgroundColor = 'var(--global-color)';
    message.textContent = 'TRY ONE!';
});
loadBtn.addEventListener('mouseover', () => {
    loadBtn.classList.add('selected');
});
loadBtn.addEventListener('mouseout', () => {
    loadBtn.classList.remove('selected');
});
loadBtn.onfullscreenchange = loadBtn.classList.remove('selected');

const modeSetters = document.querySelectorAll('#settings button');
modeSetters.forEach(element => {
    element.addEventListener('click', () => {
        element.textContent === 'HARD' ? tiles = 6 : tiles = 3;
        if (!(element.classList.contains('selected'))) {
            modeSetters.forEach(setter => {
                setter.classList.toggle('selected');
            });
            banner.style.backgroundColor = 'var(--global-color)';
            loadGame(tiles);
            trimChoices(tiles);
        }
        if (element.classList.contains('selection')) {
            element.classList.remove('selection');
        }
        if (loadBtn.textContent === 'PLAY AGAIN?') {
            loadBtn.textContent = 'NEW COLORS';
        }

    });
    element.addEventListener('mouseover', () => {
        if (!(element.classList.contains('selected'))) {
            element.classList.add('selection');
        }
    });
    element.addEventListener('mouseout', () => {
        if (element.classList.contains('selection')) {
            element.classList.remove('selection');
        }
    });
});