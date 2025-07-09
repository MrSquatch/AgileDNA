import { CirclesIcon, ClipboardListIcon, UsersIcon, SettingsIcon, LogoutIcon } from "../../icons"
import { ItemLink } from "./ItemLink"
import { useAuth } from "../../context/AuthContext";

const LINKS = [
    {
        path: '/',
        label: 'Tasks',
        icon: <ClipboardListIcon />
    },
    {
        path: '/devs',
        label: 'Devs',
        icon: <UsersIcon />
    },
    {
        path: '/sprints',
        label: 'Sprints',
        icon: <CirclesIcon />
    },
    {
        path: '/config',
        label: 'Config',
        icon: <SettingsIcon />
    }
]

export function NavAside() {
    const { logout, user} = useAuth();
    console.log(user);
    return(
        <header className="w-64">
            <div className="flex items-center justify-center py-4">
                <h1 className="text-xl text-center font-bold">
                    {user?.name}
                </h1>
            </div>
            <nav className="flex flex-col justify-between h-[90%] py-4 px-2">
                <ul className="flex flex-col gap-2">
                    {LINKS.map((link) => (
                        <ItemLink key={link.path} path={link.path} label={link.label} icon={link.icon} />
                    ))}
                </ul>
                <button
                    onClick={logout}
                    className="
                        w-full cursor-pointer flex gap-2 items-center px-4 py-2 rounded-md transition-colors
                        hover:bg-bg/50 hover:text-primary
                        text-white
                    "
                >
                    <LogoutIcon />
                    Cerrar sesión
                </button>
            </nav>
        </header>
    )
}