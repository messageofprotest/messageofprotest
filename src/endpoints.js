import axios from 'axios';
import { includesAny } from './utils';

const API_GATEWAY = 'https://vlne6trih8.execute-api.us-east-1.amazonaws.com';
const REPRESENTATIVES_URL = API_GATEWAY + '/representatives';
const REPRESENTATIVES_TO_IGNORE = ['Trump', 'Pence'];

export const getRepresentatives = async location => {
    if(!location) return null;

    let url = `${REPRESENTATIVES_URL}?address=${location}`;
    let { officials, offices } = (await axios.get(url)).data;

    // sort officials by government level
    let sortedOfficials = { Local: [], State: [], Federal: [], Other: [] };

    // the names of offices (president, mayor, senator, etc...) need to be associated to individual officials
    for (const office of offices) {
        for (const index of office.officialIndices) {
            officials[index].officeName = office.name;
            sortedOfficials[getOfficeLevel(office)].push(officials[index]);
        }
    }

    // filter officials with emails to the top
    for (const officeLevel in sortedOfficials) {
        const withEmail = sortedOfficials[officeLevel].filter(e => e.emails);
        const withoutEmail = sortedOfficials[officeLevel].filter(e => !e.emails);
        sortedOfficials[officeLevel] = withEmail.concat(withoutEmail);
        // ignore v/potus
        sortedOfficials[officeLevel] = sortedOfficials[officeLevel].filter(official => !includesAny(official.name, REPRESENTATIVES_TO_IGNORE));
    }

    return sortedOfficials;
}

function getOfficeLevel(office) {
    switch(office.levels[0]) {
        case 'country':
            return 'Federal';
        case 'administrativeArea1':
            return 'State';
        case 'administrativeArea2':
            return 'Local';
        default:
            return 'Other';
    }
}
