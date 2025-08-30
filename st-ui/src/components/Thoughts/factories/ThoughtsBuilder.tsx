import SocketContext from "@/contexts/socketContext";
import Thoughts from "../Thoughts";

function ThoughtsFactory() {
    return <Thoughts socketContext={new SocketContext("/api/v1/thoughts")} />;
}

export default ThoughtsFactory;