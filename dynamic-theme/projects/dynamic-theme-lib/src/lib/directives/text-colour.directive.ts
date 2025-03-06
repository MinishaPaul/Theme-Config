import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColourService } from '../services/colour.service';

@Directive({
  selector: '[libTextColour]'
})
export class TextColorDirective implements OnChanges, OnDestroy {
  @Input() libTextColour: string = ''; // The input property for text color name
  private colorSubscription: Subscription;

  constructor(private el: ElementRef, private colorService: ColourService) {
    // Subscribe to color changes and update dynamically
    this.colorSubscription = this.colorService.colors$.subscribe(() => {
      this.applyTextColor();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libTextColour'] && this.el.nativeElement && this.el.nativeElement.style) {
      this.applyTextColor();
    }
  }

  private applyTextColor(): void {
    const color = this.colorService.getColor(this.libTextColour); // Get color from the service
    if (color) {
      // Check if the element is an SVG
      if (this.el.nativeElement instanceof SVGElement) {
        // Apply color to the SVG element itself (fill and stroke)
        this.el.nativeElement.setAttribute('fill', color);
        this.el.nativeElement.setAttribute('stroke', color);

        // Optionally, apply color to any child SVG elements
        const childElements = this.el.nativeElement.querySelectorAll('path, circle, rect, text, line, polygon');
        childElements.forEach((child: Element) => {
          (child as SVGElement).setAttribute('fill', color);
          (child as SVGElement).setAttribute('stroke', color);
        });
      } else {
        // Apply color to the host element (for regular text content)
        this.el.nativeElement.style.color = color;

        // Optionally, apply color to any child text elements
        const childElements = this.el.nativeElement.querySelectorAll('p, span, h1, h2, h3');
        childElements.forEach((child: HTMLElement) => {
          child.style.color = color;
        });
      }
    } else {
      console.warn(`Text color "${this.libTextColour}" not found.`);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }
}
