import { create } from 'zustand';

const useEstimatorStore = create((set) => ({
    patientData: {
        firstName: 'Jane',
        lastName: 'Doe',
        dob: '1988-03-15',
        zipCode: '94102',
        income: 75000,
        insurance: 'blue-shield',
        memberId: 'XYZ-123456789'
    },
    selectedProcedures: ['ECG', 'Cardiac Catheterization', 'Angioplasty'],

    setPatientData: (data) => set((state) => ({
        patientData: { ...state.patientData, ...data }
    })),

    setSelectedProcedures: (procedures) => set({ selectedProcedures: procedures }),

    toggleProcedure: (procedure) => set((state) => {
        const isSelected = state.selectedProcedures.includes(procedure);
        return {
            selectedProcedures: isSelected
                ? state.selectedProcedures.filter(p => p !== procedure)
                : [...state.selectedProcedures, procedure]
        };
    }),

    resetEstimator: () => set({
        patientData: {},
        selectedProcedures: []
    })
}));

export default useEstimatorStore;
