import React, { useState } from 'react';
import { db } from '../firebase'; // Adjust the path if firebase.js is located elsewhere
import { collection, addDoc } from 'firebase/firestore';

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !contact) {
      setSubmitMessage('이름과 연락처를 모두 입력해주세요.');
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        name: name,
        contact: contact,
        submittedAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setSubmitMessage('참가 신청이 완료되었습니다!');
      setName('');
      setContact('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">동아리 참가 신청</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="이름을 입력하세요"
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">연락처</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="전화번호 또는 이메일"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? '제출 중...' : '신청하기'}
          </button>
        </div>
      </form>
      {submitMessage && (
        <p className={`text-center mt-4 ${submitMessage.includes('완료') ? 'text-green-500' : 'text-red-500'}`}>
          {submitMessage}
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;