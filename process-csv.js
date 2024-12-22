const fs = require('fs');
const csv = require('csv-parser');

// Function to parse IVF formulas from a CSV file and save them as a JavaScript file
async function parseAndSaveIVFFormulas(csvFilePath, outputFilePath) {
    const results = [];

    // Parse the CSV file
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', () => {
                console.log('CSV File Parsed Successfully');

                // Prepare the JavaScript content
                const jsContent = `const formulas = ${JSON.stringify(results, null, 4)};

module.exports = formulas;`;

                // Write the JavaScript file
                fs.writeFile(outputFilePath, jsContent, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`Formulas saved to ${outputFilePath}`);
                        resolve();
                    }
                });
            })
            .on('error', (error) => reject(error));
    });
}

// Run the function
(async () => {
    const csvFilePath = './data-formula/ivf_success_formulas.csv'; // Replace with the correct path to your CSV file
    const outputFilePath = './data-formula/ivf_success_formulas.js'; // Output JavaScript file

    try {
        await parseAndSaveIVFFormulas(csvFilePath, outputFilePath);
    } catch (error) {
        console.error('Error:', error);
    }
})();
