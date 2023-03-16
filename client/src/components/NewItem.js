import { useState } from 'react'

//Styles
import './newitem.scss'

export default function NewItem({ setMsg, setStatus, status, setList, list, parentlist,  setPgMsg}) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    async function handleSubmit(e) {
        console.log('handleSubmit ran')
        e.preventDefault()//Prevents reload of page
        let res = await fetch(`http://localhost:5050/content/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description, list: parentlist }),
            credentials: 'include'
        })
        const data = await res.text()
        console.log('handlesubmit resstatus')
        console.log(res.status)
        switch (res.status) {
            case 201:
                setPgMsg('')
                refetchItems(e)
                setMsg(data)
            case 401:
                setMsg(data)
                setPgMsg(data)
                setStatus(false)
                break;
            default:
                setMsg(data)
        }
    }
    async function refetchItems(e) {
        console.log('refetch ran')

        let res2 = await fetch(`http://localhost:5050/content/list/?id=${e.target.id}`, { credentials: 'include' })
        const data = await res2.text()
        let listCopy = list//[...list]
        console.log('add items resstatus')
        console.log(res2.status)
        switch (res2.status) {
            case 200:
                setMsg('')
                listCopy.find((list) => list.id == e.target.id).items = JSON.parse(data)
                setList(listCopy)
                break;
            case 204:
                setMsg('')
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


    return (
        <form className='newitem-form' id={parentlist} onSubmit={handleSubmit}>
            <h3>Add new todo-item</h3>
            <div>
            <label>Name: </label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
            <label>Description: </label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
    )
}