import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColourService } from '../services/colour.service';

@Directive({
  selector: '[libBackgroundColour]'
})
export class BackgroundColorDirective implements OnInit, OnChanges, OnDestroy {
  @Input() libBackgroundColour: string = '';
  private colorSubscription: Subscription | undefined;
  private currentColor: string = '';

  constructor(
    private el: ElementRef,
    private colorService: ColourService
  ) {}

  ngOnInit(): void {
    // Subscribe to color changes and update dynamically
    this.colorSubscription = this.colorService.colors$.subscribe(() => {
      this.applyColor();
    });
    
    // Initial color application
    this.applyColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libBackgroundColour'] && !changes['libBackgroundColour'].firstChange) {
      this.applyColor();
    }
  }

  private applyColor(): void {
    if (!this.libBackgroundColour) {
      console.warn('No background color variable specified');
      return;
    }

    const newColor = this.colorService.getColor(this.libBackgroundColour);
    if (newColor && newColor !== this.currentColor) {
      this.currentColor = newColor;
      this.el.nativeElement.style.backgroundColor = newColor;
    }
  }

  ngOnDestroy(): void {
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }
}
