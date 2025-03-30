import React from "react";

export interface Character {
    url: string;
    count: number;
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

const getCharacterId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
};

export default getCharacterId;