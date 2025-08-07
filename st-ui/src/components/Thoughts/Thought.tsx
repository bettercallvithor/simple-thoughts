import ThoughtModel from "@/components/Thoughts/Models/thought";
import '@/components/Thoughts/Thought.css';

interface ThoughtProps {
    thought: ThoughtModel,
    onDelete: (thoughtId: number) => void,
    expiresIn?: number
};

function Thought({ thought, onDelete, expiresIn }: ThoughtProps) {
    const handleDelete = () => {
        onDelete(thought.id);
    };

    return (
        <div className="thought" style={{ animation: expiresIn ? `expires ${expiresIn}ms ease-in` : undefined }}>
            <p>{thought.content}</p>

            <button className="thought-delete-button" onClick={handleDelete}>&times;</button>
        </div>
    );
}

export default Thought;