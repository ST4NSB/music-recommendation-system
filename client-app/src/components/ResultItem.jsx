import { useSelector } from "react-redux";

const ResultItem = ({id, name, youtubeId, likeClick}) => {
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
            <div><a href={`https://www.youtube.com/watch?v=${youtubeId}`}>{name}</a></div>
            <iframe width="420" height="315" src={`https://www.youtube.com/embed/${youtubeId}`}></iframe>
            {renderLikeButton()}
        </div>
    );
}

export default ResultItem;