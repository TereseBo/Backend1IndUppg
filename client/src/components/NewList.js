//Styles
import './newlist.scss'

export default function NewList({ setMsg, setStatus, setList, setPgMsg }) {

    async function postList(e) {
        e.preventDefault()
        let res = await fetch('http://localhost:5050/content/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: e.target.listname.value }),
            credentials: 'include'
        })
        const data = await res.text()
        switch (res.status) {
            case 201:
                setPgMsg(`List ${e.target.listname.value} created`)
                setMsg('')
                refetchLists()
                break;
            case 401:
                setMsg(data)
                setPgMsg('')
                setStatus(false)
                break;
            default:
                setPgMsg(data)
                break;
        }
        e.target.reset()
    }

    async function refetchLists() {
        const res = await fetch('http://localhost:5050/content/lists',
            { credentials: 'include' })
        const data = await res.text()
        switch (res.status) {
            case 200:
                setList(JSON.parse(data))
                break;
            case 204:
                setMsg('')
                setPgMsg("No Lists found")
                break;
            case 401:
                setMsg(data)
                setPgMsg('')
                setStatus(false)
                break;
            default:
                setMsg('')
                setPgMsg(data)
                break;
        }
    }

    return (
        <div>
            <form className='newlist-form' onSubmit={postList}>
                <h3>Create a new list</h3>
                <div>
                    <label htmlFor="listname">List name</label>
                    <input type="text" id="listname" name="listname" />
                </div>
                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        </div>
    )
}