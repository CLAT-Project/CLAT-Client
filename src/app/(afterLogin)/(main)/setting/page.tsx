import NavigationBar from "@/components/home/navigationBar";

const Setting = () => {
  // Tab 상태에 따라 콘텐츠 변경
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div>
      <NavigationBar />

      {/* 설정 페이지 콘텐츠 */}
      <div>
        <h1>설정</h1>
      </div>
    </div>
  )
}

export default Setting;