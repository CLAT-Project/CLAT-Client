import Header from "@/components/home/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container mx-auto max-w-2/3 px-6'>
      <Header onProfileClick={toggleProfilePanel} />
      <main className="flex-1 p-8">
        {/* <BookmarkProvider> */}
        {children}
        {/* </BookmarkProvider> */}
      </main>
      <ProfilePanel isOpen={isProfileOpen} onClose={toggleProfilePanel} />
    </div>
  )
}

export default MainLayout;
