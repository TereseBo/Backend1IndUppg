import Item from './Item'
import NewItem from './NewItem'

export default function Itemcontainer({ items, setMsg, setStatus, setList, list, parentlist}) {
    console.log('Itemcontainer')
    console.log(list)
    return (
        <div>
            {items===undefined?<p>No items</p>:
            <ul>
            
                        {items.map((item) => (
                <li key={"itemlist" + item.id}>
                <Item key={'item-'+item.id} id={item.id} item={item} setMsg={setMsg} setStatus={setStatus} setList={setList} list={list} parentlist={parentlist}/>
                </li>
            ))}
                      <NewItem setMsg={setMsg} setStatus={setMsg}  setList={setList} list={list} parentlist={parentlist}/>
            </ul>
            }
        </div>
    )
}