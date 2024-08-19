import PrivateRoute from '@/hoc/PrivateRoute'

const App = () => {
  return (
    <PrivateRoute>
      <main>Home</main>
    </PrivateRoute>
  )
}

export default App
