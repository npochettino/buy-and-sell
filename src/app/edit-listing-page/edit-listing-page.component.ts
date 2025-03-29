import { Component, OnInit } from '@angular/core';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-listing-page',
  imports: [ListingDataFormComponent, CommonModule],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css'
})
export class EditListingPageComponent implements OnInit{
  listing: Listing
  constructor(
    private listingService: ListingsService,
    private router: Router, 
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''
    this.listingService.getListingById(id)
      .subscribe(listing => this.listing = listing)
  }

  onSubmit(form: {name: string, description: string, price: number}){
    this.listingService.editListing(this.listing.id, form.name, form.description, form.price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings')
      })    
  }
}
