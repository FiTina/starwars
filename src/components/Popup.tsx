import React, {useState} from "react";
import {Character} from "./Character";
import {createPortal} from "react-dom"; //to fix overlay rendering
import {CACHED_CHARACTERS_KEY, DISPLAYED_CHARACTERS_KEY} from './Constants';

interface PopupEditProps {
    characters: Map<String, Character>;
    onCharacterChange: (newCharacter: Character) => void; //changeDisplayedCharacters in Container.tsx
    selectedCharacter: String;
    selectedWindowIndex: number; //to know which one opens the popup
    displayedCharacterNames: String[]
}

const PopupEdit: React.FC<PopupEditProps> =
    ({
         characters,
         onCharacterChange,
         selectedCharacter,
         selectedWindowIndex,
         displayedCharacterNames
     }) => {

        const [isOpen, setIsOpen] = useState(false);
        const [editedCharacter, setEditedCharacter] = useState<Character>(characters.get(selectedCharacter)!);

        const togglePopup = () => setIsOpen(!isOpen);

        //prepare the new character to be used by the other handlers
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedCharacter = characters.get(event.target.value)!;
            setEditedCharacter(selectedCharacter);
        };

        //set the new data for the selected character
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const {name, value} = event.target;
            setEditedCharacter(
                (prevCharacter) => ({...prevCharacter!, [name]: value}));
        };


        const handleSaveChanges = () => {
            //use the callback on the Container class to display the changed character. The window index used is a closure in the lambda
            onCharacterChange(editedCharacter);
            //close the popup after saving
            togglePopup();
            //apply the change to the characters map
            characters.set(editedCharacter!.name, editedCharacter!)
            //update the array of displayed names
            displayedCharacterNames[selectedWindowIndex] = editedCharacter!.name
            //persist the changes
            const charactersJson = JSON.stringify(Object.fromEntries(characters));
            localStorage.setItem(CACHED_CHARACTERS_KEY, charactersJson);
            localStorage.setItem(DISPLAYED_CHARACTERS_KEY, JSON.stringify(displayedCharacterNames));
        };

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
                            <p>Editing character at index: {selectedWindowIndex}</p>
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