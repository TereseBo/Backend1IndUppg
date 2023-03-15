//Components
import Linkbox from '../components/Linkbox';

export default function Menu({ status, msg, setMsg }) {
    if (status) {
        { setMsg('') }
    }
    return (
        <div className='Menu'>
            {status !== true ? (
                <p>{msg}</p>
            ) : (
                <nav>
                    <h1>Menu</h1>
                    <Linkbox target="/lists" text="Your Lists" />
                    <Linkbox target="/lists/new" text="New List" />
                    <Linkbox target="/friends" text="Your friends" />
                    <Linkbox target="/friends/new" text="Find new friends" />
                </nav>
            )}
        </div>
    )
}