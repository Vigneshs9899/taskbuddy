import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold text-blue-600">Task Manager</h2>
        <nav className="mt-4">
          <Link to="/" className="block py-2 text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/tasks" className="block py-2 text-gray-600 hover:text-blue-600">
            Tasks
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;