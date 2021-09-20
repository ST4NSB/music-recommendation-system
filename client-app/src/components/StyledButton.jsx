

const StyledButton = ({text, onClickEvent}) => {
    return (
        <button className="px-4 py-2 rounded-md font-bold text-sm border shadow focus:outline-none focus:ring transition text-theme-white bg-theme-black border-theme-black hover:bg-theme-dark active:bg-theme-dark focus:ring-theme-dark"
                onClick={onClickEvent}>
            {text}
        </button>
    );
}

export default StyledButton;