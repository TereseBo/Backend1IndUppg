//Components
import Item from './Item'
import NewItem from './NewItem'

export default function Itemcontainer({ items, setMsg, setStatus, setList, list, parentlist, setPgMsg, fetchItems }) {
    return (
        <div>
            {items === undefined ? <p>No items</p> :
                <ul>
                    {items.map((item) => (
                        <li key={"itemlist" + item.id}>
                            <Item fetchItems={fetchItems} setPgMsg={setPgMsg} key={'item-' + item.id} id={item.id} item={item} setMsg={setMsg} setStatus={setStatus} setList={setList} list={list} parentlist={parentlist} />
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}