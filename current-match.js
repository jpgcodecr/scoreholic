class CurrentMatch extends HTMLElement {
    constructor() {
        super();
        this.heading = this.getAttribute('data-heading');
        this.inputLabel = this.getAttribute('data-input-label');
        this.triggerLabel = this.getAttribute('data-trigger-label');
        this.players = [{ id:"0", name: "JPG", points: 0 }, { id:"1", name: "Peter", points: 0 }, { id:"2", name: "Oscar", points: 0 }];
        this.matchRounds = [];
        this.currentRound = 0;
        this.preparedRound = 0;
    }

    
    connectedCallback() {
        
        // Update global state
        updatePlayersData(this.players);
        
        
        // Generate match rounds
        this.matchRounds = this.generateCombinations(this.players);
        
        // Render
        this.render();
        this.bindEvents();
    }

    /**
     * @method bindEvents
     * Bind events on all actionable HTML Object
     */
    bindEvents() {
        this.querySelector('.player-one-win__btn').addEventListener('click', (e) => {
            this.currentRound++;
            if (this.preparedRound <= 2) {
                this.preparedRound++;
            }
            if (this.preparedRound === 3) {
                this.preparedRound = 0;
            }

            this.players[e.target.getAttribute('data-player-id')].points = this.players[e.target.getAttribute('data-player-id')].points + 3;

            updatePlayersData(this.players);
            
            this.render();
            this.bindEvents();
        });

        this.querySelector('.player-two-win__btn').addEventListener('click', (e) => {

            // Adjust rounds
            this.currentRound++;
            if (this.preparedRound <= 2) {
                this.preparedRound++;
            }
            if (this.preparedRound === 3) {
                this.preparedRound = 0;
            }

            // Sum the points to the player
            this.players[e.target.getAttribute('data-player-id')].points = this.players[e.target.getAttribute('data-player-id')].points + 3;

            updatePlayersData(this.players);

            this.render();
            this.bindEvents();
        });
    }

    // Función para generar todas las combinaciones posibles de jugadores
    generateCombinations(players) {
        return this.players.flatMap((player, index) =>
            players.slice(index + 1).map(opponent => [player, opponent])
        );
    }

    getNextCombination(combinations) {
        if (combinations.length === 0) {
          return null; // Ya no hay más combinaciones
        }
        return [combinations[0], combinations.slice(1)];
    }

    generateMatchRounds(players, rounds) {
        const combinations = generateCombinations(players);
        const matchRounds = [];
      
        for (let i = 0; i < rounds; i++) {
          const roundMatches = [];
      
          for (let j = 0; j < players.length / 2; j++) {
            const [match, remainingCombinations] = getNextCombination(combinations);
            roundMatches.push(match);
            combinations = remainingCombinations;
          }
      
          matchRounds.push(roundMatches);
        }
      
        return matchRounds;
    }

    /**
     * @method render
     * Generated HTML of component and rendered on page
     */
    render() {
        this.innerHTML = `
            <div class="current-match">
                <div class="current-match__title">${this.heading} ${this.currentRound + 1 }</div>
                <div class="currentMatch__wrapper">
                    <div class="player player1">${this.matchRounds[this.preparedRound][0].name}</div>
                    <div class="player player2">${this.matchRounds[this.preparedRound][1].name}</div>
                </div>
                <div class="slidecontainer">
                    <button class="player-one-win__btn" data-player-id="${this.matchRounds[this.preparedRound][0].id}">✓</button>
                    <input type="range" min="1" max="100" value="50" class="slider" />
                    <button class="player-two-win__btn" data-player-id="${this.matchRounds[this.preparedRound][1].id}">✓</button>
                </div>
            </div>
        `
    }
}
customElements.define('current-match', CurrentMatch);