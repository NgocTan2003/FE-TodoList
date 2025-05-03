
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

export const FormCreateDataKeys = {
    title: "title",
    content: "content",
    tags: "tags",
    isPinned: "isPinned",
    images: "images"
}

export const FormUpdateDataKeys = {
    title: "title",
    content: "content",
    tags: "tags",
    isPinned: "isPinned",
    imageOld: "imageOld",
    images: "images"
}