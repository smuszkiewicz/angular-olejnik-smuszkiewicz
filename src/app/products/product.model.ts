export class Product {
  public id: string;
  public name: string;
  public imagePath: string;
  public desc: string;
  public price: number;

  constructor(
    id: string,
    name: string,
    imagePath: string,
    desc: string,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.desc = desc;
    this.price = price;
  }
}
