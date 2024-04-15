import ProLayout from "@ant-design/pro-layout";
import { Link, Outlet } from "@umijs/max";
import type { FC } from "react";

const BasicLayout: FC = ({ children }: any) =>{
  return <Outlet />

}

export default BasicLayout;
