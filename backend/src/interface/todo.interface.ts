interface ItodoBody {
    title: string;
    content: string;
    isCompleted?: boolean;
    userId: number;
}

interface IupdateTodo {
    title?: string;
    content?: string;
    isCompleted?: boolean;
}

export { ItodoBody, IupdateTodo } ;