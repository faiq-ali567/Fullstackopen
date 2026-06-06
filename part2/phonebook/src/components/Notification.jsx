import './notification.css'

const Notification = ({ message, isError }) => {
    if (!message?.length) {
        return null
    }

    return(
        <div class={isError ? "error" : "success"}>
            <div style={{padding: "10px"}}>
                {message}
            </div>
        </div>
    )
}

export default Notification
