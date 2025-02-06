export interface VectorLike {
    x: number;
    y: number;
}
export interface IShape {
    draw: (color: string, offset?: VectorLike) => void
}