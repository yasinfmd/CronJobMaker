import React,{memo} from "react";
interface PropTypes{
    title:string
    text:string

}
const CronResult=(props:PropTypes)=>{
    return(
        <div className="cronResult mt20">
            <div>
                <b className={'cronResultTitle'}>{props.title}  </b>
            </div>
            <div>
                <p className={'cronResultingString'}>
                    {props.text}
                </p>
            </div>
        </div>
    )
}
export  default  memo(CronResult)