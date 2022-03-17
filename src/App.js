import React, { useEffect, useState } from 'react';
import { signalsList } from './utils/signals';
import Charts from './components/charts/charts';
import Table from './components/signals/table';

const { io } = require("socket.io-client");

const serverHost = "http://localhost:4000/";
const socketConnection = io.connect(serverHost);

const App = () => {
  const [connectionError, setConnectionError] = useState(false);
  const [socketId, setSocketId] = useState(undefined);

  useEffect(() => {
    socketConnection.on('connect', function () {
      setSocketId(socketConnection.id);
      setConnectionError(false);
    });

    socketConnection.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      setConnectionError(true);
    });
  }, []);

  return (
    <div className="App">
      <h1 className='text-primary text-center'>GM - Tools APP</h1>
      {connectionError ? <p className='mt-3 text-danger'>Trying to connect to the server...</p> :
        <p className='mt-3'>Subscribe to a signal to get started..</p>
      }

      <Table signalsList={signalsList} serverHost={serverHost} socketId={socketId} />
      <Charts socketConnection={socketConnection} signalsList={signalsList} />

    </div>
  );
}

export default App;
