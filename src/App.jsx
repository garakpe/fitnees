import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './components/Header';
import Footer from './components/Footer';
import MediaGrid from './components/MediaGrid';
import Modal from './components/Modal';
import ApplicationForm from './components/ApplicationForm';
import ImageUploader from './components/ImageUploader';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setIsLoginModalOpen(false); // Close login modal on successful login
      }
    });
    return () => unsubscribe();
  }, []);

  const openMediaModal = (media) => {
    setSelectedMedia(media);
    setIsMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
    setIsMediaModalOpen(false);
  };

  const handleUploadSuccess = () => {
    setUploadCount(uploadCount + 1);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      <main className="flex-grow container mx-auto p-4">
        <MediaGrid onMediaClick={openMediaModal} uploadCount={uploadCount} />
        {user && <ImageUploader onUploadSuccess={handleUploadSuccess} />}
        <ApplicationForm />
      </main>
      <Footer />
      <Modal isOpen={isMediaModalOpen} onClose={closeMediaModal}>
        {selectedMedia && (
          <img src={selectedMedia.src} alt="Selected Media" className="w-full h-full object-contain" />
        )}
      </Modal>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login />
      </Modal>
    </div>
  );
}

export default App;
