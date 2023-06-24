class NotificationFooter extends HTMLElement {
    constructor() {
        super();
        this.heading = this.getAttribute('data-heading');
        this.clearText = this.getAttribute('data-clear-text');
    }

    // Life cycle method to be run when component is available on page
    connectedCallback() {
        this.render();
        this.bindEvents();
    }   

    /**
     * @method bindEvents
     * Bind events on all actionable HTML Object
     */
    bindEvents() {
        this.querySelector('.clear-btn').addEventListener('click', () => {
            clearNotifications();
        })
    }

    /**
     * @method render
     * Generated HTML of component and rendered on page
     */
    render() {
        this.innerHTML = `
            <h2>${this.heading}</h2>
            <button class="clear-btn">${this.clearText}</button>
        `
    }
}
customElements.define('notification-footer', NotificationFooter);