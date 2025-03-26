import React, { useEffect, useState } from 'react';
import ChoreEntry from './components/choreEntry';
import { fetchAllChores } from './backend/csFirebase';
import Chore from './backend/models/chore'; // Assuming Chore is defined here
import ChoreEntryProps from './backend/models/ChoreEntry';
import NavBar from './components/navBar';

const App: React.FC = () => {
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
        <div className = "container">
            <NavBar />
            <p>Welcome to the Chore Calendar</p>
            {/* Pass the choreCollection array to ChoreEntry */}
            <ChoreEntry choreCollection={allChores.choreCollection} />
        </div>
    );
};

export default App;