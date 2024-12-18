# FinWell Client Project

## Overview
The FinWell Client project is a React-based application that leverages several dependencies for data visualization, routing, icons, and performance metrics. This document provides instructions for installing and running the project.

---

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

1. **Node.js**: Version 16.x or later
   - Download and install Node.js from [Node.js Official Website](https://nodejs.org/).

2. **npm**: Version 8.x or later (included with Node.js installation)
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

3. **Git**: Version control system
   - Install Git from [Git Official Website](https://git-scm.com/).

---

## Installation Steps

### 1. Clone the Repository
First, clone the project repository to your local machine:
```bash
git clone <repository-url>
cd finwell/client
```

### 2. Install Dependencies
Run the following command to install all project dependencies listed in `package.json`:
```bash
npm install
```

This will install the following:

- `cra-template@1.2.0`
- `react-chartjs-2@5.2.0`
- `react-dom@19.0.0`
- `react-icons@5.4.0`
- `react-router-dom@7.0.2`
- `react-scripts@5.0.1`
- `react@19.0.0`
- `recharts@2.15.0`
- `web-vitals@4.2.4`

### 3. Verify Installation
After installation, verify that all dependencies are installed correctly:
```bash
npm list
```

---

## Running the Application

To start the development server, run:
```bash
npm start
```

This will launch the application in your default web browser. By default, the development server runs on [http://localhost:3000](http://localhost:3000).

---

## Additional Notes

### Dependency Descriptions

- **`cra-template`**: Template for Create React App.
- **`react-chartjs-2`**: React wrapper for Chart.js, used for data visualization.
- **`react-dom`**: Entry point for DOM-related rendering in React.
- **`react-icons`**: Library for popular icons as React components.
- **`react-router-dom`**: Provides declarative routing for React applications.
- **`react-scripts`**: Scripts and configuration for Create React App.
- **`react`**: JavaScript library for building user interfaces.
- **`recharts`**: Library for building charts with React.
- **`web-vitals`**: Library for measuring essential web performance metrics.

### PEP 668 Specification
This project adheres to [PEP 668](https://peps.python.org/pep-0668/) guidelines to ensure proper package management practices. Always use a virtual environment or isolated workspace when working with dependencies to avoid conflicts.

---

## Troubleshooting

If you encounter issues during installation or running the application:

1. **Clear `node_modules` and Reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check for Missing Dependencies:**
   ```bash
   npm audit
   ```

3. **Contact Support:**
   Open an issue in the repository or contact the project maintainer.

---

## License
This project is licensed under the MIT License.

