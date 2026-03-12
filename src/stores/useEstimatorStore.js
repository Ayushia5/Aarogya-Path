import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useEstimatorStore = create(
    persist(
        (set) => ({
            patientData: {
                firstName: '',
                lastName: '',
                dob: '',
                zipCode: '',
                income: 75000,
                insurance: '',
                memberId: ''
            },
            selectedProcedures: [],

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
                patientData: {
                    firstName: '',
                    lastName: '',
                    dob: '',
                    zipCode: '',
                    income: 75000,
                    insurance: '',
                    memberId: ''
                },
                selectedProcedures: []
            })
        }),
        {
            name: 'estimator-storage',
            storage: createJSONStorage(() => sessionStorage), // Use sessionStorage so it stays during refresh but clears on close
        }
    )
);

export default useEstimatorStore;
