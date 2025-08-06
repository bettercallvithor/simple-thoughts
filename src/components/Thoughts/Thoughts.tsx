import { useState } from 'react';
import ThoughtModel from '@/components/Thoughts/Models/thought';
import Thought from '@/components/Thoughts/Thought';
import '@/components/Thoughts/Thoughts.css';

let currentId = 1;
function generateId(): number {
    return currentId++;
}

function Thoughts() {
    const [thoughts, setThoughts] = useState<ThoughtModel[]>([
            { id: generateId(), content: 'Hello my friend', createdAt: new Date() },
            { id: generateId(), content: 'Please, add your thoughts here!', createdAt: new Date() },
        ]);
    const [thought, setThought] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (thought.trim() === '') return;

        const newThought: ThoughtModel = {
            id: generateId(),
            content: thought,
            createdAt: new Date(),
        };

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
        <div>
            <form className="thoughts-form" onSubmit={handleSubmit}>
                <h1>Add some temporary thoughts</h1>

                <div className="thoughts-inputs">
                    <input name="thought" onChange={handleChange} value={thought} type="text" maxLength={100} placeholder="Write your thought here..." />
                    <button type="submit">Add</button>
                </div>
            </form>

            <div className='thoughts-list'>
                {thoughts.map((t, i) => {
                    return <Thought key={"thought_" + i} thought={t} onDelete={handleDelete} />
                })}
            </div>
        </div>
    )
}

export default Thoughts;
