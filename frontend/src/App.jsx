import React from 'react'
import Main from './components/templates/main'
import Button from './components/web/atoms/buttons'
import PageHeader from './components/web/molecules/Pageheader'

const App = () => {
  return (

  <Main>
    {/* <Button variant="primary">Add new widget</Button> */}
    <PageHeader
  title="Welcome back, Adaline!"
  description="It is the best time to manage your finances"
/>
  </Main>

  )
}

export default App
