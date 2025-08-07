import { useEffect } from 'react'
import Thoughts from '@/components/Thoughts/Thoughts'
import CentralizedContainer from './components/CentralizedContainer/CentralizedContainer'

function App() {
  useEffect(() => {
    document.title = 'Simple Thoughts'
  }, [])

  return (
    <CentralizedContainer>
      <Thoughts />
    </CentralizedContainer>
  )
}

export default App;
