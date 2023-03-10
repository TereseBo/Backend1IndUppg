
import Linkbox from './Linkbox';

export default function Menu() {
    return(
        <div>
            <h1>Menu</h1>
            <nav>
                <Linkbox target="/lists" text="Your Lists"/>
                <Linkbox target="/lists/new" text="New List"/>
                <Linkbox target="/friends" text="Your friends"/>
                <Linkbox target="/friends/new" text="Find new friends"/>
            </nav>
        </div>
    )
}