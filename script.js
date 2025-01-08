function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(/(\w{3}) (\w{3}) (\d{2})/, '$1 $2 $3');
}

function generateThreeWeeks() {
    const dateList = document.getElementById('dateList');
    const today = new Date();
    
    // Find the Wednesday of the current week
    const currentDay = today.getDay();
    const daysUntilWednesday = (3 - currentDay + 7) % 7; // 3 is Wednesday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysUntilWednesday - 7); // Start from the Wednesday of the previous week

    for (let i = 0; i < 21; i++) {
        const nextDate = new Date(startDate);
        nextDate.setDate(startDate.getDate() + i);
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

generateThreeWeeks();
