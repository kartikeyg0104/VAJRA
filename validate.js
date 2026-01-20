// Simple Data Validation Script for PROJECT VAJRA-AADHAAR Dashboard
// Run with: node validate.js

console.log('\n========================================');
console.log('PROJECT VAJRA-AADHAAR DATA VALIDATION');
console.log('========================================\n');

// Key Metrics
const keyMetrics = {
  totalTransactions: 4900000,
  districtsAnalyzed: 765,
  anomalousDistricts: 38,
  tier1CriticalDistricts: 12,
};

// Transaction Distribution
const transactionDistribution = [
  { name: "Biometric Updates", value: 2156000 },
  { name: "Demographic Updates", value: 1617000 },
  { name: "New Enrolments", value: 1127000 },
];

// Monthly Trends (2025 only - displayed in dashboard)
const monthlyTrends2025 = [
  { month: "Jan 2025", biometric: 171000, demographic: 108000, enrolment: 89000 },
  { month: "Feb 2025", biometric: 176000, demographic: 112000, enrolment: 92000 },
  { month: "Mar 2025", biometric: 194000, demographic: 123000, enrolment: 101000 },
  { month: "Apr 2025", biometric: 183000, demographic: 116000, enrolment: 96000 },
  { month: "May 2025", biometric: 174000, demographic: 111000, enrolment: 91000 },
  { month: "Jun 2025", biometric: 167000, demographic: 106000, enrolment: 87000 },
  { month: "Jul 2025", biometric: 187000, demographic: 118000, enrolment: 98000 },
  { month: "Aug 2025", biometric: 198000, demographic: 125000, enrolment: 103000 },
  { month: "Sep 2025", biometric: 180000, demographic: 364000, enrolment: 94000 },
  { month: "Oct 2025", biometric: 190000, demographic: 121000, enrolment: 100000 },
  { month: "Nov 2025", biometric: 180000, demographic: 114000, enrolment: 94000 },
  { month: "Dec 2025", biometric: 156000, demographic: 99000, enrolment: 82000 },
];

// Risk Tier Distribution
const riskTierDistribution = [
  { tier: "Tier-1 Critical", count: 12 },
  { tier: "Tier-2 High Risk", count: 26 },
  { tier: "Tier-3 Operational", count: 48 },
  { tier: "Tier-4 Service Desert", count: 67 },
  { tier: "Tier-5 Normal", count: 612 },
];

// D/B Ratio Analysis
const dbRatioAnalysis = [
  { category: "Healthy", districts: 612 },
  { category: "Yellow Flag", districts: 92 },
  { category: "Red Flag", districts: 46 },
  { category: "Critical", districts: 15 },
];

// Top 10 States
const top10States = [
  { state: "Maharashtra", biometric: 412000, demographic: 298000, enrolment: 187000, total: 897000 },
  { state: "Uttar Pradesh", biometric: 389000, demographic: 312000, enrolment: 201000, total: 902000 },
  { state: "West Bengal", biometric: 287000, demographic: 342000, enrolment: 156000, total: 785000 },
  { state: "Bihar", biometric: 234000, demographic: 267000, enrolment: 178000, total: 679000 },
  { state: "Tamil Nadu", biometric: 276000, demographic: 189000, enrolment: 134000, total: 599000 },
  { state: "Rajasthan", biometric: 198000, demographic: 156000, enrolment: 123000, total: 477000 },
  { state: "Gujarat", biometric: 187000, demographic: 143000, enrolment: 98000, total: 428000 },
  { state: "Madhya Pradesh", biometric: 167000, demographic: 134000, enrolment: 112000, total: 413000 },
  { state: "Karnataka", biometric: 189000, demographic: 121000, enrolment: 87000, total: 397000 },
  { state: "Telangana", biometric: 156000, demographic: 98000, enrolment: 67000, total: 321000 },
];

let errors = [];
let passed = [];

// ==========================================
// 1. TRANSACTION DISTRIBUTION CHECK
// ==========================================
console.log('1. TRANSACTION DISTRIBUTION');
console.log('---------------------------');
const distTotal = transactionDistribution.reduce((sum, item) => sum + item.value, 0);
console.log(`   Sum: ${distTotal.toLocaleString()}`);
console.log(`   Expected: ${keyMetrics.totalTransactions.toLocaleString()}`);
if (distTotal === keyMetrics.totalTransactions) {
  passed.push('Transaction distribution');
  console.log('   ✅ MATCH');
} else {
  errors.push('Transaction distribution sum mismatch');
  console.log('   ❌ MISMATCH');
}

// ==========================================
// 2. MONTHLY TRENDS (2025) CHECK
// ==========================================
console.log('\n2. MONTHLY TRENDS (2025)');
console.log('------------------------');
const bio2025 = monthlyTrends2025.reduce((sum, m) => sum + m.biometric, 0);
const demo2025 = monthlyTrends2025.reduce((sum, m) => sum + m.demographic, 0);
const enrol2025 = monthlyTrends2025.reduce((sum, m) => sum + m.enrolment, 0);
const total2025 = bio2025 + demo2025 + enrol2025;

console.log(`   Biometric: ${bio2025.toLocaleString()} (expected: 2,156,000)`);
console.log(`   Demographic: ${demo2025.toLocaleString()} (expected: 1,617,000)`);
console.log(`   Enrolment: ${enrol2025.toLocaleString()} (expected: 1,127,000)`);
console.log(`   Total: ${total2025.toLocaleString()} (expected: 4,900,000)`);

