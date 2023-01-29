export class Combination<
  TType extends string = string,
  TColor extends string = string
> {
  type: TType;
  color: TColor;
  keys: string[];

  constructor(type: TType, color: TColor, keys: string[]) {
    this.type = type;
    this.color = color;
    this.keys = keys;
  }

  getId(): string {
    return `${this.type}-${this.color}-${this.keys.toString()}`;
  }
}
