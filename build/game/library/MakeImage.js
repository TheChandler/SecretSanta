export const CreateImage = (url) => {
    let image = new Image();
    image.src = url;
    return image;
};
