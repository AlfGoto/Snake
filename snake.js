document.addEventListener('DOMContentLoaded', () => {
    var snakeGRID = document.getElementById('snakeGRID')
    var height = 20
    var totalNumber = height * height

    var direction = 'sud'
    var gameSpeed = 500
    var ratioSpeedUpgrade = 0.50
    var corpNB = 1
    var lootID = 0

    var pause = false

    var snakeGODIV = document.getElementById('snakeGODIV')
    var snakeGOBUTTON = document.getElementById('snakeGOBUTTON')
    var snakeGOP = document.getElementById('snakeGOP')


    build()
    function build() {
        snakeGRID.innerHTML = ''
        for (let i = 0; i < totalNumber; i++) {
            let square = document.createElement('div')
            snakeGRID.appendChild(square)
            square.classList.add('square')
            square.id = i

            if (i == 189) { square.classList.add('tete') }
            if (i == 399) { spawnLOOT() }
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
        if (pause) { return }
        if (arg > 399 || arg < 0) {
            gameOver()
            return
        }
        if (direction == 'est' && arg % 20 == 19) {
            gameOver()
            return
        }
        if (direction == 'ouest' && arg % 20 == 0) {
            gameOver()
            return
        }

        if(document.getElementById(arg).classList.contains('corp')){gameOver(); return}



        document.getElementsByClassName('tete')[0].classList.add('corp')
        document.getElementsByClassName('tete')[0].classList.add(corpNB)

        document.getElementsByClassName('tete')[0].classList.remove('tete')
        document.getElementById(arg).classList.add('tete')
        
        let corpARR = document.getElementsByClassName('corp')
        for (let i = 0; i < corpARR.length; i++) {
            corpARR[i].classList.forEach(element => {
                if (element != 'square' && element != 'corp' && element != 0) {
                    corpARR[i].classList.add(element - 1)
                    corpARR[i].classList.remove(element)
                }
            });
        }

        if (lootID == arg) {
            document.getElementById(lootID).classList.remove('loot')
            spawnLOOT()
            gameSpeed = gameSpeed * ratioSpeedUpgrade
            corpNB++
        }
    }

    //pour fixer un bug relou
    setInterval(() => {
        let arr = document.getElementsByClassName('corp')
        for (let index = 0; index < arr.length; index++) {
            if (arr[index].classList.contains('0')) {
                arr[index].classList = 'square'
            }
        }
    }, 10)


    document.addEventListener('keypress', (e) => {
        if (e.key == 'z') { direction = 'nord' }
        if (e.key == 's') { direction = 'sud' }
        if (e.key == 'q') { direction = 'est' }
        if (e.key == 'd') { direction = 'ouest' }
    })
    window.onkeydown = (e) => { if (e.key == 'Escape') { pause = !pause } }



    function spawnLOOT() {
        var rand = Math.floor(Math.random() * ((totalNumber - 1) - 0 + 1) + 0)

        if (document.getElementById(rand).classList.contains('tete') || document.getElementById(rand).classList.contains('corp')) { spawnLOOT(); return }
        if (rand < 399) { if (document.getElementById(rand + 1).classList.contains('tete') || document.getElementById(rand + 1).classList.contains('corp')) { spawnLOOT(); return } }
        if (rand > 0) { if (document.getElementById(rand - 1).classList.contains('tete') || document.getElementById(rand - 1).classList.contains('corp')) { spawnLOOT(); return } }
        if (rand < 379) { if (document.getElementById(rand + 20).classList.contains('tete') || document.getElementById(rand + 20).classList.contains('corp')) { spawnLOOT(); return } }
        if (rand > 20) { if (document.getElementById(rand - 20).classList.contains('tete') || document.getElementById(rand - 20).classList.contains('corp')) { spawnLOOT(); return } }
        if (rand > 21) { if (document.getElementById(rand - 20 - 1).classList.contains('tete') || document.getElementById(rand - 20 - 1).classList.contains('corp')) { spawnLOOT(); return } }
        if (rand > 19) { if (document.getElementById(rand - 20 + 1).classList.contains('tete') || document.getElementById(rand - 20 + 1).classList.contains('corp')) { spawnLOOT(); return } }
        if (rand < 380) { if (document.getElementById(rand + 20 - 1).classList.contains('tete') || document.getElementById(rand + 20 - 1).classList.contains('corp')) { spawnLOOT(); return } }
        if (rand < 378) { if (document.getElementById(rand + 20 + 1).classList.contains('tete') || document.getElementById(rand + 20 + 1).classList.contains('corp')) { spawnLOOT(); return } }

        document.getElementById(rand).classList.add('loot')
        lootID = rand
    }

    function gameOver() {
        snakeGOP.innerHTML = 'Game Over ! (' + (corpNB - 1) + ' points)'
        snakeGODIV.style.visibility = 'visible'
        console.log('game over')
        pause = true
    }

    snakeGOBUTTON.addEventListener('click', () => {
        snakeGODIV.style.visibility = 'hidden'

        direction = 'sud'
        gameSpeed = 500
        ratioSpeedUpgrade = 0.50
        corpNB = 1
        lootID = 0

        pause = false

        build()
    })
})