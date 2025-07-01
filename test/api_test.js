Feature('api');

Scenario('validate a correct date', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 15,
        month: 6,
        year: 2023
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: true,
        date: {
            day: 15,
            month: 6,
            year: 2023
        }
    });
});

Scenario('validate leap year date - February 29, 2024', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 29,
        month: 2,
        year: 2024
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: true,
        date: {
            day: 29,
            month: 2,
            year: 2024
        }
    });
});

Scenario('invalidate non-leap year date - February 29, 2023', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 29,
        month: 2,
        year: 2023
    });
    I.seeResponseCodeIs(200)
    I.seeResponseContainsJson({
        valid: false,
        error: 'The provided date does not exist'
    });
});

Scenario('validate month with 31 days', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 31,
        month: 1,
        year: 2023
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: true
    });
});

Scenario('invalidate month with 30 days when day is 31', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 31,
        month: 4,
        year: 2023
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: false,
        error: 'The provided date does not exist'
    });
});

Scenario('invalidate invalid month', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 15,
        month: 13,
        year: 2023
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: false,
        error: 'The provided date does not exist'
    });
});

Scenario('invalidate invalid day (0)', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 0,
        month: 6,
        year: 2023
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Day, month, and year are required'
    });
});

Scenario('invalidate negative day', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: -5,
        month: 6,
        year: 2023
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: false,
        error: 'The provided date does not exist'
    });
});

Scenario('handle missing day field', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        month: 6,
        year: 2023
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Day, month, and year are required'
    });
});

Scenario('handle missing month field', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 15,
        year: 2023
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Day, month, and year are required'
    });
});

Scenario('handle missing year field', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 15,
        month: 6
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Day, month, and year are required'
    });
});

Scenario('handle invalid number format for day', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 'abc',
        month: 6,
        year: 2023
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Day, month, and year must be valid numbers'
    });
});

Scenario('handle year out of range (too low)', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 15,
        month: 6,
        year: 0
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Day, month, and year are required'
    });
});

Scenario('handle year out of range (actually too low)', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 15,
        month: 6,
        year: -1
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Year must be between 1 and 9999'
    });
});

Scenario('handle year out of range (too high)', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 15,
        month: 6,
        year: 10000
    });
    I.seeResponseCodeIs(400);
    I.seeResponseContainsJson({
        valid: false,
        error: 'Year must be between 1 and 9999'
    });
});

Scenario('validate edge case - leap year divisible by 400', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 29,
        month: 2,
        year: 2000
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: true,
        date: {
            day: 29,
            month: 2,
            year: 2000
        }
    });
});

Scenario('invalidate leap year divisible by 100 but not 400', ({ I }) => {
    I.sendPostRequest('/validate-date', {
        day: 29,
        month: 2,
        year: 1900
    });
    I.seeResponseCodeIs(200);
    I.seeResponseContainsJson({
        valid: false,
        error: 'The provided date does not exist'
    });
});
