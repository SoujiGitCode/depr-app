import { Route, Routes } from "react-router-dom";
import { Home, Landing, Login, Register, Profile } from "@/views";
import { UnauthorizedLayout, AuthorizedLayout } from "@/layout";
import { PATH } from "./constants";
import useAuthStore from "@/hooks/useAuthStore";
import Error404 from "@/views/Error404";
import Error500 from "@/views/Error500";

const Root = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path={PATH.ROOT} element={<UnauthorizedLayout />}>
          <Route path={PATH.ROOT} element={<Landing />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Register />} />
          {/* <Route path={PATH.RECOVERY} element={<Recovery />} />
          <Route path={PATH.RECOVERY_TOKEN} element={<RecoveryToken />} /> */}
        </Route>
      ) : (
        <Route path={PATH.ROOT} element={<AuthorizedLayout />}>
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.DASHBOARD} element={<Home />}></Route>
        </Route>
      )}
      <Route path={PATH.NOT_FOUND} element={<Error404 />} />
      <Route path="*" element={<Error500 />} />
    </Routes>
  );
};

export default Root;
