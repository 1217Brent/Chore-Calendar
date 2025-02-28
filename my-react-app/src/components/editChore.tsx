import React from "react"
import { useLocation } from "react-router-dom";

interface EditChoreProps {
    userId: string;
}

const EditChore: React.FC<EditChoreProps> = ({ userId }) => {
    const location = useLocation();
    const { choreId } = location.state || {};

    

    return (<div>

    </div>);
}