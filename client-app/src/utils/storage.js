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
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    likedSongs.push(liked);
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
}

export const setSkippedSongs = (skipped) => {
    createUserDetails();
    const skippedSongs = JSON.parse(localStorage.getItem('skippedSongs'));
    skipped.map(x => {
        if (!skippedSongs.includes(x)) {
            skippedSongs.push(x);
        }
    });
    localStorage.setItem("skippedSongs", JSON.stringify(skippedSongs));
}

export const clearLikedSongs = () => {
    createUserDetails();
    localStorage.setItem("likedSongs", JSON.stringify([]));
}

export const clearSkippedSongs = () => {
    createUserDetails();
    localStorage.setItem("skippedSongs", JSON.stringify([]));
}

export const removeSkippedSong = (songId) => {
    createUserDetails();
    const skippedSongs = JSON.parse(localStorage.getItem('skippedSongs'));
    const newSongs = skippedSongs.filter(id => id !== songId);
    localStorage.setItem("skippedSongs", JSON.stringify(newSongs));
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