import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const PatientProfile = lazy(() => import('./PatientProfile'));
const SelectProcedures = lazy(() => import('./SelectProcedures'));
const Results = lazy(() => import('./Results'));

const CostEstimator = () => {
    return (
        <Suspense fallback={<div className="p-8 skeleton w-full h-96 rounded-2xl"></div>}>
            <Routes>
                <Route path="step-1" element={<PatientProfile />} />
                <Route path="step-2" element={<SelectProcedures />} />
                <Route path="results" element={<Results />} />
                <Route path="/" element={<Navigate to="step-1" replace />} />
            </Routes>
        </Suspense>
    );
};

export default CostEstimator;
