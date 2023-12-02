import { Route, Routes } from "react-router-dom";
import { Home, Landing, Login, Register, Profile, Fast, Create } from "@/views";
import { UnauthorizedLayout, AuthorizedLayout } from "@/layout";
import { PATH } from "./constants";
import useAuthStore from "@/hooks/useAuthStore";
import Error404 from "@/views/Error404";
import Error500 from "@/views/Error500";
import Recovery from "@/views/RecoveryPassword";

const Root = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <Routes>
      {/* Rutas accesibles para todos */}
      <Route path={PATH.ROOT} element={<UnauthorizedLayout />}>
        <Route path={PATH.ROOT} element={<Landing />} />
        <Route path={PATH.REGISTER} index element={<Register />} />
        <Route path={PATH.LOGIN} index element={<Login />} />
      </Route>

      {/* Rutas solo para usuarios no autorizados */}
      {!isAuthenticated && (
        <>
          <Route path={PATH.LOGIN} element={<UnauthorizedLayout />}>
            {/* <Route index element={<Login />} /> */}
          </Route>

          <Route path={PATH.FAST} element={<UnauthorizedLayout />}>
            <Route index element={<Fast />} />
          </Route>

          <Route path={PATH.RECOVERY} element={<UnauthorizedLayout />}>
            <Route index element={<Recovery />} />
          </Route>
        </>
      )}

      {/* Rutas solo para usuarios autorizados */}
      {isAuthenticated && (
        <>
          <Route path={PATH.DASHBOARD} element={<AuthorizedLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path={PATH.PROFILE} element={<AuthorizedLayout />}>
            <Route index element={<Profile />} />
          </Route>

          <Route path={PATH.FAST} element={<AuthorizedLayout />}>
            <Route index element={<Fast />} />
          </Route>
          <Route
            path={`${PATH.CREATE}/:certification_type_id`}
            element={<AuthorizedLayout />}
          >
            <Route index element={<Create />} />
          </Route>
        </>
      )}

      {/* Rutas para errores o no encontradas */}
      <Route path={PATH.NOT_FOUND} element={<Error404 />} />
      <Route path="*" element={<Error500 />} />
    </Routes>
  );
};

export default Root;
