import { useState, useEffect } from 'react'

//Style
import './listlist.scss'


//Components
import User from '../components/User'
import Addbutton from '../components/Addbutton'
import Itemcontainer from '../components/Itemcontainer'
import NewItem from '../components/NewItem'
import NewList from '../components/NewList'
import Msgbox from '../components/Msgbox';

export default function Listlist({ setMsg, setStatus, status }) {
    const [list, setList] = useState([])
    const [items, setItems] = useState([])
    const [pgMsg, setPgMsg] = useState('')
    useEffect(() => {
        async function getLists() {
            const res = await fetch('http://localhost:5050/content/lists', { credentials: 'include' })
            const data = await res.text()
            switch (res.status) {
                case 200:
                    setList(JSON.parse(data))
                    setMsg('')
                    setPgMsg('')
                    break;
                case 204:
                    setMsg('')
                    setPgMsg("No Lists found")
                    break;
                case 401:
                    setMsg(data)
                    setPgMsg('  ')
                    setStatus(false)
                    break;
                default:
                    setMsg('')
                    setPgMsg(data)
            }
            console.log(pgMsg)
        }
        getLists()
    }, [status])

    async function addItems(e) {
        let res2 = await fetch(`http://localhost:5050/content/list/?id=${e.target.id}`, { credentials: 'include' })
        const data = await res2.text()
        let listCopy = list//[...list]
        switch (res2.status) {
            case 200:
                setMsg('')
                listCopy.find((list) => list.id == e.target.id).items = JSON.parse(data)
                setList(listCopy)
                setPgMsg(`Items loaded for list ${listCopy.find((list) => list.id == e.target.id).name}`)
                break;
            case 204:
                setMsg('')
                setPgMsg(`No items to return for ${listCopy.find((list) => list.id == e.target.id).name}`)
                break;
            case 401:
                setMsg(data)
                setPgMsg('  ')
                setStatus(false)
                break;
            default:
                setPgMsg(data)
                break
        }
    }

    async function deleteList(e) {
        let res = await fetch(`http://localhost:5050/content/list/?id=${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await res.text()
        switch (res.status) {
            case 200:
                reLoadLists()
                setMsg('')
                setPgMsg(data)
                break;
            case 401:
                setMsg(data)
                setPgMsg('  ')
                setStatus(false)
                break;
            default:
                setPgMsg(data)
                break
        }
    }

    async function reLoadLists() {
        const res = await fetch('http://localhost:5050/content/lists', { credentials: 'include' })
        const data = await res.text()
        console.log(res.status)
        switch (res.status) {
            case 200:
                setList(JSON.parse(data))
                break;
            case 204:
                setMsg('')
                setList([])
                break;
            case 401:
                setMsg(data)
                setPgMsg('  ')
                setStatus(false)
                break;
            default:
                setMsg('')
                setPgMsg(data)
        }
    }

    return (
        <div>
            {status ? (

            <div>
                {pgMsg !== '' ? <Msgbox msg={pgMsg}/> : null}
                <div className='listlist-container'>
                    <NewList setMsg={setMsg} setStatus={setStatus} status={status} setList={setList} list={list} setPgMsg={setPgMsg} />
                    <ul className='listlist'>
                        {list.map((listEntry) => (
                            <li className='list-container' key={"list-" + listEntry.id}>
                                <div className='list-header'>
                                    <User key={"listname-" + listEntry.id} id={listEntry.id} name={listEntry.name} />
                                    <Addbutton id={listEntry.id} key={'Dispbutton-' + listEntry.id} callback={addItems} text="Display items" />
                                    <Addbutton id={listEntry.id} key={'Delbutton-' + listEntry.id} callback={deleteList} text="Delete list" />
                                </div>
                                <NewItem setPgMsg={setPgMsg} setMsg={setMsg} setStatus={setMsg} setList={setList} list={list} parentlist={listEntry.id} pgMsg={pgMsg} />


                                {listEntry.items !== undefined ? <Itemcontainer setPgMsg={setPgMsg} items={listEntry.items} setMsg={setMsg} setStatus={setStatus} setList={setList} list={list} parentlist={listEntry.id}  /> :
                                    null}

                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            ) : null}
        </div>
    )
}