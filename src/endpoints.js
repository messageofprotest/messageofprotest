import axios from 'axios';
import { includesAny } from './utils';

const API_GATEWAY = 'https://vlne6trih8.execute-api.us-east-1.amazonaws.com';
const REPRESENTATIVES_URL = API_GATEWAY + '/representatives';
const REPRESENTATIVES_TO_IGNORE = ['Trump', 'Pence'];

export const getRepresentatives = async location => {
    if(!location) return null;

    let url = `${REPRESENTATIVES_URL}?address=${location}`;
    let { officials, offices } = (await axios.get(url)).data;

    // the names of offices (president, mayor, senator, etc...) need to be associated to individual officials
    for (const office of offices) {
        for (const index of office.officialIndices) {
            officials[index].officeName = office.name;
        }
    }

    officials = officials.filter(official => !includesAny(official.name, REPRESENTATIVES_TO_IGNORE));

    // filter officals with emails to the top
    const withEmail = officials.filter(e => e.emails);
    const withoutEmail = officials.filter(e => !e.emails);
    return withEmail.concat(withoutEmail);
}