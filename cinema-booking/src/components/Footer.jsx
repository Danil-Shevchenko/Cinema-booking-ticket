import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1, pt: 2 }}>
      <AppBar position="static" sx={{ backgroundColor: "#2e3b55" }}>
        <Toolbar>
          <Typography
            variant="p"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            © 2025 CinemaBT. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
