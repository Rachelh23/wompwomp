let playerInventory = [];
let enemyInventory = [];
let enemyRemaining;
let playerRemaining;
let gameOver;

const pokemon = [
    ["Charmander", "fire", "assets/charmander.png"],
    ["Squirtle", "water", "assets/squirtle.png"],
    ["Bulbasaur", "grass", "assets/bulbasaur.png"],

    ["Cyndaquil", "fire", "assets/cyndaquil.png"],
    ["Chikorita", "grass", "assets/chikorita.png"],
    ["Totodile", "water", "assets/totodile.png"],

    ["Treecko", "grass", "assets/treecko.png"],
    ["Mudkip", "water", "assets/mudkip.png"],
    ["Torchic", "fire", "assets/torchic.png"],

    ["Turtwig", "grass", "assets/turtwig.png"],
    ["Piplup", "water", "assets/piplup.png"],
    ["Chimchar", "fire", "assets/chimchar.png"],

    ["Snivy", "grass", "assets/snivy.png"],
    ["Oshawott", "water", "assets/oshawott.png"],
    ["Tepig", "fire", "assets/tepig.png"],

    ["Froakie", "water", "assets/froakie.png"],   
    ["Fennekin", "fire", "assets/fennekin.png"],
    ["Chespin", "grass", "assets/chespin.png"],

    ["Rowlet", "grass", "assets/rowlet.png"],
    ["Litten", "fire", "assets/litten.png"],
    ["Poplio", "water", "assets/popplio.png"]
];
const enemyIcons = [
    ["Some Random Cat",'assets/cat.png'],
    ["Silver Wolf", 'assets/bronnie.png'],
    ["Focalors", 'assets/focalors.png']
]
const iconDisplay = document.getElementById("icon");
// console.log(iconDisplay);

