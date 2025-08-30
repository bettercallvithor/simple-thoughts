class Thought {
    id: number;
    content: string;
    createdAt: Date;
    isSelf: boolean;

    constructor(
        id: number,
        content: string,
        createdAt: Date,
        isSelf: boolean,
    ) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.isSelf = isSelf;
    }
}

export default Thought;