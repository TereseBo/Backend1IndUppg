import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

//Components
import Addbutton from "../components/Addbutton";
import User from "../components/User";
import Itemcontainer from "../components/Itemcontainer";

export default function FriendsLists({ items, setMsg, setStatus }) {
    const { id } = useParams()
    const [list, setList] = useState([])
    const [pgMsg, setPgMsg] = useState('Loading lists')

    useEffect(() => {
        async function getLists() {
            const res = await fetch(`http://localhost:5050/friends/lists?id=${id}`, { credentials: 'include' })
            const data = await res.text()
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
    }, [id])

    async function addItems(e) {
        let res2 = await fetch(`http://localhost:5050/content/list/?id=${e.target.id}`, { credentials: 'include' })
        const data = await res2.text()
        let listCopy = list//[...list]
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
                                null
                            }
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
