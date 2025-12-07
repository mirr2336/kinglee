import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '@pages/index'
import BookmarkPage from './components/bookMark/BookMark'
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/kinglee/" element={<MainPage />}></Route>
                <Route path="/kinglee/search/:id" element={<MainPage />}></Route>
                <Route path="/kinglee/bookmark" element={<BookmarkPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
