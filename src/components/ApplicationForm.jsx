import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    contact: "",
    hasSmartwatch: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.name || !formData.contact) {
      setSubmitMessage("학번, 이름, 연락처는 필수 항목입니다.");
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      await addDoc(collection(db, "applications"), {
        ...formData,
        submittedAt: new Date(),
      });
      setSubmitMessage(
        "참가 신청이 성공적으로 완료되었습니다! 폼은 5초 후에 다시 나타납니다."
      );
      setTimeout(() => {
        setSubmitMessage("");
        setFormData({
          studentId: "",
          name: "",
          contact: "",
          hasSmartwatch: false,
        });
      }, 5000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
    setIsSubmitting(false);
  };

  if (submitMessage.includes("완료")) {
    return (
      <div className="max-w-md mx-auto my-10 text-center p-6 md:p-10 bg-white rounded-2xl shadow-xl">
        <h2 className="text-xl md:text-2xl font-bold text-green-500">
          신청 완료!
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600">
          {submitMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 md:p-8 rounded-2xl shadow-xl">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl md:text-2xl font-extrabold text-gray-900">
          피트니스가락 참가 신청
        </h2>
        <p className="mt-2 text-xs md:text-sm text-gray-500">
          피트니스 가락과 함께 건강한 학교 생활을 시작하세요!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <div className="flex items-center">
          <label
            htmlFor="studentId"
            className="w-20 text-xs md:text-sm font-semibold text-gray-700 flex-shrink-0"
          >
            학번
          </label>
          <input
            type="text"
            id="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="flex-grow block w-full px-3 py-2 md:px-4 md:py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-sm md:text-base"
            placeholder="10101"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="name"
            className="w-20 text-xs md:text-sm font-semibold text-gray-700 flex-shrink-0"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="flex-grow block w-full px-3 py-2 md:px-4 md:py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-sm md:text-base"
            placeholder="홍길동"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="contact"
            className="w-20 text-xs md:text-sm font-semibold text-gray-700 flex-shrink-0"
          >
            연락처
          </label>
          <input
            type="tel"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            className="flex-grow block w-full px-3 py-2 md:px-4 md:py-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-sm md:text-base"
            placeholder="010-1234-5678"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex items-center pt-3 md:pt-4">
          <input
            id="hasSmartwatch"
            type="checkbox"
            checked={formData.hasSmartwatch}
            onChange={handleCheckboxChange}
            className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md shadow-sm"
            disabled={isSubmitting}
          />
          <label
            htmlFor="hasSmartwatch"
            className="ml-3 block text-xs md:text-sm font-medium text-gray-700"
          >
            스마트워치를 가지고 있습니다. (필수x)
          </label>
        </div>
        <div className="text-center pt-4 md:pt-6">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2.5 px-5 md:py-3 md:px-6 border border-transparent shadow-lg text-sm md:text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transform transition-transform duration-200 hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "제출 중..." : "신청서 제출"}
          </button>
        </div>
      </form>
      <div className="text-center mt-6 md:mt-8">
        <a
          href="https://open.kakao.com/o/gpd2s6qh"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex justify-center py-2.5 px-5 md:py-3 md:px-6 border border-transparent shadow-lg text-sm md:text-base font-medium rounded-full text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform transition-transform duration-200 hover:scale-105"
        >
          카카오톡 오픈채팅방 참여하기
        </a>
      </div>
      {submitMessage && !submitMessage.includes("완료") && (
        <p className="text-center mt-4 md:mt-5 text-xs md:text-sm text-red-600">
          {submitMessage}
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;
