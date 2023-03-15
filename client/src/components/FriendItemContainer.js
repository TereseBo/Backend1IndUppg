//Components
import FriendItem from './FriendItem'

export default function Itemcontainer({ items, setMsg, setStatus, setList, list, parentlist }) {
    return (
        <div>
            {items === undefined ? <p>No items</p> :
                <ul>
                    {items.map((item) => (
                        <li key={"itemlist" + item.id}>
                            <FriendItem key={'item-' + item.id} id={item.id} item={item} setMsg={setMsg} setStatus={setStatus} setList={setList} list={list} parentlist={parentlist} />
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}