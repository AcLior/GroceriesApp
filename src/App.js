import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import GroceryList from "./pages/GroceryList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useForm, FormProvider } from "react-hook-form";
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const methods = useForm();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route
            path="grocery-list"
            element={<GroceryList/>}
          />
        </Route>
      </Route>
    )
  );

  return (
    <div>
      <FormProvider {...methods}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </FormProvider>
    </div>
  );
}

export default App;
