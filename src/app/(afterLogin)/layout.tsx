import PrivateRouter from "@/hoc/PrivateRoute"

const AfterLoginLayout = ({ children }: {
  children: React.ReactNode
}) => {

  return (
    <PrivateRouter>
      {children}
    </PrivateRouter>
  )
}

export default AfterLoginLayout