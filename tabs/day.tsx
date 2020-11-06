import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {Col, Forms, Layout, Row} from "private-ui";
import {
    dayNamesArray,
    dayNumberArray,
    dayOfMonthArray,
    dayOfMonthSuffixArray, numberGenerator,
    weekOfMonthSuffixArray
} from "../utils/const";

interface PropTypes {
    dayCron(dayCronText: string): void

    dayCronType(type: string): void

    weekDayText?: { text: string, key: string }
    monthDayText?: { text: string, key: string }
}

const Days = (props: PropTypes) => {
    const [day, setDay] = useState("*")
    const [dayText, setDayText] = useState("*")
    const [dayType, setDayType] = useState("week")
    const [startDayWeekName, setStartDayWeekName] = useState({label: getLangText('pazar'), value: "1"})
    const [endDayWeek, setEndDayWeek] = useState({label: "1", value: "1"})
    const [startDayWeekNameArray, setStartDayWeekNameArray] = useState(dayNamesArray())
    const [endDayWeekArray, setEndWeekDayArray] = useState(dayNumberArray())
    const [startDayMonthName, setStartDayMonthName] = useState({label: getLangText('birinci'), value: "1"})
    const [startDayMonthNameArray, setStartDayMonthNameArray] = useState(dayOfMonthSuffixArray())
    const [endDayMonth, setEndDayMonth] = useState({label: "1", value: "1"})
    const [endDayMonthArray, setEndDayMonthArray] = useState(dayOfMonthArray())
    const [chooseWeekDay, setChooseWeekDay] = useState([{label: getLangText('pazar'), value: "1", nameValue: "SUN"}])
    const [chooseMonthDay, setChooseMonthDay] = useState([{label: "1", value: "1"}])
    const [selectedLastMonthDayWeek, setSelectedLastMonthDayWeek] = useState({label: getLangText('pazar'), value: "1"})
    const [selectedDayBeforeMonth, setSelectedDayBeforeMonth] = useState({label: "1", value: "1"})
    const [selectedDayMonth, setSelectedDayMonth] = useState({label: getLangText('birinci'), value: "1"})
    const [selectedWeek, setSelectedWeek] = useState({label: getLangText('birinci'), value: "1"})
    const [selectedDay, setSelectedDay] = useState({label: getLangText('pazar'), value: "1"})
    const [selectedWeekArray, setSelectedWeekArray] = useState(weekOfMonthSuffixArray())


    const [startDayM, setStartDayM] = useState({label: "1", value: "1"})
    const [endDayM, setEndDayM] = useState({label: "1", value: "1"})
    const [startDayMArray, setStartDayMArray] = useState(dayOfMonthArray())
    const [endDayMArray, setEndDayMArray] = useState(dayOfMonthArray())
    const [startDayW, setStartDayW] = useState({label: getLangText('pazar'), value: "1"})
    const [endDayW, setEndDayW] = useState({label: getLangText('pazar'), value: "1"})
    const [startDayWArray, setStartDayWArray] = useState(dayNamesArray())
    const [endDayWArray, setEndDayWArray] = useState(dayNamesArray())

    useEffect(() => {
        if (day !== "") {
            if ((props.weekDayText.text === "?" || props.weekDayText.text === "?") && props.monthDayText && props.monthDayText.text === "?") {
                setDayRule();
                renderDayForms()
                resetDays();
            } else {
                setDayRule();
            }
            if ((props.monthDayText.text === "" || props.monthDayText.text === "?") && props.weekDayText && props.weekDayText.text === "?") {
                setDayRule();
                renderDayForms()
                resetDays();
            } else {

                setDayRule();

            }
        }
    }, [day])
    const resetDays = () => {
        setStartDayM({label: "1", value: "1"})
        setEndDayM({label: "1", value: "1"})
        setStartDayMArray(dayOfMonthArray())
        setEndDayMArray(dayOfMonthArray())
        setSelectedWeekArray(weekOfMonthSuffixArray())
        setSelectedDay({label: getLangText('pazar'), value: "1"})
        setSelectedWeek({label: getLangText('birinci'), value: "1"})
        setSelectedDayMonth({label: getLangText('birinci'), value: "1"})
        setSelectedDayBeforeMonth({label: "1", value: "1"})
        setSelectedLastMonthDayWeek({label: getLangText('pazar'), value: "1"})
        setChooseMonthDay([{label: "1", value: "1"}])
        setChooseWeekDay([{label: getLangText('pazar'), value: "1", nameValue: "SUN"}])
        setEndDayMonthArray(dayOfMonthArray())
        setEndDayMonth({label: "1", value: "1"})
        setStartDayWeekName({label: getLangText('pazar'), value: "1"})
        setEndDayWeek({label: "1", value: "1"})
        setStartDayWeekNameArray(dayNamesArray())
        setEndWeekDayArray(dayNumberArray())
        setStartDayMonthName({label: getLangText('birinci'), value: "1"})
        setStartDayMonthNameArray(dayOfMonthSuffixArray())

    }
    useEffect(() => {
        props.dayCron(dayText)
        props.dayCronType(dayType)
    }, [dayText])
    useLayoutEffect(() => {
        if (props.monthDayText.text !== "" && props.monthDayText.text !== "?") {
            setMonthPropsText()
        }
    }, [props.monthDayText])
    useLayoutEffect(() => {
        if (props.weekDayText.text !== "" && props.weekDayText.text !== "?") {
            setWeekPropsText()
        }
    }, [props.weekDayText])

    const setWeekPropsText = () => {
        setDay(props.weekDayText.key)
        setDayType("week")
        let splited;
        let splitedArray = []
        switch (props.weekDayText.key) {
            case "?":
                return;
            case "/_week":
                splited = props.weekDayText.text.split("/")
                let finded = dayNamesArray().filter((item) => +item.value === +splited[0])
                setStartDayWeekName({label: finded[0].label, value: finded[0].value})
                setEndDayWeek({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case ",_week":
                splited = props.weekDayText.text.split(",")
                splited.forEach((item) => {
                    let findedDay = dayNamesArray().filter((dayItem) => dayItem.nameValue === item)
                    splitedArray.push({
                        label: findedDay[0].label,
                        value: findedDay[0].value,
                        nameValue: findedDay[0].nameValue
                    })
                })
                setChooseWeekDay(splitedArray)
                return;

            case "-_week":
                splited = props.weekDayText.text.split("-")
                let findedStart = dayNamesArray().filter((item) => +item.value === +splited[0])
                let findedEnd = dayNamesArray().filter((item) => +item.value === +splited[1])
                setStartDayW({label: findedStart[0].label, value: findedStart[0].value})
                setEndDayW({label: findedEnd[0].label, value: findedEnd[0].value})
                return;
            case "L_week":
                splited = props.weekDayText.text.split("L")
                let findedWeekDay = dayNamesArray().filter((dayItem) => +dayItem.value === +splited[0])
                setSelectedLastMonthDayWeek({label: findedWeekDay[0].label, value: splited[0]})
                return;


            case "#":
                splited = props.weekDayText.text.split("#")
                let findedDayWeek = dayNamesArray().filter((dayItem) => +dayItem.value === +splited[0])
                let findedWeekSuffix = weekOfMonthSuffixArray().filter((suffixItem) => +suffixItem.value === +splited[1])
                setSelectedDay({label: findedDayWeek[0].label, value: findedDayWeek[0].value})
                setSelectedWeek({label: findedWeekSuffix[0].label, value: findedWeekSuffix[0].value})
                //setSelectedDay({label: "",value: ""})
                return;

        }
    }
    const setMonthPropsText = () => {
        setDay(props.monthDayText.key)
        setDayType("month")
        let splited;
        let splitedArray = []
        switch (props.monthDayText.key) {
            case "?":
                return
            case "/_month":
                splited = props.monthDayText.text.split("/")
                let finded = dayOfMonthSuffixArray().filter((item) => +item.value === +splited[0])
                setStartDayMonthName({label: finded[0].label, value: finded[0].value})
                setEndDayMonth({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case ",_month":
                splited = props.monthDayText.text.split(",")
                splited.forEach((item) => {
                    splitedArray.push({
                        label: item.toString(),
                        value: item.toString()
                    })
                })
                setChooseMonthDay(splitedArray)
                return;
            case "-_month":
                splited = props.monthDayText.text.split("-")
                setStartDayM({label: splited[0].toString(), value: splited[0].toString()})
                setEndDayM({label: splited[1].toString(), value: splited[1].toString()})
                return
            case "L_month":
                return;
            case "LW_month":
                return;
            case "L-_month":
                splited = props.monthDayText.text.split("L-")
                setSelectedDayBeforeMonth({label: splited[1].toString(), value: splited[1].toString()});
                return;
            case "W_month":
                splited = props.monthDayText.text.split("W")
                let findedDay = dayOfMonthSuffixArray().filter((item) => +item.value === +splited[0])
                setSelectedDayMonth({label: findedDay[0].label, value: findedDay[0].value})
                return;
        }
    }

    const weekDayChange = (key: string, value: { label: any, value: any }) => {
        setDayType("week")
        if (value.label !== "") {
            if (key === "startDayWeekName") {
                setStartDayWeekName(value)
                setDayText(value.value + "/" + endDayWeek.value)
            } else if (key === "endDayWeek") {
                setDayText(startDayWeekName.value + "/" + value.value)
                setEndDayWeek(value)
            }
        }

    }
    const monthDayChange = (key: string, value: { label: any, value: any }) => {
        setDayType("month")
        if (value.label !== "") {
            if (key === "startDayMonthName") {
                setStartDayMonthName(value)
                setDayText(value.value + "/" + endDayMonth.value)
            } else if (key === "endDayMonth") {
                setDayText(startDayMonthName.value + "/" + value.value)
                setEndDayMonth(value)
            }
        }

    }

    const setDayRule = () => {
        switch (day) {
            case "*":
                setDayType("week")
                setDayText("*")
                return

            case "/_week":
                setDayType("week")
                setDayText(startDayWeekName.value + "/" + endDayWeek.value)
                return;

            case "/_month":
                setDayType("month")
                setDayText(startDayMonthName.value + "/" + endDayMonth.value)
                return;


            case ",_week":
                setDayType("week")
                let dayWeek = ""
                chooseWeekDay.forEach((item, i) => {
                    if (i !== chooseWeekDay.length - 1) {
                        dayWeek += item.nameValue + ","
                    } else {
                        dayWeek += item.nameValue
                    }
                })
                setDayText(dayWeek);
                return;
            case ",_month":
                let dayMonth = ""
                chooseMonthDay.forEach((item, i) => {
                    if (i !== chooseMonthDay.length - 1) {
                        dayMonth += item.value + ","
                    } else {
                        dayMonth += item.value
                    }
                })

                setDayType("month")
                setDayText(dayMonth);
                return;

            case "L_month":
                setDayType("month");
                setDayText("L")
                return;

            case "LW_month":
                setDayType("month");
                setDayText("LW");
                return;

            case "L_week":
                setDayType('week')
                setDayText(selectedLastMonthDayWeek.value + "L");
                return;

            case "L-_month":
                setDayType('month')
                setDayText("L-" + selectedDayBeforeMonth.value);
                return;


            case "W_month":
                setDayType("month")
                setDayText(selectedDayMonth.value + "W")
                return;
            case "-_month":
                setDayType("month")
                setDayText(startDayM.value + "-" + endDayM.value)
                return;

            case "-_week":
                setDayType("week")
                setDayText(startDayW.value + "-" + endDayW.value)
                return;
            case "#":
                setDayType("week")
                setDayText(selectedDay.value + "#" + selectedWeek.value)
        }
    }
    const changeLastMonthDayWeek = (value: { label: any, value: any }) => {
        setDayType('week')
        if (value.label !== "") {
            setDayText(value.value + "L")
            setSelectedLastMonthDayWeek(value)
        }

    }
    const changeSelectedDayMonth = (value: { label: any, value: any }) => {
        setDayType('month')
        if (value.label !== "") {
            setDayText(value.value + "W")
            setSelectedDayMonth(value)
        }

    }
    const changeMonthDayBefore = (value: { label: any, value: any }) => {
        setDayType('month')
        if (value.label !== "") {
            setDayText("L-" + value.value)
            setSelectedDayBeforeMonth(value)
        }

    }
    const monthWeekDayChange = (key: string, value: { label: any, value: any }) => {
        setDayType("week")
        if (value.label !== "") {
            if (key === "selectedDay") {
                setDayText(value.value + "#" + selectedWeek.value)
                setSelectedDay(value)
            } else if (key === "selectedWeek") {
                setDayText(selectedDay.value + "#" + value.value)
                setSelectedWeek(value)
            }
        }

    }
    const changeChooseMonthDay = (value: Array<{ label: any, value: any }>) => {
        setDayType("month")
        let text = "";
        if (value.length === 0) {
            setChooseMonthDay([{label: "1", value: "1"}])
            text = "1"
        } else {
            value.forEach((item, i) => {
                if (i === value.length - 1) {
                    text += item.value
                } else {
                    text += item.value + ","
                }
            })
            setChooseMonthDay(value)
            setDayText(text)
        }
    }
    const changeChooseWeekDay = (value: Array<{ label: any, value: any, nameValue: any }>) => {
        setDayType("week")
        let text = "";
        if (value.length === 0) {
            setChooseWeekDay([{label: getLangText('pazar'), value: "1", nameValue: "SUN"}])
            //setChooseMonths([{label: getLangText('ocak'), value: "1", nameValue: "JAN"}])
            text = "SUN"
        } else {
            value.forEach((item, i) => {
                if (i === value.length - 1) {
                    text += item.nameValue
                } else {
                    text += item.nameValue + ","
                }
            })
            setChooseWeekDay(value)
            setDayText(text)
            //setChooseMonths(value)
        }
        //setMonthText(text)
    }

    const changeMonthDayBetween = (key: string, value: { label: any, value: any }) => {
        setDayType("month")
        if (value.label !== "") {
            if (key === "startDayM") {
                setDayText(value.value + "-" + endDayM.value)
                if (+endDayM.label > +value.label) {
                    setStartDayMArray(dayOfMonthArray())
                } else {
                    setDayText(value.value + "-" + value.value)
                    setEndDayM(value)
                }
                setStartDayM(value)
                setEndDayMArray(numberGenerator(+value.label, 31))
            } else if (key === "endDayM") {
                setEndDayM(value)
                if (+startDayM.label > +value.label) {
                    setStartDayM(value)
                }
                setDayText(startDayM.value + "-" + value.value)

            }
        }
    }
    const changeWeekDayBetween = (key: string, value: { label: any, value: any }) => {
        setDayType("week")
        if (value.label !== "") {

            if (key === "startDayW") {
                setDayText(value.value + "-" + endDayW.value)
                if (+endDayW.label > +value.label) {
                    setStartDayWArray(dayNamesArray())
                } else {
                    setDayText(value.value + "-" + value.value)
                    setEndDayW(value)
                }
                let filtered = dayNamesArray().slice(+value.value)
                setStartDayW(value)
                setEndDayWArray(filtered)
            } else if (key === "endDayW") {
                setEndDayW(value)
                if (+startDayW.label > +value.label) {
                    setStartDayW(value)
                }
                setDayText(startDayW.value + "-" + value.value)

            }
        }
    }
    const renderDayForms = () => {
        switch (day) {
            case "*":
                return null

            case "/_week":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startDayWeekName} onChange={(value) => {
                                weekDayChange('startDayWeekName', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={startDayWeekNameArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endDayWeek} onChange={(value) => {
                                weekDayChange('endDayWeek', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={endDayWeekArray}/>
                        </Col>


                    </>
                )
            case "/_month":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startDayMonthName} onChange={(value) => {
                                monthDayChange('startDayMonthName', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={startDayMonthNameArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endDayMonth} onChange={(value) => {
                                monthDayChange('endDayMonth', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={endDayMonthArray}/>
                        </Col>


                    </>
                )

            case ",_week":
                return (
                    <>
                        <div className="checkListWrapperDay">

                            <Col xs={12} md={12} lg={12}>
                                <Forms.CheckList value={chooseWeekDay} onChange={(value) => {
                                    changeChooseWeekDay(value)
                                }} values={dayNamesArray()}/>
                            </Col>
                        </div>


                    </>
                )
            case ",_month":
                return (
                    <>
                        <div className="checkListWrapper">
                            <Col xs={12} md={12} lg={12}>
                                <Forms.CheckList value={chooseMonthDay} onChange={(value) => {
                                    changeChooseMonthDay(value)
                                }} values={dayOfMonthArray()}/>
                            </Col>
                        </div>


                    </>
                )

            case "L_month":
                return null

            case "LW_month":
                return null
            case "L_week":
                return (
                    <>

                        <Col xs={12} md={12} lg={12}>
                            <Forms.SelectInput value={selectedLastMonthDayWeek} onChange={(value) => {
                                changeLastMonthDayWeek(value)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={dayNamesArray()}/>
                        </Col>
                    </>
                )
            case "L-_month":
                return (
                    <>

                        <Col xs={12} md={12} lg={12}>
                            <Forms.SelectInput value={selectedDayBeforeMonth} onChange={(value) => {
                                changeMonthDayBefore(value)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={dayOfMonthArray()}/>
                        </Col>
                    </>
                )
            case "W_month":
                return (
                    <>

                        <Col xs={12} md={12} lg={12}>
                            <Forms.SelectInput value={selectedDayMonth} onChange={(value) => {
                                changeSelectedDayMonth(value)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={dayOfMonthSuffixArray()}/>
                        </Col>
                    </>
                )


            case "-_month":
                return (
                    <>

                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startDayM} onChange={(value) => {
                                changeMonthDayBetween('startDayM', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={startDayMArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endDayM} onChange={(value) => {
                                changeMonthDayBetween('endDayM', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={endDayMArray}/>
                        </Col>
                    </>
                )
            case "-_week":

                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startDayW} onChange={(value) => {
                                changeWeekDayBetween('startDayW', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={startDayWArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endDayW} onChange={(value) => {
                                changeWeekDayBetween('endDayW', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={endDayWArray}/>
                        </Col>

                    </>
                )
            case "#":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={selectedWeek} onChange={(value) => {
                                monthWeekDayChange('selectedWeek', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={selectedWeekArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={selectedDay} onChange={(value) => {
                                monthWeekDayChange('selectedDay', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={dayNamesArray()}/>
                        </Col>

                    </>
                )


        }
    }
    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <Forms.RadioButton className="mb20" value={day}
                                       onChange={setDay}
                                       type={"column"}
                                       values={[
                                           {label: getLangText('herGun'), value: "*"},
                                           {label: getLangText('gundenItibarenHafta'), value: "/_week"},
                                           {label: getLangText('gundenItibarenAy'), value: '/_month'},
                                           {label: getLangText('belirliGunHaftalik'), value: ',_week'},
                                           {label: getLangText('belirliGunAylik'), value: ',_month'},
                                           {label: getLangText('ayinSonGunu'), value: 'L_month'},
                                           {label: getLangText('ayinSonHaftaIci'), value: 'LW_month'},
                                           {label: getLangText('ayinSeciliSonGunu'), value: 'L_week'},
                                           {label: getLangText('ayinSonundanOncekiSeciliGun'), value: 'L-_month'},
                                           {label: getLangText('seciliAyinGunundenItibaren'), value: '-_month'},
                                           {label: getLangText('seciliGununItibaren'), value: "-_week"},
                                           {
                                               label: getLangText('enYakinHaftaIcindenSecilenGuneKadar'),
                                               value: 'W_month'
                                           },
                                           {label: getLangText('secilenHaftaninSeciliGunu'), value: '#'},
                                       ]}/>
                </Col>
            </Row>
            <Row>
                {renderDayForms()}
            </Row>
        </Layout>
    )
}
export default memo(Days)
const getLangText = (string) => {

    const language = {
        tr: {
            herGun: "Her Gün",
            gundenItibarenHafta: "Seçilen Haftanın Gününden Başlayarak Her Gün (Hafta)",
            gundenItibarenAy: "Seçilen Ayın Gününden den Başlayarak Her Gün (Ay)",
            belirliGunHaftalik: "Haftanın belirli bir günü (birini veya birkaçını seçin)",
            belirliGunAylik: "Ayın belirli günü (birini veya birkaçını seçin)",
            ayinSonGunu: "Ayın Son Günü",
            ayinSonHaftaIci: "Ayın Son Hafta İçi Günü",
            ayinSeciliSonGunu: "Ayın Son Seçili Günü",
            ayinSonundanOncekiSeciliGun: "Ay Sonundan Seçili Gün Önce",
            enYakinHaftaIcindenSecilenGuneKadar: "En yakın hafta içi günden (Pazartesiden Cumaya) ayın seçili gününe kadar",
            secilenHaftaninSeciliGunu: "Seçilen Haftanın Seçili Günü",
            seciliAyinGunundenItibaren: "Ayın Seçilen Günleri  Arasında Her Gün",
            seciliGununItibaren: "Haftanın  Seçilen Günleri  Arasında Her Gün",
            baslangic: "Başlangıç",
            bitis: "Bitiş",
            pazar: "Pazar",
            birinci: "1 inci"

        },
        en: {
            herGun: "Every Day",
            gundenItibarenHafta: "Every Day (Week), Starting from the Day of the Selected Week",
            gundenItibarenAy: "Every Day (Month), Starting from the Day of the Selected Month",
            belirliGunHaftalik: "Specific day of week (choose one or many)",
            belirliGunAylik: "Specific day of month (choose one or many)",
            ayinSonGunu: "On The Last Day Of The Month",
            ayinSonHaftaIci: "On the last weekday of the month",
            ayinSeciliSonGunu: "Last Selected Day of the Month",
            ayinSonundanOncekiSeciliGun: "Selected Day Before Month End",
            enYakinHaftaIcindenSecilenGuneKadar: "From the nearest weekday (Monday to Friday) to the selected day of the month",
            seciliAyinGunundenItibaren: "Every Day Between Selected Days of the Month",
            seciliGununItibaren: "Every Day Among Selected Days of the Week",
            secilenHaftaninSeciliGunu: "Selected Day of the Selected Week",
            baslangic: "Start",
            bitis: "End",
            pazar: "Sunday",
            birinci: "1st"


        }
    };

    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }
    return language[lang][string];
}