
import { Link } from "react-router-dom";
import { SchemeCategory } from "@/contexts/SchemesContext";

interface CategoryNavigationProps {
  categories: SchemeCategory[];
  activeCategory: string | null;
  onChange?: (categoryId: string) => void;
}

const CategoryNavigation = ({ categories, activeCategory, onChange }: CategoryNavigationProps) => {
  // Map category IDs to their respective routes
  const getCategoryRoute = (categoryId: string): string => {
    switch(categoryId) {
      case "psd":
        return "/public-service";
      case "iud":
        return "/infrastructure";
      case "egfm":
        return "/economic-growth";
      case "eps":
        return "/environmental";
      default:
        return `/dashboard/category/${categoryId}`;
    }
  };
  
  const handleClick = (categoryId: string) => {
    if (onChange) {
      onChange(categoryId);
    }
  };
  
  return (
    <div className="mb-8">
      <nav className="flex overflow-x-auto pb-2 space-x-2">
        <Link
          to="/dashboard"
          className={`px-4 py-2 whitespace-nowrap rounded-md border transition-colors ${
            activeCategory === null
              ? "bg-dashboardBlue text-white border-dashboardBlue"
              : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
          }`}
          onClick={() => handleClick('null')}
        >
          All Categories
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category.id}
            to={getCategoryRoute(category.id)}
            className={`px-4 py-2 whitespace-nowrap rounded-md border transition-colors ${
              activeCategory === category.id
                ? "bg-dashboardBlue text-white border-dashboardBlue"
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
            }`}
            onClick={() => handleClick(category.id)}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CategoryNavigation;
