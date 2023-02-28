import initialCards from './cards.js';


    const cardDeck = document.querySelector('.container');
    const winnerSide =document.querySelector('.winner-side');
    const userPoints = document.querySelector('.user-points');
    const latestWinners = document.querySelector('.latest-wins')
    let playerPoints = 100;
    let latestWins = [];
    let canDecide =false;
    userPoints.innerHTML=playerPoints;
// 1. Shuffle Cards
    let shuffledCards = initialCards;
    for (let i = shuffledCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
}
    
    shuffledCards.forEach((element, i) => {
        const image = document.createElement('img');
        image.setAttribute('src', 'images/cards.jpeg');
        image.setAttribute('class', 'all-cards');
        image.setAttribute('style', `top: ${i}%`)
        image.setAttribute('data-id', i);
        cardDeck.appendChild(image);
    });

        let pairArr = [];
        for (let i = 0; i < shuffledCards.length - 1; i += 2) {
            pairArr = [...pairArr, [shuffledCards[i], shuffledCards[i+1]]];
                console.log(pairArr);
            }

    


// 2. Show timer. Player should chooses card. If not chosen, player skips the turn

  
    const timeH = document.querySelector('h1');
    let timeSecond = 10;
    let gameCount = 0;
    let pairPosition = 0;
    let winner = '';
    let playerDecision = '';
    function displayTime(second){
        const min = Math.floor(second / 60);
        const sec =  Math.floor(second % 60);
        timeH.innerHTML= `${min<10 ? '0': ''}${min}:${sec<10?'0':''}${sec}`
    }
    function countDown() {
        displayTime(timeSecond);
    
        const intervalId = setInterval(() => {
            timeSecond--;
            if (timeSecond >= 0) {
            displayTime(timeSecond);
            }
            if (timeSecond === 0) { 
            clearInterval(intervalId);
            reveal();
            setTimeout(() => {
                timeSecond = 10;
                countDown(); 
                newGame();
            }, 5000);
            }
        }, 1000);
        }
    
    function dealPair() {
        document.querySelector(`[data-id="${pairPosition}"]`).classList.add('current-dragon');
        document.querySelector(`[data-id="${pairPosition+1}"]`).classList.add('current-tiger');
        canDecide=true;
    }

    function reveal() {
        canDecide=false;
        const pair = pairArr[gameCount];
        document.querySelector(`[data-id="${pairPosition}"]`).setAttribute('src', `${pair[0].image}`);
        document.querySelector(`[data-id="${pairPosition+1}"]`).setAttribute('src', `${pair[1].image}`);
        winnerSide.setAttribute('style', 'display:block')
        if (pair[0].value > pair[1].value) {
            winnerSide.innerHTML = 'Dragon Wins!'
            winner='dragon';
        }
        if (pair[0].value < pair[1].value) {
            winnerSide.innerHTML = 'Tiger Wins!'
            winner='tiger';
        }
        if(pair[0].value === pair[1].value){
            winnerSide.innerHTML = 'Tie!'
            winner = 'tie';
        } 
        latestWins= [...latestWins, winner]
       if(playerDecision!==''){
        if(winner===playerDecision) return playerPoints+=10;
        return playerPoints-=10;
       }
    }
    function newGame() {   
        buttonStyles('');  
        playerDecision='';  
        const newBall =document.createElement('span');
        newBall.setAttribute('class', `ball -${winner}`);
        latestWinners.appendChild(newBall);
        winnerSide.removeAttribute('style');
        document.querySelector(`[data-id="${pairPosition}"]`).setAttribute('class', 'all-cards used-card');
        document.querySelector(`[data-id="${pairPosition+1}"]`).setAttribute('class', 'all-cards used-card');
        document.querySelector(`[data-id="${pairPosition}"]`).setAttribute('src', 'images/cards.jpeg');
        document.querySelector(`[data-id="${pairPosition+1}"]`).setAttribute('src', 'images/cards.jpeg');
        userPoints.innerHTML=playerPoints;
        gameCount++;
        pairPosition+=2;
        dealPair();
    }

    dealPair();
    countDown(); 

    
//changing color of buttons(marking)
    const dragonButton = document.querySelector('.dragon');
    const tigerButton = document.querySelector('.tiger');
    const tieButton = document.querySelector('.tie');
    const tieB = document.querySelector('.tieB');


    function buttonStyles(decision){
        if (decision === 'dragon') {
            dragonButton.style.backgroundColor = 'rgb(14, 192, 237)';
        }
        if(decision === 'tiger') {
            tigerButton.style.backgroundColor = 'purple';
        }
        if(decision === 'tie') {
            tieB.style.border = '5px solid green';
        } 
        if(playerDecision !== 'tie') {
            tieB.style.border = '';
        }
        if(playerDecision!=='tiger') {
            tigerButton.style.backgroundColor = 'rgba(205,0,0,178)';
        }
        if(playerDecision!=='dragon'){
            dragonButton.style.backgroundColor = 'black';
        }
    }
    function handlePlayerDecision(decision){
        // if (playerDecision === decision) {
        //     playerDecision = '';
        // } else {
        //     playerDecision = decision;
        // }
        if (canDecide){
        playerDecision = playerDecision === decision ? '' : decision;
        buttonStyles(decision);
 
    }
    }
//dragonbutton

    dragonButton.addEventListener('click', () => {
        handlePlayerDecision('dragon');
    });
//tigerbutton

    tigerButton.addEventListener('click', () => {
        handlePlayerDecision('tiger');
    });
//tiebutton


    tieButton.addEventListener('click', () => {
        handlePlayerDecision('tie');
    });



// 2.1 move first two cards of allCards into cardValues for play
//intiial pairs
    
    
// 2.2 Player chooses the bettingTypes

// 3. Reveal cards. compare values
    
// 3.1 determine winner or tie
// 3.2 Show if player won
// 3.3 add +10 points on win. add -10 points on lose. on tie +80/-10
// 3.4 display winning bettingType in latestWins panel

// 4. hide cards and move selected cards to usedCards

// 5. repeat 2-4

// 6. if allCards are empty. reset the game
