import { useState, useEffect } from 'react'

//Components
import User from '../components/User'
import Addbutton from '../components/Addbutton'
import Itemcontainer from '../components/Itemcontainer'
import NewItem from '../components/NewItem'

export default function Listlist({ setMsg, setStatus, status }) {
    const [list, setList] = useState([])
    const [items, setItems] = useState([])
    const [pgMsg, setPgMsg] = useState('')
    useEffect(() => {
        async function getLists() {
            const res = await fetch('http://localhost:5050/content/lists', { credentials: 'include' })
            const data = await res.text()
            console.log(data)
            console.log(res.status)
            switch (res.status) {
                case 200:
                    setList(JSON.parse(data))
                    setMsg('Lists loaded')
                    break;
                case 204:
                    setPgMsg("No Lists found")
                    break;
                case 401:
                    setMsg(data)
                    setStatus(false)
                    break;

                default:
                    setPgMsg(data)
            }
        }
        getLists()
    }, [status])

    async function addItems(e) {
        let res2 = await fetch(`http://localhost:5050/content/list/?id=${e.target.id}`, { credentials: 'include' })
        const data = await res2.text()
        let listCopy = list//[...list]
        console.log(listCopy)
        console.log(res2.status)
        switch (res2.status) {
            case 200:
                console.log(data)
                console.log(listCopy)
                console.log(e.target.id)
                console.log(listCopy.find((list) => list.id == e.target.id))
                listCopy.find((list) => list.id == e.target.id).items = JSON.parse(data)
                console.log(listCopy)
                setList(listCopy)
                console.log(list)
                setMsg(`Items loaded for list ${listCopy.find((list) => list.id == e.target.id).name}`)
                break;
            case 204:
                setMsg(`No items to return for ${listCopy.find((list) => list.id == e.target.id).name}`)
                break;
            case 401:
                setMsg(data)
                setStatus(false)
                break;
            default:
                setMsg(data)
        }
    }

    return (
        <div>
            {list === undefined ? <p>{pgMsg}</p> :
                <ul>
                    {list.map((listEntry) => (
                        <li key={"list-" + listEntry.id}>
                            <User key={"listname-" + listEntry.id} id={listEntry.id} name={listEntry.name} />
                            <Addbutton id={listEntry.id} key={'button-' + listEntry.id} callback={addItems} text="Display items" />

                            {listEntry.items !== undefined ? <Itemcontainer items={listEntry.items} setMsg={setMsg} setStatus={setStatus} setList={setList} list={list} parentlist={listEntry.id} /> :
                            null }
                             <NewItem setMsg={setMsg} setStatus={setMsg} setList={setList} list={list} parentlist={listEntry.id} />

                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}