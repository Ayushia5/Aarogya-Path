import { db } from '../services/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, query } from 'firebase/firestore';

const providers = [
    {
        name: 'Dr. Sarah Jenkins',
        specialty: 'Cardiologist',
        yearsExp: 15,
        rating: 4.8,
        reviewCount: 124,
        hospital: 'Mercy General Hospital',
        city: 'Sacramento, CA',
        badge: 'Excellent',
        imageUrl: 'https://i.pravatar.cc/150?u=sarah-jenkins'
    },
    {
        name: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
        yearsExp: 8,
        rating: 5.0,
        reviewCount: 89,
        hospital: 'Skin Health Center',
        city: 'San Francisco, CA',
        badge: 'Top Rated',
        imageUrl: 'https://i.pravatar.cc/150?u=michael-chen'
    },
    {
        name: 'Dr. Emily Carter',
        specialty: 'Pediatrician',
        yearsExp: 12,
        rating: 4.2,
        reviewCount: 56,
        hospital: "Children's Medical Group",
        city: 'Oakland, CA',
        imageUrl: 'https://i.pravatar.cc/150?u=emily-carter'
    },
    {
        name: 'Dr. David Ross',
        specialty: 'Orthopedist',
        yearsExp: 20,
        rating: 4.7,
        reviewCount: 210,
        hospital: 'Joint & Spine Institute',
        city: 'San Jose, CA',
        badge: 'Available Today',
        imageUrl: 'https://i.pravatar.cc/150?u=david-ross'
    }
];

const procedures = [
    { name: 'ECG', category: 'cardiology', baseCost: 800 },
    { name: 'Echocardiogram', category: 'cardiology', baseCost: 2500 },
    { name: 'MRI Lumbar Spine', category: 'radiology', baseCost: 1200 },
    { name: 'Physical Therapy', category: 'general', baseCost: 150 },
    { name: 'Blood Work', category: 'general', baseCost: 300 }
];

export const seedFirestore = async () => {
    try {
        // Seed Providers
        const providerCol = collection(db, 'providers');
        const existingProviders = await getDocs(providerCol);

        if (existingProviders.empty) {
            console.log('Seeding providers...');
            for (const p of providers) {
                await addDoc(providerCol, p);
            }
            console.log('Providers seeded successfully!');
        }

        // Seed Procedures
        const procedureCol = collection(db, 'procedures');
        const existingProcedures = await getDocs(procedureCol);

        if (existingProcedures.empty) {
            console.log('Seeding procedures...');
            for (const p of procedures) {
                await addDoc(procedureCol, p);
            }
            console.log('Procedures seeded successfully!');
        }

        return { success: true };
    } catch (error) {
        console.error('Error seeding Firestore:', error);
        return { success: false, error };
    }
};
