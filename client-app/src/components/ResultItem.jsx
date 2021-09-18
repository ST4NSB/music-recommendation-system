import { useSelector } from "react-redux";

const ResultItem = ({id, name, youtubeId, likeClick}) => {
    const likedSongs = useSelector(state => state.likedSongs);

    return (
        <div id={id} className="w-96 bg-darken border-4 border-gradient-orange">
            <iframe className="w-96 h-64" src={`https://www.youtube.com/embed/${youtubeId}`} />
            <div title={name} className="p-3 text-center text-base text-gradient-red font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">
                <a href={`https://www.youtube.com/watch?v=${youtubeId}`}>{name}</a>
            </div>
            <button class="text-milk content-center mt-0 w-full pb-3" onClick={() => likeClick(id)}>{!likedSongs.includes(id)? 'Like' : 'LIKED'}</button>
        </div>
    );
}

export default ResultItem;