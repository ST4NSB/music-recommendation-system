

const StyledButton = ({text, onClickEvent}) => {
    return (
        <button className="text-lg px-4 py-2 rounded-md font-bold border mobile:text-base shadow focus:outline-none focus:ring transition text-theme-white bg-theme-black border-theme-black hover:bg-theme-dark-xm active:bg-theme-dark-xm focus:ring-theme-dark-xm"
                onClick={onClickEvent}>
            {text}
        </button>
    );
}

export default StyledButton;