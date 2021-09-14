import { useSelector } from "react-redux";

const SearchItem = ({id, name, youtubeLink, likeClick}) => {
    const likedSongs = useSelector(state => state.likedSongs);

    const renderLikeButton = () => {
        if (!likedSongs.includes(id)) {
            return <button onClick={() => likeClick(id)}>LIKE</button>
        }
        else {
            return <div className="">LIKED</div>
        }
    }

    return (
        <div id={id}>
            <div>{name}</div>
            <iframe width="420" height="315" src={youtubeLink}></iframe>
            {renderLikeButton()}
        </div>
    );
}

export default SearchItem;