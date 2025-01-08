const sentinelWednesday = new Date('2025-01-08').getTime();
const msPerDay = 86_400_000;
const daysPerWeek = 7;
const daysPerTwoWeeks = 2 * daysPerWeek;
const msPerTwoWeeks = msPerDay * daysPerTwoWeeks;
const today = msPerDay * Math.floor((new Date()).getTime() / msPerDay);

let offsetTwoWeeks = Math.floor((today - sentinelWednesday) / msPerTwoWeeks);


/**
 * @param {Date} date 
 * @returns {string}
 */
function formatDateForList(date) {
    const [dowcomma, dd, mmm] = date.toUTCString().split(' ').slice(0, 3);
    const dow = dowcomma.replace(',', '');
    if (dow === 'Sun' || dow == 'Sat') {
        return dow;
    } else {
        return `${dow} ${mmm} ${dd} -\u00A0`;
    }
}

/**
 * @param {Date} date 
 * @returns {string}
 */
function formatDateForHeader(date) {
    const [dd, mmm, yyyy] = date.toUTCString().split(' ').slice(1, 4);
    return `${yyyy} ${mmm} ${dd}`;
}

function displayTwoWeeks() {
    const firstDay = sentinelWednesday + offsetTwoWeeks * msPerTwoWeeks;
    const firstDayAsDate = new Date(firstDay);
    const lastDayAsDate = new Date(firstDay + (daysPerTwoWeeks - 1) * msPerDay);
    document.getElementById('firstDay').textContent = formatDateForHeader(firstDayAsDate);
    document.getElementById('lastDay').textContent = formatDateForHeader(lastDayAsDate);
    for (let i = 0; i < daysPerTwoWeeks; i++) {
        const nextDate = firstDay + i * msPerDay;
        const formattedDate = formatDateForList(new Date(nextDate));
        const itemId = `date-${i < daysPerWeek ? 'odd' : 'even'}-${1 + (i % daysPerWeek)}`;
        const listItem = document.getElementById(itemId);
        if (Math.abs(nextDate - today) < msPerDay / 2) {
            listItem.classList.add('today');
        } else {
            listItem.classList.remove('today');
        }
        listItem.textContent = formattedDate;
    }
}

document.getElementById('toPrevious').addEventListener('click', e => { offsetTwoWeeks--; displayTwoWeeks(); });
document.getElementById('toNext').addEventListener('click', e => { offsetTwoWeeks++; displayTwoWeeks(); });

displayTwoWeeks();
