import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listing-detail-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './listing-detail-page.component.html',
  styleUrl: './listing-detail-page.component.css'
})
export class ListingDetailPageComponent implements OnInit {
  listing: Listing;
  isLoading: boolean = true;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private listingService: ListingsService
  ){
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.listingService.getListingById(id)
      .subscribe(listing => {
        this.listing = listing;
        this.isLoading = false;
      })

    this.listingService.addViewToListing(id)
      .subscribe(() => console.log('Views updated!'))
  }

}
