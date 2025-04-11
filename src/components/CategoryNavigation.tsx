
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SchemeCategory } from "@/contexts/SchemesContext";
import { Link } from "react-router-dom";

interface CategoryNavigationProps {
  categories: SchemeCategory[];
  activeCategory: string | null;
  className?: string;
}

const CategoryNavigation = ({ categories, activeCategory, className }: CategoryNavigationProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2 mb-6", className)}>
      <Button 
        asChild
        variant={!activeCategory ? "default" : "outline"}
        className={cn(!activeCategory ? "bg-dashboardBlue" : "")}
      >
        <Link to="/dashboard">All Categories</Link>
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          asChild
          variant={activeCategory === category.id ? "default" : "outline"}
          className={cn(activeCategory === category.id ? "bg-dashboardBlue" : "")}
        >
          <Link to={`/dashboard/category/${category.id}`}>
            {category.name}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default CategoryNavigation;
