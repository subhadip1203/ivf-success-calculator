# IVF Success Calculator

This project is a web-based application for predicting the likelihood of success for in-vitro fertilization (IVF) based on user input and pre-defined formulas.

## Features
- **Dynamic User Input**: Collects user data through a form, including factors like age, weight, height, and IVF history.
- **Predictive Scoring**: Utilizes predefined formulas to calculate the likelihood of IVF success.
- **Responsive UI**: Built with EJS templates and Bootstrap for an engaging user interface.
- **Scalable Backend**: Developed using Node.js and Express.js for robust server-side functionality.

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/subhadip1203/ivf-success-calculator.git
   cd ivf-success-calculator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Prepare the formulas:
   - Ensure the CSV file containing IVF success formulas is present in `./data-formula/ivf_success_formulas.csv`.
   - Run the script to parse the CSV file into a JavaScript module:
     ```bash
     node process-csv.js
     ```

## Usage

### Development Mode
Start the server in development mode with auto-reload:
```bash
npm run dev
```

### Production Mode
Start the server in production mode:
```bash
npm start
```

### Access the Application
- Open your browser and navigate to `http://localhost:3000`.
- You can fill up the form and click on "Calculate Score" to view the result directly in the UI.

## Project Structure
- **`index.js`**: Main server file, handles routing and application logic.
- **`process-csv.js`**: Script to parse IVF formulas from a CSV file and save them as a JavaScript module.
- **`utills/logic.js`**: Contains the logic for calculating IVF success scores.
- **`views/`**: Contains EJS templates for rendering the UI.
- **`data-formula/`**: Directory for storing IVF formula data (CSV file and CSV to .js data both).

## API Endpoints

### `POST /api/calculate`
- **Description**: Calculates the IVF success score based on user input.
- **Request Body**:
  ```json
  {
    "age": 30,
    "weight": 150,
    "heightFeet": 5,
    "heightInches": 6,
    "attemptedIVF": false,
    "infertilityReasons": {
      "tubal_factor": true,
      "male_factor_infertility": false
    },
    "usingOwnEggs": true,
    "priorPregnancies": 1,
    "liveBirths": 0
  }
  ```
- **Response**:
  ```json
  {
    "score": 0.49827679376137024,
    "successRate": 0.6221
  }
  ```

## Technologies Used
- **Frontend**: EJS, Bootstrap
- **Backend**: Node.js, Express.js
- **Dependencies**:
  - `csv-parser`
  - `ejs`
  - `express`
- **Dev Dependencies**:
  - `jest`
  - `nodemon`

## Testing
Run test cases using Jest:
```bash
npm test
```

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Create a pull request.

## License
This project is licensed under the ISC License. See the `LICENSE` file for details.

## Acknowledgements
Special thanks to all contributors and open-source libraries used in this project.
