import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import './App.css';
import {Character} from "./components/Character";

const CHARACTERS_KEY = "characters";
const DISPLAYED_CHARACTERS_KEY = "displayedCharacters";
const FETCH_COUNT = 23


function App() {

    //uncomment this to reset the local storage.
    //N.B.: until commented again, the saved changes will be lost after refresh!
    // localStorage.clear();

    const [characters, setCharacters] = useState<Map<String, Character>>(new Map<String, Character>());
    const [displayedCharacters, setDisplayedCharacters] = useState<String[]>([]);

    useEffect(() => {
        const storedCharacters = localStorage.getItem(CHARACTERS_KEY);
        let displayed = localStorage.getItem(DISPLAYED_CHARACTERS_KEY)!!;
        if (storedCharacters && displayed) {
            setCharacters(new Map(Object.entries(JSON.parse(storedCharacters))));
            setDisplayedCharacters(JSON.parse(displayed))
        } else {
            fetchCharacters();
        }
    }, []);

    async function fetchCharacters() {
        const promises = [];
        for (let i = 1; i <= FETCH_COUNT; i++) {
            promises.push(
                fetch(`https://swapi.dev/api/people/${i}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('could not fetch')
                        }
                        return response.json();
                    })
                    .catch(() => {
                        console.log(`could not fetch character ${i}`);
                    })
            );
        }
        let results = await Promise.all(promises);

        let resultsMap = new Map<String, Character>();
        results.filter(a => a != null).map(c => resultsMap.set(c.name, c));

        setCharacters(resultsMap);
        localStorage.setItem(CHARACTERS_KEY, JSON.stringify(Object.fromEntries(resultsMap)));

        let displayedNames = ["Yoda", "Darth Vader", "Obi-Wan Kenobi"];
        setDisplayedCharacters(displayedNames)
        localStorage.setItem(DISPLAYED_CHARACTERS_KEY, JSON.stringify(displayedNames));
    }


    // @ts-ignore
    return (
        <div className="App">
            <Navbar></Navbar>
            <Container data={characters} displayed = {displayedCharacters}></Container>
        </div>
    )
}

export default App;