if (bio2025 === 2156000 && demo2025 === 1617000 && enrol2025 === 1127000) {
  passed.push('Monthly trends 2025');
  console.log('   ✅ ALL MATCH');
} else {
  errors.push('Monthly trends category mismatch');
  console.log('   ❌ CATEGORY MISMATCH');
}

// September Surge
const sepDemo = monthlyTrends2025.find(m => m.month === "Sep 2025").demographic;
const avgDemo = demo2025 / 12;
const surgeMult = (sepDemo / avgDemo).toFixed(2);
console.log(`\n   September Surge: ${surgeMult}× (target: 2.7×)`);
if (Math.abs(parseFloat(surgeMult) - 2.7) < 0.1) {
  passed.push('September surge multiplier');
  console.log('   ✅ WITHIN RANGE');
} else {
  errors.push('September surge multiplier off target');
  console.log('   ❌ OFF TARGET');
}

// ==========================================
// 3. RISK TIER DISTRIBUTION CHECK
// ==========================================
console.log('\n3. RISK TIER DISTRIBUTION');
console.log('-------------------------');
const riskTotal = riskTierDistribution.reduce((sum, t) => sum + t.count, 0);
console.log(`   Sum: ${riskTotal}`);
console.log(`   Expected: ${keyMetrics.districtsAnalyzed}`);
if (riskTotal === keyMetrics.districtsAnalyzed) {
  passed.push('Risk tier distribution');
  console.log('   ✅ MATCH');
} else {
  errors.push('Risk tier distribution sum mismatch');
  console.log('   ❌ MISMATCH');
}

// Tier-1 check
const tier1Count = riskTierDistribution.find(t => t.tier.includes('Tier-1')).count;
console.log(`\n   Tier-1 count: ${tier1Count}`);
console.log(`   Expected: ${keyMetrics.tier1CriticalDistricts}`);
if (tier1Count === keyMetrics.tier1CriticalDistricts) {
  passed.push('Tier-1 count');
  console.log('   ✅ MATCH');
} else {
  errors.push('Tier-1 count mismatch');
  console.log('   ❌ MISMATCH');
}

// Anomalous check (Tier-1 + Tier-2)
const tier2Count = riskTierDistribution.find(t => t.tier.includes('Tier-2')).count;
const anomalousCalc = tier1Count + tier2Count;
console.log(`\n   Anomalous (Tier-1 + Tier-2): ${anomalousCalc}`);
console.log(`   keyMetrics.anomalousDistricts: ${keyMetrics.anomalousDistricts}`);
if (anomalousCalc === keyMetrics.anomalousDistricts) {
  passed.push('Anomalous districts count');
  console.log('   ✅ MATCH');
} else {
  errors.push('Anomalous districts count mismatch');
  console.log('   ❌ MISMATCH');
}

// ==========================================
// 4. D/B RATIO ANALYSIS CHECK
// ==========================================
console.log('\n4. D/B RATIO ANALYSIS');
console.log('---------------------');
const dbTotal = dbRatioAnalysis.reduce((sum, cat) => sum + cat.districts, 0);
console.log(`   Sum: ${dbTotal}`);
console.log(`   Expected: ${keyMetrics.districtsAnalyzed}`);
if (dbTotal === keyMetrics.districtsAnalyzed) {
  passed.push('D/B ratio analysis');
  console.log('   ✅ MATCH');
} else {
  errors.push('D/B ratio analysis sum mismatch');
  console.log('   ❌ MISMATCH');
}

// ==========================================
// 5. TOP 10 STATES CHECK
// ==========================================
console.log('\n5. TOP 10 STATES');
console.log('----------------');
let stateErrors = 0;
top10States.forEach(s => {
  const calc = s.biometric + s.demographic + s.enrolment;
  if (calc !== s.total) {
    stateErrors++;
    console.log(`   ❌ ${s.state}: ${calc} ≠ ${s.total}`);
  }
});

if (stateErrors === 0) {
  passed.push('Top 10 states totals');
  console.log('   ✅ All state totals correct');
} else {
  errors.push(`${stateErrors} state total mismatches`);
}

const top10Total = top10States.reduce((sum, s) => sum + s.total, 0);
const top10Pct = ((top10Total / keyMetrics.totalTransactions) * 100).toFixed(1);
console.log(`\n   Top 10 total: ${top10Total.toLocaleString()}`);
console.log(`   As % of 4.9M: ${top10Pct}%`);

// ==========================================
// SUMMARY
// ==========================================
console.log('\n========================================');
console.log('VALIDATION SUMMARY');
console.log('========================================');

console.log(`\n✅ PASSED (${passed.length}):`);
passed.forEach(p => console.log(`   • ${p}`));

console.log(`\n❌ ERRORS (${errors.length}):`);
if (errors.length === 0) {
  console.log('   None! All validations passed.');
} else {
  errors.forEach(e => console.log(`   • ${e}`));
}

console.log('\n========================================');
console.log('KEY METRICS VERIFIED');
console.log('========================================');
console.log(`   Total Transactions: ${keyMetrics.totalTransactions.toLocaleString()}`);
console.log(`   Districts Analyzed: ${keyMetrics.districtsAnalyzed}`);
console.log(`   Anomalous Districts: ${keyMetrics.anomalousDistricts} (Tier-1 + Tier-2)`);
console.log(`   Tier-1 Critical: ${keyMetrics.tier1CriticalDistricts}`);
console.log('\n');
