import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeListings } from '../fake-data';
import { FormsModule } from '@angular/forms';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contanct-page',
  imports: [FormsModule],
  templateUrl: './contanct-page.component.html',
  styleUrl: './contanct-page.component.css'
})
export class ContanctPageComponent implements OnInit {
  email: string = ''
  message: string = ''
  listing: Listing

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private listingsService: ListingsService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? ''
    this.listingsService.getListingById(id)
      .subscribe(listing => {
        this.listing = listing
        this.message = `Hi, I'm interested in your ${this.listing.name.toLocaleLowerCase()}!`
      } )
  }

  sendMessage(): void{
    alert('Your message has been sent!')
    this.router.navigateByUrl('/listings')
  }
}
