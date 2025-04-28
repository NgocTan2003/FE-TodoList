import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { ProfileInfo } from '../Card/ProfileInfo'
import { useLogout } from '../../utils/hook/useAuth';
import IconLogo from "../../assets/iconLogo.png"


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
        <div className='bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-between px-6 py-2 drop-shadow'>
            <img src={IconLogo} alt="Logo" className="w-22 h-15 rounded-lg shadow-lg border-2 border-gray-300 transform transition-transform duration-300 hover:scale-105" />
            <SearchBar
                value={searchQuery}
                onChange={(event) => {
                    setSearchQuery(event.target.value)
                }}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    )
}

export default Navbar;
