import { Stack } from "@mui/material";
import RenderDashboard from "./RenderComponent";

export default function DashboardLayout() {
  return (
    <Stack sx={{ width:"100%", p: 3 }}>
    <RenderDashboard />
    </Stack>
  );
}
