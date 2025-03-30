// noinspection JSIgnoredPromiseFromCall

import React, {useEffect, useState} from 'react';
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import './App.css';
import {Character} from "./components/Character";
import { CACHED_CHARACTERS_KEY, DISPLAYED_CHARACTERS_KEY } from './components/Constants';



const FETCH_COUNT = 23


function App() {

    //uncomment this to reset the local storage.
    //N.B.: until commented again, the saved changes will be lost after refresh!
    localStorage.clear();

    const [characters, setCharacters] = useState<Map<String, Character>>(new Map<String, Character>());
    const [displayedCharacters, setDisplayedCharacters] = useState<String[]>([]);

    useEffect(() => {
        const cachedCharacters = localStorage.getItem(CACHED_CHARACTERS_KEY);
        const displayedCharacterNames = localStorage.getItem(DISPLAYED_CHARACTERS_KEY);
        if (cachedCharacters && displayedCharacterNames) {
            setCharacters(new Map(Object.entries(JSON.parse(cachedCharacters))));
            setDisplayedCharacters(JSON.parse(displayedCharacterNames))
        } else {
            fetchCharacters();
        }
    }, []);

    async function fetchCharacters() {
        //concurrently fetch the character information
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
        const results = await Promise.all(promises);

        //once all info is retrieved, cache it for further use
        const resultsMap = new Map<String, Character>();
        results
            .filter(character => character != null)
            .map(character => resultsMap.set(character.name, character));
        setCharacters(resultsMap);
        localStorage.setItem(CACHED_CHARACTERS_KEY, JSON.stringify(Object.fromEntries(resultsMap)));

        const displayedNames = ["Yoda", "Darth Vader", "Obi-Wan Kenobi"];
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