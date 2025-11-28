import {
  Utensils,
  Bus,
  ShoppingBag,
  Gamepad2,
  Home,
  HeartPulse,
  GraduationCap,
  Plane,
  Apple,
  Building2,
  Dumbbell,
  Sparkles,
  ShieldCheck,
  Gift,
  HelpingHand,
  Briefcase,
  Receipt,
} from "lucide-react";

export const getExpenseIcon = (category) => {
  const iconClass = "w-5 h-5 sm:w-6 sm:h-6 text-white";

  switch (category) {
    case "Food & Dining":
      return <Utensils className={iconClass} />;

    case "Transportation":
      return <Bus className={iconClass} />;

    case "Shopping":
      return <ShoppingBag className={iconClass} />;

    case "Entertainment":
      return <Gamepad2 className={iconClass} />;

    case "Bills & Utilities":
      return <Home className={iconClass} />;

    case "Healthcare":
      return <HeartPulse className={iconClass} />;

    case "Education":
      return <GraduationCap className={iconClass} />;

    case "Travel":
      return <Plane className={iconClass} />;

    case "Groceries":
      return <Apple className={iconClass} />;

    case "Rent & Housing":
      return <Building2 className={iconClass} />;

    case "Sports & Recreation":
      return <Dumbbell className={iconClass} />;

    case "Personal Care":
      return <Sparkles className={iconClass} />;

    case "Insurance":
      return <ShieldCheck className={iconClass} />;

    case "Gifts":
      return <Gift className={iconClass} />;

    case "Charity":
      return <HelpingHand className={iconClass} />;

    case "Business":
      return <Briefcase className={iconClass} />;

    case "Other":
    default:
      return <Receipt className={iconClass} />;
  }
};
