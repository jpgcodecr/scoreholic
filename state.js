/**
 * Emit a notification event
 * @param {String} data 
 */
const updatePlayersData = (data) => {
    dispatchEvent(new CustomEvent('playersUpdated',  { detail: data }));
}

/**
 * Clear notifications
 */
const clearNotifications = () => {
    dispatchEvent(new Event('clearNotifications'));
}