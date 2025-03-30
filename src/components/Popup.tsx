import React, {useState, useEffect} from "react";
import {Character} from "./Character";
import {createPortal} from "react-dom"; //to fix overlay rendering
import { CACHED_CHARACTERS_KEY, DISPLAYED_CHARACTERS_KEY } from './Constants';

interface PopupEditProps {
    characters: Map<String, Character>;
    onCharacterChange: (newCharacter: Character) => void; //changeDisplayedCharacters in Container.tsx
    selectedCharacter: String;
    windowIndex: number; //to know which one opens the popup
    displayedCharacters: String[]
}

const PopupEdit: React.FC<PopupEditProps> = ({characters, onCharacterChange, selectedCharacter, windowIndex, displayedCharacters}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [editedCharacter, setEditedCharacter] = useState<Character | null>(null);

    const togglePopup = () => setIsOpen(!isOpen);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCharacter = characters.get(event.target.value);
        setEditedCharacter(selectedCharacter!!);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {console.log("in handleInputChange");
        if (editedCharacter) {
            const {name, value} = event.target;
            setEditedCharacter((prevCharacter) => {
                console.log("Previous name:", prevCharacter?.name);
                return {
                    ...prevCharacter!,
                    [name]: value
                };
            });
        }
    };

    const handleSaveChanges = () => {
        console.log("in handleSaveChange")
        if (editedCharacter) {
            onCharacterChange(editedCharacter); // call changeDisplayedCharacters in Container.tsx with the new character and the window index that is passed as closure
            togglePopup(); // Close the popup after saving
        }
        characters.set(editedCharacter!!.name, editedCharacter!!)
        const json = JSON.stringify(Object.fromEntries(characters));
        localStorage.setItem(CACHED_CHARACTERS_KEY, json);
        displayedCharacters[windowIndex] = editedCharacter!!.name
        localStorage.setItem(DISPLAYED_CHARACTERS_KEY, JSON.stringify(displayedCharacters));
    };

    useEffect(() => {
        if (characters.size > 0 && !editedCharacter) {
            setEditedCharacter(characters.get(selectedCharacter)!!); // Default to the first character if no edit is selected
        }
    }, [characters, editedCharacter]);

    return (
        <>
            <button type="button" className="btn edit-button" onClick={togglePopup}>
                Edit
            </button>
            {isOpen && editedCharacter && createPortal(( //portal sends overlay and popup to the body, so the nesting doesn't limit height and width of the overlay.
                <>
                    <div className="popup-overlay" onClick={togglePopup}></div>
                    <div className="popup">
                        <button
                            type="button"
                            className="btn close-button"
                            onClick={togglePopup}
                        >
                            Close
                        </button>
                        <p>Editing character at index: {windowIndex}</p>
                        <label>Choose a different character</label>
                        <select onChange={handleChange} value={editedCharacter.name}>
                            {
                                Array.from(characters.values())
                                    .map((character) => (
                                        <option key={character.name} value={character.name}>
                                            {character.name}
                                        </option>
                                    ))}
                        </select>

                        <h2>...or edit current</h2>
                        <div className="form-container">
                            <label>Height</label>
                            <input
                                type="number"
                                name="height"
                                placeholder="Height"
                                value={editedCharacter.height}
                                onChange={handleInputChange}
                            />
                            <label>Mass</label>
                            <input
                                type="number"
                                name="mass"
                                placeholder="Mass"
                                value={editedCharacter.mass}
                                onChange={handleInputChange}
                            />
                            <label>Hair color</label>
                            <input
                                type="text"
                                name="hair_color"
                                placeholder="Hair color"
                                value={editedCharacter.hair_color}
                                onChange={handleInputChange}
                            />
                            <label>Skin color</label>
                            <input
                                type="text"
                                name="skin_color"
                                placeholder="Skin color"
                                value={editedCharacter.skin_color}
                                onChange={handleInputChange}
                            />
                            <label>Eye color</label>
                            <input
                                type="text"
                                name="eye_color"
                                placeholder="Eye color"
                                value={editedCharacter.eye_color}
                                onChange={handleInputChange}
                            />
                            <label>Birth year</label>
                            <input
                                type="text"
                                name="birth_year"
                                placeholder="Birth year"
                                value={editedCharacter.birth_year}
                                onChange={handleInputChange}
                            />
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={editedCharacter.gender}
                                onChange={handleInputChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-Binary</option>
                                <option value="n/a">n/a</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            className="btn edit-button"
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </button>
                    </div>
                </>
            ), document.body)}
        </>
    );
};

export default PopupEdit;