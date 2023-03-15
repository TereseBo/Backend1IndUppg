//Components
import Linkbox from '../components/Linkbox';

export default function Menu({ status }) {

    return (
        <div className='Menu'>
            {status !== true ? (
                null
            ) : (
                <nav>
                    <h1>Menu</h1>
                    <Linkbox target="/lists" text="Your Lists" />
                    <Linkbox target="/friends" text="Your friends" />
                    <Linkbox target="/friends/new" text="Find new friends" />
                </nav>
            )}
        </div>
    )
}