import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Block } from './Block';
import './index.scss';

//Статический объект валют
const staticRates = {AED:3.920365,AFN:79.521577,ALL:104.600359,AMD:429.801447,ANG:1.92353,AOA:887.500654,ARS:373.54515,AUD:1.674279,AWG:1.921235,AZN:1.818176,BAM:1.952969,BBD:2.154977,BDT:117.669449,BGN:1.953763,BHD:0.402377,BIF:3039.821255,BMD:1.067353,BND:1.449885,BOB:7.375448,BRL:5.266961,BSD:1.067253,BTC:0.000029381303,BTN:88.895819,BWP:14.500846,BYN:3.516271,BYR:20920.118189,BZD:2.151342,CAD:1.473758,CDF:2823.148586,CHF:0.964249,CLF:0.035249,CLP:972.625091,CNY:7.773576,COP:4324.113715,CRC:566.689254,CUC:1.067353,CUP:28.284854,CVE:110.310521,CZK:24.548068,DJF:189.69019,DKK:7.458151,DOP:60.700344,DZD:144.05742,EGP:32.986974,ERN:16.010295,ETB:59.341779,EUR:1,FJD:2.428068,FKP:0.867784,GBP:0.873106,GEL:2.876488,GGP:0.867784,GHS:12.74439,GIP:0.867784,GMD:71.806146,GNF:9232.603371,GTQ:8.351973,GYD:223.296812,HKD:8.335866,HNL:26.406536,HRK:7.651808,HTG:141.604757,HUF:380.052234,IDR:16754.239552,ILS:4.100856,IMP:0.867784,INR:88.92918,IQD:1397.698713,IRR:45109.004557,ISK:151.308228,JEP:0.867784,JMD:166.517089,JOD:0.757069,JPY:161.481431,KES:161.97098,KGS:95.336223,KHR:4402.83078,KMF:492.578581,KPW:960.62523,KRW:1406.402998,KWD:0.32962,KYD:0.889403,KZT:500.318896,LAK:22142.237617,LBP:16044.983444,LKR:349.543369,LRD:200.288903,LSL:20.509167,LTL:3.151616,LVL:0.645631,LYD:5.198272,MAD:10.916349,MDL:19.056736,MGA:4803.088308,MKD:61.430961,MMK:2241.230542,MNT:3682.42946,MOP:8.58416,MRO:381.044826,MUR:47.176595,MVR:16.351602,MWK:1194.367851,MXN:19.005042,MYR:5.008557,MZN:67.510022,NAD:19.917053,NGN:472.306072,NIO:39.193377,NOK:11.966174,NPR:142.229519,NZD:1.806698,OMR:0.410865,PAB:1.067343,PEN:4.045024,PGK:4.018605,PHP:59.795785,PKR:302.592617,PLN:4.442544,PYG:7934.573895,QAR:3.885965,RON:4.968959,RSD:117.024673,RUB:98.389284,RWF:1319.248269,SAR:4.003656,SBD:8.935735,SCR:14.083984,SDG:639.880833,SEK:11.64568,SGD:1.451733,SHP:1.298701,SLE:23.166746,SLL:21080.221208,SOS:609.458698,SRD:40.524119,STD:22092.051478,SYP:13877.427551,SZL:19.937621,THB:38.157975,TJS:11.713532,TMT:3.746409,TND:3.370668,TOP:2.553375,TRY:30.383697,TTD:7.249628,TWD:34.5294,TZS:2666.247131,UAH:38.474974,UGX:4014.181808,USD:1.067353,UYU:42.61783,UZS:13128.441839,VEF:3751370.134853,VES:37.572725,VND:25990.044792,VUV:129.953378,WST:2.936556,XAF:655.001498,XAG:0.047204,XAU:0.000545,XCD:2.884575,XDR:0.811816,XOF:653.74982,XPF:119.917145,YER:267.157504,ZAR:19.914938,ZMK:9607.450978,ZMW:24.281261,ZWL:343.68722,}

function App() {
    const [fromCurrency, setFromCurrency] = useState('RUB');
    const [toCurrency, setToCurrency] = useState('USD');
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(1);

    const ratesRef = useRef({})

    useEffect(() => {
        // To receive currencies from the server, divide and insert your Access_key with fixed.io
        // fetch('http://data.fixer.io/api/latest?access_key=')
        //     .then(res => res.json())
        //     .then(json => {
        //         console.log(json)
        //         ratesRef.current = json.rates;
        //         onChangeToPrice(1);
        //     })
        //     .catch((err) => {
        //         alert('Не удалось получить информацию')
        //     })
        ratesRef.current = staticRates //Claim if you get data from fixed.io
        onChangeToPrice(1);
    }, [])

    const onChangeFromPrice = useCallback((value) => {
        const result = value / ratesRef.current[fromCurrency] * ratesRef.current[toCurrency];
        if ((String(value).split('.').length > 1) && (String(value).split('.')[1].length > 3)) {
            setFromPrice(Number(value).toFixed(4))
        } else {
            setFromPrice(Number(value))
        }
        if ((String(result).split('.').length > 1) && (String(result).split('.')[1].length > 3)) {
            setToPrice(Number(result).toFixed(4))
        } else {
            setToPrice(Number(result))
        }
        setToPrice(result.toFixed(3))
    }, [fromCurrency, toCurrency])

    const onChangeToPrice = useCallback((value) => {
        const result = ratesRef.current[fromCurrency] / ratesRef.current[toCurrency] * value;
        if ((String(value).split('.').length > 1) && (String(value).split('.')[1].length > 3)) {
            setToPrice(Number(value).toFixed(4))
        } else {
            setToPrice(Number(value))
        }
        if ((String(result).split('.').length > 1) && (String(result).split('.')[1].length > 3)) {
            setFromPrice(Number(result).toFixed(4))
        } else {
            setFromPrice(Number(result))
        }
    }, [fromCurrency, toCurrency])


    useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])

    useEffect(() => {
        onChangeToPrice(toPrice)
    }, [toCurrency])

    return (
        <div className="App">
            <Block
                from={true}
                rates={staticRates}
                value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                rates={staticRates}
                value={toPrice}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToPrice}
            />
        </div>
    );
}

export default App;
