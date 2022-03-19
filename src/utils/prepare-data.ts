import { Helper } from '../services/helper.service.js';

const testData = await Helper.getTestData('test_cases.txt');

export { testData };
