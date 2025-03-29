import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../types';

@Component({
  selector: 'app-listing-data-form',
  imports: [FormsModule],
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.css'
})
export class ListingDataFormComponent {
  @Input() buttonText: string
  @Input() currentName: string = ''
  @Input() currentDescription: string = ''
  @Input() currentPrice: number = 0

  name: string = ''
  description: string = ''
  price: number = 0

  @Output() onSubmit = new EventEmitter<Listing>()
  
  constructor(private router: Router){}

  ngOnInit(): void {
    this.name = this.currentName
    this.description = this.currentDescription
    this.price = this.currentPrice
  }

  onButtonClicked(){
    this.onSubmit.emit({
      id: '',
      name: this.name,
      description: this.description,
      price: Number(this.price),
      views : 0
    })
  }
}
