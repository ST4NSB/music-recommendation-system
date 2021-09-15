import ClearPreferencesButton from "./components/ClearPreferencesButton";
import Header from "./components/Header";
import Main from "./components/Main";
import RecommendationContext from "./components/RecommendationContext";

const Recommendations = () => {
    return (
        <>
            <Header />
            <Main>
                <ClearPreferencesButton />
                <RecommendationContext />
            </Main>
        </>
    );
}

export default Recommendations;
