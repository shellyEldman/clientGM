import React from 'react';
import Signal from './signal';

const Table = ({ signalsList, serverHost, socketId }) => {
    return (
        <div className='mt-5'>
            <table className="table">
                <thead>
                    <tr>
                        <th className='pe-5'></th>
                        <th className='pe-5'>Signal</th>
                        <th className='pe-5'>Min</th>
                        <th className='pe-5'>Max</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {signalsList && signalsList.map((signal, i) => {
                        return (
                            <Signal key={i} signal={signal} serverHost={serverHost} socketId={socketId} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;