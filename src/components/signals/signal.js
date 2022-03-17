import React, { useEffect, useState, useCallback } from 'react';
import { subscribeSignal, unSubscribeSignal, getAllSignals } from '../../utils/signals';

const Signal = ({ signal, serverHost, socketId }) => {
    const [subscribe, setSubscribe] = useState(false);
    const [min, setMin] = useState(signal.defaultMin);
    const [max, setMax] = useState(signal.defaultMax);
    const [newMin, setNewMin] = useState(signal.defaultMin);
    const [newMax, setNewMax] = useState(signal.defaultMax);

    const onSubscribeSwitch = useCallback(async () => {
        if (socketId) {
            if (subscribe) {
                subscribeSignal(serverHost, socketId, signal.name, min, max);
            } else {
                // unsubscribed only if already subscribed
                const allSignals = await getAllSignals(serverHost);
                if (allSignals.data) {
                    const data = allSignals.data;
                    if (data[socketId]) {
                        unSubscribeSignal(serverHost, socketId, signal.name);
                    }
                }
            }
        }
    }, [socketId, subscribe, min, max]);

    useEffect(() => {
        onSubscribeSwitch();
    }, [onSubscribeSwitch]);

    const onUpdate = () => {
        if (newMin <= newMax) {
            setMin(newMin);
            setMax(newMax);
        }
    }

    const isError = () => {
        if (newMin > newMax) {
            return true;
        }

        return false;
    }

    const showUpdate = () => {
        if (!isError() && (newMin !== min || newMax !== max)) {
            return true;
        }

        return false;
    }

    return (
        <tr>
            <td className='pe-5'>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id={signal.name} checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
                    <label className="form-check-label" htmlFor={signal.name}>Subscribe</label>
                </div>
            </td>
            <th className='pe-5'>{signal.name} ({signal.unit})</th>
            <td className='pe-5'>
                <input type="number" className={`form-control ${isError() && "border-danger"}`} value={newMin} onChange={(e) => setNewMin(parseFloat(e.target.value))} />
            </td>
            <td className='pe-5'>
                <input type="number" className={`form-control ${isError() && "border-danger"}`} value={newMax} onChange={(e) => setNewMax(parseFloat(e.target.value))} />
            </td>
            <td>
                {showUpdate() && <button type="button" onClick={onUpdate} className="btn btn-dark">Update</button>}
            </td>
        </tr>
    );
}

export default Signal;