function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(/(\w{3}) (\w{3}) (\d{2})/, '$1 $2 $3');
}

function generateNext21Days() {
    const dateList = document.getElementById('dateList');
    const today = new Date();

    for (let i = 0; i < 21; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const formattedDate = formatDate(nextDate);
        const listItem = document.createElement('li');
        listItem.textContent = formattedDate;
        dateList.appendChild(listItem);

        // Check if the day is Tuesday (2)
        if (nextDate.getDay() === 2) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = ''; // Empty item
            dateList.appendChild(emptyItem);
        }
    }
}

generateNext21Days();
