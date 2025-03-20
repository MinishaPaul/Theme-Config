import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColourService } from '../services/colour.service';

@Directive({
  selector: '[libTextColour]'
})
export class TextColorDirective implements OnInit, OnChanges, OnDestroy {
  @Input() libTextColour: string = ''; // The input property for text color name
  private colorSubscription: Subscription | undefined;
  private currentColor: string = '';

  constructor(private el: ElementRef, private colorService: ColourService) {}

  ngOnInit(): void {
    // Subscribe to color changes and update dynamically
    this.colorSubscription = this.colorService.colors$.subscribe(() => {
      this.applyColor();
    });
    
    // Initial color application
    this.applyColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libTextColour'] && !changes['libTextColour'].firstChange) {
      this.applyColor();
    }
  }

  private applyColor(): void {
    if (!this.libTextColour) {
      console.warn('No text color variable specified');
      return;
    }

    const newColor = this.colorService.getColor(this.libTextColour);
    if (newColor && newColor !== this.currentColor) {
      this.currentColor = newColor;
      this.el.nativeElement.style.color = newColor;
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }
}
