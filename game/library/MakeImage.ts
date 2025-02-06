export const CreateImage = (url): HTMLImageElement => {
    let image = new Image();
    image.src = url;
    return image;
}