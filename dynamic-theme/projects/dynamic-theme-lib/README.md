# Dynamic Theme Library for Angular

A flexible and powerful theme management library for Angular applications that allows dynamic color management and theme switching.

## Features

- Dynamic color management
- Theme persistence using session storage
- Fallback to default colors if configuration fails
- Real-time theme updates
- Support for background and text colors
- Easy integration with Angular applications

## Installation

```bash
npm install dynamic-theme-lib
```

## Quick Start

1. Import the module in your `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DynamicThemeLibModule } from 'dynamic-theme-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DynamicThemeLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
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

3. Set up your component to load the color configuration:

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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dynamic-theme-app';
  colorConfig: ColorConfig = {} as ColorConfig;
  
  constructor(
    private http: HttpClient,
    private colourService: ColourService
  ) {}

  ngOnInit() {
    // Load colors from configuration file
    this.http.get<ColorConfig>('assets/colors/color-config.json').subscribe({
      next: (data) => {
        this.colorConfig = data;
        sessionStorage.setItem('colorConfig', JSON.stringify(data));
      },
      error: (error) => {
        console.error('Error loading color configuration:', error);
      }
    });
  }
}
```

4. Use the directives in your template:

```html
<div class="container">
  <h1 libTextColour="primary-color">{{ title }}</h1>
  
  <div class="theme-controls">
    <h2 libTextColour="secondary-color">Theme Demo</h2>
    <div libBackgroundColour="background-color" class="demo-section">
      <h3 libTextColour="text-color">Background Color Demo</h3>
      <p libTextColour="text-color">This section demonstrates the background and text color directives.</p>
    </div>
  </div>

  <div class="content">
    <div class="card" libBackgroundColour="background-color">
      <h3 libTextColour="primary-color">Sample Card</h3>
      <p libTextColour="text-color">This card uses the theme colors from the configuration.</p>
    </div>
  </div>
</div>
```

5. Add some basic styles:

```scss
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.theme-controls {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.demo-section {
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.card {
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 20px;
  border: 1px solid #eee;
}
```

## API

### Directives

- `[libBackgroundColour]`: Apply background color to an element
- `[libTextColour]`: Apply text color to an element

### Service Methods

- `setColor(variableName: string, colorValue: string)`: Update a color value
- `getColor(variableName: string)`: Get a color value
- `getAllColors()`: Get all color configurations
- `reloadColors()`: Reload colors from configuration

## Requirements

- Angular 12 or higher (supports Angular 12.x, 13.x, 14.x, 15.x, 16.x, 17.x, 18.x, and 19.x)
- @angular/common/http

## Best Practices

1. **Color Configuration**:
   - Store your color configuration in `assets/colors/color-config.json`
   - Use meaningful color variable names
   - Include fallback colors in your configuration

2. **Directive Usage**:
   - Apply `libBackgroundColour` to container elements
   - Use `libTextColour` for text elements
   - Combine both directives for better visual hierarchy

3. **Error Handling**:
   - Always handle potential errors when loading the color configuration
   - Provide fallback colors in case of loading failures
   - Use session storage for persistence during the session

## License

MIT
