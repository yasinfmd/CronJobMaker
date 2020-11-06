import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {Col, Row, Forms, Layout} from "private-ui";
import {secondsArray, numberGenerator} from "../utils/const";

interface PropTypes {
    secondCron(secondCronText: string): void

    secondText?: { text: string, key: string }
}

const Seconds = (props: PropTypes) => {
    const [second, setSecond] = useState("*")
    const [secondText, setSecondText] = useState("*")
    const [startSecond, setStartSecond] = useState({label: '0', value: '0'})
    const [endSecond, setEndSecond] = useState({label: '0', value: '0'})
    const [startSecondArray, setStartSecondArray] = useState(secondsArray())
    const [endSecondArray, setEndSecondArray] = useState(secondsArray())
    const [chooseSeconds, setChooseSeconds] = useState([{label: "0", value: "0"}])
    useEffect(() => {
        if (second !== "") {
            if (props.secondText.text === "") {
                setSecondsRule();
                resetSeconds()
                renderSecondsForm();
            } else {
                setSecondsRule()
            }

        }
    }, [second])

    useEffect(() => {
        props.secondCron(secondText)

    }, [secondText])
    useLayoutEffect(() => {
        if (props.secondText && props.secondText.text !== "") {
            setPropsText()
        }
    }, [props.secondText])

    const setPropsText = () => {
        setSecond(props.secondText.key)
        let splited;
        let splitedArray = []
        switch (props.secondText.key) {
            case "*":
                return
            case "-":
                splited = props.secondText.text.split("-")
                setStartSecond({label: splited[0].toString(), value: splited[0].toString()})
                setEndSecond({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case "/":
                splited = props.secondText.text.split("/")
                setStartSecond({label: splited[0].toString(), value: splited[0].toString()})
                setEndSecond({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case ",":
                splited = props.secondText.text.split(",")
                splited.forEach((item) => {
                    splitedArray.push({
                        label: item.toString(),
                        value: item.toString()
                    })
                })
                setChooseSeconds(splitedArray)
                return;
        }
    }
    const resetSeconds = () => {
        setStartSecondArray(secondsArray())
        setEndSecondArray(secondsArray())
        setStartSecond({label: "0", value: "0"})
        setEndSecond({label: "0", value: "0"})
        setChooseSeconds([{label: "0", value: "0"}])
    }
    const changeSecondBetween = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startSecond") {
                setSecondText(value.value + "-" + endSecond.value)
                if (+endSecond.label > +value.label) {
                    setStartSecondArray(secondsArray())
                } else {
                    setSecondText(value.value + "-" + value.value)
                    setEndSecond({value: value.value.toString(), label: value.label.toString()})
                }
                setStartSecond({value: value.value.toString(), label: value.label.toString()})
                const numbers = numberGenerator(+value.label, 59);
                setEndSecondArray(numbers)
            } else if (key === "endSecond") {
                setEndSecond(value)

                if (+startSecond.label > +value.label) {
                    setStartSecond(value)
                }
                setSecondText(startSecond.value + "-" + value.value)
            }
        }

    }
    const secondsChange = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startSecond") {
                setStartSecond(value)
                setSecondText(endSecond.value + "/" + value.value)
            } else if (key === "endSecond") {
                setSecondText(value.value + "/" + startSecond.value)
                setEndSecond(value)
            }
        }
    }
    const changeChooseSeconds = (value: Array<{ label: any, value: any }>) => {
        let text = "";
        if (value.length === 0) {
            setChooseSeconds([{label: "0", value: "0"}])
            text = "0"
        } else {
            value.forEach((item, i) => {
                if (i === value.length - 1) {
                    text += item.value
                } else {
                    text += item.value + ","
                }
            })
            setChooseSeconds(value)
        }
        setSecondText(text)
    }
    const setSecondsRule = () => {
        switch (second) {
            case "*":
                setSecondText("*")
                return
            case "/":
                setSecondText(endSecond.value + "/" + startSecond.value)
                return;
            case ",":
                let seconds = ""
                chooseSeconds.forEach((item, i) => {
                    if (i !== chooseSeconds.length - 1) {
                        seconds += item.value + ","
                    } else {
                        seconds += item.value
                    }
                })
                setSecondText(seconds)
                return;


            case "-":
                setSecondText(startSecond.value + "-" + endSecond.value)
                return;
        }
    }
    const renderSecondsForm = () => {
        switch (second) {
            case "*":
                return null

            case "/":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endSecond}

                                               onChange={(value) => {
                                                   secondsChange('endSecond', value)
                                               }} title={getLangText('baslangic')} className="mb20"
                                               values={endSecondArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startSecond} onChange={(value) => {
                                secondsChange('startSecond', value)
                            }} title={getLangText('bitis')}
                                               className="mb20" values={startSecondArray}/>
                        </Col>


                    </>
                )

            case ",":
                return (
                    <>
                        <div className="checkListWrapper">
                            <Col xs={12} md={12} lg={12}>
                                <Forms.CheckList value={chooseSeconds} onChange={(value) => {
                                    changeChooseSeconds(value)
                                }} values={secondsArray()}/>
                            </Col>
                        </div>


                    </>

                )


            case "-":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput
                                value={startSecond} onChange={(val) => {
                                changeSecondBetween("startSecond", val)
                            }} title={getLangText('baslangic')}
                                className="mb20" values={startSecondArray}/>
                        </Col>

                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endSecond} onChange={(val) => {
                                changeSecondBetween('endSecond', val)
                            }} title={getLangText('bitis')} className="mb20"
                                               values={endSecondArray}/>
                        </Col>

                    </>
                )


        }
    }
    return (
        <>
            <Layout>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <Forms.RadioButton className="mb20" value={second}
                                           onChange={setSecond}
                                           values={[
                                               {label: getLangText('herSaniye'), value: "*"},
                                               {label: getLangText('saniyedenItibaren'), value: "/"},
                                               {label: getLangText('belirliSaniye'), value: ','},
                                               {label: getLangText('seciliSaniyedenItibaren'), value: '-'},
                                           ]}/>
                    </Col>
                </Row>
                <Row>
                    {renderSecondsForm()}
                </Row>
            </Layout>

        </>
    )
}

export default memo(Seconds)
const getLangText = (string) => {

    const language = {
        tr: {
            herSaniye: "Her Saniye",
            saniyedenItibaren: "Seçilen Saniyeden Başlayarak Her Saniye",
            belirliSaniye: "Belirli saniye (birini veya birkaçını seçin)",
            seciliSaniyedenItibaren: "Seçilen Saniyeler Arasında Her Saniye",
            baslangic: "Başlangıç",
            bitis: "Bitiş"

        },
        en: {
            herSaniye: "Every Second",
            saniyedenItibaren: "Every Second(s), Starting from the Selected Second",
            belirliSaniye: "Specific second (choose one or many)",
            seciliSaniyedenItibaren: "Every Second Between Selected Seconds",
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