interface ItodoBody{
    title: string;
    content: string;
    isCompleted: boolean;
}

interface IupdateTodo{
    title?: string;
    content?: string;
}

export { ItodoBody, IupdateTodo } ;