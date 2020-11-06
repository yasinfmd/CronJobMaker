import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {Col, Forms, Layout, Row} from "private-ui";
import {minutesArray, numberGenerator} from "../utils/const";

interface PropTypes {
    minuteCron(minuteCronText: string): void

    minuteText?: { text: string, key: string }

}

const Minutes = (props: PropTypes) => {
    const [minute, setMinute] = useState("*")
    const [minuteText, setMinuteText] = useState("*")
    const [startMinute, setStartMinute] = useState({label: '0', value: '0'})
    const [endMinute, setEndMinute] = useState({label: '0', value: '0'})
    const [startMinuteArray, setStartMinuteArray] = useState(minutesArray())
    const [endMinuteArray, setEndMinuteArray] = useState(minutesArray())
    const [chooseMinutes, setChooseMinutes] = useState([{label: "0", value: "0"}])

    useEffect(() => {
        if (minute !== "") {
            if (props.minuteText && props.minuteText.text === "") {
                renderMinutesForm();
                setMinutesRule();
                resetMinutes()
            } else {
                setMinutesRule()
            }
        }
    }, [minute])

    useEffect(() => {
        props.minuteCron(minuteText)
    }, [minuteText])
    useLayoutEffect(() => {
        if (props.minuteText.text !== "") {
            setPropsText()
        }
    }, [props.minuteText])
    const setPropsText = () => {
        setMinute(props.minuteText.key)
        let splited;
        let splitedArray = []
        switch (props.minuteText.key) {
            case "*":
                return
            case "-":
                splited = props.minuteText.text.split("-")
                setStartMinute({label: splited[0].toString(), value: splited[0].toString()})
                setEndMinute({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case "/":
                splited = props.minuteText.text.split("/")
                setStartMinute({label: splited[0].toString(), value: splited[0].toString()})
                setEndMinute({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case ",":
                splited = props.minuteText.text.split(",")
                splited.forEach((item) => {
                    splitedArray.push({
                        label: item.toString(),
                        value: item.toString()
                    })
                })
                setChooseMinutes(splitedArray)
                return;
        }
    }

    const resetMinutes = () => {
        setEndMinuteArray(minutesArray())
        setStartMinuteArray(minutesArray())
        setStartMinute({label: "0", value: "0"})
        setEndMinute({label: "0", value: "0"})
        setChooseMinutes([{label: "0", value: "0"}])
    }

    const setMinutesRule = () => {
        switch (minute) {
            case "*":
                setMinuteText("*")
                return

            case "/":
                setMinuteText(endMinute.value + "/" + startMinute.value)
                return;
            case ",":
                let minutes = ""
                chooseMinutes.forEach((item, i) => {
                    if (i !== chooseMinutes.length - 1) {
                        minutes += item.value + ","
                    } else {
                        minutes += item.value
                    }
                })
                setMinuteText(minutes)
                return;
            case "-":
                setMinuteText(startMinute.value + "-" + endMinute.value)
                return;
        }
    }
    const minutesChange = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startMinute") {
                setStartMinute(value)
                setMinuteText(endMinute.value + "/" + value.value)
            } else if (key === "endMinute") {
                setMinuteText(value.value + "/" + startMinute.value)
                setEndMinute(value)
            }
        }
    }
    const changeChooseMinutes = (value: Array<{ label: any, value: any }>) => {
        let text = "";
        if (value.length === 0) {
            setChooseMinutes([{label: "0", value: "0"}])
            text = "0"
        } else {
            value.forEach((item, i) => {
                if (i === value.length - 1) {
                    text += item.value
                } else {
                    text += item.value + ","
                }
            })
            setChooseMinutes(value)
        }
        setMinuteText(text)
    }
    const changeMinuteBetween = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startMinute") {
                setMinuteText(value.value + "-" + endMinute.value)
                if (+endMinute.label > +value.label) {
                    setStartMinuteArray(minutesArray())
                } else {
                    setMinuteText(value.value + "-" + value.value)
                    setEndMinute(value)
                }
                setStartMinute(value)
                setEndMinuteArray(numberGenerator(+value.label, 59))
            } else if (key === "endMinute") {
                setEndMinute(value)
                if (+startMinute.label > +value.label) {
                    setStartMinute(value)
                }
                setMinuteText(startMinute.value + "-" + value.value)
            }
        }
    }
    const renderMinutesForm = () => {
        switch (minute) {

            case "*":
                return null

            case "/":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endMinute} onChange={(value) => {
                                minutesChange('endMinute', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={endMinuteArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startMinute} onChange={(value) => {
                                minutesChange('startMinute', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={startMinuteArray}/>
                        </Col>


                    </>
                )

            case ",":
                return (
                    <>
                        <div className="checkListWrapper">

                            <Col xs={12} md={12} lg={12}>
                                <Forms.CheckList value={chooseMinutes} onChange={(value) => {
                                    changeChooseMinutes(value)
                                }} values={minutesArray()}/>
                            </Col>

                        </div>

                    </>

                )


            case "-":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startMinute} onChange={(val) => {
                                changeMinuteBetween("startMinute", val)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={startMinuteArray}/>
                        </Col>

                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endMinute} onChange={(val) => {
                                changeMinuteBetween('endMinute', val)
                            }} title={getLangText('bitis')} className="mb20"
                                               values={endMinuteArray}/>
                        </Col>

                    </>
                )


        }
    }
    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <Forms.RadioButton className="mb20" value={minute}
                                       onChange={setMinute}
                                       values={[
                                           {label: getLangText('herDakika'), value: "*"},
                                           {label: getLangText('dakikadanItibaren'), value: "/"},
                                           {label: getLangText('belirliDakika'), value: ','},
                                           {label: getLangText('seciliDakikadanItibaren'), value: '-'},
                                       ]}/>
                </Col>
            </Row>
            <Row>
                {renderMinutesForm()}
            </Row>
        </Layout>
    )
}
export default memo(Minutes)
const getLangText = (string) => {

    const language = {
        tr: {
            herDakika: "Her Dakika",
            dakikadanItibaren: "Seçilen Dakikadan Başlayarak Her Dakika",
            belirliDakika: "Belirli dakika (birini veya birkaçını seçin)",
            seciliDakikadanItibaren: "Seçilen Dakikalar Arasında Her Dakika",
            baslangic: "Başlangıç",
            bitis: "Bitiş"

        },
        en: {
            herDakika: "Every Minute",
            dakikadanItibaren: "Every Minute(s), Starting from the Selected Minute",
            belirliDakika: "Specific minute (choose one or many)",
            seciliDakikadanItibaren: "Every Minute Between Selected Minutes",
            baslangic: "Start",
            bitis: "End"


        }
    };

    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }
    return language[lang][string];
}