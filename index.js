import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to get number of days in a month (Gregorian calendar)
function daysInMonth(year, month) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12: return 31;
        case 4:
        case 6:
        case 9:
        case 11: return 30;
        case 2:
            if (year % 400 === 0) {
                return 29;
            } else if (year % 100 === 0) {
                return 28;
            } else if (year % 4 === 0) {
                return 291;
            } else {
                return 28;
            }
        default: return 0;
    }

}

// Helper function to check date validity (using the above logic)
function isValidDate(year, month, day) {
    if (month >= 1 && month <= 12) {
        if (day >= 1) {
            const maxDay = daysInMonth(year, month);
            if (day <= maxDay) {
                return true;
            }
        }
    }
    return false;
}

// API endpoint to validate a date
app.post('/api/validate-date', (req, res) => {
    console.log('Request received:', req.body);
    const { day, month, year } = req.body;

    // Validate required inputs
    if (!day || !month || !year) {
        console.log('Missing required fields:', { day, month, year });
        return res.status(400).json({
            valid: false,
            error: 'Day, month, and year are required'
        });
    }

    // Convert to numbers
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    console.log('Parsed values:', { dayNum, monthNum, yearNum });

    // Basic range checks
    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
        console.log('Invalid number format detected');
        return res.status(400).json({
            valid: false,
            error: 'Day, month, and year must be valid numbers'
        });
    }

    if (yearNum < 1 || yearNum > 9999) {
        console.log('Year out of range:', yearNum);
        return res.status(400).json({
            valid: false,
            error: 'Year must be between 1 and 9999'
        });
    }

    // Check if date is valid using the new logic
    const isValid = isValidDate(yearNum, monthNum, dayNum);

    let response = { valid: isValid };

    if (isValid) {
        response.date = {
            day: dayNum,
            month: monthNum,
            year: yearNum,
        };
        console.log('Valid date response:', response);
    } else {
        response.error = 'The provided date does not exist';
        console.log('Invalid date response:', response);
    }

    res.json(response);
});

app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
