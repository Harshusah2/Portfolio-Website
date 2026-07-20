import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home }      from "./pages/Home"
import { NotFound }  from "./pages/NotFound"
import { AdminPage } from "./pages/AdminPage"
import { Toaster }   from "@/components/ui/toaster"

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
