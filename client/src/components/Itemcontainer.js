//Style
import './itemcontainer.scss'

//Components
import Item from './Item'

export default function Itemcontainer({ items, setMsg, setStatus, setList, list, parentlist, setPgMsg }) {
    return (
        <div className='itemlist-container'>
            {items === undefined ? <p>No items</p> :
                <ul className='itemlist'>
                    {items.map((item) => (
                        <li className='item' key={"itemlist" + item.id}>
                            <Item  setPgMsg={setPgMsg} key={'item-' + item.id} id={item.id} item={item} setMsg={setMsg} setStatus={setStatus} setList={setList} list={list} parentlist={parentlist} />
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}