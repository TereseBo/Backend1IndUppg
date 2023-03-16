//Style
import './item.scss'

//Components
import Addbutton from "./Addbutton"

export default function Item({ item, setMsg, setStatus, setList, list, parentlist, setPgMsg }) {

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
                let bob= await updateItem(e.target.id)
                console.log(bob)
                if(bob){
                //updateItem(e.target.id)
                  setPgMsg('Item marked as done')
                }
/*                 let res2 = await fetch(`http://localhost:5050/content/item?id=${e.target.id}`, { credentials: 'include' })
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
                setPgMsg('Item marked as done')
 */                break;
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
                let bob= await updateItem(e.target.id)
                console.log(bob)
                if(bob){
                //updateItem(e.target.id)
                  setPgMsg('Item marked as undone')
                }
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
    async function updateItem(itemId) {
        let res2 = await fetch(`http://localhost:5050/content/item?id=${itemId}`, { credentials: 'include' })
        const data2 = await res2.text()
        let success = false
        switch (res2.status) {
            case 200:
                let returneditems = JSON.parse(data2)
                let listCopy = list
                listCopy.forEach(list => {
                    if (list.id === parentlist) {
                        list.items.forEach(item => {
                            if (item.id == itemId) {
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
                 success = true
                break;
            case 401:
                setMsg(data2)
                setPgMsg('  ')
                setStatus(false)
                break;
            default:
                setPgMsg(data2)

        }
        return success
    }




async function deleteItem(e) {

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
            setPgMsg('Item deleted')
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
    switch (res2.status) {
        case 200:
            //setPgMsg('')
            listCopy.find((list) => list.id == listId).items = JSON.parse(data)
            setList(listCopy)
            setMsg(`Items loaded for list ${listCopy.find((list) => list.id == listId).name}`)
            break;
        case 204:
            setPgMsg(`No items left in ${listCopy.find((list) => list.id == listId).name}`)
            delete listCopy.find((list) => list.id == listId).items
            setList(listCopy)
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
    <div className="item" id={parentlist}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p><span>created: </span>{item.created}</p>
        {item.completed !== null ?
            (<p><span>completed: </span>{item.completed} </p>)
            : (<p>Not done</p>)}
        <div className="button-container">
            {item.completed === null ?
                (<Addbutton id={item.id} text="Mark as done" callback={markAsDone} />)
                :
                (<Addbutton id={item.id} text="Unmark as done" callback={unmarkAsDone} />)
            }
            <Addbutton id={item.id} text="Delete" callback={deleteItem} />
        </div>
    </div>
)
}