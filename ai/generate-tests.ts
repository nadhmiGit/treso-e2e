import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateTest() {
  const res = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `
Generate a Gherkin feature file for the TRESO2 Invoice Hub - Incoming Invoices page.

Context about the application:
- The page shows incoming invoices for Mars Chocolat France
- There are status tabs: Toutes, En dématérialisation, À valider, Approuvées, A résoudre, Acquittées, Déclinées
- The supplier is MAGASINS GALERIES LAFAYETTE
- Invoices have statuses: Mise à disposition, Approuvée, A traiter

STRICT RULES:
- ONLY use these existing steps (do not invent new ones):
  "I am authenticated"
  "I navigate to {string}"
  "I should see {string} page"

- DO NOT create new step definitions
- DO NOT use steps that interact with specific UI elements
- DO NOT use steps like "I click on tab {string}" or "I filter by {string}"
- Reuse existing steps ONLY

Generate these scenarios:
  1. Successfully navigate to Incoming Invoices page
  2. Verify incoming invoices page is accessible after authentication
  3. Navigate to incoming invoices from Invoice Hub menu
  4. Verify À valider tab shows 2 invoices
  5. Verify supplier MAGASINS GALERIES LAFAYETTE is visible

- Use tag @incoming-invoices-ai for all scenarios
- Feature name: Invoice Hub - Incoming Invoices (AI Generated without DOM)

Return ONLY the .feature file content, no explanation, no markdown backticks.
`,
      },
    ],
  });

  const block = res.content[0];

  if (block && block.type === 'text') {
    const cleanCode = block.text
      .replace(/```gherkin/g, '')
      .replace(/```typescript/g, '')
      .replace(/```/g, '')
      .trim();

    fs.writeFileSync('./features/invoice-hub-incoming-invoices-ai.feature', cleanCode);
    console.log('Feature file generated successfully');
    console.log('--- Generated content ---');
    console.log(cleanCode);
  } else {
    console.error('Unexpected response format:', res.content);
  }
}

generateTest();
