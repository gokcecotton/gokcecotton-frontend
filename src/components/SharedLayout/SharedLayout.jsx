import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "../navigation/navigation";
import { Footer } from "../Footer/Footer";
import css from "./SharedLayout.module.css";

export const SharedLayout = () => {
    return (
        <div className={css.container}>
            <Navigation />
            <main className={css.main}>
                <Suspense fallback={<div className={css.loader}>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};
