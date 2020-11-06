import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {Col, Forms, Layout, Row} from "private-ui";
import {hoursArray, numberGenerator} from "../utils/const";

interface PropTypes {
    hourCron(hourCronText: string): void

    hourText?: { text: string, key: string }
}

const Hours = (props: PropTypes) => {
    const [hour, setHour] = useState("*")
    const [hourText, setHourText] = useState("*")
    const [startHour, setStartHour] = useState({label: '00', value: '00'})
    const [endHour, setEndHour] = useState({label: '00', value: '00'})
    const [startHourArray, setStartHourArray] = useState(hoursArray())
    const [endHourArray, setEndHourArray] = useState(hoursArray())
    const [chooseHours, setChooseHours] = useState([{label: "00", value: "00"}])
    useEffect(() => {
        if (hour !== "") {
            if (props.hourText && props.hourText.text === "") {
                renderHourForms();
                setHoursRule();
                resetHours()
            } else {
                setHoursRule()
            }

        }
    }, [hour])
    useEffect(() => {

        props.hourCron(hourText)
    }, [hourText])
    useLayoutEffect(() => {
        if (props.hourText.text !== "") {
            setPropsText()
        }
    }, [props.hourText])

    const setPropsText = () => {
        setHour(props.hourText.key)
        let splited;
        let splitedArray = []
        switch (props.hourText.key) {
            case "*":
                return
            case "-":
                splited = props.hourText.text.split("-")
                setStartHour({label: splited[0].toString(), value: splited[0].toString()})
                setEndHour({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case "/":
                splited = props.hourText.text.split("/")
                setStartHour({label: splited[0].toString(), value: splited[0].toString()})
                setEndHour({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case ",":
                splited = props.hourText.text.split(",")
                splited.forEach((item) => {
                    splitedArray.push({
                        label: item.toString(),
                        value: item.toString()
                    })
                })
                setChooseHours(splitedArray)
                return;
        }
    }
    const setHoursRule = () => {
        switch (hour) {
            case "*":
                setHourText("*")
                return

            case "/":
                setHourText(endHour.value + "/" + startHour.value)
                return;
            case ",":
                let hours = ""
                chooseHours.forEach((item, i) => {
                    if (i !== chooseHours.length - 1) {
                        hours += item.value + ","
                    } else {
                        hours += item.value
                    }
                })
                setHourText(hours)
                return;


            case "-":
                setHourText(startHour.value + "-" + endHour.value)
                return;
        }
    }
    const hoursChange = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startHour") {
                setStartHour(value)
                setHourText(endHour.value + "/" + value.value)
            } else if (key === "endHour") {
                setHourText(value.value + "/" + startHour.value)
                setEndHour(value)
            }
        }
    }
    const resetHours = () => {
        setEndHourArray(hoursArray())
        setStartHourArray(hoursArray())
        setStartHour({label: "0", value: "0"})
        setEndHour({label: "0", value: "0"})
        setChooseHours([{label: "0", value: "0"}])
    }
    const changeChooseHours = (value: Array<{ label: any, value: any }>) => {
        let text = "";
        if (value.length === 0) {
            setChooseHours([{label: "0", value: "0"}])
            text = "0"
        } else {
            value.forEach((item, i) => {
                if (i === value.length - 1) {
                    text += item.value
                } else {
                    text += item.value + ","
                }
            })
            setChooseHours(value)
        }
        setHourText(text)
    }

    const changeHourBetween = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startMinute") {
                setHourText(value.value + "-" + endHour.value)
                if (+endHour.label > +value.label) {
                    setStartHourArray(hoursArray())
                } else {
                    setHourText(value.value + "-" + value.value)
                    setEndHour(value)
                }
                setStartHour(value)
                let numbers = numberGenerator(+value.label, 59)
                setEndHourArray(numbers)

            } else if (key === "endMinute") {
                setEndHour(value)
                if (+startHour.label > +value.label) {
                    setStartHour(value)
                }
                setHourText(startHour.value + "-" + value.value)
            }
        }

    }

    const renderHourForms = () => {
        switch (hour) {

            case "*":
                return null

            case "/":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endHour} onChange={(value) => {
                                hoursChange('endHour', value)
                            }} title={getLangText('baslangic')} className="mb20"
                                               values={endHourArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startHour} onChange={(value) => {
                                hoursChange('startHour', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={startHourArray}/>
                        </Col>


                    </>
                )

            case ",":
                return (
                    <>
                        <div className="checkListWrapper">

                            <Col xs={12} md={12} lg={12}>
                                <Forms.CheckList value={chooseHours} onChange={(value) => {
                                    changeChooseHours(value)
                                }} values={hoursArray()}/>
                            </Col>
                        </div>


                    </>

                )


            case "-":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startHour} onChange={(val) => {
                                changeHourBetween("startMinute", val)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={startHourArray}/>
                        </Col>

                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endHour} onChange={(val) => {
                                changeHourBetween('endMinute', val)
                            }} title={getLangText('bitis')} className="mb20"
                                               values={endHourArray}/>
                        </Col>

                    </>
                )


        }
    }

    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <Forms.RadioButton className="mb20" value={hour}
                                       onChange={setHour}
                                       values={[
                                           {label: getLangText('herSaat'), value: "*"},
                                           {label: getLangText('saattenItibaren'), value: "/"},
                                           {label: getLangText('belirliSaat'), value: ','},
                                           {label: getLangText('seciliSaatdenItibaren'), value: '-'},
                                       ]}/>
                </Col>
            </Row>
            <Row>
                {renderHourForms()}
            </Row>
        </Layout>
    )
}
export default memo(Hours)
const getLangText = (string) => {

    const language = {
        tr: {
            herSaat: "Her Saat",
            saattenItibaren: "Seçilen Saatten Başlayarak Her Saat",
            belirliSaat: "Belirli saat (birini veya birkaçını seçin)",
            seciliSaatdenItibaren: "Seçilen Saatler Arasında Her Saat",
            baslangic: "Başlangıç",
            bitis: "Bitiş"

        },
        en: {
            herSaat: "Every Hour",
            saattenItibaren: "Every Hour(s), Starting from the Selected Hour",
            belirliSaat: "Specific hour (choose one or many)",
            seciliSaatdenItibaren: "Every Hour Between Selected Hours",
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