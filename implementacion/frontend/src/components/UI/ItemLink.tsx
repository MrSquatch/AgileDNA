import { Link, useMatch } from "react-router-dom";

export function ItemLink({path, label, icon}: {path: string, label: string, icon: React.ReactNode}) {

    const isActive = useMatch(path)

    return(
        <li>
            <Link
                to={path}
                className={`
                    flex gap-2 items-center px-4 py-2 rounded-md transition-colors
                    ${isActive ? 'bg-bg text-primary' : 'text-white'}
                    hover:bg-bg/50 hover:text-primary
                `}
            >
                {icon}
                {label}
            </Link>
        </li>
    )
}