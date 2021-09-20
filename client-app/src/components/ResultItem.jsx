import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import LikeButton from "./LikeButton";

const ResultItem = ({id, name, youtubeId, likeClick, itemClasses}) => {
    return (
        <div id={id} className={`mb-10 bg-theme-dark-xs shadow-xl rounded-lg ${itemClasses}`}>
            <div className="rounded-xl shadow-xl w-11/12 h-96 relative overflow-hidden mx-auto mt-5">
                <iframe className='w-full h-96' src={`https://www.youtube.com/embed/${youtubeId}`} />
            </div>
            <div title={name} className="p-3 text-center text-base text-theme-gray font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">
                <a href={`https://www.youtube.com/watch?v=${youtubeId}`}>
                    {name}
                    <span><FontAwesomeIcon className="pl-2 h-5 text-red-600"
                                           icon={faExternalLinkAlt} /></span>
                </a>
            </div>
            <LikeButton id={id} onClickEvent={likeClick} />
        </div>
    );
}

export default ResultItem;