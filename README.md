# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Seeding Sample Data

The project includes a Firestore seeding script to populate your database with sample data for a multi-tenant insurance application. This includes brokers, agents, insurance companies, plans, and customers.

### To run the seeder:

1. Make sure you have `tsx` installed (`npm install -g tsx`).
2. Ensure you are authenticated with the gcloud CLI. Run `gcloud auth application-default login`.
3. Run the following command from the root of your project:

```bash
npx tsx src/lib/seed.ts
```

This will populate your Firestore database with the sample data defined in the script.
