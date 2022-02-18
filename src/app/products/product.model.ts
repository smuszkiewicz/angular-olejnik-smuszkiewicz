export class Product {
  public name: string;
  public desc: string;
  public imagePath: string;
  public price: number;

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    price: number
  ) {
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.price = price;
  }
}
