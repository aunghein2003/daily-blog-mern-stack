function CategoryComponent() {
  return (
    <div className="w-full md:fixed md:right-0 md:w-1/3 py-4 px-3">
      <h3 className="font-semibold text-lg">Discover more of your interests</h3>
      <div className="w-full flex flex-wrap mt-3 border-b pb-5">
        <Category>Programming</Category>
        <Category>Data Science</Category>
        <Category>Technology</Category>
        <Category>Self Improvement</Category>
        <Category>Writing</Category>
        <Category>Relationships</Category>
        <Category>Machine Learning</Category>
        <Category>Productivity</Category>
        <Category>Politics</Category>
      </div>
    </div>
  );
}

function Category({ children }) {
  return (
    <p className="px-2 py-1 mr-3 mt-3 border w-max text-sm text-gray-500 hover:bg-gray-200 cursor-pointer">
      {children}
    </p>
  );
}

export default CategoryComponent;
