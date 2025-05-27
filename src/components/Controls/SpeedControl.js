import React from 'react';

const SpeedControl = ({ speed, setSpeed }) => {
    const handleSpeedChange = (e) => {
        setSpeed(parseInt(e.target.value));
    };

    return (
        <div className="speed-control">
            <label htmlFor="speed">Animation Speed:</label>
            <input
                type="range"
                id="speed"
                min="50"
                max="1000"
                step="50"
                value={speed}
                onChange={handleSpeedChange}
            />
            <span>{speed}ms</span>
        </div>
    );
};

export default SpeedControl;