import ThoughtModel from "@/components/Thoughts/Models/thought";
import '@/components/Thoughts/Thought.css';

interface ThoughtProps {
    thought: ThoughtModel,
    onDelete: (thoughtId: number) => void,
};

function Thought({ thought, onDelete }: ThoughtProps) {
    const handleDelete = () => {
        onDelete(thought.id);
    };

    return (
        <div className="thought">
            <p>{thought.content}</p>

            <button className="thought-delete-button" onClick={handleDelete}>&times;</button>
        </div>
    );
}

export default Thought;