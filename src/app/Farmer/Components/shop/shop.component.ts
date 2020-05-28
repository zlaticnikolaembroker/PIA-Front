import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface Product {
  amount: number;
  price: number;
}

interface Order {
  farmer_id: number;
  company_id: number;
  products: Product[];
}

interface CompanyProducts {
  company_id: number;
  company_name: string;
  products: [];
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  showAll: boolean;
  showSeedlings: boolean;
  showPreparations: boolean;
  private lastSortingParameter: string = '';
  private allProducts;
  products;

  message: string = null;

  order: Order = null;

  companies: CompanyProducts[] = [];

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }
  private filterCompanyProduct() {
    this.companies = [];
    const distinctCompanies = (new Set(this.products.map(element => element.company_id)));
    distinctCompanies.forEach((company) => {
      this.companies.push({
        company_id: company,
        company_name: company,
        products: this.products.filter(product => {
          return product.company_id == company;
        }),
      } as CompanyProducts);
    });
    this.companies = this.companies.map(company => {
      return {
        ...company,
        products: company.products ? company.products : [],
      }
    });
    this.companies = this.companies.map(company => {
      return {
        ...company,
        // @ts-ignore
        company_name: company.products.length > 0 ? company.products[0].producer : company.company_name,
      }
    })
  }
  ngOnInit(): void {
    this.showAll = true;
    this.showPreparations = true;
    this.showSeedlings = true;
    this.http.get('http://localhost:3000/farmer/online_shop').subscribe((data) => {
          this.products = data;
          this.allProducts = data;
          this.products = this.products.map(element => {
            return {
              ...element,
              orderAmount: 0,
            }
          });
          this.filterCompanyProduct();
      });
  }

  sort(field) {
    this.companies.forEach(company => {
      company.products = company.products.sort((a, b) => {
        if (!a[field]) {
          return this.lastSortingParameter == field ? 1 : -1;
        }
        if (!b[field]) {
          return this.lastSortingParameter == field ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return this.lastSortingParameter == field ? -1 : 1;
        }
        if (a[field] < b[field]) {
          return this.lastSortingParameter == field ? 1 : -1;
        }
        return 0;
      })
    })
    this.lastSortingParameter =  this.lastSortingParameter == field ? null : field;
  }

  handleShowPreparations() {
    this.showAll = this.showAll ? false : this.showAll;
    this.showPreparations = !this.showPreparations;
    if (this.showSeedlings && this.showPreparations) this.showAll = true;
    this.filterProductsToShow();
  }

  handleShowAll() {
    this.showPreparations = this.showSeedlings = this.showAll = !this.showAll;
    this.filterProductsToShow();
  }

  handleShowSeedlings() {
    this.showAll = this.showAll ? false : this.showAll;
    this.showSeedlings = !this.showSeedlings;
    if (this.showSeedlings && this.showPreparations) this.showAll = true;
    this.filterProductsToShow();
  }

  filterProductsToShow() {
    this.products = this.allProducts.filter((product) => {
      return (product.type == 'Seedling' && this.showSeedlings) || (product.type == 'Preparation' && this.showPreparations);
    });
    this.filterCompanyProduct();
  }

  productClicked(id) {
    this.router.navigate(['/farmer/online_shop/' + id])
  }

  checkOrder() :[]{
    this.message = null;
    this.products.forEach(element => {
      if (element.available < element.orderAmount) {
        this.message = "Not enough avaible amount for:" + element.name;
      }
    });
    this.products.forEach(element => {
      if (element.orderAmount < 0) {
        this.message = "Amount can't be zero.";
      }
    });
    if (this.message) {
      return [];
    }
    const productsForOrder = this.products.filter(product => {
      return product.orderAmount > 0;
    });
    productsForOrder.length == 0 ? this.message = "Please, add at least one product" : null;
    return productsForOrder;
  }

  makeOrder() {
    const productsForOrder = this.checkOrder();
    if (productsForOrder.length > 0) {

    }
  }

}
