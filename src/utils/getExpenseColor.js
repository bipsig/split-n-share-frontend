export const getExpenseColor = (category) => {
  switch (category) {
    case "Food & Dining":
      return "from-orange-500 to-orange-600";

    case "Transportation":
      return "from-blue-500 to-blue-600";

    case "Shopping":
      return "from-pink-500 to-pink-600";

    case "Entertainment":
      return "from-purple-500 to-purple-600";

    case "Bills & Utilities":
      return "from-amber-500 to-amber-600";

    case "Healthcare":
      return "from-red-500 to-red-600";

    case "Education":
      return "from-indigo-500 to-indigo-600";

    case "Travel":
      return "from-cyan-500 to-cyan-600";

    case "Groceries":
      return "from-yellow-500 to-yellow-600";

    case "Rent & Housing":
      return "from-slate-500 to-slate-600";

    case "Sports & Recreation":
      return "from-rose-500 to-rose-600";

    case "Personal Care":
      return "from-fuchsia-500 to-fuchsia-600";

    case "Insurance":
      return "from-violet-500 to-violet-600";

    case "Gifts":
      return "from-pink-400 to-pink-500";

    case "Charity":
      return "from-red-400 to-red-500";

    case "Business":
      return "from-zinc-500 to-zinc-600";

    case "Other":
    default:
      return "from-gray-500 to-gray-600";
  }
};
