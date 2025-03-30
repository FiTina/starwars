import React, { useState, useEffect } from "react";
import { Character } from "./Character";
import getCharacterId from "./Character";
import PopupEdit from "./Popup";

interface ContainerProps {
    data: Map<String, Character>;
    displayed: String[];
}

const Container: React.FC<ContainerProps> = ({ data , displayed}) => {

    const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);

    useEffect(() => {
        if (displayedCharacters.length === 0) {
            setDisplayedCharacters(displayed.map(c => data.get(c)!!));
        }
    }, [displayedCharacters.length, displayed, data]);

    const changeDisplayedCharacters = (newCharacter: Character, windowIndex: number) => {
        const updatedCharacters = [...displayedCharacters];
        updatedCharacters[windowIndex] = newCharacter;
        setDisplayedCharacters(updatedCharacters);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                {displayedCharacters.map((character, windowIndex) => {
                    const characterId = getCharacterId(character.url);
                    return (
                        <div className="col-md-4" key={characterId}>
                            <div className="p-3"
                                 style={{
                                     backgroundImage: `url(https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/main/static/assets/img/people/${characterId}.jpg)`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                     backgroundRepeat: 'no-repeat'
                                 }}>
                                <div className="character-data">
                                    <ul>
                                        <li className="char-list">Name: <strong>{character.name}</strong></li>
                                        <li className="char-list">Height: <strong>{character.height} cm</strong></li>
                                        <li className="char-list">Mass: <strong>{character.mass} kg {character.name === "Darth Vader" && "(with armor)"}</strong></li>
                                        <li className="char-list">Hair color: <strong>{character.hair_color.charAt(0).toUpperCase() + character.hair_color.slice(1)}</strong></li>
                                        <li className="char-list">Skin color: <strong>{character.skin_color.charAt(0).toUpperCase() + character.skin_color.slice(1)}</strong></li>
                                        <li className="char-list">Eye color: <strong>{character.eye_color.charAt(0).toUpperCase() + character.eye_color.slice(1)}</strong></li>
                                        <li className="char-list">Birth year: <strong>{character.birth_year}</strong></li>
                                        <li className="char-list">Gender: <strong>{character.gender.charAt(0).toUpperCase() + character.gender.slice(1)}</strong></li>
                                    </ul>
                                    {/* Passing the character to the popup for editing */}
                                    <PopupEdit
                                        characters={data}
                                        onCharacterChange={(newCharacter) => changeDisplayedCharacters(newCharacter, windowIndex)}
                                        selectedCharacter = {character.name}
                                        windowIndex={windowIndex}
                                        displayedCharacters = {displayedCharacters.map(a=>a.name)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Container;