import { Outlet } from "react-router-dom";
import { NavAside } from "../components/UI";

export function Layout() {
    return(
        <main className="flex max-h-dvh">
            <NavAside />
            <Outlet />
        </main>
    )
}