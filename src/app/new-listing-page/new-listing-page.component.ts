import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-new-listing-page',
  imports: [ListingDataFormComponent],
  templateUrl: './new-listing-page.component.html',
  styleUrl: './new-listing-page.component.css'
})
export class NewListingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private listingService: ListingsService
  ){}

  ngOnInit(): void {
  }

  onSubmit(form: { name: string, description: string, price: number }): void{
    this.listingService.createListing(form.name, form.description, form.price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings')
      })    
  }
}
