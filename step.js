$(document).ready(function() {
    $('.custom-btn, .next-btn').on('click', function() {
        var nextTab = $(this).data('next');
        $('button[data-bs-target="' + nextTab + '"]').tab('show');
    });

    $('.btn-calculate').on('click', function() {
        // Perform the tax calculations
        const results = calculateTax();

        // Switch to the next tab
        const nextTab = $(this).data('next');
        $('button[data-bs-target="' + nextTab + '"]').tab('show');

        // Populate the table in the new tab with calculated values
        updateSummaryTable(results);
    });
});

function calculateTax() {
    const age = parseFloat($('input[name="age"]:checked').val()) || 0;

    const salary = parseFloat($('#salary').val()) || 0;
    const exemptAllowances = parseFloat($('#exemptAllowances').val()) || 0;
    const interestIncome = parseFloat($('#interestIncome').val()) || 0;
    const homeLoanSelf = parseFloat($('#homeLoanSelf').val()) || 0;
    const rentalIncome = parseFloat($('#rentalIncome').val()) || 0;
    const homeLoanLetOut = parseFloat($('#homeLoanLetOut').val()) || 0;
    const digitalAssetsIncome = parseFloat($('#digitalAssetsIncome').val()) || 0;
    const otherIncome = parseFloat($('#otherincome').val()) || 0;

    const basicDeductions = parseFloat($('#basicDeductions').val()) || 0;
    const interestDeposits = parseFloat($('#interestDeposits').val()) || 0;
    const medicalInsurance = parseFloat($('#medicalInsurance').val()) || 0;
    const charityDonations = parseFloat($('#charityDonations').val()) || 0;
    const eduLoanInterest = parseFloat($('#eduLoanInterest').val()) || 0;
    const housingLoanInterest = parseFloat($('#housingLoanInterest').val()) || 0;
    const npsContribution = parseFloat($('#npsContribution').val()) || 0;

    const grossTotalIncome = salary + interestIncome + rentalIncome + digitalAssetsIncome + otherIncome;

    // Standard Deduction (Old Regime)
    const standardDeductionOld = 50000;

    // Standard Deduction (New Regime)
    const standardDeductionNew = 75000;

    // Chapter VI-A Deductions (Old Regime)
    const chapterVIAOld = basicDeductions + interestDeposits + medicalInsurance + charityDonations + eduLoanInterest + housingLoanInterest + npsContribution;

    // Calculate total income, exemptions, and deductions for old regime
    const totalIncomeOld = grossTotalIncome 
    const exemptionsOld = homeLoanSelf + homeLoanLetOut;
    const deductionsOld = standardDeductionOld + chapterVIAOld;
    const taxableIncomeOld = totalIncomeOld - exemptionsOld - deductionsOld-exemptAllowances;

    // Calculate tax due for old regime
    const taxDueOld = calculateOldRegimeTax(taxableIncomeOld, age);

    // Calculate total income, exemptions, and deductions for new regime
    const totalIncomeNew = grossTotalIncome ;
    const exemptionsNew = homeLoanSelf + homeLoanLetOut;
    const deductionsNew = standardDeductionNew; // No Chapter VI-A deductions in new regime
    const taxableIncomeNew = totalIncomeNew -  deductionsNew;

    // Calculate tax due for new regime
    const taxDueNew = calculateNewRegimeTax(taxableIncomeNew);

    // Display results in table
    document.getElementById('totalIncomeOld').innerText = totalIncomeOld.toFixed(2);
    document.getElementById('totalIncomeNew').innerText = totalIncomeNew.toFixed(2);

    document.getElementById('exemptionsOld').innerText = exemptionsOld.toFixed(2);
    document.getElementById('exemptionsNew').innerText = exemptionsNew.toFixed(2);
    document.getElementById('deductionsOld').innerText = deductionsOld.toFixed(2);
    document.getElementById('deductionsNew').innerText = deductionsNew.toFixed(2);
    document.getElementById('taxableIncomeOld').innerText = taxableIncomeOld.toFixed(2);
    document.getElementById('taxableIncomeNew').innerText = taxableIncomeNew.toFixed(2);
    document.getElementById('taxDueOld').innerText = taxDueOld.toFixed(2);
    document.getElementById('taxDueNew').innerText = taxDueNew.toFixed(2);

    return {
        totalIncomeOld,
        totalIncomeNew,
        exemptionsOld,
        exemptionsNew,
        deductionsOld,
        deductionsNew,
        taxableIncomeOld,
        taxableIncomeNew,
        taxDueOld,
        taxDueNew
    };
}

function calculateOldRegimeTax(taxableIncome, age) {
    let tax = 0;

    if (age < 60) {
        if (taxableIncome <= 250000) {
            tax = 0;
        } else if (taxableIncome <= 500000) {
            tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            tax = 12500 + (taxableIncome - 500000) * 0.;
        } else {
            tax = 112500 + (taxableIncome - 1000000) * 0.3;
        }
    } else if (age < 80) {
        if (taxableIncome <= 300000) {
            tax = 0;
        } else if (taxableIncome <= 500000) {
            tax = (taxableIncome - 300000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            tax = 10000 + (taxableIncome - 500000) * 0.2;
        } else {
            tax = 110000 + (taxableIncome - 1000000) * 0.3;
        }
    } else {
        if (taxableIncome <= 500000) {
            tax = 0;
        } else if (taxableIncome <= 1000000) {
            tax = (taxableIncome - 500000) * 0.2;
        } else {
            tax = 100000 + (taxableIncome - 1000000) * 0.3;
        }
    }
    const cess = tax * 0.04;
    return tax + cess;
}

function calculateNewRegimeTax(taxableIncomeNew) {
    if (taxableIncomeNew <= 300000) {
        tax = 0;
    } else if (taxableIncomeNew <= 700000) {
        tax = (taxableIncomeNew - 300000) * 0.05;
    } else if (taxableIncomeNew <= 1000000) {
        tax = (400000 * 0.05) + (taxableIncomeNew - 700000) * 0.10;
    } else if (taxableIncomeNew <= 1200000) {
        tax = (400000 * 0.05) + (300000 * 0.10) + (taxableIncomeNew - 1000000) * 0.15;
    } else if (taxableIncomeNew <= 1500000) {
        tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (taxableIncomeNew - 1200000) * 0.20;
    } else {
        tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (300000 * 0.20) + (taxableIncomeNew - 1500000) * 0.30;
    }
    const cess = tax * 0.04;
    return tax + cess;
}

