import React, { useState } from 'react';

function DistanceConverter() {

    const [inches, setInches] = useState('');
    const [cm, setCm] = useState('');

    const convertInchesToCm = (inches) => (inches ? (inches * 2.54).toFixed(2) : '');
    const convertCmToInches = (cm) => (cm ? (cm / 2.54).toFixed(2) : '');

    const handleInchesChange = (e) => {
        const value = e.target.value;
        setInches(value);
        setCm(convertInchesToCm(value));
    };

    const handleCmChange = (e) => {
        const value = e.target.value;
        setCm(value);
        setInches(convertCmToInches(value));
    };

    return (
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>📏거리 변환</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <label>
                        인치 (inch):
                        <input
                            type="number"
                            value={inches}
                            onChange={handleInchesChange}
                            style={{ marginLeft: '10px', padding: '5px' }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        센티미터 (cm):
                        <input
                            type="number"
                            value={cm}
                            onChange={handleCmChange}
                            style={{ marginLeft: '10px', padding: '5px' }}
                        />
                    </label>
                </div>
            </div>
            <p>{(inches) && ` 📌결과 => ${inches} inches = ${convertInchesToCm(inches)} cm`}</p>
        </div>
    );
}

export default DistanceConverter;