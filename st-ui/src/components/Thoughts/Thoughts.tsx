import { useState } from 'react';
import ThoughtModel from '@/components/Thoughts/Models/thought';
import Thought from '@/components/Thoughts/Thought';
import '@/components/Thoughts/Thoughts.css';

const THOUGHT_TIMEOUT = 60000; // 1 minute

let currentId = 1;
function generateId(): number {
    return currentId++;
}

function Thoughts() {
    const [thoughts, setThoughts] = useState<ThoughtModel[]>([]);
    const [thought, setThought] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (thought.trim() === '') return;

        const newThought: ThoughtModel = {
            id: generateId(),
            content: thought,
            createdAt: new Date(),
        };

        // Automatically delete after THOUGHT_TIMEOUT miliseconds
        const timeoutId = setTimeout(() => {
            handleDelete(newThought.id);
            clearTimeout(timeoutId);
        }, THOUGHT_TIMEOUT);

        setThoughts(prev => [newThought, ...prev]);
        setThought('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThought(event.target.value);
    }

    const handleDelete = (thoughtId: number) => {
        setThoughts(prev => prev.filter(t => t.id !== thoughtId));
    };

    return (
        <div className="thoughts">
            <form className="thoughts-form" onSubmit={handleSubmit}>
                <h1>Add some temporary thoughts</h1>

                <div className="thoughts-inputs">
                    <input name="thought" onChange={handleChange} value={thought} type="text" maxLength={100} placeholder="Write your thought here..." />
                    <button type="submit">Add</button>
                </div>
            </form>

            <div className='thoughts-list'>
                {thoughts.map(t => { 
                    return <Thought key={t.id} thought={t} onDelete={handleDelete} expiresIn={THOUGHT_TIMEOUT} />
                })}
            </div>
        </div>
    )
}

export default Thoughts;
