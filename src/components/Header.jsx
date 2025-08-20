import React from 'react';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Header = ({ user, onLoginClick, onLogoutClick }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">피트니스가락</h1>
      <div>
        {user ? (
          <button
            onClick={onLogoutClick}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            로그아웃
          </button>
        ) : (
          <button onClick={onLoginClick} className="p-2 rounded-full hover:bg-gray-700">
            <UserIcon />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;