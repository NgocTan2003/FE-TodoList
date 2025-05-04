import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { useLogout } from '../../utils/hook/useAuth';

type Props = {
    userInfo: any
    handleSearchNote: (query: string) => void
    handleClearSearch: () => void
}

export const Navbar = ({ userInfo, handleSearchNote, handleClearSearch }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { mutate: mutateLogout, isLoading: isLoggingOut } = useLogout();

    const onLogout = () => {
        mutateLogout(undefined);
    }

    const handleSearch = () => {
        if (searchQuery) {
            handleSearchNote(searchQuery);
        }
    }

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    }

    return (
        <div className="navbar bg-base-100 shadow-sm bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Notes</a>
            </div>
            <div className="flex gap-2">
                <SearchBar
                    value={searchQuery}
                    onChange={(event) => {
                        setSearchQuery(event.target.value)
                    }}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a onClick={onLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
