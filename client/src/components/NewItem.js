import {useState} from 'react'

export default function NewItem({ setMsg, setStatus, status, setList, list, parentlist }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('handleSubmit')
        let res = await fetch(`http://localhost:5050/content/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description, list: parentlist }),
            credentials: 'include'
        })
        const data = await res.text()
        console.log(data)
        switch (res.status) {
            case 201:
                let res2 = await fetch(`http://localhost:5050/content/list/?id=${parentlist}`, { credentials: 'include' })
                const data = await res2.text()
                console.log(data)
                console.log(res2.status)
                let listCopy = list//[...list]
                console.log(listCopy)
                console.log(res2.status)
                switch (res2.status) {
                    case 200:
                        console.log(data)
                        console.log(listCopy)
                        console.log(e.target.id)
                        console.log(listCopy.find((list) => list.id == e.target.id))
                        listCopy.find((list) => list.id == parentlist).items=JSON.parse(data)
                        console.log(listCopy)
                        setList(listCopy)
                        console.log(list)
                        setMsg(`Items reloaded for list ${listCopy.find((list) => list.id == parentlist).name}`)
                        break;
                    case 204:
                        
                        break;
                    case 401:
                        setMsg(data)
                        setStatus(false)
                        break;
                    default:
                        setMsg(data)
                }
            
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
        <form onSubmit={handleSubmit}>
            <h3>Add new todo-item</h3>
            <label>Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <label>Description</label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add</button>
        </form>
    )
}