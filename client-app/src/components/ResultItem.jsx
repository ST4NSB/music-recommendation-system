import { useSelector } from "react-redux";

const ResultItem = ({id, name, youtubeId, likeClick}) => {
    const likedSongs = useSelector(state => state.likedSongs);

    const renderLikeButton = () => {
        if (!likedSongs.includes(id)) {
            return 
        }
        else {
            return <div className="">LIKED</div>
        }
    }

    return (
        <div id={id}
             className="w-96 bg-darken">
            <iframe className="w-96 h-56" src={`https://www.youtube.com/embed/${youtubeId}`}></iframe>
            <div className="text-center text-gradient-red font-bold"><a href={`https://www.youtube.com/watch?v=${youtubeId}`}>{name}</a></div>
            <button class="text-milk" onClick={() => likeClick(id)}>{!likedSongs.includes(id)? 'Like' : 'LIKED'}</button>
        </div>
    );
}

export default ResultItem;