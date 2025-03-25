const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 dark:bg-gray-900 shadow-lg w-64 p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0`}
      >
        <h2 className="text-lg font-bold">Menu</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href="#"
              className="block p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded"
            >
              Workouts
            </a>
          </li>
        </ul>
        {/* Close Button for Mobile */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 md:hidden text-gray-600 dark:text-gray-400"
        >
          ✕
        </button>
      </div>
    );
  };
  
  export default Sidebar;
  