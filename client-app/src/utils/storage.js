import { getUIDv4 } from "./common";

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
    let likedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    likedSongs = likedSongs.includes(liked) ? likedSongs : [ ...likedSongs, liked];
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
}

export const setSkippedSongs = (skipped) => {
    createUserDetails();
    const skippedSongs = JSON.parse(localStorage.getItem('skippedSongs'));
    skipped.forEach(x => {
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

export const resetUserId = (newUID) => {
    localStorage.setItem("userId", JSON.stringify(newUID));
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