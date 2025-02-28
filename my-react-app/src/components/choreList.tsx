import ChoreEntry from "./choreEntry";
import { fetchAllChores } from "../../../backend/models/csFirebase";
import { useState, useEffect } from "react";
import { deleteChore } from "../../../backend/models/csFirebase";

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
        deleteChore();
    }
    return (
        <div className = "container">
            <ChoreEntry choreCollection={allChores}/>
            <button onClick={() => deleteAll}>Finish Week</button>
        </div>

    );
}

export default ChoreList;