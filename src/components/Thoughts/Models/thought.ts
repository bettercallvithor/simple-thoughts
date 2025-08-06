class Thought {
    id: number;
    content: string;
    createdAt: Date;

    constructor(
        id: number,
        content: string,
        createdAt: Date,
    ) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
    }
}

export default Thought;