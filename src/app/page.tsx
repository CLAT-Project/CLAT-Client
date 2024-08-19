import PrivateRoute from '@/hoc/privateRoute'

const App = () => {
  return (
    <PrivateRoute>
      <main>Home</main>
    </PrivateRoute>
  )
}

export default App
