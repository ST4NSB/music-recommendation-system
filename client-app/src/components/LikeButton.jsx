import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({id, onClickEvent}) => {
    const likedSongs = useSelector(state => state.likedSongs);

    return (
        <button className="content-center cursor-auto mb-2 w-full pb-3 font-bold text-purple-500 text-xl" >
            {
                !likedSongs.includes(id) ? 
                    <span onClick={() => onClickEvent(id)} 
                          className="rounded-md cursor-pointer border-2 px-2 py-1 border-purple-500 hover:bg-purple-500 hover:text-theme-white">
                        Like <FontAwesomeIcon className="h-4 ml-0 align-baseline" icon={faThumbsUp} />
                    </span>
                    : <span className="text-green-500">
                        Liked <FontAwesomeIcon className="h-4 ml-0 align-baseline" icon={faCheckCircle} />
                    </span>
            }
        </button>
    );
}

export default LikeButton;