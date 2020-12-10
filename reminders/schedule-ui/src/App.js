import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [events, setEvents] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://0.0.0.0:8000/api/events-api/"
        }).then(response => {
            setEvents(response.data)
        })
    }, [])

  return (
        <div class="App">
            <h1>Reminders2</h1>
            <ul>
                {events.map(p => (
                    <li>{p.name}</li>
                ))}
            </ul>
        </div>
  );
}

export default App;
