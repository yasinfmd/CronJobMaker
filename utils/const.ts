export const secondsArray = () => {
    let secondsArray = []
    for (let i = 0; i < 60; i++) {
        secondsArray.push({
            label: i.toString(),
            value: i.toString()
        })
    }
    return secondsArray;
}
export const minutesArray = () => {
    let secondsArray = []
    for (let i = 0; i < 60; i++) {
        secondsArray.push({
            label: i.toString(),
            value: i.toString()
        })
    }
    return secondsArray;
}
export const hoursArray = () => {
    let hoursArray = []
    for (let i = 0; i < 24; i++) {
        hoursArray.push({
            label: (i < 10 ? "0" + i : i).toString(),
            value: i.toString(),
        })
    }
    return hoursArray
}
export const numberGenerator = (startNumber, endNumber) => {
    let numbers = []
    for (let i = startNumber; i <= endNumber; i++) {
        numbers.push({
            label: i.toString(),
            value: i.toString()
        })
    }
    return numbers;
}
export const monthNumberArray = () => {
    let monthsArray = []
    for (let i = 1; i < 13; i++) {
        monthsArray.push({
            label: i.toString(),
            value: i.toString()
        })
    }
    return monthsArray
}
export const monthNamesArray = () => {
    let monthsNameArray = [
        {
            label: getLangText('ocak'),
            value: "1",
            nameValue: "JAN"
        },
        {
            label: getLangText('subat'),
            value: "2",
            nameValue: "FEB"

        },
        {
            label: getLangText('mart'),
            value: "3",
            nameValue: "MAR"

        },
        {
            label: getLangText('nisan'),
            value: "4",
            nameValue: "APR"

        },
        {
            label: getLangText('mayis'),
            value: "5",
            nameValue: "MAY"

        },
        {
            label: getLangText('haziran'),
            value: "6",
            nameValue: "JUN"

        },
        {
            label: getLangText('temmuz'),
            value: "7",
            nameValue: "JUL"

        },
        {
            label: getLangText('agustos'),
            value: "8",
            nameValue: "AUG"

        },
        {
            label: getLangText('eylul'),
            value: "9",
            nameValue: "SEP"

        },
        {
            label: getLangText('ekim'),
            value: "10",
            nameValue: "OCT"

        },
        {
            label: getLangText('kasim'),
            value: "11",
            nameValue: "NOV"

        },
        {
            label: getLangText('aralik'),
            value: "12",
            nameValue: "DEC"

        }
    ]
    return monthsNameArray
}
export const dayNumberArray = () => {
    let daysArray = []
    for (let i = 1; i < 8; i++) {
        daysArray.push({
            label: i.toString(),
            value: i.toString()
        })
    }
    return daysArray
}
export const dayOfMonthArray = () => {
    let dayArray = []
    for (let i = 1; i < 32; i++) {
        dayArray.push({
            label: i.toString(),
            value: i.toString()
        })
    }
    return dayArray
}
export  const dayOfMonthSuffixArray=()=>{
    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }
    let dayOfMonthSuffixArray = []
    for (let i = 1; i < 32; i++) {
        dayOfMonthSuffixArray.push({
            label: lang==="tr"?ordinal_suffix_tr(i):ordinal_suffix_of(i),
            value: i
        })
    }
    return dayOfMonthSuffixArray
}
export  const weekOfMonthSuffixArray=()=>{
    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }
    let _weekOfMonthSuffixArray = []
    for (let i = 1; i < 6; i++) {
        _weekOfMonthSuffixArray.push({
            label: lang==="tr"?ordinal_suffix_tr(i):ordinal_suffix_of(i),
            value: i
        })
    }
    return _weekOfMonthSuffixArray
}
export const dayNamesArray = () => {
    let dayNameArray = [
        {
            label: getLangText('pazar'),
            value: "1",
            nameValue: "SUN"
        },
        {
            label: getLangText('pazartesi'),
            value: "2",
            nameValue: "MON"
        },
        {
            label: getLangText('sali'),
            value: "3",
            nameValue: "TUE"
        },
        {
            label: getLangText('carsamba'),
            value: "4",
            nameValue: "WED"
        },
        {
            label: getLangText('persembe'),
            value: "5",
            nameValue: "THU"
        },
        {
            label: getLangText('cuma'),
            value: "6",
            nameValue: "FRI"
        },
        {
            label: getLangText('cumartesi'),
            value: "7",
            nameValue: "SAT"
        }
    ]
    return dayNameArray
}

export const yearArray = () => {
    let yearsArray = []
    for(let i=1;i<6;i++){
        yearsArray.push({
            label: (new Date().getFullYear()-i).toString(),
            value:(new Date().getFullYear()-i).toString(),
        })
    }
    for (let i = 1; i < 51; i++) {
        yearsArray.push({
            label: (new Date().getFullYear()+i).toString(),
            value:(new Date().getFullYear()+i).toString(),
        })
    }
    let sorted=yearsArray.sort((a,b) => (+a.value > +b.value) ? 1 : ((+b.value > +a.value) ? -1 : 0));
    return sorted
}
const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
const ordinal_suffix_tr = (i) => {
    if (i == 2) {
        var suffix = "nci";
    } else if (i == 3 || i == 4 || i == 13 || i == 14 || i == 23 || i == 24) {
        var suffix = "üncü";
    } else if (i == 6) {
        var suffix = "ncı";
    } else if (i == 9 || i == 10 || i == 19 || i == 29 || i == 39) {
        var suffix = "uncu";
    } else {
        var suffix = "inci";
    }
    return i + " " + suffix
}
const getLangText = (string) => {
    const language = {
        tr: {
            ocak: "Ocak",
            subat: 'Şubat',
            mart: "Mart",
            nisan: "Nisan",
            mayis: "Mayıs",
            haziran: "Haziran",
            temmuz: "Temmuz",
            agustos: "Agustos",
            eylul: "Eylül",
            ekim: "Ekim",
            kasim: "Kasım",
            aralik: "Aralık",
            pazartesi: "Pazartesi",
            sali: "Salı",
            carsamba: "Çarşamba",
            persembe: "Perşembe",
            cuma: "Cuma",
            cumartesi: "Cumartesi",
            pazar: "Pazar"
        },
        en: {
            ocak: "January",
            subat: 'February',
            mart: "March",
            nisan: "April",
            mayis: "May",
            haziran: "June",
            temmuz: "July",
            agustos: "August",
            eylul: "Semtember",
            ekim: "October",
            kasim: "November",
            aralik: "December",
            pazartesi: "Monday",
            sali: "Tuesday",
            carsamba: "Wednesday",
            persembe: "Thursday",
            cuma: "Friday",
            cumartesi: "Saturday",
            pazar: "Sunday"

        }
    };

    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }

    return language[lang][string];

}