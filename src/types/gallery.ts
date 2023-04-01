export type ProcessedGallery = {
    image?: Image & {
        url: string,
    },
    length: number,
} & Pick<Gallery, "name" | "path">;

export type Gallery = {
    path:  string;
    image?: Image;
    name:  string;
    images?: Image[]
}

export type Image = {
    path:     string;
    fullpath: string;
    name:     string;
    modified: string;
}