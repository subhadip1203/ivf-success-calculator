const formulas = require('../data-formula/ivf_success_formulas.js');
const { calculateIVFScore } = require('../utills/logic.js');

describe('IVF Success Score Calculation', () => {
    // Test 1
    test('Test1: Endometriosis and Ovulatory Disorder, with Prior Pregnancies', async () => {
        const userData = {
            usingOwnEggs: true,
            attemptedIVF: false,
            age: 32,
            weight: 150,
            heightFeet: 5,
            heightInches: 8,
            infertilityReasons: {
                tubal_factor: false,
                male_factor_infertility: false,
                endometriosis: true,
                ovulatory_disorder: true,
                diminished_ovarian_reserve: false,
                uterine_factor: false,
                other_reason: false,
                unexplained_infertility: false
            },
            priorPregnancies: 1,
            liveBirths: 1
        };

        const score = await calculateIVFScore(userData, formulas);
        const successRate = Math.exp(score) / (1 + Math.exp(score));
        expect(score).toBeCloseTo(0.49827679376137024, 5);
        expect(successRate).toBeCloseTo(0.6221, 4);
    });

    // Test 2
    test('Test2: No Infertility Reasons, with Prior Pregnancies', async () => {
        const userData = {
            usingOwnEggs: true,
            attemptedIVF: false,
            age: 32,
            weight: 150,
            heightFeet: 5,
            heightInches: 8,
            infertilityReasons: {
                tubal_factor: false,
                male_factor_infertility: false,
                endometriosis: false,
                ovulatory_disorder: false,
                diminished_ovarian_reserve: false,
                uterine_factor: false,
                other_reason: false,
                unexplained_infertility: false
            },
            priorPregnancies: 1,
            liveBirths: 1
        };

        const score = await calculateIVFScore(userData, formulas);
        const successRate = Math.exp(score) / (1 + Math.exp(score));
        expect(score).toBeCloseTo(0.39859338617378465, 5);
        expect(successRate).toBeCloseTo(0.5983, 4);
    });

    // Test 3
    test('Test3: Multiple Infertility Reasons and Previous IVF Attempt', async () => {
        const userData = {
            usingOwnEggs: true,
            attemptedIVF: true,
            age: 32,
            weight: 150,
            heightFeet: 5,
            heightInches: 8,
            infertilityReasons: {
                tubal_factor: true,
                male_factor_infertility: false,
                endometriosis: false,
                ovulatory_disorder: false,
                diminished_ovarian_reserve: true,
                uterine_factor: false,
                other_reason: false,
                unexplained_infertility: false
            },
            priorPregnancies: 1,
            liveBirths: 1
        };

        const score = await calculateIVFScore(userData, formulas);
        const successRate = Math.exp(score) / (1 + Math.exp(score));
        expect(score).toBeCloseTo(-0.368320961268025, 5);
        expect(successRate).toBeCloseTo(0.4089, 4);
    });

    // Test 4: Edge Case - Minimum Age and Weight
    test('Test4: Minimum age (20) and weight (80 lbs)', async () => {
        const userData = {
            usingOwnEggs: true,
            attemptedIVF: false,
            age: 20,
            weight: 80,
            heightFeet: 5,
            heightInches: 4,
            infertilityReasons: {
                tubal_factor: false,
                male_factor_infertility: false,
                endometriosis: false,
                ovulatory_disorder: false,
                diminished_ovarian_reserve: false,
                uterine_factor: false,
                other_reason: false,
                unexplained_infertility: false
            },
            priorPregnancies: 0,
            liveBirths: 0
        };

        const score = await calculateIVFScore(userData, formulas);
        const successRate = Math.exp(score) / (1 + Math.exp(score));
        expect(score).toBeDefined(); // Check if the score is calculated
        expect(successRate).toBeGreaterThanOrEqual(0); // Ensure a valid success rate
    });

    // Test 5: Edge Case - Maximum Age and Weight
    test('Test5: Maximum age (50) and weight (300 lbs)', async () => {
        const userData = {
            usingOwnEggs: false,
            attemptedIVF: true,
            age: 50,
            weight: 300,
            heightFeet: 5,
            heightInches: 10,
            infertilityReasons: {
                tubal_factor: true,
                male_factor_infertility: true,
                endometriosis: false,
                ovulatory_disorder: false,
                diminished_ovarian_reserve: true,
                uterine_factor: false,
                other_reason: false,
                unexplained_infertility: true
            },
            priorPregnancies: 0,
            liveBirths: 0
        };

        const score = await calculateIVFScore(userData, formulas);
        const successRate = Math.exp(score) / (1 + Math.exp(score));
        expect(score).toBeDefined(); // Check if the score is calculated
        expect(successRate).toBeLessThanOrEqual(1); // Ensure a valid success rate
    });
});
