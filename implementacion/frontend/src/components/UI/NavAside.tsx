import { CirclesIcon, ClipboardListIcon, UsersIcon, SettingsIcon } from "../../icons"
import { ItemLink } from "./ItemLink"

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
    return(
        <header className="w-64">
            <nav>
                <ul className="flex flex-col gap-2">
                    {LINKS.map((link) => (
                        <ItemLink key={link.path} path={link.path} label={link.label} icon={link.icon} />
                    ))}
                </ul>
            </nav>
        </header>
    )
}