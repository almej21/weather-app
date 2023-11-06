import ThunderstormOutlinedIcon from "@mui/icons-material/ThunderstormOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppState } from "context/AppProvider";
import { Link } from "react-router-dom";
import "./navbar.scss";

const pages = ["favorites", "home"];

function Navbar() {
  const { mode, setMode } = AppState();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#00198A",
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h7"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
            }}
          >
            WEATHER APP
            <ThunderstormOutlinedIcon />
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          ></IconButton>

          <Box
            className="tabs-container"
            sx={{ flexGrow: 1, display: { xs: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`${page}`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
