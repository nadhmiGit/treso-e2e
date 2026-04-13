import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/custom-fixtures';

export const { Given, When, Then, Before, After } = createBdd(test);