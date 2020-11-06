import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {Col, Forms, Layout, Row} from "private-ui";
import {monthNamesArray, monthNumberArray, numberGenerator} from "../utils/const";

interface PropTypes {
    monthCron(monthCronText: string): void

    monthText?: { text: string, key: string }

}

const Months = (props: PropTypes) => {
    const [month, setMonth] = useState("*")
    const [startMonth, setStartMonth] = useState({label: '1', value: '1'})
    const [endMonth, setEndMonth] = useState({label: getLangText('ocak'), value: '1'})
    const [chooseMonths, setChooseMonths] = useState([{label: getLangText('ocak'), value: "1", nameValue: "JAN"}])
    const [startMonthNameArray, setStartMonthNameArray] = useState(monthNamesArray())
    const [endMonthNameArray, setEndMonthNameArray] = useState(monthNamesArray())

    const [startMonthName, setStartMonthName] = useState({label: getLangText('ocak'), value: '1'})
    const [endMonthName, setEndMonthName] = useState({label: getLangText('ocak'), value: '1'})

    const [startMonthArray, setStartMonthArray] = useState(monthNumberArray())
    const [endMonthArray, setEndMonthArray] = useState(monthNamesArray())
    const [monthText, setMonthText] = useState("*")
    useEffect(() => {
        if (month !== "") {
            if (props.monthText && props.monthText.text === "") {
                renderMonthForms();
                setMonthRules();
                resetMonth()
            } else {
                setMonthRules();
            }

        }
    }, [month])
    useEffect(() => {
        props.monthCron(monthText)
    }, [monthText])
    useLayoutEffect(() => {
        if (props.monthText.text !== "") {
            setPropsText()
        }
    }, [props.monthText])

    const setPropsText = () => {
        setMonth(props.monthText.key)
        let splited;
        let splitedArray = []
        switch (props.monthText.key) {
            case "*":
                return
            case "-":
                splited = props.monthText.text.split("-")
                let findedStartMonth = monthNamesArray().filter((item) => +item.value === +splited[0])
                let findedEndMonth = monthNamesArray().filter((item) => +item.value === +splited[1])
                setStartMonthName({label: findedStartMonth[0].label, value: findedStartMonth[0].value})
                setEndMonthName({label: findedEndMonth[0].label, value: findedEndMonth[0].value})
                return;
            case "/":
                splited = props.monthText.text.split("/")
                let findedMonth = monthNamesArray().filter((item) => +item.value === +splited[0])
                setEndMonth({label: findedMonth[0].label, value: findedMonth[0].value})
                setStartMonth({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case ",":
                splited = props.monthText.text.split(",")
                splited.forEach((item) => {
                    let findedMonth = monthNamesArray().filter((month) => month.nameValue === item.toString())
                    splitedArray.push({
                        label: findedMonth[0].label,
                        value: findedMonth[0].value,
                        nameValue: item.toString()
                    })
                })
                setChooseMonths(splitedArray)
                return;
        }
    }
    const resetMonth = () => {
        setEndMonthName({label: getLangText('ocak'), value: '1'})
        setStartMonthName({label: getLangText('ocak'), value: '1'})
        setStartMonthNameArray(monthNamesArray())
        setEndMonthNameArray(monthNamesArray())
        setEndMonthArray(monthNamesArray())
        setStartMonthArray(monthNumberArray())
        setStartMonth({label: '1', value: '1'})
        setEndMonth({label: getLangText('ocak'), value: '1'})
        setChooseMonths([{label: getLangText('ocak'), value: "1", nameValue: "JAN"}])
    }
    const changeChooseMonths = (value: Array<{ label: any, value: any, nameValue: any }>) => {
        let text = "";
        if (value.length === 0) {
            setChooseMonths([{label: getLangText('ocak'), value: "1", nameValue: "JAN"}])
            text = "JAN"
        } else {
            value.forEach((item, i) => {
                if (i === value.length - 1) {
                    text += item.nameValue
                } else {
                    text += item.nameValue + ","
                }
            })
            setChooseMonths(value)
        }
        setMonthText(text)
    }

    const changeMonthBetween = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startMonthName") {
                setMonthText(value.value + "-" + endMonthName.value)
                if (+endMonthName.value > +value.value) {
                    setStartMonthNameArray(monthNamesArray())
                } else {
                    setEndMonthName(value)
                    setMonthText(value.value + "-" + value.value)
                }
                setStartMonthName(value)
                let monthNames = monthNamesArray();
                let slicedMonthNames = monthNames.slice((+value.value - 1))
                setEndMonthNameArray(slicedMonthNames)
            } else if (key === "endMonthName") {
                setEndMonthName(value)
                if (+startMonthName.value > +value.value) {
                    setStartMonthName(value)
                }
                setMonthText(startMonthName.value + "-" + value.value)
            }
        }
    }

    const setMonthRules = () => {
        switch (month) {
            case "*":
                setMonthText("*")
                return

            case "/":
                setMonthText(endMonth.value + "/" + startMonth.value)
                return;
            case ",":
                let months = ""
                chooseMonths.forEach((item, i) => {
                    if (i !== chooseMonths.length - 1) {
                        months += item.nameValue + ","
                    } else {
                        months += item.nameValue
                    }
                })
                setMonthText(months)
                return;
            case "-":
                setMonthText(startMonthName.value + "-" + endMonthName.value)
                return;
        }
    }
    const monthChange = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startMonth") {
                setStartMonth(value)
                setMonthText(endMonth.value + "/" + value.value)
            } else if (key === "endMonth") {
                setMonthText(value.value + "/" + startMonth.value)
                setEndMonth(value)
            }
        }
    }
    const renderMonthForms = () => {
        switch (month) {

            case "*":
                return null

            case "/":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endMonth} onChange={(value) => {
                                monthChange('endMonth', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={endMonthArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startMonth} onChange={(value) => {
                                monthChange('startMonth', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={startMonthArray}/>
                        </Col>

                    </>
                )

            case ",":
                return (
                    <>
                        <Col xs={12} md={12} lg={12}>
                            <Forms.CheckList value={chooseMonths} onChange={(value) => {
                                changeChooseMonths(value)
                            }} values={monthNamesArray()}/>
                        </Col>
                    </>

                )


            case "-":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startMonthName} onChange={(val) => {
                                changeMonthBetween("startMonthName", val)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={startMonthNameArray}/>
                        </Col>

                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endMonthName} onChange={(val) => {
                                changeMonthBetween('endMonthName', val)
                            }} title={getLangText('bitis')} className="mb20"
                                               values={endMonthNameArray}/>
                        </Col>

                    </>
                )


        }
    }
    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <Forms.RadioButton className="mb20" value={month}
                                       onChange={setMonth}
                                       values={[
                                           {label: getLangText('herAy'), value: "*"},
                                           {label: getLangText('aydanItibaren'), value: "/"},
                                           {label: getLangText('belirliAy'), value: ','},
                                           {label: getLangText('seciliAyItibaren'), value: '-'},
                                       ]}/>
                </Col>
            </Row>
            <Row>
                {renderMonthForms()}
            </Row>
        </Layout>
    )

}
export default memo(Months);
const getLangText = (string) => {

    const language = {
        tr: {
            herAy: "Her Ay",
            aydanItibaren: "Seçilen Aydan Başlayarak Her Ay",
            belirliAy: "Belirli ay (birini veya birkaçını seçin)",
            seciliAyItibaren: "Seçilen Aylar Arasında Her Ay",
            baslangic: "Başlangıç",
            bitis: "Bitiş",
            ocak: "Ocak"

        },
        en: {
            herAy: "Every Month",
            aydanItibaren: "Every Month(s), Starting from the Selected Month",
            belirliAy: "Specific month (choose one or many)",
            seciliAyItibaren: "Every Month Between Selected Months",
            baslangic: "Start",
            bitis: "End",
            ocak: "January"


        }
    };

    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }
    return language[lang][string];
}