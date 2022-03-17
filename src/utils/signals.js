import axios from 'axios';

export const signalsList = [
    {
        name: "Velocity",
        defaultMin: 0,
        defaultMax: 100,
        unit: "km/h"
    },
    {
        name: "Acceleration",
        defaultMin: 0,
        defaultMax: 5,
        unit: "m/s^2"
    },
    {
        name: "Latitude",
        defaultMin: -90,
        defaultMax: 90,
        unit: "deg"
    },
    {
        name: "Longitude",
        defaultMin: -180,
        defaultMax: 180,
        unit: "deg"
    }
];

export const subscribeSignal = (serverHost, socketId, name, min, max) => {
    axios.post(serverHost + "subscribe_signal", {
        signal: {
            name,
            min,
            max
        },
        socketId
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        console.log(`${name} subscribe res`, res);
    }).catch((err) => {
        console.log(`${name} subscribe error`, err);
    })
}

export const unSubscribeSignal = (serverHost, socketId, signalName) => {
    axios.post(serverHost + "unsubscribe_signal", {
        signalName,
        socketId
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        console.log(`${signalName} unsubscribe res`, res);
    }).catch((err) => {
        console.log(`${signalName} unsubscribe error`, err);
    })
}

export const getAllSignals = async (serverHost) => {
    const allSignals = await axios.get(serverHost + "get_signals", {
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch((err) => {
        console.log(`Error getting all signals`, err);
    })

    return allSignals;
}

