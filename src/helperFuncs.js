export const capitalLetter = (word) =>{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const getDayNameFromDate = (dateString) => {
    let date = new Date(dateString);

    let options = { weekday: 'long' };
    let dayName = date.toLocaleDateString('en-US', options);

    return dayName;
}


export const getMonthNameFromDate = (dateString) => {
    let date = new Date(dateString);

    let options = { month: 'long' };
    let monthName = date.toLocaleDateString('en-US', options);

    return monthName;
}

