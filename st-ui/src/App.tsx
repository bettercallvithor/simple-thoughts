import { useEffect } from 'react'
import CentralizedContainer from './components/CentralizedContainer/CentralizedContainer'
import ThoughtsFactory from './components/Thoughts/factories/ThoughtsBuilder'

function App() {
  useEffect(() => {
    document.title = 'Simple Thoughts'
  }, [])

  return (
    <CentralizedContainer>
      <ThoughtsFactory />
    </CentralizedContainer>
  )
}

export default App;
