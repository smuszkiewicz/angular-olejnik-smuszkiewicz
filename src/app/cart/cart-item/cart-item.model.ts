export class CartItem {
  public id: string;
  public name: string;
  public price: number;
  public amount: number;

  constructor(id: string, name: string, price: number, amount: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
}
