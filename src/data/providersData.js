export const infrastructureGaps = {
    "Vasant Kunj": {
        "strength": "Premium private healthcare facilities with advanced diagnostic centers.",
        "gap": "High out-of-pocket costs.",
        "tips": "Utilize telemedicine for non-urgent follow-ups."
    },
    "Dwarka": {
        "strength": "Well-planned sectors with a mix of large corporate hospitals.",
        "gap": "Shortage of dedicated public pediatric emergency beds.",
        "tips": "Ensure you have a reliable 24/7 pharmacy contact saved."
    },
    "Rohini": {
        "strength": "High density of specialized maternity and eye-care hospitals.",
        "gap": "Overcrowded public health infrastructure.",
        "tips": "Book diagnostic scans at least 3-4 days in advance."
    },
    "South Extension": {
        "strength": "Hub for elite cosmetic, dermatological, and dental procedures.",
        "gap": "Severe parking constraints.",
        "tips": "Use cab services for appointments."
    },
    "Saket": {
        "strength": "Home to some of the largest, most advanced corporate hospitals.",
        "gap": "Premium pricing across the board.",
        "tips": "Check health insurance coverage."
    },
    "Preet Vihar": {
        "strength": "Strong network of mid-sized nursing homes.",
        "gap": "Fewer options for highly specialized tertiary care.",
        "tips": "Seek second opinions from tertiary care centers."
    },
    "Karol Bagh": {
        "strength": "Central location with deep-rooted general practitioners.",
        "gap": "Very congested locality.",
        "tips": "Schedule elective procedures early in the morning."
    },
    "Hauz Khas": {
        "strength": "Excellent access to boutique wellness clinics.",
        "gap": "Scarcity of large in-patient hospital facilities.",
        "tips": "Identify nearest large hospital for emergencies."
    },
    "Lajpat Nagar": {
        "strength": "Accessible mid-tier clinics and diagnostics.",
        "gap": "High density of patients leading to longer wait times.",
        "tips": "Book appointments online before visiting."
    },
    "Pitampura": {
        "strength": "Great pediatric and maternity care networks.",
        "gap": "Limited super-specialty trauma centers.",
        "tips": "Keep trauma center contacts handy."
    },
    "Janakpuri": {
        "strength": "Large scale public and private secondary care.",
        "gap": "Uneven distribution of 24/7 advanced imaging.",
        "tips": "Verify imaging center hours."
    },
    "Greater Kailash": {
        "strength": "Premium outpatient and specialist clinics.",
        "gap": "High consultation fees.",
        "tips": "Compare fees for routine checks."
    }
};

