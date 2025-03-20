import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  private colorMap: { [key: string]: string } = {}; // Store color configurations
  private isBrowser: boolean;
  private storageKey = 'colorConfig'; // Key for storing colors in sessionStorage
  private configUrl = 'assets/colors/color-config.json';

  private colorsSubject = new BehaviorSubject<{ [key: string]: string }>({});
  colors$ = this.colorsSubject.asObservable(); // Expose as observable for real-time updates

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if the platform is a browser
    this.loadColorConfig();
    console.log("Color service getting called");
  }

  /**
   * Method to fetch the color configuration and load colors from sessionStorage or JSON.
   */
  private loadColorConfig(): void {
    console.log("Load config getting called");
    if (this.isBrowser) {
      // Check if color config is stored in sessionStorage
      const storedColors = sessionStorage.getItem(this.storageKey);
      if (storedColors) {
        console.log("From session...");
        try {
          this.colorMap = JSON.parse(storedColors);
          this.colorsSubject.next(this.colorMap); // Emit new values
          console.log('Colors loaded from session storage:', this.colorMap);
          return;
        } catch (error) {
          console.warn('Error parsing stored colors, falling back to config file:', error);
          sessionStorage.removeItem(this.storageKey);
        }
      }
    }

    // If not found in storage or non-browser environment, fetch from JSON file
    this.http.get<{ [key: string]: string }>(this.configUrl).pipe(
      tap((data: { [key: string]: string }) => {
        console.log('Colors loaded from config file:', data);
      }),
      catchError((error: any) => {
        console.error('Error loading color config:', error);
        // Return default colors if config file fails to load
        return of({
          'primary-color': '#007bff',
          'secondary-color': '#6c757d',
          'background-color': '#ffffff',
          'text-color': '#212529'
        });
      })
    ).subscribe((data: { [key: string]: string }) => {
      this.colorMap = data;
      this.colorsSubject.next(this.colorMap); // Emit new values to subscribers
      if (this.isBrowser) {
        try {
          sessionStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
          console.warn('Error storing colors in session storage:', error);
        }
      }
    });
  }

  /**
   * Method to update color for a specific variable and store it.
   * @param variableName The key for the color variable (e.g., 'primary-color')
   * @param colorValue The new color value (e.g., '#ff5733')
   */
  setColor(variableName: string, colorValue: string): void {
    if (!variableName || !colorValue) {
      console.warn('Invalid color update request:', { variableName, colorValue });
      return;
    }

    this.colorMap[variableName] = colorValue;

    // Store updated colorMap in sessionStorage for persistence during the session
    if (this.isBrowser) {
      try {
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.colorMap));
      } catch (error) {
        console.warn('Error storing updated colors:', error);
      }
    }

    this.colorsSubject.next({ ...this.colorMap });
    console.log(`Color updated: ${variableName} = ${colorValue}`);
  }

  /**
   * Method to get the color for a specific variable.
   * @param variableName The key for the color variable (e.g., 'primary-color')
   * @returns The color value for the given variable or an empty string if not found
   */
  getColor(variableName: string): string {
    const color = this.colorMap[variableName];
    if (!color) {
      console.warn(`Color not found for: ${variableName}`);
      return '';
    }
    return color;
  }

  /**
   * Method to get all colors (useful for UI configuration or preview page).
   * @returns All color configurations
   */
  getAllColors(): { [key: string]: string } {
    return { ...this.colorMap };
  }

  reloadColors(): void {
    this.loadColorConfig();
  }
}
