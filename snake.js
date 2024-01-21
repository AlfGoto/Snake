document.addEventListener('DOMContentLoaded', () => {
    var snakeGRID = document.getElementById('snakeGRID')
    var height = 20
    var totalNumber = height * height

    var direction = 'sud'
    var gameSpeed = 500



    for (let i = 0; i < totalNumber; i++) {
        let square = document.createElement('div')
        snakeGRID.appendChild(square)
        square.classList.add('square')
        square.id = i

        if (i == 189) {
            square.classList.add('tete')
        }
    }

    setInterval(() => {
        switch (direction) {
            case 'nord':
                changeTete(Number(document.getElementsByClassName('tete')[0].id) - 20)
                break;
            case 'sud':
                changeTete(Number(document.getElementsByClassName('tete')[0].id) + 20)
                break;
            case 'est':
                changeTete(Number(document.getElementsByClassName('tete')[0].id) - 1)
                break;
            case 'ouest':
                changeTete(Number(document.getElementsByClassName('tete')[0].id) + 1)
                break;
        }
    }, gameSpeed)

    function changeTete(arg) {
        if (arg > 399 || arg < 0) {
            console.log('game over')
            return
        }
        if (direction == 'est' && arg % 20 == 19) {
            console.log('game over')
            return
        }
        if (direction == 'ouest' && arg % 20 == 0) {
            console.log('game over')
            return
        }
        console.log(arg)
        document.getElementsByClassName('tete')[0].classList.remove('tete')
        document.getElementById(arg).classList.add('tete')
    }


    window.addEventListener('keypress', (e) => {
        if (e.key == 'z') { direction = 'nord' }
        if (e.key == 's') { direction = 'sud' }
        if (e.key == 'q') { direction = 'est' }
        if (e.key == 'd') { direction = 'ouest' }
    })
})