import { useEffect } from "react";

const Error = () => {
    
    useEffect(() => {
        document.title = "Error - " + document.title;
    }, []);

    return (
        <div>404 error: Page not found!</div>
    );
}

export default Error;
