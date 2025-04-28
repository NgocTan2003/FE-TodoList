
export type Note = {
    _id: string,
    title: string;
    content: string;
    isPinned: boolean;
    pathImages: [],
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface INewData {
    _id: string,
    title: string,
    content: string,
    tags: []
}