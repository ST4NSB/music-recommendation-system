import getUIDv4 from "./common";

const createUserDetails = () => {
    const uid = JSON.parse(localStorage.getItem('userId'));
    
    if (!uid) {  
        localStorage.setItem("userId", JSON.stringify(getUIDv4()));
        localStorage.setItem("likedSongs", JSON.stringify([]));
        localStorage.setItem("skippedSongs", JSON.stringify([]));
    }
}

export const setLikedSongs = (liked) => {
    createUserDetails();
    const uid = JSON.parse(localStorage.getItem('likedSongs'));
    uid.push(liked);
    localStorage.setItem("likedSongs", JSON.stringify(uid));
}

export const setSkippedSongs = (skipped) => {
    createUserDetails();
    const uid = JSON.parse(localStorage.getItem('skippedSongs'));
    uid.push(skipped);
    localStorage.setItem("skippedSongs", JSON.stringify(uid));
}

export const clearLikedSongs = () => {
    createUserDetails();
    localStorage.setItem("likedSongs", JSON.stringify([]));
}

export const clearSkippedSongs = () => {
    createUserDetails();
    localStorage.setItem("skippedSongs", JSON.stringify([]));
}

export const getUserId = () => {
    createUserDetails();
    return JSON.parse(localStorage.getItem('userId'));
}

export const getUserLikedSongs = () => {
    return JSON.parse(localStorage.getItem('likedSongs'));
}

export const getUserSkippedSongs = () => {
    return JSON.parse(localStorage.getItem('skippedSongs'));
}