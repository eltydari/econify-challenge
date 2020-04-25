/* Temporary data file */
export const organizations = {
    'Alphabet': {
        'locationIDs': new Set(['Alphabet HQ']),
        'eventIDs': new Set(['Employee Orientation', 'Birthday Party']),
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    },
    'Borders': {
        'locationIDs': new Set(['Borders Bookstore 1', 'Borders Bookstore 2']),
        'eventIDs': new Set(['Book Signing']),
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    },
    'Carvel': {
        'locationIDs': new Set(),
        'eventIDs': new Set(['Ice Cream Promotion']),
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    },
    'Daily Tribune': {
        'locationIDs': new Set(['Newspaper Printshop']),
        'eventIDs': new Set(),
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    }
};

export const locations = {
    'Alphabet HQ': {
        'organization': 'Alphabet',
        'address': '123 ABC Street, New York, NY, 10000',
        'latitude': 123.01,
        'longitude': -192.23,
        'createdAt': '2020-04-25T17:10:21.218Z',
        'updatedAt': '2020-04-25T17:10:21.218Z'
    },
    'Borders Bookstore 1': {
        'organization': 'Borders',
        'address': '456 DEF Street, New York, NY, 10000',
        'latitude': 103.01,
        'longitude': -132.23,
        'createdAt': '2020-04-25T17:10:21.218Z',
        'updatedAt': '2020-04-25T17:10:21.218Z'
    },
    'Borders Bookstore 2': {
        'organization': 'Borders',
        'address': '79 GHI Street, New York, NY, 10000',
        'latitude': 93.0165,
        'longitude': -122.23,
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T17:10:21.218Z'
    },
    'Newspaper Printshop': {
        'organization': 'Daily Tribune',
        'address': '98 ABC Street, New York, NY, 10000',
        'latitude': 43.0165,
        'longitude': -102.23,
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T17:10:21.218Z'
    }
};

export const events = {
    'Employee Orientation': {
        'organization': 'Alphabet',
        'date': '2020-06-01',
        'time': '12:00',
        'am': false,
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    },
    'Birthday Party': {
        'organization': 'Alphabet',
        'date': '2021-01-10',
        'time': '1:00',
        'am': false,
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    },
    'Book Signing': {
        'organization': 'Borders',
        'date': '2021-01-23',
        'time': '7:00',
        'am': true,
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    },
    'Ice Cream Promotion': {
        'organization': 'Carvel',
        'date': '2020-07-15',
        'time': '10:00',
        'am': true,
        'createdAt': '2020-04-25T16:59:37.555Z',
        'updatedAt': '2020-04-25T16:59:37.555Z'
    },
};
