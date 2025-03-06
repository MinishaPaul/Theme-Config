import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColourService } from '../services/colour.service';

@Directive({
  selector: '[libBackgroundColour]'
})
export class BackgroundColorDirective implements OnChanges, OnDestroy {
  @Input() libBackgroundColour: string = '';
  private colorSubscription: Subscription;

  constructor(private el: ElementRef, private colorService: ColourService) {
    // Subscribe to color changes and update dynamically
    this.colorSubscription = this.colorService.colors$.subscribe(() => {
      this.applyColor();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libBackgroundColour']) {
      this.applyColor();
    }
  }

  private applyColor(): void {
    const color = this.colorService.getColor(this.libBackgroundColour);
    if (color) {
      this.el.nativeElement.style.backgroundColor = color;
    } else {
      console.warn(`Color for ${this.libBackgroundColour} not found.`);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }
}
