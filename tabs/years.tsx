import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {Col, Forms, Layout, Row} from "private-ui";
import {numberGenerator, yearArray} from "../utils/const";

interface PropTypes {
    yearCron(yearCronText: string): void

    yearText?: { text: string, key: string }

}

const Years = (props: PropTypes) => {
    const [yearText, setYearText] = useState("*")
    const [year, setYear] = useState("*")
    const [startYear, setStartYear] = useState({label: '2015', value: '2015'})
    const [endYear, setEndYear] = useState({label: '2015', value: '2015'})
    const [startYearArray, setStartYearArray] = useState(numberGenerator(1, 83))
    const [startYearBetweenArray, setStartYearBetweenArray] = useState(yearArray())
    const [endYearArray, setEndYearArray] = useState(yearArray())
    const [chooseYears, setChooseYears] = useState([{label: "2015", value: "2015"}])
    useEffect(() => {
        if (year !== "") {
            if (props.yearText && props.yearText.text === "") {
                renderYearForm();
                setYearRule();
                resetYears()
            } else {
                setYearRule();
            }


        }
    }, [year])
    useEffect(() => {
        props.yearCron(yearText)
    }, [yearText])
    useLayoutEffect(() => {
        if (props.yearText.text !== "") {
            setPropsText()
        }
    }, [props.yearText])
    const setPropsText = () => {
        setYear(props.yearText.key)
        let splited;
        let splitedArray = []
        switch (props.yearText.key) {
            case "*":
                return
            case "-":
                splited = props.yearText.text.split("-")
                setStartYear({label: splited[0].toString(), value: splited[0].toString()})
                setEndYear({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case "/":
                splited = props.yearText.text.split("/")
                setStartYear({label: splited[0].toString(), value: splited[0].toString()})
                setEndYear({label: splited[1].toString(), value: splited[1].toString()})
                return;
            case ",":
                splited = props.yearText.text.split(",")
                splited.forEach((item) => {
                    splitedArray.push({
                        label: item.toString(),
                        value: item.toString()
                    })
                })
                setChooseYears(splitedArray)
                return;
        }
    }
    const resetYears = () => {
        setStartYear({label: '2015', value: '2015'})
        setEndYear({label: '2015', value: '2015'})
        setStartYearArray(numberGenerator(1, 83))
        setStartYearBetweenArray(yearArray())
        setEndYearArray(yearArray())
        setChooseYears([{label: "2015", value: "2015"}])
    }
    const setYearRule = () => {
        switch (year) {
            case "*":
                setYearText("*")
                return

            case "/":
                setYearText(startYear.value + "/" + endYear.value)
                return;
            case ",":
                let years = ""
                chooseYears.forEach((item, i) => {
                    if (i !== chooseYears.length - 1) {
                        years += item.value + ","
                    } else {
                        years += item.value
                    }
                })
                setYearText(years)
                return;
            case "-":
                setYearText(startYear.value + "-" + endYear.value)
                return;
        }
    }
    const changeChooseYears = (value: Array<{ label: any, value: any }>) => {
        let text = "";
        if (value.length === 0) {
            setChooseYears([{label: "2015", value: "2015"}])
            text = "2015"
        } else {
            value.forEach((item, i) => {
                if (i === value.length - 1) {
                    text += item.value
                } else {
                    text += item.value + ","
                }
            })
            setChooseYears(value)
        }
        setYearText(text)
    }
    const yearChange = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startYear") {
                setStartYear(value)
                setYearText(value.value + "/" + endYear.value)
            } else if (key === "endYear") {
                setYearText(startYear.value + "/" + value.value)
                setEndYear(value)
            }
        }
    }
    const changeYearBetween = (key: string, value: { label: any, value: any }) => {
        if (value.label !== "") {
            if (key === "startYear") {
                setYearText(value.value + "-" + endYear.value)
                if (+endYear.label > +value.label) {
                    setStartYearBetweenArray(yearArray())
                } else {
                    setYearText(value.value + "-" + value.value)
                    setEndYear(value)
                }
                setStartYear(value)
                let numbers = numberGenerator(+value.label, +value.label + 50)
                setEndYearArray(numbers)

            } else if (key === "endYear") {
                setEndYear(value)
                if (+startYear.label > +value.label) {
                    setStartYear(value)
                }
                setYearText(startYear.value + "-" + value.value)
            }
        }

    }
    const renderYearForm = () => {
        switch (year) {

            case "*":
                return null

            case "/":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startYear} onChange={(value) => {
                                yearChange('startYear', value)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={endYearArray}/>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endYear} onChange={(value) => {
                                yearChange('endYear', value)
                            }} title={getLangText('bitis')} className="mb20"
                                               values={startYearArray}/>
                        </Col>


                    </>
                )

            case ",":
                return (
                    <>
                        <div className="checkListWrapperYears">
                            <Col xs={12} md={12} lg={12}>
                                <Forms.CheckList value={chooseYears} onChange={(value) => {
                                    changeChooseYears(value)
                                }} values={yearArray()}/>
                            </Col>
                        </div>

                    </>

                )


            case "-":
                return (
                    <>
                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={startYear} onChange={(val) => {
                                changeYearBetween("startYear", val)
                            }} title={getLangText('baslangic')}
                                               className="mb20" values={startYearBetweenArray}/>
                        </Col>

                        <Col xs={12} md={6} lg={6}>
                            <Forms.SelectInput value={endYear} onChange={(val) => {
                                changeYearBetween('endYear', val)
                            }} title={getLangText('bitis')} className="mb20"
                                               values={endYearArray}/>
                        </Col>

                    </>
                )


        }
    }

    return (
        <Layout>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <Forms.RadioButton className="mb20" value={year}
                                       onChange={setYear}
                                       values={[
                                           {label: getLangText('herhangiYil'), value: "*"},
                                           {label: getLangText('yildanItibaren'), value: "/"},
                                           {label: getLangText('belirliYil'), value: ','},
                                           {label: getLangText('seciliYildanItibaren'), value: '-'},
                                       ]}/>


                </Col>
            </Row>
            <Row>
                {renderYearForm()}
            </Row>
        </Layout>
    )
}
export default memo(Years)
const getLangText = (string) => {

    const language = {
        tr: {
            herhangiYil: "Herhangi Bir Yıl ",
            yildanItibaren: "Seçilen Yıldan Başlayarak Her Yıl",
            belirliYil: "Belirli yıl (birini veya birkaçını seçin)",
            seciliYildanItibaren: "Seçilen Yıllar Arasında Her Yıl",
            baslangic: "Başlangıç",
            bitis: "Bitiş",

        },
        en: {
            herhangiYil: "Every Year",
            yildanItibaren: "Every Year(s), Starting from the Selected Year",
            belirliYil: "Specific year (choose one or many)",
            seciliYildanItibaren: "Every Year Between Selected Years",
            baslangic: "Start",
            bitis: "End",


        }
    };

    let lang = localStorage.getItem('lang');

    if (lang !== 'tr' && lang !== 'en') {
        lang = navigator.language.slice(0, 2);
        localStorage.setItem('lang', lang);
    }
    return language[lang][string];
}