import { Routes, Route } from 'react-router-dom';
import NovoPrato from './paginas/Admin/NovoPrato/NovoPrato';
import NovoRestaurante from './paginas/Admin/NovoRestaurante/NovoRestaurante';
import PaginaBaseAdmin from './paginas/Admin/PaginaBaseAdmin';
import AdminPratos from './paginas/Admin/Pratos/AdminPratos';
import AdminRestaurantes from './paginas/Admin/Restaurantes/AdminRestaurantes';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<NovoRestaurante />} />
        <Route path="restaurantes/:id" element={<NovoRestaurante />} />

        <Route path="pratos" element={<AdminPratos />} />
        <Route path="pratos/novo" element={<NovoPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
