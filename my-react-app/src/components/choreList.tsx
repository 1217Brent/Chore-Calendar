import ChoreEntry from "./choreEntry";
import { fetchAllChores } from "../../backend/csFirebase";
import { useState, useEffect } from "react";
import { deleteAllChores } from "../../backend/csFirebase";

const ChoreList: React.FC = () => {
    let [allChores, setAllChores] = useState<any>([]);
    useEffect(() => {
        const fetchAll = async () => {
            allChores = await fetchAllChores();
            setAllChores(allChores);
        }
        fetchAll();
    }, []);
    const deleteAll = async () => {
        // deleteChore(); only running this will not update the entire page since you need to update the state
        await deleteAllChores();
        const newChoreList = fetchAllChores();
        setAllChores(newChoreList);
    }
    return (
        <div className = "container">
            <ChoreEntry choreCollection={allChores}/>
            <button onClick={() => deleteAll}>Finish Week</button>
        </div>

    );
}

export default ChoreList;