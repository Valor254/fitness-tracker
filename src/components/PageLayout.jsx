const PageLayout = ({ title, children }) => {
    return (
      <div className="space-y-6 w-full max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {children}
        </div>
      </div>
    );
  };
  
  export default PageLayout;