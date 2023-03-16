export default function NewList({setMsg, setStatus, status, setList, list, setPgMsg}){
    async function postList(e){
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
                setMsg(`List ${e.target.listname.value} created`)
                setPgMsg('')
                refetchLists()
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
    async function refetchLists(){
        const res = await fetch('http://localhost:5050/content/lists', { credentials: 'include' })
        const data = await res.text()
        console.log('get list resstatus')
        console.log(res.status)
        switch (res.status) {
            case 200:
                setList(JSON.parse(data))
                setMsg('Lists re-loaded')
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
    }



    return(
        <div>
            <h2>Create a new list</h2>
            <form onSubmit={postList}>
                <label htmlFor="listname">List name</label>
                <input type="text" id="listname" name="listname" />
                <input type="submit" value="Create" />
            </form>
        </div>
        )
}