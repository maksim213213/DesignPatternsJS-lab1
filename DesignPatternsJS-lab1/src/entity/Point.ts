export class Point {
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    /**
     * @param x Координата по оси X.
     * @param y Координата по оси Y.
     * @param z Координата по оси Z.
     */
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public toString(): string {
        return `Point(${this.x}, ${this.y}, ${this.z})`;
    }
}