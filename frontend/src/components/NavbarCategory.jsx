import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate

const categories = [
  { label: "For You", value: "" },
  { label: "Tech & Innovation", value: "Tech-Innovation" },
  { label: "Education & Learning", value: "Education-Learning" },
  { label: "Health, Fitness & Sports", value: "Health-Fitness-Sports" },
  { label: "Entertainment & Lifestyle", value: "Entertainment-Lifestyle" },
  { label: "Personal & Parenting", value: "Personal-Parenting" },
  { label: "Business & Finance", value: "Business-Finance" },
  { label: "Beauty, Fashion & DIY", value: "Beauty-Fashion-DIY" },
  { label: "Travel & Adventure", value: "Travel-Adventure" },
  { label: "Environment", value: "Environment" },
  {
    label: "Politics & Current Affairs",
    value: "Politics-Current-Affairs",
  },
  { label: "Books & Literature", value: "Books-Literature" },
  { label: "Photography & Art", value: "Photography-Art" },
  { label: "Social Media", value: "Social-Media" },
  { label: "Relationship & Dating", value: "Relationship-Dating" },
];

function Navigation() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Select-Categories");
  const navigate = useNavigate(); // Initialize the navigate function
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchCategory = urlParams.get("categories");
  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (value) => {
    setActiveCategory(value);
    if (value !== "") {
      navigate(`?categories=${value}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="relative flex items-center border-b">
      <button
        className="flex h-10 w-10 items-center justify-center hover:bg-gray-50"
        aria-label="Add new"
      >
        <Plus className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("left")}
        className={`flex h-10 w-10 items-center justify-center hover:bg-gray-50 ${
          canScrollLeft ? "text-gray-700" : "text-gray-300 cursor-not-allowed"
        }`}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        className="flex-1 overflow-hidden"
        onScroll={checkScroll}
        ref={scrollContainerRef}
      >
        <div className="flex">
          {categories.map((category) => (
            <a
              key={category.value}
              className={`flex h-10 shrink-0 items-center border-b-2 px-4 hover:bg-gray-50 cursor-pointer ${
                category.value === searchCategory
                  ? "border-primary font-semibold text-primary "
                  : "border-transparent text-muted-foreground"
              }`}
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.label}
            </a>
          ))}
        </div>
      </div>
      <button
        onClick={() => scroll("right")}
        className={`flex h-10 w-10 items-center justify-center hover:bg-gray-50 ${
          canScrollRight ? "text-gray-700" : "text-gray-300 cursor-not-allowed"
        }`}
        disabled={!canScrollRight}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Navigation;
