//style
import './menu.scss'

//Components
import Linkbox from './Linkbox';

export default function Menu({ status }) {

    return (
        <div className='Menu'>
            {status !== true ? (
                null
            ) : (
                <nav>

                    <Linkbox target="/lists" text="Your Lists" />
                    <Linkbox target="/friends" text="Your friends" />
                    <Linkbox target="/friends/new" text="Find new friends" />
                </nav>
            )}
        </div>
    )
}