import React from 'react';

const SkeletonCard = ({ type = 'card' }) => {
    if (type === 'provider') {
        return (
            <div className="card-premium h-[420px] p-0 overflow-hidden flex flex-col">
                <div className="h-40 skeleton rounded-b-none" />
                <div className="p-5 flex-1 space-y-4">
                    <div className="h-6 skeleton w-3/4 rounded-md" />
                    <div className="h-3 skeleton w-1/2 rounded-md" />
                    <div className="h-4 skeleton w-1/4 rounded-md" />
                    <div className="h-10 skeleton w-full rounded-md" />
                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 skeleton rounded-xl" />
                        <div className="h-10 skeleton rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card-premium p-6 space-y-4">
            <div className="h-4 skeleton w-1/4 rounded-md" />
            <div className="h-8 skeleton w-3/4 rounded-md" />
            <div className="h-2 skeleton w-full rounded-md" />
            <div className="h-2 skeleton w-5/6 rounded-md" />
        </div>
    );
};

export default SkeletonCard;
