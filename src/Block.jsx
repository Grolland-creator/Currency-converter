import React, { useState, useEffect } from 'react';


export const Block = ({ value, currency, onChangeValue, onChangeCurrency, rates, from }) => {
    const [openList, setOpenList] = useState(false);
    const [defaultCurrencies, setDefaultCurrencies] = useState(['RUB', 'USD', 'EUR', 'GBP']);
    const filteredRates = Object.keys(rates).filter(item => !((new Set(defaultCurrencies)).has(item)))

    useEffect(() => {
        const currencies = localStorage.getItem('defaultCurrencies')
        currencies ? setDefaultCurrencies(JSON.parse(currencies)) : setDefaultCurrencies(['RUB', 'USD', 'EUR', 'GBP'])
        const currency = localStorage.getItem(`activeCurrency${from ? 'From' : 'To'}`);
        currency && onChangeCurrency(currency)
    }, [])

    const onClickItem = (item) => {
        const currencies = [...defaultCurrencies]
        console.log(currencies)
        const index = currencies.findIndex(item => item === currency)
        currencies[index] = item
        console.log(currencies)
        setDefaultCurrencies(currencies)
        onChangeCurrency(item)
        localStorage.setItem('defaultCurrencies', JSON.stringify(currencies))
        localStorage.setItem(`activeCurrency${from ? 'From' : 'To'}`, item)
    }

    return (
        <div className="block">
            <ul className="currencies">
                {defaultCurrencies.map((cur) => (
                    <li
                        onClick={() => {localStorage.setItem(`activeCurrency${from ? 'From' : 'To'}`, cur);onChangeCurrency(cur)}}
                        className={currency === cur ? 'active' : ''}
                        key={cur}>
                        {cur}
                    </li>
                ))}
                <div className='arrow'>
                    <div onClick={() => setOpenList(prev => !prev)} className={`icon ${openList ? '_active' : ''}`}>
                        <svg height="50px" viewBox="0 0 50 50" width="50px">
                            <rect fill="none" height="50" width="50" />
                            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                        </svg>
                    </div>
                    <div className='list' style={{ display: `${openList ? 'flex' : 'none'}` }}>
                        {filteredRates.map((item) =>
                            <div key={Math.random()} onClick={() => onClickItem(item)} className='list-item'>{item}</div>
                        )}
                    </div>
                </div>
            </ul>
            <input
                onChange={(e) => onChangeValue(e.target.value)}
                value={value}
                type="number"
                placeholder={0}
            />
        </div>
    )
};
