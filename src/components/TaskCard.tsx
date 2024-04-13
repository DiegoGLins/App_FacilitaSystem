import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';

interface TaskCardProps {
    children: React.ReactNode
}

const TaskCard: React.FC<TaskCardProps> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 650,
                    height: 58,
                },
            }}
        >
            <Paper elevation={3}>{children}</Paper>
        </Box>
    );
}

export default TaskCard