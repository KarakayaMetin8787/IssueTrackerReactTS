import "./Messages.scss"

const Messages = ({ onClick }) => {


    return ( 
        <div className="MessagesContainer" onClick={onClick}>
            <h2>Inbox</h2>
        </div>
    );
}
 
export default Messages;