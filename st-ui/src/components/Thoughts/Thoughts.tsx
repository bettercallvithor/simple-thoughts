import { useEffect, useState } from 'react';
import ThoughtModel from '@/components/Thoughts/Models/thought';
import Thought from '@/components/Thoughts/Thought';
import '@/components/Thoughts/Thoughts.css';
import type SocketContext from '@/contexts/socketContext';

const THOUGHT_TIMEOUT = 60000; // 1 minute

let currentId = 1;
function generateId(): number {
    return currentId++;
}

function createThoughtModel(content: string, isSelf: boolean): ThoughtModel {
    return {
        id: generateId(),
        content,
        createdAt: new Date(),
        isSelf,
    } as ThoughtModel;
}

interface ThoughtsProps {
    socketContext: SocketContext;
}

function Thoughts({ socketContext }: ThoughtsProps) {
    const [thoughts, setThoughts] = useState<ThoughtModel[]>([]);
    const [thought, setThought] = useState<string>('');

    useEffect(() => {
        const methodName = "ReceiveThought";
        socketContext.listenTo<string>(methodName, (thought: string) => {
            setThoughts(prev => [createThoughtModel(thought, false), ...prev]);
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (thought.trim() === '') return;

        const newThought = createThoughtModel(thought, true);

        // Automatically delete after THOUGHT_TIMEOUT miliseconds
        const timeoutId = setTimeout(() => {
            handleDelete(newThought.id);
            clearTimeout(timeoutId);
        }, THOUGHT_TIMEOUT);

        await socketContext.sendMessage<string>('SendThought', newThought.content);

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
