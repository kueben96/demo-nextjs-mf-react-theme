import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";

function createRouter({ strategy, initialPathname }) {
    if (strategy === 'browser') {
        return createBrowserRouter(routes({}));
    }
    else {
        const initialEntries = [initialPathname || "/"];
        return createMemoryRouter(routes({}), { initialEntries: initialEntries });
    }

}

export { createRouter };
