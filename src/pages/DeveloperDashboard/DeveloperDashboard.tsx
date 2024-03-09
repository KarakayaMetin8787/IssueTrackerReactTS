import { useState } from "react";
import Messages from "../../components/Messages/Messages";
import MessagesEnlarged from "../../components/MessagesEnlarged/MessagesEnlarged";
import News from "../../components/News/News";
import OpenProjects from "../../components/OpenProjects/OpenProjects";
import OwnProjects from "../../components/OwnProjects/OwnProjects";
import "./DeveloperDashboard.scss"

const DeveloperDashboard = () => {

    const [isMessagesEnlargedVisible, setIsMessagesEnlargedVisible] = useState("");

    const handleMessagesClick = () => {
        if (isMessagesEnlargedVisible === "hide") {
            setIsMessagesEnlargedVisible("");
        } else if (isMessagesEnlargedVisible === "") {
            setIsMessagesEnlargedVisible("hide")
        }
    };

    return ( 
        <div className="DeveloperDashboardContainer">
            <div className="ContentContainer">
                <div className="ContainerLeftItems">
                    <Messages onClick={handleMessagesClick}/>
                    <OwnProjects/>
                    <OpenProjects/>
                </div>
                <News/>
            </div>
            <MessagesEnlarged Condition={isMessagesEnlargedVisible} />
        </div>
    );
}
 
export default DeveloperDashboard;