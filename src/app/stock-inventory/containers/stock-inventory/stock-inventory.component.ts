import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Product } from "../../models/product.interface";

@Component({
  selector: "app-stock-inventory",
  templateUrl: "./stock-inventory.component.html",
  styleUrls: ["./stock-inventory.component.scss"]
})
export class StockInventoryComponent {
  constructor(private fb: FormBuilder) {}

  products: Product[] = [
    { id: 1, price: 2800, name: "MacBook Pro" },
    { id: 2, price: 50, name: "USB-C Adaptor" },
    { id: 3, price: 400, name: "iPod" },
    { id: 4, price: 900, name: "iPhone" },
    { id: 5, price: 600, name: "Apple Watch" }
  ];

  form = this.fb.group({
    store: this.fb.group({
      branch: "",
      code: ""
    }),
    selector: this.createStock({}),
    stock: this.fb.array([
      this.createStock({ product_id: 1, quantity: 10 }),
      this.createStock({ product_id: 3, quantity: 50 })
    ])
  });

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || "",
      quantity: stock.quantity || 10
    });
  }

  addStock(stock) {
    const control = this.form.get("stock") as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup; index: number }) {
    const control = this.form.get("stock") as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log("Submit:", this.form.value);
  }
}
