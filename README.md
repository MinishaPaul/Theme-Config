# Dynamic Theme Library for Angular

A flexible and powerful Angular library for managing dynamic themes and color schemes in Angular applications. This library provides an easy way to implement dynamic color management with real-time updates and session persistence.

## Features

- 🎨 Dynamic color management
- 💾 Theme persistence using session storage
- 🔄 Real-time theme updates
- 🎯 Easy-to-use directives for background and text colors
- 📦 Simple integration with Angular applications
- ⚡ Support for Angular 12 through 19

## Repository Structure

![image](https://github.com/user-attachments/assets/d9bd9e2a-e88b-425a-9af1-231d36864138)


## Installation

```bash
npm install dynamic-theme-lib
```

## Usage

1. Import the module in your `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DynamicThemeLibModule } from 'dynamic-theme-lib';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    DynamicThemeLibModule
  ],
  // ...
})
export class AppModule { }
```

2. Create a color configuration file at `src/assets/colors/color-config.json`:

```json
{
  "primary-color": "#007bff",
  "secondary-color": "#6c757d",
  "background-color": "#ffffff",
  "text-color": "#212529"
}
```

3. Implement in your components:

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColourService } from 'dynamic-theme-lib';

interface ColorConfig {
  'primary-color': string;
  'secondary-color': string;
  'background-color': string;
  'text-color': string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private colourService: ColourService
  ) {}

  ngOnInit() {
    this.http.get<ColorConfig>('assets/colors/color-config.json').subscribe({
      next: (data) => {
        sessionStorage.setItem('colorConfig', JSON.stringify(data));
      },
      error: (error) => {
        console.error('Error loading color configuration:', error);
      }
    });
  }
}
```

4. Use the directives in your templates:

```html
<div class="container">
  <h1 libTextColour="primary-color">Your App Title</h1>
  
  <div class="card" libBackgroundColour="background-color">
    <h3 libTextColour="primary-color">Card Title</h3>
    <p libTextColour="text-color">Card content with themed text.</p>
  </div>
</div>
```

## API Reference

### Directives

- `[libBackgroundColour]`: Applies background color to an element
- `[libTextColour]`: Applies text color to an element

### ColourService Methods

- `setColor(variableName: string, colorValue: string)`: Updates a color value
- `getColor(variableName: string)`: Gets a color value
- `getAllColors()`: Gets all color configurations
- `reloadColors()`: Reloads colors from configuration

## Best Practices

1. **Color Configuration**:
   - Store color configuration in `assets/colors/color-config.json`
   - Use meaningful color variable names
   - Include fallback colors

2. **Error Handling**:
   - Handle configuration loading errors
   - Provide fallback colors
   - Use session storage for persistence

3. **Performance**:
   - Apply directives only where needed
   - Use service methods for dynamic updates
   - Implement proper unsubscribe patterns

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- Angular 12 or higher (supports Angular 12.x through 19.x)
- @angular/common/http

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For support, issues, or feature requests, please file an issue in the GitHub repository.

## Authors

- Minisha Paul (@minisha_paul_)

## Acknowledgments

- Angular team for the amazing framework
- Contributors and users of the library
