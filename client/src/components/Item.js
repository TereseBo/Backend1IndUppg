import Addbutton from "./Addbutton"

export default function Item({ item, setMsg, setStatus, setList, list, parentlist }) {

    async function markAsDone(e) {
        console.log(list)
        console.log('markAsDone')
        console.log(e.target.id)
        let res = await fetch(`http://localhost:5050/content/item/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.id, completed: 1 }),
            credentials: 'include'
        })
        const data = await res.text()
        console.log(data)
        switch (res.status) {
            case 200:
                let res2 = await fetch(`http://localhost:5050/content/item?id=${e.target.id}`, { credentials: 'include' })
                const data = await res2.text()
                if (res2.status === 200) {
                    let returneditems = JSON.parse(data)
                    console.log(returneditems[0])



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
    async function unmarkAsDone(e, y) {
        console.log('markAsDone')
        console.log(e.target.id)
        let res = await fetch(`http://localhost:5050/content/item/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.id, completed: 0 }),
            credentials: 'include'
        })
        const data = await res.text()
        console.log(data)
        switch (res.status) {
            case 200:
                case 200:
                    let res2 = await fetch(`http://localhost:5050/content/item?id=${e.target.id}`, { credentials: 'include' })
                    const data = await res2.text()
                    if (res2.status === 200) {
                        let returneditems = JSON.parse(data)
                        console.log(returneditems[0])
    
    
    
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
                setStatus(false)
                break;
            default:
                setMsg(data)
        }
    }





    return (
        <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><span>created: </span>{item.created}</p>
            {item.completed === null ? (<div><p><span>completed: </span>{item.completed} </p><Addbutton id={item.id} text="Done" callback={markAsDone} /></div>) : (<div><p><span>completed: </span>{item.completed} </p> <Addbutton id={item.id} text="Unmark as done" callback={unmarkAsDone} /></div>)
            }
        </div>
    )

}