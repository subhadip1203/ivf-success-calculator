
// Function to calculate BMI
function calculateBMI(weight, heightFeet, heightInches) {
    const totalHeightInInches = heightFeet * 12 + heightInches;
    return (weight / (totalHeightInInches ** 2)) * 703;
}

// Function to determine matching formula and calculate IVF score
async function calculateIVFScore(userData, formulas) {
    // Determine parameters for formula selection
    const paramUsingOwnEggs = userData.usingOwnEggs ? 'TRUE' : 'FALSE';
    const paramAttemptedIVFPreviously = userData.usingOwnEggs
        ? (userData.attemptedIVF ? 'TRUE' : 'FALSE')
        : 'N/A';
    const paramIsReasonForInfertilityKnown = Object.values(userData.infertilityReasons).some(value => value) ? 'TRUE' : 'FALSE';

    // Find the appropriate formula row
    const currentFormula = formulas.find(row =>
        row.param_using_own_eggs === paramUsingOwnEggs &&
        row.param_attempted_ivf_previously === paramAttemptedIVFPreviously &&
        row.param_is_reason_for_infertility_known === paramIsReasonForInfertilityKnown
    );

    if (!currentFormula) {
        throw new Error('No matching formula found.');
    }

    // Calculate components for the IVF score
    const ageLinearComponent = parseFloat(currentFormula.formula_age_linear_coefficient) * userData.age;
    const agePowerComponent = parseFloat(currentFormula.formula_age_power_coefficient) * Math.pow(userData.age, parseFloat(currentFormula.formula_age_power_factor));

    const bmi = calculateBMI(userData.weight, userData.heightFeet, userData.heightInches);
    const bmiLinearComponent = parseFloat(currentFormula.formula_bmi_linear_coefficient) * bmi;
    const bmiPowerComponent = parseFloat(currentFormula.formula_bmi_power_coefficient) * Math.pow(bmi, parseFloat(currentFormula.formula_bmi_power_factor));

    const infertilityReasonComponent = Object.entries(userData.infertilityReasons)
        .reduce((sum, [reason, isTrue]) => {
            const key = `formula_${reason}_${isTrue ? 'true' : 'false'}_value`;
            return sum + parseFloat(currentFormula[key] || 0);
        }, 0);

    const priorPregnanciesValue = parseFloat(
        currentFormula[`formula_prior_pregnancies_${Math.min(userData.priorPregnancies, 2)}_value`] || 0
    );

    const liveBirthsValue = parseFloat(
        currentFormula[`formula_prior_live_births_${Math.min(userData.liveBirths, 2)}_value`] || 0
    );

    // Calculate the final score
    const intercept = parseFloat(currentFormula.formula_intercept);
    const score = intercept +
        ageLinearComponent +
        agePowerComponent +
        bmiLinearComponent +
        bmiPowerComponent +
        infertilityReasonComponent +
        priorPregnanciesValue +
        liveBirthsValue;

    return score;
}


module.exports = { calculateIVFScore } 