export const sampleHospitals = [
{
        id: 'h1', name: 'Apollo Hospital', location: 'South Extension', rating: 4.8, reviewCount: 516,
        baseCost: '₹1,500', cleanlinessScore: 7.2, missingFacilities: ["24/7 Pharmacy"],
        description: 'A well-established hospital providing dedicated patient care in South Extension.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=0',
        costMultiplier: 1.08, badge: ''
    },
{
        id: 'h2', name: 'Fortis Hospital', location: 'Rohini', rating: 4.3, reviewCount: 821,
        baseCost: '₹1,800', cleanlinessScore: 7.2, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Rohini.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=1',
        costMultiplier: 1.08, badge: ''
    },
{
        id: 'h3', name: 'Max Hospital', location: 'Vasant Kunj', rating: 4.2, reviewCount: 424,
        baseCost: '₹1,800', cleanlinessScore: 7.2, missingFacilities: ["Comprehensive Transplant Unit", "Affordable Ward Beds"],
        description: 'A well-established hospital providing dedicated patient care in Vasant Kunj.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=2',
        costMultiplier: 1.08, badge: 'Value Care'
    },
{
        id: 'h4', name: 'Manipal Hospital', location: 'Rohini', rating: 3.9, reviewCount: 1023,
        baseCost: '₹1,500', cleanlinessScore: 9.6, missingFacilities: ["Pediatric ICU"],
        description: 'A well-established hospital providing dedicated patient care in Rohini.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=3',
        costMultiplier: 1.44, badge: 'Reliable'
    },
{
        id: 'h5', name: 'Saroj Hospital', location: 'Saket', rating: 4.3, reviewCount: 103,
        baseCost: '₹4,000', cleanlinessScore: 7.4, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Saket.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=4',
        costMultiplier: 1.11, badge: 'Premium Care'
    },
{
        id: 'h6', name: 'Kailash Hospital', location: 'Greater Kailash', rating: 4.4, reviewCount: 1544,
        baseCost: '₹4,000', cleanlinessScore: 7.7, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Greater Kailash.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=5',
        costMultiplier: 1.16, badge: 'Modern Facility'
    },
{
        id: 'h7', name: 'Batra Hospital', location: 'Saket', rating: 4.2, reviewCount: 1686,
        baseCost: '₹1,500', cleanlinessScore: 7.3, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Saket.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=6',
        costMultiplier: 1.09, badge: 'Value Care'
    },
{
        id: 'h8', name: 'Moolchand Hospital', location: 'Greater Kailash', rating: 4.0, reviewCount: 1941,
        baseCost: '₹4,000', cleanlinessScore: 9.1, missingFacilities: ["24/7 Pharmacy"],
        description: 'A well-established hospital providing dedicated patient care in Greater Kailash.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=7',
        costMultiplier: 1.36, badge: 'Modern Facility'
    },
{
        id: 'h9', name: 'Venkateshwar Hospital', location: 'South Extension', rating: 4.3, reviewCount: 208,
        baseCost: '₹2,500', cleanlinessScore: 9.7, missingFacilities: ["Blood Bank", "Free Parking", "Standalone Psychiatric Wing"],
        description: 'A well-established hospital providing dedicated patient care in South Extension.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=8',
        costMultiplier: 1.45, badge: 'Premium Care'
    },
{
        id: 'h10', name: 'Indian Spinal Hospital', location: 'Greater Kailash', rating: 4.9, reviewCount: 126,
        baseCost: '₹1,800', cleanlinessScore: 7.8, missingFacilities: ["24/7 Pharmacy"],
        description: 'A well-established hospital providing dedicated patient care in Greater Kailash.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=9',
        costMultiplier: 1.17, badge: 'Value Care'
    },
{
        id: 'h11', name: 'Holy Family Hospital', location: 'Saket', rating: 4.3, reviewCount: 1239,
        baseCost: '₹3,500', cleanlinessScore: 8.7, missingFacilities: ["Comprehensive Transplant Unit", "Free Parking"],
        description: 'A well-established hospital providing dedicated patient care in Saket.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=10',
        costMultiplier: 1.3, badge: 'Reliable'
    },
{
        id: 'h12', name: 'Aakash Hospital', location: 'Pitampura', rating: 4.2, reviewCount: 440,
        baseCost: '₹2,800', cleanlinessScore: 8.6, missingFacilities: ["Affordable Ward Beds"],
        description: 'A well-established hospital providing dedicated patient care in Pitampura.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=11',
        costMultiplier: 1.29, badge: 'Reliable'
    },
{
        id: 'h13', name: 'Blk-Max Hospital', location: 'Karol Bagh', rating: 4.2, reviewCount: 1124,
        baseCost: '₹2,800', cleanlinessScore: 8.1, missingFacilities: ["Standalone Psychiatric Wing", "Affordable Ward Beds", "Trauma Center"],
        description: 'A well-established hospital providing dedicated patient care in Karol Bagh.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=12',
        costMultiplier: 1.21, badge: 'Value Care'
    },
{
        id: 'h14', name: 'Action Balaji Hospital', location: 'Greater Kailash', rating: 4.4, reviewCount: 1213,
        baseCost: '₹2,800', cleanlinessScore: 9.7, missingFacilities: ["Comprehensive Transplant Unit"],
        description: 'A well-established hospital providing dedicated patient care in Greater Kailash.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=13',
        costMultiplier: 1.45, badge: 'Reliable'
    },
{
        id: 'h15', name: 'Kalra Hospital', location: 'Hauz Khas', rating: 4.2, reviewCount: 1253,
        baseCost: '₹3,500', cleanlinessScore: 9.4, missingFacilities: ["Blood Bank"],
        description: 'A well-established hospital providing dedicated patient care in Hauz Khas.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=14',
        costMultiplier: 1.41, badge: 'Modern Facility'
    },
{
        id: 'h16', name: 'Sanjeevan Hospital', location: 'Lajpat Nagar', rating: 4.6, reviewCount: 1933,
        baseCost: '₹1,500', cleanlinessScore: 7.4, missingFacilities: ["Pediatric ICU", "Blood Bank", "Advanced Robotic Surgery"],
        description: 'A well-established hospital providing dedicated patient care in Lajpat Nagar.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=15',
        costMultiplier: 1.11, badge: ''
    },
{
        id: 'h17', name: 'Dharamshila Hospital', location: 'Karol Bagh', rating: 4.8, reviewCount: 1147,
        baseCost: '₹3,500', cleanlinessScore: 8.6, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Karol Bagh.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=16',
        costMultiplier: 1.29, badge: 'Value Care'
    },
{
        id: 'h18', name: 'Pushpawati Hospital', location: 'Greater Kailash', rating: 3.8, reviewCount: 1299,
        baseCost: '₹1,800', cleanlinessScore: 9.6, missingFacilities: ["Pediatric ICU"],
        description: 'A well-established hospital providing dedicated patient care in Greater Kailash.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=17',
        costMultiplier: 1.44, badge: 'Reliable'
    },
{
        id: 'h19', name: "St. Stephen's Hospital", location: 'Lajpat Nagar', rating: 3.9, reviewCount: 155,
        baseCost: '₹3,500', cleanlinessScore: 9.3, missingFacilities: ["Advanced Robotic Surgery", "PET-CT Scan", "Free Parking"],
        description: 'A well-established hospital providing dedicated patient care in Lajpat Nagar.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=18',
        costMultiplier: 1.4, badge: 'Highly Rated'
    },
{
        id: 'h20', name: 'Tirath Ram Hospital', location: 'Lajpat Nagar', rating: 4.6, reviewCount: 1438,
        baseCost: '₹2,800', cleanlinessScore: 7.2, missingFacilities: ["Comprehensive Transplant Unit", "Standalone Psychiatric Wing"],
        description: 'A well-established hospital providing dedicated patient care in Lajpat Nagar.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=19',
        costMultiplier: 1.08, badge: 'Modern Facility'
    },
{
        id: 'h21', name: 'Sir Ganga Ram Hospital', location: 'Dwarka', rating: 4.6, reviewCount: 1288,
        baseCost: '₹1,500', cleanlinessScore: 7.3, missingFacilities: ["Affordable Ward Beds", "Trauma Center"],
        description: 'A well-established hospital providing dedicated patient care in Dwarka.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=20',
        costMultiplier: 1.09, badge: ''
    },
{
        id: 'h22', name: 'Primus Hospital', location: 'Preet Vihar', rating: 4.2, reviewCount: 1743,
        baseCost: '₹4,000', cleanlinessScore: 9.6, missingFacilities: ["Standalone Psychiatric Wing", "Affordable Ward Beds"],
        description: 'A well-established hospital providing dedicated patient care in Preet Vihar.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=21',
        costMultiplier: 1.44, badge: 'Value Care'
    },
{
        id: 'h23', name: 'Mata Chanan Hospital', location: 'Preet Vihar', rating: 4.7, reviewCount: 860,
        baseCost: '₹2,800', cleanlinessScore: 8.8, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Preet Vihar.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=22',
        costMultiplier: 1.32, badge: 'Highly Rated'
    },
{
        id: 'h24', name: 'Bhagwan Mahavir Hospital', location: 'Preet Vihar', rating: 4.7, reviewCount: 219,
        baseCost: '₹1,500', cleanlinessScore: 7.9, missingFacilities: ["24/7 Pharmacy"],
        description: 'A well-established hospital providing dedicated patient care in Preet Vihar.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=23',
        costMultiplier: 1.19, badge: 'Premium Care'
    },
{
        id: 'h25', name: 'Jaipur Golden Hospital', location: 'Lajpat Nagar', rating: 4.5, reviewCount: 1490,
        baseCost: '₹1,800', cleanlinessScore: 9.6, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Lajpat Nagar.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=24',
        costMultiplier: 1.44, badge: 'Premium Care'
    },
{
        id: 'h26', name: 'Artemis Hospital', location: 'Pitampura', rating: 4.9, reviewCount: 701,
        baseCost: '₹4,000', cleanlinessScore: 9.7, missingFacilities: [],
        description: 'A well-established hospital providing dedicated patient care in Pitampura.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=25',
        costMultiplier: 1.45, badge: 'Highly Rated'
    },
{
        id: 'h27', name: 'Columbia Asia Hospital', location: 'South Extension', rating: 4.0, reviewCount: 1503,
        baseCost: '₹3,500', cleanlinessScore: 8.3, missingFacilities: ["Affordable Ward Beds", "Standalone Psychiatric Wing", "Comprehensive Transplant Unit"],
        description: 'A well-established hospital providing dedicated patient care in South Extension.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=26',
        costMultiplier: 1.25, badge: ''
    },
{
        id: 'h28', name: 'Narayana Hospital', location: 'Pitampura', rating: 4.3, reviewCount: 1279,
        baseCost: '₹1,800', cleanlinessScore: 9.8, missingFacilities: ["Affordable Ward Beds", "24/7 Pharmacy"],
        description: 'A well-established hospital providing dedicated patient care in Pitampura.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=27',
        costMultiplier: 1.47, badge: 'Reliable'
    },
{
        id: 'h29', name: 'Yashoda Hospital', location: 'Pitampura', rating: 4.4, reviewCount: 1579,
        baseCost: '₹2,800', cleanlinessScore: 9.2, missingFacilities: ["Trauma Center", "Free Parking"],
        description: 'A well-established hospital providing dedicated patient care in Pitampura.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=28',
        costMultiplier: 1.38, badge: 'Value Care'
    },
{
        id: 'h30', name: 'Metro Hospital', location: 'Greater Kailash', rating: 3.9, reviewCount: 1931,
        baseCost: '₹3,500', cleanlinessScore: 9.9, missingFacilities: ["Pediatric ICU"],
        description: 'A well-established hospital providing dedicated patient care in Greater Kailash.',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop&random=29',
        costMultiplier: 1.49, badge: 'Modern Facility'
    }
];

