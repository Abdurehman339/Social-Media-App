import './leftSideBar.css'
import { RssFeed, MessageRounded, PlayCircleFilledRounded, PeopleAltRounded, BookmarkAddRounded, HelpOutlineRounded, InsertInvitationRounded, SchoolRounded, Work } from '@mui/icons-material'

function LeftSideBar() {
  return (
    <div className='LeftSideBar'>
        <ul className="LeftSideBar-list">
            <li className="LeftSideBar-list-item">
                <RssFeed className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Feed</span>
            </li>
            <li className="LeftSideBar-list-item">
                <MessageRounded className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Chats</span>
            </li>
            <li className="LeftSideBar-list-item">
                <PlayCircleFilledRounded className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Videos</span>
            </li>
            <li className="LeftSideBar-list-item">
                <PeopleAltRounded className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Groups</span>
            </li>
            <li className="LeftSideBar-list-item">
                <BookmarkAddRounded className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Bookmarks</span>
            </li>
            <li className="LeftSideBar-list-item">
                <HelpOutlineRounded className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Questions</span>
            </li>
            <li className="LeftSideBar-list-item">
                <Work className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Jobs</span>
            </li>
            <li className="LeftSideBar-list-item">
                <InsertInvitationRounded className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Events</span>
            </li>
            <li className="LeftSideBar-list-item">
                <SchoolRounded className='LeftSideBar-list-item-icon'/>
                <span className='LeftSideBar-list-item-text'>Courses</span>
            </li>
        </ul>
        <button className='LeftSideBar-button'>
            Show More
        </button>
        <hr className='LeftSideBar-hr'/>
        <ul className="LeftSideBar-friend-list">
            <li className="LeftSideBar-friend-item">
                <img className='LeftSideBar-friend-img' src="/assets/2.jpeg" alt="" />
                <span className='LeftSideBar-friend-text'>Jane Doe</span>
            </li>
            <li className="LeftSideBar-friend-item">
                <img className='LeftSideBar-friend-img' src="/assets/2.jpeg" alt="" />
                <span className='LeftSideBar-friend-text'>Jane Doe</span>
            </li>
            <li className="LeftSideBar-friend-item">
                <img className='LeftSideBar-friend-img' src="/assets/2.jpeg" alt="" />
                <span className='LeftSideBar-friend-text'>Jane Doe</span>
            </li>
            <li className="LeftSideBar-friend-item">
                <img className='LeftSideBar-friend-img' src="/assets/2.jpeg" alt="" />
                <span className='LeftSideBar-friend-text'>Jane Doe</span>
            </li>
            <li className="LeftSideBar-friend-item">
                <img className='LeftSideBar-friend-img' src="/assets/2.jpeg" alt="" />
                <span className='LeftSideBar-friend-text'>Jane Doe</span>
            </li>
            <li className="LeftSideBar-friend-item">
                <img className='LeftSideBar-friend-img' src="/assets/2.jpeg" alt="" />
                <span className='LeftSideBar-friend-text'>Jane Doe</span>
            </li>
        </ul>
    </div>
  )
}

export default LeftSideBar
