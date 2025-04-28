import { getInitials } from '../../utils/helper'
import IconLogout from "../../assets/iconLogout.png"

type ProfileInfoProps = {
    userInfo: any
    onLogout: () => void
}

export const ProfileInfo = (props: ProfileInfoProps) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 bg-slate-100'>
                {getInitials(props.userInfo?.fullName)}
            </div>

            <div>
                <p className='text-sm font-medium'>{props.userInfo?.fullName}</p>
                <button className='text-slate-700 flex justify-center gap-1 mt-2 cursor-pointer items-center' onClick={props.onLogout}>
                    <img src={IconLogout} alt="Logout" className="w-5 h-4" />
                    LogOut
                </button>
            </div>
        </div>
    )
}
