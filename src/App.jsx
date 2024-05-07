import './App.css'
import ContactList from './components/contacts/contact-list'
import CreateContact from './components/contacts/create-contact'
import Loading from './components/loading'
import ContactPage from './pages/contact-page'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ContactPage />}>
          <Route path='/list' element={<ContactList />} />
          <Route path='/create' element={<CreateContact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
