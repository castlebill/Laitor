/* eslint-disable no-console */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { firebaseConfig } from '../firebase/config';

// Make sure to replace this with the actual path to your service account key file
// You can download this from your Firebase project settings
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccount) {
  console.error(
    'GOOGLE_APPLICATION_CREDENTIALS environment variable not set.'
  );
  console.log(
    'Please download your service account key from Firebase and set the path.'
  );
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
  projectId: firebaseConfig.projectId,
});

const db = getFirestore();
const auth = getAuth();

const seedData = async () => {
  console.log('Starting to seed data...');

  try {
    // 1. Seed Insurance Companies
    console.log('Seeding insurance companies...');
    const companies = [
      { id: 'jubilee', name: 'Jubilee Insurance' },
      { id: 'britam', name: 'Britam' },
      { id: 'apa', name: 'APA Insurance' },
    ];
    for (const company of companies) {
      await db.collection('insuranceCompanies').doc(company.id).set(company);
    }
    console.log('Insurance companies seeded successfully.');

    // 2. Seed Plans
    console.log('Seeding plans...');
    const plans = [
        { id: 'motor_basic', companyId: 'jubilee', name: 'Basic Motor', price: 15000, coverage: ['Third Party Only'], type: 'motor', deductible: 5000 },
        { id: 'motor_comprehensive', companyId: 'britam', name: 'Comprehensive Motor', price: 45000, coverage: ['Third Party', 'Theft', 'Accident'], type: 'motor', deductible: 10000 },
        { id: 'health_inpatient', companyId: 'apa', name: 'Inpatient Core', price: 25000, coverage: ['Hospitalization', 'Surgery'], type: 'health', deductible: 20000 },
        { id: 'health_full', companyId: 'jubilee', name: 'Health Plus', price: 60000, coverage: ['Inpatient', 'Outpatient', 'Dental', 'Optical'], type: 'health', deductible: 5000 },
        { id: 'property_home', companyId: 'britam', name: 'Home Secure', price: 12000, coverage: ['Fire', 'Theft'], type: 'property', deductible: 25000 },
        { id: 'life_term', companyId: 'apa', name: 'Term Life 1M', price: 10000, coverage: ['Death Benefit'], type: 'life', deductible: 0 },
    ];
    for (const plan of plans) {
      await db.collection('plans').doc(plan.id).set(plan);
    }
    console.log('Plans seeded successfully.');

    // 3. Seed Brokers
    console.log('Seeding brokers...');
    const brokerId = 'broker_one_stop';
    await db.collection('brokers').doc(brokerId).set({
      id: brokerId,
      name: 'OneStop Insurance',
      address: '123 Tech Avenue, Nairobi',
      contactEmail: 'contact@onestop.com',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('Brokers seeded successfully.');

    // 4. Seed Agents and Customers (Users)
    console.log('Seeding agents and customers...');
    const users = [
      { uid: 'agent001', email: 'agent@onestop.com', password: 'password', displayName: 'Alex Agent', isAgent: true, isAdmin: true },
      { uid: 'customer001', email: 'customer@example.com', password: 'password', displayName: 'Charlie Customer', isAgent: false, isAdmin: false },
    ];

    for (const user of users) {
      try {
        await auth.deleteUser(user.uid);
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') throw error;
      }
      
      const userRecord = await auth.createUser({
        uid: user.uid,
        email: user.email,
        password: user.password,
        displayName: user.displayName,
        emailVerified: true,
      });

      const [firstName, lastName] = user.displayName.split(' ');

      if (user.isAgent) {
        await db.collection('brokers').doc(brokerId).collection('agents').doc(userRecord.uid).set({
          id: userRecord.uid,
          brokerId: brokerId,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      } else {
        await db.collection('brokers').doc(brokerId).collection('customers').doc(userRecord.uid).set({
          id: userRecord.uid,
          brokerId: brokerId,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          phone: '+254712345678',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      }
    }
    console.log('Agents and customers seeded successfully.');


    console.log('\n--- Sample Accounts ---');
    console.log('Agent Login:');
    console.log('  Email: agent@onestop.com');
    console.log('  Password: password');
    console.log('\nCustomer Login:');
    console.log('  Email: customer@example.com');
    console.log('  Password: password');
    console.log('-----------------------');

    console.log('\nData seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
