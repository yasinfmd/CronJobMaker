import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {addNotify, HeaderTab, Layout} from "private-ui";
import './style.scss'
import Seconds from "./tabs/seconds";
import Minutes from "./tabs/minutes";
import Hours from "./tabs/hours";
import Months from "./tabs/months";
import Days from "./tabs/day";
import Years from "./tabs/years";
import cronstrue from "cronstrue/i18n"
import CronResult from "./cronresult";

interface PropTypes {
    getCron?(cronString: string): void

    getCronResult?(cronResult: string): void

    cronString?: string
}

const CronMakerUI = (props: PropTypes) => {

    const [activeTab, setActiveTab] = useState(1);
    const [validateCron, setValidateCron] = useState<null | boolean>(null)
    const [tabs] = useState([getLangText('saniye'), getLangText('dakika'), getLangText('saat'), getLangText('gun'), getLangText('ay'), getLangText('yil')])
    const [cronStringResult, setCronStringResult] = useState("")
    const [minuteText, setMinuteText] = useState("")
    const [secondText, setSecondText] = useState("")
    const [hourText, setHourText] = useState("")
    const [monthText, setMonthText] = useState("")

    const [dayText, setDayText] = useState("")
    const [dayType, setDayType] = useState("week")

    const [yearText, setYearText] = useState("")
    const [cron, setCron] = useState({
        second: {
            text: "",
            key: ""
        },
        minute: {
            text: "",
            key: ""
        },
        hour: {
            text: "",
            key: ""
        },
        monthday: {
            text: "",
            key: "",
        },
        month: {
            text: "",
            key: ""
        },
        weekday: {
            text: "",
            key: ""
        },
        year: {
            text: "",
            key: ""
        }
    })

    const secondCronChange = (secondCronText: string) => {
        setSecondText(secondCronText)
    }
    const minuteCronChange = (minuteCronText: string) => {
        setMinuteText(minuteCronText)
    }
    const hourCronChange = (hourCronText: string) => {
        setHourText(hourCronText)
    }
    const monthCronChange = (monthCronText: string) => {
        setMonthText(monthCronText)
    }
    const yearCronChange = (yearCronText: string) => {
        setYearText(yearCronText)
    }
    const dayCronChange = (dayCronText: string) => {
        setDayText(dayCronText)
    }
    const dayCronTypeChange = (type: string) => {
        setDayType(type)
    }
    const getLocale = () => {
        let lang = localStorage.getItem('lang')
        if (lang !== 'tr' && lang !== 'en') {
            lang = navigator.language.slice(0, 2);
            localStorage.setItem('lang', lang)
        }
        return lang
    }
    useLayoutEffect(() => {
        if (secondText !== ""
            && monthText !== ""
            && hourText !== ""
            && monthText !== ""
            && yearText !== ""
            && ((dayType === "week" && dayText !== "") || (dayType === "month" && dayText !== ""))
        ) {
            const string = secondText + " " + minuteText + " " + hourText + " " + (dayType === "week" ? '?' : dayText) + " " + monthText + " " + (dayType === "month" ? "?" : dayText) + " " + yearText
            const cronToString = cronstrue.toString(string, {
                locale: getLocale(),
                dayOfWeekStartIndexZero: false,
                verbose: true
            })
            setCronStringResult(cronToString)
            props.getCron(string)
            props.getCronResult(cronToString)
        }

    }, [secondText, minuteText, hourText, dayType, dayText, monthText, yearText])

    useEffect(() => {
        if (props.cronString && props.cronString !== "") {
            validateCronString()
        }
    }, [props.cronString])
    const validateCronString = () => {
        let splited = props.cronString.split(" ")
        if (splited.length === 7 || splited.length === 6) {
            for (let i = 0; i < splited.length; i++) {
                if (splited[i] === "") {
                    setValidateCron(false)
                    addNotify({type: 'error', text: getLangText('cronGecersiz')});
                }
            }
            setValidateCron(true)
        } else {
            addNotify({type: 'error', text: getLangText('cronGecersiz')});
        }
    }
    useEffect(() => {
        if (validateCron !== null && validateCron !== false) {
            setPropsCron()
            /* setSecondText(splited[0])
             setMinuteText(splited[1])
             setHourText(splited[2])
             setDayText(splited[3])
             setMonthText(splited[4])*/
        }
    }, [validateCron])

    const setPropsCron = () => {
        let splited = props.cronString.split(" ")
        setCron({
            ...cron,
            second: getRule(splited[0]),
            minute: getRule(splited[1]),
            hour: getRule(splited[2]),
            monthday: getMonthDayRule(splited[3]),
            month: getRule(splited[4]),
            weekday: getWeekDayRule(splited[5]),
            year: splited[6] !== undefined ? getRule(splited[6]) : {text: "*", key: "*"}

        })
    }
    const getMonthDayRule = (text: string) => {

        let rule1 = text.split("/");
        let rule2 = text.split(",")
        let rule3 = text.split("-")
        let rule4 = text.split("L-")
        let rule5 = text.split("W")
        if (text === "?") {
            return {text, key: "*"}
        } else if (rule1.length > 1) {
            return {
                text,
                key: "/_month"
            }

        } else if (rule2.length > 0 && +rule2[0] > -1) {
            return {
                text,
                key: ",_month"
            }
        } else if (rule3.length > 1) {
            return {
                text,
                key: "-_month"
            }
        } else if (text === "L") {
            return {
                text,
                key: "L_month"
            }
        } else if (text === "LW") {
            return {
                text,
                key: "LW_month"
            }
        } else if (rule4.length > 1) {
            return {
                text,
                key: "L-_month"
            }
        } else if (rule5.length > 1) {
            return {
                text,
                key: "W_month"
            }
        }
    }
    const getWeekDayRule = (text: string) => {
        let rule1 = text.split("/");
        let rule2 = text.split(",")
        let rule3 = text.split("#")
        let rule4 = text.split("L")
        let rule5 = text.split("-")

        if (text === "?") {
            return {text, key: "*"}
        } else if (rule1.length > 1) {
            return {
                text,
                key: "/_week"
            }
        } else if (rule2.length > 0 && (rule2[0] === "SUN" ||
            rule2[0] === "MON" ||
            rule2[0] === "TUE" ||
            rule2[0] === "WED" ||
            rule2[0] === "THU" ||
            rule2[0] === "FRI" ||
            rule2[0] === "SAT"

        )) {
            return {
                text,
                key: ",_week"
            }
        } else if (rule4.length > 1) {
            return {
                text,
                key: "L_week"
            }
        } else if (rule3.length > 1) {
            return {
                text,
                key: "#"
            }
        } else if (rule5.length > 1) {
            return {
                text,
                key: "-_week"
            }
        }
    }
    const getRule = (text: string) => {
        let rule1 = text.split("/");
        let rule2 = text.split(",")
        let rule3 = text.split("-")
        if (text === "*") {
            return {text, key: "*"}
        } else if (rule1.length > 1) {
            return {
                text,
                key: "/"
            }
        } else if (rule2.length > 0 &&
            (+rule2[0] > -1 || rule2[0] === "JAN"
                || rule2[0] === "FEB" || rule2[0] === "MAR"
                || rule2[0] === "APR" || rule2[0] === "MAY"
                || rule2[0] === "JUN" || rule2[0] === "JUL"
                || rule2[0] === "AUG" || rule2[0] === "SEP"
                || rule2[0] === "OCT" || rule2[0] === "NOV"
                || rule2[0] === "DEC"
            )
        ) {
            return {
                text,
                key: ","
            }
        } else if (rule3.length > 1) {
            return {
                text,
                key: "-"
            }
        }
    }

    return (
        <>
            <Layout title={getLangText('cronMaker')}>
                <HeaderTab activeTab={activeTab} changeTab={setActiveTab}
                           tabs={tabs}/>
                <div style={{display: (activeTab === 1 ? "" : 'none')}}>
                    <Seconds
                        secondText={cron.second}
                        secondCron={(secondCronText) => {
                            secondCronChange(secondCronText)
                        }}/>
                </div>
                <div style={{display: (activeTab === 2 ? "" : 'none')}}>

                    <Minutes
                        minuteText={cron.minute}
                        minuteCron={(minuteCronText => {
                            minuteCronChange(minuteCronText)
                        })}/>
                </div>
                <div style={{display: (activeTab === 3 ? "" : 'none')}}>
                    <Hours
                        hourText={cron.hour}
                        hourCron={(hourCronText => {
                            hourCronChange(hourCronText)
                        })}/>
                </div>
                <div style={{display: (activeTab === 4 ? "" : 'none')}}>
                    <Days
                        weekDayText={cron.weekday}
                        monthDayText={cron.monthday}
                        dayCronType={(type => {
                            dayCronTypeChange(type)
                        })}
                        dayCron={(dayCronText => {
                            dayCronChange(dayCronText)
                        })}/>
                </div>
                <div style={{display: (activeTab === 5 ? "" : 'none')}}>

                    <Months
                        monthText={cron.month}
                        monthCron={(monthCronText => {
                            monthCronChange(monthCronText)
                        })}/>
                </div>
                <div style={{display: (activeTab === 6 ? "" : 'none')}}>
                    <Years
                        yearText={cron.year}
                        yearCron={(yearCronText => yearCronChange(yearCronText))}/>
                </div>
                <CronResult title={getLangText('cronString')}
                            text={secondText + " " + minuteText + " " + hourText + " " + (dayType === "week" ? '?' : dayText) + " " + monthText + " " + (dayType === "month" ? "?" : dayText) + " " + yearText}
                />
                <CronResult title={getLangText('cronResult')}
                            text={cronStringResult}
                />
            </Layout>
        </>

    )
}


export default memo(CronMakerUI)
const getLangText = (string) => {

    const language = {
        tr: {
            saniye: "Saniye",
            dakika: 'Dakika',
            saat: "Saat",
            gun: "Gün",
            ay: "Ay",
            yil: "Yıl",
            cronString: "Cron İfadesi:",
            cronResult: "Cron Sonucu:",
            cronMaker: "Cron Oluşturucu",
            cronGecersiz: "Cron Geçersiz"
        },
        en: {
            saniye: "Second",
            dakika: 'Minute',
            saat: "Hour",
            gun: "Day",
            ay: "Month",
            yil: "Year",
            cronString: "Resulting Cron Expression:",
            cronResult: "Cron Result :",
            cronMaker: "Cron Maker",
            cronGecersiz: "Invalid Cron"

        }
    };

    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }

    return language[lang][string];

}