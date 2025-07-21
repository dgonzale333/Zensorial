"use client"

import { motion } from "framer-motion"

const LoadingSkeleton = ({ type = "card" , count = 4}) => {
    const skeletonVariants = {
        loading: {
            opacity: [0.5, 1, 0.5],
            transition: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            },
        },
    }

    if (type === "card") {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: count }).map((_, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                        variants={skeletonVariants}
                        animate="loading"
                    >
                        <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>

                        <div className="p-6 space-y-4">
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>

                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-14"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        )
    }

    if (type === "timeline") {
        return (
            <div className="space-y-12">
                {Array.from({ length: count }).map((_, index) => (
                    <motion.div
                        key={index}
                        className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} `}
                        variants={skeletonVariants}
                        animate="loading"
                    >
                        <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                                <div className="h-8 bg-gray-200 dark_bg-gray-700 rounded w-20 mb-2"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
                            </div>
                        </div>
                        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-1/2"></div>
                    </motion.div>
                ))}
            </div>
        )
    }
    return null
}

export default LoadingSkeleton