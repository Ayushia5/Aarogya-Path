export const medicalProcedures = [
    {
        category: "Diagnostic Imaging",
        id: "diagnostic-imaging",
        procedures: [
            {
                name: "CT Scan (Head/Brain)",
                minCost: 2500,
                maxCost: 9000,
                description: "Provides detailed cross-sectional images of the brain to detect injuries or tumors."
            },
            {
                name: "PET Scan (Whole Body)",
                minCost: 35000,
                maxCost: 70000,
                description: "Often used in oncology to detect cancer cells and assess treatment efficacy."
            },
            {
                name: "Ultrasound (Abdomen/Pelvis)",
                minCost: 800,
                maxCost: 3500,
                description: "Uses sound waves to evaluate organs like the liver, kidneys, and gallbladder."
            },
            {
                name: "MRI Scan (Brain/Spine/Joints)",
                minCost: 3000,
                maxCost: 25000,
                description: "Uses powerful magnets and radio waves for highly detailed soft tissue imaging."
            }
        ]
    },
    {
        category: "General Surgery & Gastroenterology",
        id: "general-surgery",
        procedures: [
            {
                name: "Appendectomy",
                minCost: 45000,
                maxCost: 100000,
                avgCost: 53000,
                description: "Emergency surgical removal of an inflamed appendix."
            },
            {
                name: "Cholecystectomy (Gallbladder Removal)",
                minCost: 42750,
                maxCost: 185680,
                avgCost: 77590,
                description: "Surgical removal of the gallbladder, typically to treat gallstones."
            },
            {
                name: "Endoscopy (Upper GI)",
                minCost: 2100,
                maxCost: 10500,
                description: "A non-surgical procedure used to examine a person's digestive tract using a flexible tube with a light and camera."
            },
            {
                name: "Colonoscopy",
                minCost: 20000,
                maxCost: 41000,
                description: "An exam used to detect changes or abnormalities in the large intestine and rectum."
            }
        ]
    },
    {
        category: "Orthopedic Surgery",
        id: "orthopedic",
        procedures: [
            {
                name: "Total Knee Replacement",
                minCost: 50000,
                maxCost: 400000,
                avgCost: 233800,
                description: "Replacing a severely damaged knee joint with an artificial implant."
            },
            {
                name: "Total Hip Replacement",
                minCost: 60000,
                maxCost: 800000,
                avgCost: 250000,
                description: "Surgical procedure to replace a worn-out or damaged hip joint with a prosthesis."
            }
        ]
    },
    {
        category: "Ophthalmology (Eye Care)",
        id: "ophthalmology",
        procedures: [
            {
                name: "Cataract Surgery",
                minCost: 15200,
                maxCost: 55000,
                description: "Removal of the clouded lens of the eye and replacing it with a clear artificial lens."
            },
            {
                name: "LASIK Eye Surgery",
                minCost: 40000,
                maxCost: 110000,
                description: "Laser eye surgery to correct vision problems like myopia, hyperopia, and astigmatism."
            }
        ]
    },
    {
        category: "Cardiology",
        id: "cardiology",
        procedures: [
            {
                name: "Coronary Angiography",
                minCost: 5000,
                maxCost: 210000,
                description: "An X-ray imaging test done to see if your coronary arteries are narrowed or blocked."
            },
            {
                name: "Angioplasty (PTCA)",
                minCost: 67000,
                maxCost: 135000,
                description: "Procedure to restore blood flow through the artery."
            }
        ]
    },
    {
        category: "Maternity & Fertility",
        id: "maternity",
        procedures: [
            {
                name: "Normal Delivery",
                minCost: 28000,
                maxCost: 94500,
                avgCost: 47400,
                description: "Vaginal birth, with costs heavily dependent on the hospital room type and length of stay."
            },
            {
                name: "C-Section (Cesarean Delivery)",
                minCost: 56000,
                maxCost: 93000,
                avgCost: 75000,
                description: "Surgical delivery of a baby through incisions in the abdomen and uterus."
            },
            {
                name: "In-Vitro Fertilization (IVF)",
                minCost: 25000,
                maxCost: 500000,
                avgCost: 155700,
                description: "Assisted reproductive technology where an egg is combined with sperm outside the body."
            }
        ]
    },
    {
        category: "Specialized & Elective Procedures",
        id: "specialized",
        procedures: [
            {
                name: "Dialysis (Per Session)",
                minCost: 750,
                maxCost: 5000,
                description: "Blood purification procedure for patients with kidney failure. Usually required multiple times a week."
            },
            {
                name: "Hair Transplant",
                minCost: 25000,
                maxCost: 265000,
                description: "Surgical technique that moves hair follicles from a donor site to a bald or balding part of the body."
            },
            {
                name: "Gastric Bypass Surgery",
                minCost: 50000,
                maxCost: 1300000,
                avgCost: 356100,
                description: "Bariatric surgery that alters the digestive system to aid in significant weight loss."
            }
        ]
    }
];
