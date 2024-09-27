'use client';

import NavigationBar from '@/components/home/navigationBar';

const termsOfServicePage = () => {
  return (
    <div className="flex h-screen ">
     
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      <main className="flex-1 p-6 h-4/5 border border-black rounded-lg overflow-y-auto custom-scrollbar">
        <h1 className="text-4xl font-bold p-4 mb-8 border-b-2 border-7B7B7B">서비스 이용규칙 안내</h1>

        <div className="space-y-4">
          <h3 className='font-bold text-xl'>제 1조 목적</h3>
          <p>
            클랫 서비스 이용약관은 클랫팀 이하 ("팀"이라 합니다)가 제공하는 클랫 서비스 및 캠퍼스픽 서비스의 이용과 관련하여 팀과 이용자 간의 권리, 의무 및 책임 사항 등을 규정함을 목적으로 합니다.
          </p>

          <h3 className='font-bold text-xl'>제 2조 정의</h3>
          <p>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </p>
          <ul className="list-disc pl-5">
            <li><strong>"서비스"</strong>: 팀이 제공하는 모든 서비스 및 기능을 말합니다.</li>
            <li><strong>"이용자"</strong>: 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
            <li><strong>"회원"</strong>: 서비스에 회원등록을 하고 서비스를 이용하는 자를 말합니다.</li>
            <li><strong>"비회원"</strong>: 서비스에 회원등록을 하지 않고 서비스를 이용하는 자를 말합니다.</li>
            <li><strong>"로그 기록"</strong>: 이용자가 서비스를 이용하면서 자동으로 생성된 IP 주소, 접속 시간 등을 말합니다.</li>
            <li><strong>"기기 정보"</strong>: 이용자의 통신 기기에서 수집된 유저 에이전트 등을 말합니다.</li>
            <li><strong>"계정"</strong>: 이용계약을 통해 생성된 회원의 고유 아이디와 이에 수반하는 정보를 말합니다.</li>
            <li><strong>"서비스 내부 알림 수단"</strong>: 팝업, 알림, 대화, 1:1 정보 메뉴 등을 말합니다.</li>
            <li><strong>"연락처"</strong>: 회원가입, 본인 인증, 문의 창구 등을 통해 수집된 이용자의 이메일, 휴대전화 번호 등을 의미합니다.</li>
            <li><strong>"관련법"</strong>: 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 전기통신사업법, 개인정보보호법 등 관련 있는 국내 법령을 말합니다.</li>
            <li><strong>"본인 인증"</strong>: 아이핀, 휴대전화 번호 등을 이용한 본인 확인 절차를 말합니다.</li>
            <li><strong>"학교 인증"</strong>: 학생증, 학교 웹메일, 증명서 등을 이용한 학적 확인 절차를 말합니다.</li>
          </ul>

          <h3 className='font-bold text-xl'>제 3조 약관 등의 명시와 설명 및 개정</h3>
          <p>
            팀은 이 약관을 서비스 초기화면, 회원가입 화면 및 "내 정보 메뉴" 등에 게시하거나 기타의 방법으로 회원에게 공지합니다. 
            팀은 필요하다고 인정되는 경우, 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
          </p>

          <h3 className='font-bold text-xl'>제 4조 서비스의 제공</h3>
          <ul className="list-disc pl-5">
            <li>시간표, 학점계산기 등 대학 생활 편의 서비스</li>
            <li>대학교별 폐쇄형 커뮤니티 서비스</li>
            <li>대학 문화 활동, 취업 정보 제공 서비스</li>
            <li>할인 이벤트, 프로모션 광고 정보 제공 서비스</li>
            <li>다른 팀 및 단체와의 제휴나 협력을 통해 제공하는 서비스</li>
            <li>기타 팀이 정하는 서비스</li>
          </ul>
          <p>
            클랫은 학생증, 학교 웹메일, 증명서 등을 통해 해당 대학교의 학부 재학생 및 졸업생 또는 해당연도 입학생으로 인증받은 이용자에 한해 커뮤니티를 이용할 수 있는 폐쇄형 서비스입니다. 
          </p>

          <h3 className='font-bold text-xl'>제 5조 서비스 이용계약의 성립</h3>
          <p>
            팀과 회원의 서비스 이용계약은 서비스를 이용하고자 하는 자(이하 "가입 신청자")가 서비스 내부의 회원가입 양식에 따라 필요한 회원정보를 기입하고, 이 약관 및 개인정보 수집 및 이용 동의, 커뮤니티 이용규칙 등에 명시적인 동의를 한 후 신청한 회원가입 의사 표시(이하 "이용신청")를 팀이 승낙함으로써 체결됩니다.
          </p>

          <h3 className='font-bold text-xl'>제 6조 개인정보의 관리 및 보호</h3>
          <p>
            팀은 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 관해서는 관련 법령 및 팀의 개인정보 처리방침을 따릅니다.
          </p>

          <h3 className='font-bold text-xl'>제 7조 서비스 이용계약의 종료</h3>
          <p>
            회원은 언제든지 본인의 계정으로 로그인한 뒤 서비스 내부의 "탈퇴하기" 버튼을 누르는 방법으로 탈퇴를 요청할 수 있습니다.
          </p>

          <h3 className='font-bold text-xl'>제 8조 저작권의 귀속</h3>
          <p>
            팀이 작성한 게시물에 대한 권리는 팀에 귀속되며, 회원이 작성한 게시물에 대한 권리는 회원에게 귀속됩니다.
          </p>

          <h3 className='font-bold text-xl'>제 9조 금지행위</h3>
          <p>
            이용자는 다음과 같은 행위를 해서는 안됩니다.
          </p>
          <ul className="list-disc pl-5">
            <li>성적 도의관념에 반하는 행위</li>
            <li>홍보 및 판매 행위</li>
            <li>개인정보 또는 계정 기만, 침해, 공유 행위</li>
            <li>시스템 부정행위</li>
          </ul>

          <h3 className='font-bold text-xl'>제 10조 재판권 및 준거법</h3>
          <p>
            팀과 이용자 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할 법원에 제소합니다. 팀과 이용자 간에 제기된 소송에는 대한민국 법을 준거법으로 합니다.
          </p>
        </div>
      </main>


    </div>
  );
};

export default termsOfServicePage;
