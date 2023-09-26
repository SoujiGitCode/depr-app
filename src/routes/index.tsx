import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, RequestServices } from "@/views";
import { UnauthorizedLayout, AuthorizedLayout } from "@/layout";
import { PATH } from "./constants";
import useAuthStore from "@/hooks/useAuthStore";
import Profile from "@/views/Profile";
import Error404 from "@/views/Error500";
import Recovery from "@/views/Recovery";
import RecoveryToken from "@/views/RecoveryToken";

const Root = () => {
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path={PATH.ROOT} element={<UnauthorizedLayout />}>
          <Route path={PATH.ROOT} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.RECOVERY} element={<Recovery />} />
          <Route path={PATH.RECOVERY_TOKEN} element={<RecoveryToken />} />
        </Route>
      ) : (
        <Route path={PATH.ROOT} element={<AuthorizedLayout />}>
          <Route path={PATH.ROOT} element={<Home />}></Route>
          <Route
            path={PATH.REQUEST_SERVICES}
            element={<RequestServices />}
          ></Route>
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.RECOVERY} element={<Recovery />} />
          <Route path={PATH.RECOVERY_TOKEN} element={<RecoveryToken />} />
        </Route>
      )}
      <Route path={PATH.NOT_FOUND} element={<Error404 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Root;
