import React, { useState, useEffect } from 'react';

function CurrencyConverter() {
    const [usd, setUsd] = useState('');
    const [krw, setKrw] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await fetch('http://54.186.196.69/api/v1/exrate');
                const data = await response.json();
                setExchangeRate(parseFloat(data.data.KRW));
            } catch (error) {
                console.error('환율 정보를 가져오는 데 실패했습니다:', error);
            }
        };

        fetchExchangeRate();
    }, []);

    const handleUsdChange = (e) => {
        const value = e.target.value;
        setUsd(value);
        if (exchangeRate) {
            setKrw((value * exchangeRate).toFixed(2));
        }
    };

    const handleKrwChange = (e) => {
        const value = e.target.value;
        setKrw(value);
        if (exchangeRate) {
            setUsd((value / exchangeRate).toFixed(2));
        }
    };

    return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>💱통화 변환</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <label>
                        미국 달러(USD):
                        <input
                            type="number"
                            value={usd}
                            onChange={handleUsdChange}
                            style={{ marginLeft: '10px', padding: '5px' }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        한국 원화(KRW):
                        <input
                            type="number"
                            value={krw}
                            onChange={handleKrwChange}
                            style={{ marginLeft: '10px', padding: '5px' }}
                        />
                    </label>
                </div>
            </div>
            {exchangeRate && <p>현재 환율: 1 USD = {exchangeRate.toFixed(2)} KRW</p>}
            {usd && krw && <p>{` 📌결과 => ${usd} USD = ${krw} KRW`}</p>}
        </div>
    );
}

export default CurrencyConverter;