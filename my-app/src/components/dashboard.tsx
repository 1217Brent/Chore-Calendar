import NavBar from "./navBar";
import ChoreEntry from "./choreEntry";
import ChoreEntryProps from "../backend/models/ChoreEntry";
import { fetchAllChores } from "../backend/csFirebase";
import { useState, useEffect } from "react";

function DashBoard() {
        const [allChores, setAllChores] = useState<ChoreEntryProps>({ choreCollection: [] });
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const chores = await fetchAllChores();
                    setAllChores({ choreCollection: chores.choreCollection }); // Wrap the array in an object
                } catch (error) {
                    console.error("Error fetching chores:", error);
                }
            };
    
            fetchData();
        }, []); // Empty dependency array means this effect runs once on mount
    return (
        <div className="d-flex bg-dark" style={{ height: '100vh', overflow: 'hidden' }}>
        <NavBar />
        <div className="flex-grow-1" style={{ marginLeft: '280px', padding: '20px' }}>
            <ChoreEntry choreCollection={allChores.choreCollection} />
        </div>
    </div>
    )
}

export default DashBoard;