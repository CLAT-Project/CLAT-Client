'use client';

import NavigationBar from '@/components/home/navigationBar';

const youthProtectionPolicyPage = () => {
  return (
    <div className="flex h-screen ">
     
      <div className="w-1/4 px-4">
       <NavigationBar />
      </div>

      <main className="flex-1 p-6 h-4/5 border border-black rounded-lg overflow-y-auto custom-scrollbar">
        <h1 className="text-4xl font-bold p-4 mb-8 border-b-2 border-7B7B7B">청소년 보호 정책</h1>

        <div className="space-y-4">
          <h3 className='font-bold text-xl'>청소년 보호 정책 안내</h3>
          <p>
            청소년 보호 정책은 클랫팀 이하 ( "팀" 이라 합니다)가 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』에 근거하여 유해정보 및 유해환경으로부터 청소년을 보호하기 위함을 목적으로 합니다.
          </p>

          <h3 className='font-bold text-xl'>1. 청소년 보호를 위한 목표 및 기본원칙</h3>
          <p>
            팀은 청소년이 안전한 환경에서 서비스를 이용하며 건전한 인격체로 성장할 수 있도록 최선의 노력을 다하고 있습니다.
          </p>

          <h3 className='font-bold text-xl'>2. 유해정보에 대한 청소년 접근제한 및 관리조치</h3>
          <p>
            팀은 청소년이 아무런 제한장치 없이 청소년 유해정보에 노출되지 않도록 게시물 검수 및 신고 시스템과 게시물 신고센터를 운영하고 있습니다. 또한, 불법촬영물, 청소년유해매체물 등 성적 도의관념에 반하는 행위를 커뮤니티 이용규칙에 의거하여 엄격하게 금지하고 있습니다.
          </p>

          <h3 className='font-bold text-xl'>3. 청소년 보호를 위한 교육</h3>
          <p>
            팀은 관련된 임직원을 대상으로 청소년 보호 관련 법령 및 보호정책, 유해정보 발견 시 대처 방법, 위반사항 처리에 대한 보고 절차 등을 교육하고 있습니다.
          </p>

          <h3 className='font-bold text-xl'>4. 유해정보로 인한 피해상담 및 고충처리</h3>
          <p>
            팀은 청소년 유해정보로 인한 피해상담 및 고충처리를 위한 전문인력을 배치하여 그 피해가 확산되지 않도록 하고 있습니다. 이용자는 "청소년보호 책임자 및 담당자의 지정 현황"을 참고하여 피해상담 및 고충처리를 요청할 수 있습니다.
          </p>
        </div>
      </main>


    </div>
  );
};

export default youthProtectionPolicyPage;
