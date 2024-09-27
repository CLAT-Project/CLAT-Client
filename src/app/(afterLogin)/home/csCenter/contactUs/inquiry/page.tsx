'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/home/navigationBar';


const InquiryPage = () => {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [filepath, setFilepath] = useState<File | null>(null);
  const [memberId, setMemberId] = useState(1); // 예시로 memberId는 1로 설정

  // 문의 내용과 파일을 서버로 전송하는 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const memberId = 1;
    const formData = new FormData();
    formData.append('description', description);
    formData.append('memberId', String(memberId));

    if (filepath) {
      formData.append('file', filepath);
    }

    try {
      const response = await fetch('http://localhost:5000/help/report', {
      // const response = await fetch('/help/report', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('문의가 성공적으로 전송되었습니다.');
       
        router.push('/home/csCenter/contactUs/success');
      } else {
        console.error('문의 전송 중 오류 발생');
      }
    } catch (error) {
      console.error('오류 발생', error);
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>
      
      <div className="w-3/4">
        <main className="p-6 h-[calc(100vh-100px)] border border-black rounded-lg overflow-y-auto custom-scrollbar">
          <h1 className="text-4xl font-bold p-4 mb-8 border-b-2 border-7b7b7b">문의하기</h1>

          {/* 문의 내용 입력 영역 */}
          <div className="space-y-4">
            
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 font-semibold">문의 내용</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[400px] p-2 border border-blue-500 rounded-lg"
                rows={5}
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex items-start ">
                <label htmlFor="filepath" className="cursor-pointer flex items-center mr-4">
                  {/* SVG or 이미지 버튼 */}
                  <svg width="192" height="75" viewBox="0 0 192 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="172" height="55" rx="9" fill="#2C75FF"/>
                  <path d="M68.125 27.9375H64.4434L62.6332 25.2228C62.5362 25.0775 62.4049 24.9583 62.2508 24.8758C62.0968 24.7933 61.9247 24.7501 61.75 24.75H53.25C53.0753 24.7501 52.9032 24.7933 52.7492 24.8758C52.5951 24.9583 52.4638 25.0775 52.3668 25.2228L50.5552 27.9375H46.875C46.0296 27.9375 45.2189 28.2733 44.6211 28.8711C44.0233 29.4689 43.6875 30.2796 43.6875 31.125V46C43.6875 46.8454 44.0233 47.6561 44.6211 48.2539C45.2189 48.8517 46.0296 49.1875 46.875 49.1875H68.125C68.9704 49.1875 69.7811 48.8517 70.3789 48.2539C70.9767 47.6561 71.3125 46.8454 71.3125 46V31.125C71.3125 30.2796 70.9767 29.4689 70.3789 28.8711C69.7811 28.2733 68.9704 27.9375 68.125 27.9375ZM69.1875 46C69.1875 46.2818 69.0756 46.552 68.8763 46.7513C68.677 46.9506 68.4068 47.0625 68.125 47.0625H46.875C46.5932 47.0625 46.323 46.9506 46.1237 46.7513C45.9244 46.552 45.8125 46.2818 45.8125 46V31.125C45.8125 30.8432 45.9244 30.573 46.1237 30.3737C46.323 30.1744 46.5932 30.0625 46.875 30.0625H51.125C51.3 30.0626 51.4723 30.0195 51.6266 29.937C51.7809 29.8545 51.9124 29.7352 52.0095 29.5897L53.8184 26.875H61.1802L62.9905 29.5897C63.0876 29.7352 63.2191 29.8545 63.3734 29.937C63.5277 30.0195 63.7 30.0626 63.875 30.0625H68.125C68.4068 30.0625 68.677 30.1744 68.8763 30.3737C69.0756 30.573 69.1875 30.8432 69.1875 31.125V46ZM57.5 32.1875C56.3442 32.1875 55.2144 32.5302 54.2534 33.1723C53.2924 33.8145 52.5434 34.7271 52.1011 35.7949C51.6588 36.8627 51.5431 38.0377 51.7685 39.1713C51.994 40.3049 52.5506 41.3461 53.3678 42.1634C54.1851 42.9807 55.2264 43.5372 56.3599 43.7627C57.4935 43.9882 58.6685 43.8725 59.7363 43.4302C60.8041 42.9879 61.7168 42.2389 62.3589 41.2779C63.001 40.3169 63.3438 39.187 63.3438 38.0312C63.342 36.4819 62.7257 34.9966 61.6302 33.901C60.5347 32.8055 59.0493 32.1893 57.5 32.1875ZM57.5 41.75C56.7645 41.75 56.0455 41.5319 55.434 41.1233C54.8224 40.7147 54.3458 40.1339 54.0643 39.4544C53.7829 38.7748 53.7092 38.0271 53.8527 37.3058C53.9962 36.5844 54.3504 35.9218 54.8704 35.4017C55.3905 34.8816 56.0531 34.5274 56.7745 34.384C57.4959 34.2405 58.2436 34.3141 58.9231 34.5956C59.6026 34.877 60.1834 35.3537 60.592 35.9652C61.0006 36.5768 61.2188 37.2958 61.2188 38.0312C61.2188 39.0175 60.827 39.9634 60.1296 40.6608C59.4322 41.3582 58.4863 41.75 57.5 41.75Z" fill="white"/>
                  <path d="M85.5598 33.908V41.27C86.1178 41.252 86.6938 41.234 87.2698 41.216V33.908H85.5598ZM89.5558 33.908V41.054C90.2038 41 90.8518 40.964 91.4638 40.874L91.6078 42.602C88.2418 43.196 84.4798 43.268 81.6538 43.268L81.4018 41.324C81.9778 41.324 82.6078 41.324 83.2558 41.324V33.908H81.8338V32H90.9778V33.908H89.5558ZM97.0078 36.734V38.696H94.5958V47.066H92.2198V30.488H94.5958V36.734H97.0078ZM111.946 30.47V38.768H109.552V30.47H111.946ZM100.714 34.736C100.714 35.924 101.632 36.608 102.856 36.608C104.08 36.608 104.962 35.924 104.962 34.736C104.962 33.566 104.08 32.864 102.856 32.864C101.632 32.864 100.714 33.566 100.714 34.736ZM107.266 34.736C107.266 36.95 105.376 38.534 102.856 38.534C100.318 38.534 98.4103 36.95 98.4103 34.736C98.4103 32.54 100.318 30.956 102.856 30.956C105.376 30.956 107.266 32.54 107.266 34.736ZM103.27 45.014H112.36V46.85H100.912V42.278H109.588V41.27H100.894V39.452H111.946V43.97H103.27V45.014ZM128.767 38.102L127.687 39.938C125.815 39.452 124.501 38.426 123.745 37.094C123.025 38.552 121.711 39.686 119.785 40.226L118.687 38.39C121.351 37.652 122.521 35.816 122.521 33.98H119.281V32.108H122.521V30.416H124.897V32.108H128.173V33.98H124.897C124.897 35.708 126.085 37.418 128.767 38.102ZM123.979 42.764V44.996H130.351V42.764H123.979ZM121.639 46.85V40.892H132.673V46.85H121.639ZM130.297 30.47H132.673V40.172H130.297V36.716H127.795V34.808H130.297V30.47ZM146.262 36.554V34.844H139.44V36.554H146.262ZM148.602 31.1V38.444H137.082V31.1H139.44V32.99H146.262V31.1H148.602ZM150.384 40.01V41.9H144.012V47.066H141.636V41.9H135.372V40.01H150.384Z" fill="white"/>
                  </svg>

                  {/* 숨겨진 파일 인풋 */}
                  <input
                    type="file"
                    id="filepath"
                    onChange={(e) => setFilepath(e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                  />
                </label>

                 {/* 개인정보 동의 체크박스 및 텍스트 */}
                <div className="mt-4 flex items-start">
                  {/* 체크박스 */}
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    name="privacyConsent"
                    className="w-4 h-4 mt-1 mr-2"
                  />
                  {/* 개인정보 동의 텍스트 및 설명 */}
                  <div className="flex flex-col">
                    <span className="text-sm">개인정보 이용 동의*</span>
                    <p className="text-xs text-gray-500">
                      문의 처리를 위해 수집된 개인정보는 개인정보처리방침에 따라 3년 후 파기됩니다.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 문의 접수 버튼 */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-6 bg-blue-500 text-white rounded-lg"
          >
            문의 접수하기
          </button>
        </main>
      </div>
    </div>
  );
};

export default InquiryPage;
