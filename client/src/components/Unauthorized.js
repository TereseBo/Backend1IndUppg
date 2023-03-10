import './Login';

export default function Unauthorized(msg) {
    return(
        <div>
            <h1>You can't do that</h1>
            <p>{msg}</p>
            <Login/>
            
        </div>
    )
}