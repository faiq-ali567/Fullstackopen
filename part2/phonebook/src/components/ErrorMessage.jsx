const ErrorMessage = ({ errorMessage }) => {
    if (!errorMessage?.length) {
        return null
    }

    return(
        <div style={{border: "2px solid #920404"}}>
            <div style={{padding: "10px"}}>
                {errorMessage}
            </div>
        </div>
    )
}

export default ErrorMessage
