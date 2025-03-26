import React from 'react';
import NavBar from './navBar';

const Instructions: React.FC = () => {
    return (

        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <NavBar />
            <div className="card shadow" style={{ width: '50%' }}>
                <div className="card-header bg-primary text-white">
                    <h1 className="text-center">How to Use the Chore Calendar</h1>
                </div>
                <div className="card-body">
                    <ol className="list-group list-group-numbered">
                        <li className="list-group-item">
                            <strong>Add Chores:</strong> Click on the "Add Chore" button to create a new chore. Fill in the details such as the chore name, assigned person, and due date.
                        </li>
                        <li className="list-group-item">
                            <strong>View Calendar:</strong> Navigate to the calendar view to see all the chores organized by date.
                        </li>
                        <li className="list-group-item">
                            <strong>Edit or Delete Chores:</strong> Click on a chore to edit its details or delete it if it's no longer needed.
                        </li>
                        <li className="list-group-item">
                            <strong>Mark as Complete:</strong> Once a chore is done, mark it as complete by clicking the checkbox next to it.
                        </li>
                        <li className="list-group-item">
                            <strong>Filter Chores:</strong> Use the filter options to view chores by person, status (completed or pending), or date range.
                        </li>
                    </ol>
                    <p className="mt-4">
                        The Chore Calendar is designed to help you stay organized and ensure that all tasks are completed on time. <strong>Happy organizing!</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Instructions;