// Tailwind class mappings for components
export const classes = {
    btn: "px-4 py-2 rounded-lg font-medium transition-all duration-200",
    btnPrimary: "bg-cyan-500 hover:bg-cyan-600 text-gray-900",
    btnSecondary: "bg-gray-700 hover:bg-gray-600 text-gray-100",
    btnOutline: "border border-gray-600 hover:border-cyan-500 hover:text-cyan-500",
    card: "bg-gray-900 border border-gray-800 rounded-lg p-4 transition-all duration-200",
    badge: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    badgeGet: "bg-green-500/10 text-green-400 border border-green-500/20",
    badgePost: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    badgePut: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    badgeDelete: "bg-red-500/10 text-red-400 border border-red-500/20",
};

// Helper to combine classes
export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');
