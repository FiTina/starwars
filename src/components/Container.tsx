import React, { useState, useEffect } from "react";
import { Character } from "./Character";
import getCharacterId from "./Character";
import PopupEdit from "./Popup";

interface ContainerProps {
    characters: Map<String, Character>;
    displayedNames: String[];
}

const Container: React.FC<ContainerProps> = ({ characters , displayedNames}) => {

    const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>([]);

    useEffect(() => {
        //the displayed characters are not immediately available, but have to be created from the list of displayed names
        if (displayedCharacters.length === 0) {
            setDisplayedCharacters(displayedNames.map(c => characters.get(c)!));
        }
    }, [displayedCharacters.length, displayedNames, characters]);

    //a callback function that is passed to the Popup class to change the displayed character
    const changeDisplayedCharacter = (newCharacter: Character, windowIndex: number) => {
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
                                        characters={characters}
                                        onCharacterChange={(newCharacter) => changeDisplayedCharacter(newCharacter, windowIndex)}
                                        selectedCharacter = {character.name}
                                        selectedWindowIndex={windowIndex}
                                        displayedCharacterNames= {displayedCharacters.map(a=>a.name)}
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