import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import LikeButton from "./LikeButton";

const ResultItem = ({id, name, youtubeId, likeClick, itemClasses, emptyItem}) => {
    
    return (emptyItem) ?
        (
            <div id={id} className={`mb-10 bg-theme-dark-xs shadow-xl rounded-lg animate-popup ${itemClasses}`}>
                <div className="border border-purple-500 shadow rounded-md p-4 mx-auto">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-80 bg-purple-500 rounded"></div>
                            <div className="h-4 bg-theme-gray rounded w-3/4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-theme-gray rounded"></div>
                                <div className="h-4 bg-theme-gray rounded w-5/6"></div>
                                <div className="h-4 bg-theme-gray rounded w-4/6"></div>
                                <div className="h-4 bg-theme-gray rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    :
        (
            <div id={id} className={`mb-10 bg-theme-dark-xs shadow-xl rounded-lg ${itemClasses}`}>
                <div className="rounded-xl shadow-xl w-11/12 h-96 relative overflow-hidden mx-auto mt-5">
                    <iframe title={name} className='w-full h-96' src={`https://www.youtube.com/embed/${youtubeId}`} />
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