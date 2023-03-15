//Components
import Addbutton from "./Addbutton"

export default function Item({ item, setMsg, setStatus, setList, list, parentlist, setPgMsg, fetchItems }) {

    async function markAsDone(e) {
        let res = await fetch(`http://localhost:5050/content/item/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.id, completed: 1 }),
            credentials: 'include'
        })
        const data = await res.text()
        switch (res.status) {
            case 200:
                let res2 = await fetch(`http://localhost:5050/content/item?id=${e.target.id}`, { credentials: 'include' })
                const data = await res2.text()
                if (res2.status === 200) {
                    let returneditems = JSON.parse(data)
                    let listCopy = list
                    listCopy.forEach(list => {
                        if (list.id === parentlist) {
                            list.items.forEach(item => {
                                if (item.id == e.target.id) {
                                    console.log('found')
                                    console.log(item)
                                    console.log(item.id)
                                    item.completed = returneditems[0].completed
                                    console.log(item)
                                }
                            });
                        }
                    });
                    setList(listCopy)
                }
                setMsg('Item marked as done')
                break;
            case 401:
                setMsg(data)
                setStatus(false)
                break;
            default:
                setMsg(data)
        }
    }
    async function unmarkAsDone(e) {
        let res = await fetch(`http://localhost:5050/content/item/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.id, completed: 0 }),
            credentials: 'include'
        })
        const data = await res.text()
        switch (res.status) {
            case 200:
                case 200:
                    let res2 = await fetch(`http://localhost:5050/content/item?id=${e.target.id}`, { credentials: 'include' })
                    const data = await res2.text()
                    if (res2.status === 200) {
                        let returneditems = JSON.parse(data)
                        let listCopy = list
                        listCopy.forEach(list => {
                            if (list.id === parentlist) {
                                list.items.forEach(item => {
                                    if (item.id == e.target.id) {
                                        console.log('found')
                                        console.log(item)
                                        console.log(item.id)
                                        item.completed = returneditems[0].completed
                                        console.log(item)
                                    }
                                });
                            }
                        });
                        console.log(listCopy)
                        setList(listCopy)
                    }
                    setMsg('Item marked as undone')
                    break;
            case 401:
                setMsg(data)
                setPgMsg('  ')
                setStatus(false)
                break;
            default:
                setMsg(data)
        }
    }

    async function deleteItem(e) {

        console.log(parentlist)
        let res = await fetch(`http://localhost:5050/content/item/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.id }),
            credentials: 'include'
        })
        const data = await res.text()
        switch (res.status) {
            case 200:
                refetchItems(parentlist)
                setMsg('Item deleted')
                break;
            case 401:
                setMsg(data)
                setPgMsg('  ')
                setStatus(false)
                break;
            default:
                setMsg(data)
        }
    }

    async function refetchItems(listId) {
        
        let res2 = await fetch(`http://localhost:5050/content/list/?id=${listId}`, { credentials: 'include' })
        const data = await res2.text()
        let listCopy = list//[...list]
        console.log(res2.status)
        console.log(data)
        switch (res2.status) {
            case 200:
                setPgMsg('')
                listCopy.find((list) => list.id == listId).items = JSON.parse(data)
                setList(listCopy)
                setMsg(`Items loaded for list ${listCopy.find((list) => list.id == listId).name}`)
                break;
            case 204:
                setMsg(`No items to return for ${listCopy.find((list) => list.id == listId).name}`)
                break;
            case 401:
                setMsg(data)
                setPgMsg('  ')
                setStatus(false)
                break;
            default:
                setMsg(data)
                break
        }
    }


    return (
        <div id={parentlist}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><span>created: </span>{item.created}</p>
            {item.completed === null ? (<div><p><span>completed: </span>{item.completed} </p><Addbutton id={item.id} text="Done" callback={markAsDone} /></div>) : (<div><p><span>completed: </span>{item.completed} </p> <Addbutton id={item.id} text="Unmark as done" callback={unmarkAsDone} /></div>)
            }
            <Addbutton data-parent={parentlist} id={item.id} text="Delete" callback={deleteItem} parentlist={parentlist} />
        </div>
    )
}