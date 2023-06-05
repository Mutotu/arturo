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

export const initalContact = (a,b) => {
    return `Conducted proper changeover with ${a+ " " + b}. I have all the required cards/licenses and gear and am appropriately dressed and mentally alert. The vehicle checklist is complete, the vehicle is serviceable, and all gear/equipment is ready for the shift. `
}

export const lastContact = (a,b) => {
    return ` Conducted proper changeover with ${a + " " + b}. The protector has all required cards/licenses, gear is appropriately dressed, and is mentally alert. The vehicle checklist is complete, the vehicle is serviceable, and all gear/equipment is ready for a shift.  `
}

export const getSubstring = (arr,arrLength) => {
    return parseInt(arr[arrLength -1].substring(0, 2));
}

export const arrMaker = (arrLength) => {
    return new Array(arrLength).join().split(',')
            .map((_, index) => (index === 0 ? 0 : index++)
            )
}