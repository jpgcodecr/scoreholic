class Scores extends HTMLElement {
    constructor() {
        super();
        this.heading = this.getAttribute('data-heading');
        this.scores = [];
        this.playersMarkup = '';
    }

    // Life cycle method to be run when component is available on page
    connectedCallback() {
        this.bindEvents();
        this.connectToState();
        this.render();
    }

    /**
     * @method bindEvents
     * Bind events on all actionable HTML Object
     */
    bindEvents() {
        
    }

    connectToState() {
        addEventListener('playersUpdated', (e) => {
            this.scores = e.detail;
            this.preparePlayersNodes();
            console.log(this.scores);
        });
    }

    preparePlayersNodes() {

        // Generate the string using the template for each object in the sorted score array
        // Find the object with the highest points
        const maxPoints = Math.max(...this.scores.map(player => player.points));
        const highestScorePlayer = this.scores.find(player => player.points === maxPoints);
        const result = this.scores.map(player => {
            const { name, points } = player;
            const className = player === highestScorePlayer ? 'highlighted' : '';
            const emoticon = player === highestScorePlayer ? 'cool.png' : 'sad.jpg';
            return `<tr class="${className}">
                                  <td><img src="${emoticon}" width="25" /></td>
                                  <td>${name}</td>
                                  <td>${points}</td>
                              </tr>`;
        });
        
        // Join the result array elements into a single string
        const finalString = result.join('\n');

        this.playersMarkup = finalString;
        this.render();
    }


    /**
     * @method render
     * Generated HTML of component and rendered on page
     */
    render() {
        // <span>${this.heading}</span>
        this.innerHTML = `
            <div class="scores">
                <table>
                    <tbody>
                        <tr>
                            <th>Position</th>
                            <th>Player</th>
                            <th>Points</th>
                        </tr>
                        ${this.playersMarkup}
                    </tbody>
                </table>
            </div>
        `
    }
}

customElements.define('scores-viewer', Scores);