import ThoughtModel from "@/components/Thoughts/Models/thought";
import styled, { css, keyframes } from "styled-components";

const fadeToGray = (backgroundColor: string) => keyframes`
    from { background-color: ${backgroundColor}; }
    to { background-color: gray; }
`;

const Box = styled.div<{ animate?: boolean, expiresIn?: number, backgroundColor?: string }>`
    display: flex;
    margin: 0.75rem 0;
    width: 100%;
    padding: 0.75rem;
    border: 2px solid gray;
    border-radius: 0.5rem;
    box-shadow: 5px 5px;
    font-size: 14pt;
    ${({ animate, expiresIn, backgroundColor }) => {
        if (animate && expiresIn && backgroundColor) {
            return css`animation: ${fadeToGray(backgroundColor)} ${expiresIn}ms linear forwards;`;
        }
    }}

    ${({ backgroundColor }) => backgroundColor ? css`background-color: ${backgroundColor};` : ''}
`;

const DeleteButton = styled.button`
    margin-left: auto;
    background-color: transparent;
    border: none;
    font-size: 14pt;
    cursor: pointer;
`;

interface ThoughtProps {
    thought: ThoughtModel,
    onDelete: (thoughtId: number) => void,
    expiresIn?: number
};

function Thought({ thought, onDelete, expiresIn }: ThoughtProps) {
    const backgroundColor = thought.isSelf ? '#ffe7ab' : '#99a5ff';
    const handleDelete = () => {
        onDelete(thought.id);
    };

    return (
        <Box animate expiresIn={expiresIn} backgroundColor={backgroundColor}>
            <p>{thought.content}</p>

            <DeleteButton onClick={handleDelete}>&times;</DeleteButton>
        </Box>
    );
}

export default Thought;