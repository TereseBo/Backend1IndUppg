import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
//Style
import "./friendslists.scss"
//Components
import Addbutton from "../components/Addbutton";
import FriendItemContainer from "../components/FriendItemContainer";
import Linkbox from "../components/Linkbox";
import Msgbox from '../components/Msgbox';
import User from "../components/User";

export default function FriendsLists({ items, setMsg, setStatus, status }) {
    const { id } = useParams()
    const [list, setList] = useState([])
    const [pgMsg, setPgMsg] = useState('')

    useEffect(() => {
        async function getLists() {
            const res = await fetch(`http://localhost:5050/friends/lists?id=${id}`, { credentials: 'include' })
            const data = await res.text()
            switch (res.status) {
                case 200:
                    setList(JSON.parse(data))
                    setPgMsg('')
                    break;
                case 204:
                    setPgMsg("No Lists found for this friend")
                    break;
                case 401:
                    setMsg(data)
                    setStatus(false)
                    break;
                default:
                    setPgMsg(data)
                    break;
            }
        }
        getLists()
    }, [id])

    async function addItems(e) {
        let res2 = await fetch(`http://localhost:5050/friends/items/?id=${e.target.id}`, { credentials: 'include' })
        const data = await res2.text()
        let listCopy = list//[...list]
        switch (res2.status) {
            case 200:
                listCopy.find((list) => list.id == e.target.id).items = JSON.parse(data)
                setList(listCopy)
                setPgMsg(`Items loaded for list ${listCopy.find((list) => list.id == e.target.id).name}`)
                break;
            case 204:
                setPgMsg(`No items to return for ${listCopy.find((list) => list.id == e.target.id).name}`)
                break;
            case 401:
                setMsg(data)
                setStatus(false)
                break;
            default:
                setPgMsg(data)
                break;
        }
    }

    return (
        <div>
            {status ? (
                <div>
                    {pgMsg === '' ? <Msgbox msg={pgMsg}/>:
                    <div className="emptylist"> 
                        <Msgbox msg={pgMsg}/>
                        <Linkbox target="/friends" text="Go back to friends" />
                    </div>}
                    <div className="friendslists-container">
                        <ul className="friendslists">
                            {list.map((listEntry) => (
                                <li className='list-container' key={"list-" + listEntry.id}>
                                    <div className="list-header">
                                        <User key={"listname-" + listEntry.id} id={listEntry.id} name={listEntry.name} />
                                        <Addbutton id={listEntry.id} key={'button-' + listEntry.id} callback={addItems} text="Display items" />
                                    </div>
                                    {listEntry.items !== undefined ? <FriendItemContainer items={listEntry.items} setMsg={setMsg} setStatus={setStatus} setList={setList} list={list} parentlist={listEntry.id} /> :
                                        null
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
