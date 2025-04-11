# Maharashtra Scheme Visualizer

A modern dashboard application built to visualize and track the performance of various government schemes in Maharashtra. This project provides an intuitive interface for both administrators and general users to monitor KPIs (Key Performance Indicators) across different government initiatives.

## System Architecture

```mermaid
flowchart TD
    classDef frontend fill:#FFD700,stroke:#D4AF37,stroke-width:2px
    classDef components fill:#98FB98,stroke:#228B22,stroke-width:2px
    classDef state fill:#87CEEB,stroke:#4682B4,stroke-width:2px
    classDef data fill:#DDA0DD,stroke:#8B008B,stroke-width:2px

    subgraph Client ["Client Layer"]
        direction TB
        Browser["Web Browser"]
        Router["React Router"]
        
        Browser --> Router
    end

    subgraph Frontend ["Presentation Layer"]
        direction TB
        UI["UI Components"]
        RC["Recharts Library"]
        Tailwind["Tailwind CSS"]
        
        UI --> RC
        UI --> Tailwind
    end

    subgraph Components ["Component Layer"]
        direction TB
        subgraph Pages ["Pages"]
            LP["Login Page"]
            DP["Dashboard Page"]
        end
        
        subgraph Core ["Core Components"]
            SC["Scheme Cards"]
            CH["Charts"]:::components
            HD["Header"]
            KPI["KPI Cards"]
        end
        
        Pages --> Core
    end

    subgraph State ["State Management Layer"]
        direction LR
        AC["Auth Context"]
        SchC["Schemes Context"]
        
        AC --> SchC
    end

    subgraph Data ["Data Layer"]
        direction TB
        JSON["JSON Data Store"]
        Types["TypeScript Types"]
        
        JSON --> Types
    end

    Client --> Frontend
    Frontend --> Components
    Components --> State
    State --> Data

    class Frontend frontend
    class Components,Core,Pages components
    class State,AC,SchC state
    class Data,JSON,Types data
```

## Data Flow

```mermaid
sequenceDiagram
    autonumber
    
    participant B as Browser
    participant R as React App
    participant A as Auth Context
    participant S as Schemes Context
    participant C as Components
    participant D as Data Store

    B->>R: Access Application
    R->>A: Initialize Auth
    A->>R: Set User Role
    R->>S: Request Scheme Data
    S->>D: Fetch JSON Data
    D->>S: Return Scheme Data
    S->>C: Provide Formatted Data
    C->>B: Render Dashboard
    
    Note over B,D: Data refresh cycle
    
    B->>C: User Interaction
    C->>S: Request Updated Data
    S->>C: Return Updated State
    C->>B: Update Visualization
```

## Features

- **Interactive Dashboard**: Visualize scheme performance through various chart types:
  - Bar Charts
  - Line Charts
  - Gauge Charts
  - Pie Charts

- **Role-Based Access**:
  - Administrator view
  - General User view

- **Scheme Categories**:
  - Public Service Delivery
  - Economic Growth & Financial Management
  - Environmental Protection & Sustainability
  - And more...

- **Real-time KPI Tracking**:
  - Current values vs. Target values
  - Historical trend analysis
  - Performance metrics
  - Unit-based measurements

- **Modern UI/UX**:
  - Responsive design
  - Clean and intuitive interface
  - Maharashtra government branding
  - Tailwind CSS styling

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context
- **Build Tool**: Vite
- **Package Manager**: npm/bun

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd maharashtra-scheme-visualizer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
maharashtra-scheme-visualizer/
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React context providers
│   ├── pages/           # Page components
│   ├── data/           # Data files and types
│   └── styles/         # Global styles
├── public/             # Static assets
└── ...config files
```

## Usage

1. **Login**: Select your role (Administrator/General User)
2. **Dashboard**: View scheme performance metrics
3. **Interact**: Explore different charts and KPIs
4. **Monitor**: Track progress against targets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Government of Maharashtra
- React and TypeScript communities
- Recharts library contributors
- Tailwind CSS team

## Contact

For any queries regarding this project, please reach out to:
[Your Contact Information]

---

Built with ❤️ for Maharashtra
