export const iconImage = (fileName: string) => {
    return new URL(`/src/assets/generated/icons/${fileName}.png`, import.meta.url).href;
};

export const skillImage = (fileName: string) => {
    return new URL(`/src/assets/generated/icons/skills/${fileName}.png`, import.meta.url).href;
};

export const backgroundImage = (fileName: string) => {
    return new URL(`/src/assets/generated/equipment/${fileName}.png`, import.meta.url).href;
};

export const toolImage = (fileName: string) => {
    return new URL(`/src/assets/generated/tools/${fileName}.png`, import.meta.url).href;
};

export const itemImage = (fileName: string) => {
    return new URL(`/src/assets/generated/items/${fileName}.png`, import.meta.url).href;
};

export const keyItemImage = (fileName: string) => {
    return new URL(`/src/assets/generated/key-items/${fileName}.png`, import.meta.url).href;
};

export const npcImage = (fileName: string) => {
    return new URL(`/src/assets/generated/npcs/${fileName}.png`, import.meta.url).href;
};
