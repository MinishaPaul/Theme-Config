import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  private colorMap: { [key: string]: string } = {}; // Store color configurations
  private isBrowser: boolean;
  private storageKey = 'colorConfig'; // Key for storing colors in sessionStorage

  private colorsSubject = new BehaviorSubject<{ [key: string]: string }>({});
  colors$ = this.colorsSubject.asObservable(); // Expose as observable for real-time updates

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if the platform is a browser
    this.loadColorConfig();
  }

  /**
   * Method to fetch the color configuration and load colors from sessionStorage or JSON.
   */
  private loadColorConfig(): void {
    if (this.isBrowser) {
      // Check if color config is stored in sessionStorage
      const storedColors = sessionStorage.getItem(this.storageKey);
      if (storedColors) {
        console.log("From session...");
        this.colorMap = JSON.parse(storedColors);
        this.colorsSubject.next(this.colorMap); // Emit new values
        return;
      }
    }

    // If not found in storage or non-browser environment, fetch from JSON file
    this.http.get<any>('assets/colors/color-config.json').subscribe(
      (data) => {
        console.log("From JSON file...");
        this.colorMap = data;
        this.colorsSubject.next(this.colorMap); // Emit new values to subscribers
        if (this.isBrowser) {
          sessionStorage.setItem(this.storageKey, JSON.stringify(data));
        }
        console.log('Colors loaded from JSON:', this.colorMap);
      },
      (error) => {
        console.error('Error loading color config:', error);
      }
    );
  }

  /**
   * Method to update color for a specific variable and store it.
   * @param variableName The key for the color variable (e.g., 'primary-color')
   * @param colorValue The new color value (e.g., '#ff5733')
   */
  setColor(variableName: string, colorValue: string): void {
    this.colorMap[variableName] = colorValue;

    // Store updated colorMap in sessionStorage for persistence during the session
    if (this.isBrowser) {
      sessionStorage.setItem(this.storageKey, JSON.stringify(this.colorMap));
    }

    this.colorsSubject.next(this.colorMap); // Emit changes for real-time UI updates
    console.log(`Color for ${variableName} updated to ${colorValue}`);
  }

  /**
   * Method to get the color for a specific variable.
   * @param variableName The key for the color variable (e.g., 'primary-color')
   * @returns The color value for the given variable or an empty string if not found
   */
  getColor(variableName: string): string {
    return this.colorMap[variableName] || '';
  }

  /**
   * Method to get all colors (useful for UI configuration or preview page).
   * @returns All color configurations
   */
  getAllColors(): { [key: string]: string } {
    return this.colorMap;
  }
}
