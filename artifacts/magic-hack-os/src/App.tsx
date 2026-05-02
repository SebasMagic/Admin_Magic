import { Switch, Route, Router as WouterRouter } from "wouter";
import Dashboard from "@/pages/Dashboard";
import Pipeline from "@/pages/Pipeline";
import Proyectos from "@/pages/Proyectos";
import ProyectoDetalle from "@/pages/ProyectoDetalle";
import Tareas from "@/pages/Tareas";
import Clientes from "@/pages/Clientes";
import ClienteDetalle from "@/pages/ClienteDetalle";
import Equipo from "@/pages/Equipo";
import Facturacion from "@/pages/Facturacion";
import Gastos from "@/pages/Gastos";
import Proveedores from "@/pages/Proveedores";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/pipeline" component={Pipeline} />
      <Route path="/proyectos/:id" component={ProyectoDetalle} />
      <Route path="/proyectos" component={Proyectos} />
      <Route path="/tareas" component={Tareas} />
      <Route path="/clientes/:id" component={ClienteDetalle} />
      <Route path="/clientes" component={Clientes} />
      <Route path="/equipo" component={Equipo} />
      <Route path="/facturacion" component={Facturacion} />
      <Route path="/gastos" component={Gastos} />
      <Route path="/proveedores" component={Proveedores} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