function randomize() {
    let randIndex;
    playerInventory = [];

    for(let i = 0; i < 6; i++) {
        randIndex = Math.floor(Math.random() * 21);
        playerInventory[i] = pokemon[randIndex];

        randIndex = Math.floor(Math.random() * 21);
        enemyInventory[i] = pokemon[randIndex];
    }
    // console.log(playerInventory);
    // console.log("you are here");
    // console.log(enemyInventory);

    for (let i = 1; i <= 6; i++) {
        const slot = document.getElementById("slot" + i);
        const img = slot.querySelector("img");

        img.src = playerInventory[i - 1][2];
        
        // for(let i = 1; i <= enemyIcons.length; i++){
        
        //  }
        //  const iconDisplay = document.getElementById('icon');
    }  
}
function initialize() {
    randomize();
    gameOver = false;

    let slots = Array.from(document.getElementsByClassName('partySlot'));

    slots.forEach((slot, index) => {
        slot.addEventListener('click', () => {
            let img = slot.querySelector('img');
            if (img.src !== "assets/pokeball.png") {
                select(index, playerInventory[index][2], playerInventory[index][1], playerInventory[index][0]);
            }
        });
    });
}
function select(index, selectedSrc, selectedType, selectedName) {
    // JUST SO I CAN KEEP UP W WHATS HAPPENING
    // console.log(index);
    // console.log(selectedName);
    // console.log(selectedType);
    // console.log(selectedSrc);

    // I HAVE NO IDEA WHAT I WAS TRYING TO DO HERE IT WAS WRITTEN WAYYYY TOO LONG AGO
    // slotString = slot.toString();
    // console.log(slotString);
    // selectedIndex = slotString.substring(8, 9);
    // console.log(slotString);

    document.getElementById("pokemon1").src = selectedSrc;

    randIndex = Math.floor(Math.random() * enemyInventory.length);
    enemySrc = enemyInventory[randIndex][2];
    // console.log(enemySrc);
    enemyType = enemyInventory[randIndex][1];
    // console.log(enemyType);
    enemyName = enemyInventory[randIndex][0];
    // console.log(enemyName);
    document.getElementById("pokemon2").src = enemySrc;

    check(index, selectedType, selectedName, enemyName, enemySrc, enemyType, randIndex)
}
function check(index, selectedType, selectedName, enemyName, enemySrc, enemyType, randIndex) {
    const result = document.getElementById("text");
    //console.log(index); //THIS IS THE PLAYER INV ARRAY INDEX
    if(selectedType == enemyType) {
        result.textContent = `${selectedType} does nothing to ${enemyType}! Pick another Pokemon. You have ${playerInventory.length} Pokemon remaining.`;
    }
    else if(selectedType == "fire") {
        if(enemyType == "grass") {
            invIndex = playerInventory.length;
            playerInventory[invIndex] = [enemyName, enemyType, enemySrc];
            enemyInventory.splice(randIndex, 1);
            updateParty(invIndex, "win");
            updateEnemyCount();
            result.textContent = `Fire beats grass! You added a ${enemyName} to your party! You have ${playerInventory.length} Pokemon remaining.`;
        }
        else {
            enemyInventory.push(playerInventory[index]);
            updateParty(index, "lose");
            updateEnemyCount();
            result.textContent = `Fire loses to water! You added a ${enemyName} to your party! You have ${playerInventory.length} Pokemon remaining.`;
        }
    }
    else if(selectedType == "water") {
        if(enemyType == "fire") {
            invIndex = playerInventory.length;
            playerInventory[invIndex] = [enemyName, enemyType, enemySrc];
            enemyInventory.splice(randIndex, 1);
            updateParty(invIndex, "win");
            updateEnemyCount();
            result.textContent = `Water beats fire! You added a ${enemyName} to your party! You have ${playerInventory.length} Pokemon remaining.`;
        }
        else {
            enemyInventory.push(playerInventory[index]);
            updateParty(index, "lose");
            updateEnemyCount();
            result.textContent = `Water loses to grass! You added a ${enemyName} to your party! You have ${playerInventory.length} Pokemon remaining.`;
        }
    }
    else if(selectedType == "grass") {
        if(enemyType == "water") {
            invIndex = playerInventory.length;
            playerInventory[invIndex] = [enemyName, enemyType, enemySrc];
            enemyInventory.splice(randIndex, 1);
            updateParty(invIndex, "win");
            updateEnemyCount();
            result.textContent = `Grass beats water! You added a ${enemyName} to your party! You have ${playerInventory.length} Pokemon remaining.`;
        }
        else {
            enemyInventory.push(playerInventory[index]);
            updateParty(index, "lose");
            updateEnemyCount();
            result.textContent = `Grass loses to fire! You added a ${enemyName} to your party! You have ${playerInventory.length} Pokemon remaining.`;
        }
    }

    if(playerInventory.length == 12 || enemyInventory.length == 12) {
        gameOver = true;
        endGame();
    }
    commentCheck();
}
function updateParty(invIndex, string) {
    if (string == "win") {
        const slot = document.getElementById("slot" + (invIndex + 1));
        const img = slot.querySelector("img");
        img.src = playerInventory[invIndex][2];

        // console.log("------------------");
        // for (let i = 0; i < enemyInventory.length; i ++) {
        //     console.log(enemyInventory[i][0]);
        // }
    } 
    else {
        playerInventory.splice(invIndex, 1);

        for (let i = 0; i < playerInventory.length; i++) {
            const slot = document.getElementById("slot" + (i + 1));
            const img = slot.querySelector("img");

            img.src = playerInventory[i][2];
        }

        const slot = document.getElementById("slot" + (playerInventory.length + 1));
        const img = slot.querySelector("img");
        img.src = "assets/pokeball.png";

        // console.log("------------------");
        
        // for (let i = 0; i < enemyInventory.length; i ++) {
        //     console.log(enemyInventory[i][0]);
        // }
    }
}
function endGame() {
    const gameOverMessage = document.getElementById("text");
    if(playerInventory.length == 12) {
        gameOverMessage.textContent = "You win! Refresh this page to play again."
    }
    else {
        gameOverMessage.textContent = "You lost! Refresh this page to play again."
    }
}
function updateEnemyCount() {
    const enemyRemaining = document.getElementById("remainingValue");
    enemyRemaining.textContent = enemyInventory.length;
}
function commentCheck() {
    const enemyText = document.getElementById("enemyComments");
    enemyText.textContent = (enemyInventory.length < 3) ? `"That's not fair! You're cheating somehow!!!!!!1!!!1"` 
                            :(enemyInventory.length > 9) ? `"You're losing!!!! Haha didn't you read the rules?"` 
                            : "";
}