export const sampleProviders = [
{
        id: '1', name: 'Dr. Shruti Kumar', specialty: 'Cardiologist', yearsExp: 12, rating: 4.7, reviewCount: 183, hospital: 'Kalra Hospital', city: 'South Extension', badge: 'Available Today',
        description: 'Highly experienced Cardiologist focused on comprehensive patient care.',
        specialties: ['Cardiologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Cardiologist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: true, estimatedCost: '₹2,500', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '2', name: 'Dr. Ritu Singh', specialty: 'Pediatrician', yearsExp: 7, rating: 4.6, reviewCount: 354, hospital: 'Aakash Hospital', city: 'Dwarka', badge: 'Excellent',
        description: 'Highly experienced Pediatrician focused on comprehensive patient care.',
        specialties: ['Pediatrician', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Pediatrician', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: false, estimatedCost: '₹800', quality: 'Avg', color: 'bg-health-warning/10 text-health-warning border-health-warning/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '3', name: 'Dr. Rohan Malhotra', specialty: 'Pediatrician', yearsExp: 27, rating: 4.9, reviewCount: 137, hospital: 'Yashoda Hospital', city: 'Dwarka', badge: 'Specialist',
        description: 'Highly experienced Pediatrician focused on comprehensive patient care.',
        specialties: ['Pediatrician', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Pediatrician', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: true, estimatedCost: '₹2,500', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '4', name: 'Dr. Rahul Gupta', specialty: 'Internal Medicine', yearsExp: 14, rating: 4.6, reviewCount: 196, hospital: 'Aakash Hospital', city: 'Karol Bagh', badge: '',
        description: 'Highly experienced Internal Medicine focused on comprehensive patient care.',
        specialties: ['Internal Medicine', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Internal Medicine', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: false, estimatedCost: '₹2,500', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '5', name: 'Dr. Priya Gupta', specialty: 'ENT Specialist', yearsExp: 14, rating: 4.4, reviewCount: 275, hospital: "St. Stephen's Hospital", city: 'Karol Bagh', badge: 'Top Rated',
        description: 'Highly experienced ENT Specialist focused on comprehensive patient care.',
        specialties: ['ENT Specialist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD ENT Specialist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: true, estimatedCost: '₹1,200', quality: 'Avg', color: 'bg-health-warning/10 text-health-warning border-health-warning/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '6', name: 'Dr. Rohan Kapoor', specialty: 'Ophthalmologist', yearsExp: 9, rating: 4.8, reviewCount: 345, hospital: 'Batra Hospital', city: 'Dwarka', badge: '',
        description: 'Highly experienced Ophthalmologist focused on comprehensive patient care.',
        specialties: ['Ophthalmologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Ophthalmologist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: false, estimatedCost: '₹3,500', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '7', name: 'Dr. Ritu Sharma', specialty: 'Neurologist', yearsExp: 25, rating: 4.6, reviewCount: 484, hospital: 'Jaipur Golden Hospital', city: 'South Extension', badge: 'Available Today',
        description: 'Highly experienced Neurologist focused on comprehensive patient care.',
        specialties: ['Neurologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Neurologist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: false, estimatedCost: '₹3,500', quality: 'Avg', color: 'bg-health-warning/10 text-health-warning border-health-warning/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '8', name: 'Dr. Rohan Iyer', specialty: 'Dermatologist', yearsExp: 17, rating: 4.4, reviewCount: 209, hospital: 'Indian Spinal Hospital', city: 'Dwarka', badge: 'Top Rated',
        description: 'Highly experienced Dermatologist focused on comprehensive patient care.',
        specialties: ['Dermatologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Dermatologist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: true, estimatedCost: '₹800', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '9', name: 'Dr. Meera Verma', specialty: 'ENT Specialist', yearsExp: 21, rating: 5.0, reviewCount: 272, hospital: 'Saroj Hospital', city: 'Saket', badge: '',
        description: 'Highly experienced ENT Specialist focused on comprehensive patient care.',
        specialties: ['ENT Specialist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD ENT Specialist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: false, estimatedCost: '₹1,000', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '10', name: 'Dr. Pooja Singh', specialty: 'Urologist', yearsExp: 5, rating: 4.8, reviewCount: 426, hospital: 'Max Hospital', city: 'Saket', badge: 'Specialist',
        description: 'Highly experienced Urologist focused on comprehensive patient care.',
        specialties: ['Urologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Urologist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: false, estimatedCost: '₹2,800', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '11', name: 'Dr. Ananya Kapoor', specialty: 'Cardiologist', yearsExp: 27, rating: 4.0, reviewCount: 493, hospital: 'Narayana Hospital', city: 'South Extension', badge: 'Available Today',
        description: 'Highly experienced Cardiologist focused on comprehensive patient care.',
        specialties: ['Cardiologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Cardiologist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: false, estimatedCost: '₹1,200', quality: 'Avg', color: 'bg-health-warning/10 text-health-warning border-health-warning/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '12', name: 'Dr. Rohan Patel', specialty: 'Gastroenterologist', yearsExp: 28, rating: 4.6, reviewCount: 73, hospital: 'Indian Spinal Hospital', city: 'South Extension', badge: 'Top Rated',
        description: 'Highly experienced Gastroenterologist focused on comprehensive patient care.',
        specialties: ['Gastroenterologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Gastroenterologist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: true, estimatedCost: '₹1,800', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '13', name: 'Dr. Priya Nair', specialty: 'Gastroenterologist', yearsExp: 25, rating: 4.8, reviewCount: 424, hospital: 'Indian Spinal Hospital', city: 'Lajpat Nagar', badge: 'Specialist',
        description: 'Highly experienced Gastroenterologist focused on comprehensive patient care.',
        specialties: ['Gastroenterologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Gastroenterologist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: false, estimatedCost: '₹1,200', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '14', name: 'Dr. Rohan Malhotra', specialty: 'Endocrinologist', yearsExp: 26, rating: 4.3, reviewCount: 73, hospital: 'Dharamshila Hospital', city: 'Preet Vihar', badge: 'Available Today',
        description: 'Highly experienced Endocrinologist focused on comprehensive patient care.',
        specialties: ['Endocrinologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Endocrinologist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: true, estimatedCost: '₹1,000', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '15', name: 'Dr. Anjali Reddy', specialty: 'Psychiatrist', yearsExp: 29, rating: 4.8, reviewCount: 156, hospital: 'Kalra Hospital', city: 'Hauz Khas', badge: '',
        description: 'Highly experienced Psychiatrist focused on comprehensive patient care.',
        specialties: ['Psychiatrist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Psychiatrist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: true, estimatedCost: '₹2,500', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '16', name: 'Dr. Ananya Sharma', specialty: 'Psychiatrist', yearsExp: 24, rating: 4.4, reviewCount: 479, hospital: 'Metro Hospital', city: 'South Extension', badge: 'Available Today',
        description: 'Highly experienced Psychiatrist focused on comprehensive patient care.',
        specialties: ['Psychiatrist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Psychiatrist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: false, estimatedCost: '₹800', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '17', name: 'Dr. Karan Reddy', specialty: 'Neurologist', yearsExp: 5, rating: 4.4, reviewCount: 71, hospital: 'Kailash Hospital', city: 'Lajpat Nagar', badge: 'Available Today',
        description: 'Highly experienced Neurologist focused on comprehensive patient care.',
        specialties: ['Neurologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Neurologist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: true, estimatedCost: '₹2,500', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '18', name: 'Dr. Aarav Rao', specialty: 'Orthopedic Surgeon', yearsExp: 29, rating: 4.7, reviewCount: 419, hospital: 'Tirath Ram Hospital', city: 'Dwarka', badge: 'Specialist',
        description: 'Highly experienced Orthopedic Surgeon focused on comprehensive patient care.',
        specialties: ['Orthopedic Surgeon', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Orthopedic Surgeon', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: true, estimatedCost: '₹1,200', quality: 'High', color: 'bg-health-success/10 text-health-success border-health-success/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '19', name: 'Dr. Ritu Verma', specialty: 'Psychiatrist', yearsExp: 27, rating: 4.6, reviewCount: 231, hospital: 'Apollo Hospital', city: 'Greater Kailash', badge: '',
        description: 'Highly experienced Psychiatrist focused on comprehensive patient care.',
        specialties: ['Psychiatrist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Psychiatrist', institution: 'AIIMS Delhi' }],
        telehealth: true, acceptingNew: true, estimatedCost: '₹1,000', quality: 'Avg', color: 'bg-health-warning/10 text-health-warning border-health-warning/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    },
{
        id: '20', name: 'Dr. Rohan Kapoor', specialty: 'Urologist', yearsExp: 10, rating: 4.7, reviewCount: 124, hospital: 'Fortis Hospital', city: 'Dwarka', badge: 'Top Rated',
        description: 'Highly experienced Urologist focused on comprehensive patient care.',
        specialties: ['Urologist', 'General Consultation', 'Follow-up'],
        education: [{ degree: 'MD Urologist', institution: 'AIIMS Delhi' }],
        telehealth: false, acceptingNew: false, estimatedCost: '₹1,000', quality: 'Avg', color: 'bg-health-warning/10 text-health-warning border-health-warning/20',
        imageUrl: 'https://ui-avatars.com/api/?name=Doc&background=0D8ABC&color=fff&rounded=true&size=128'
    }
];
