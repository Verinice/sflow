import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { styled } from "@mui/system";
import { useSwitch } from "@mui/base/SwitchUnstyled";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MUISwitch from "./components/StakingSwitch";
import * as fcl from "@onflow/fcl";
import "../flow/config";
import * as scripts from "./api/scripts.js";
import * as transactions from "./api/transactions.js";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Adornment from "./components/Adornment";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: ["Arial, sans-serif"].join(","),
  },
});

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null });
  const [currentPrice, setCurrentPrice] = useState();
  const [currentFlowBalance, setCurrentFlowBalance] = useState();
  const [currentsFlowBalance, setCurrentsFlowBalance] = useState();
  const [stakeAmount, setStakeAmount] = useState();
  const [currentMode, setCurrentMode] = useState();

  const updateStakeAmount = (event) => {
    setStakeAmount(event.target.value);
  };

  const AuthedState = () => {
    return (
      <div>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            color="inherit"
            variant="outlined"
            sx={{ my: 2, display: "block" }}
          >
            {user?.addr ?? "No Address"}
          </Button>
          <Button
            color="inherit"
            variant="contained"
            onClick={fcl.unauthenticate}
            sx={{ my: 2, display: "block" }}
            style={{ marginLeft: "10px" }}
          >
            Log Out
          </Button>
        </Box>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div>
        <Button
          className="btn"
          color="inherit"
          variant="contained"
          onClick={fcl.logIn}
        >
          Log In
        </Button>
        <Button
          className="btn"
          color="inherit"
          variant="contained"
          onClick={fcl.signUp}
          style={{ marginLeft: "10px" }}
        >
          Sign Up
        </Button>
      </div>
    );
  };

  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  const footers = [
    {
      title: "EmuDao",
      description: [],
    },
    {
      title: "Resources",
      description: [
        "Stake with Emu",
        "Terms of Use",
        "Privacy Policy",
        "FAQ",
        "Another one",
      ],
    },
    {
      title: "Community",
      description: ["Discord", "Twitter", "Telegram", "GitHub"],
    },
    {
      title: "Contacts",
      description: ["info@emu.fi", "Help Center"],
    },
  ];

  const switchMode = (event) => {
    setCurrentMode(event.target.checked);
  };

  const submit = () => {
    if (!currentMode) transactions.stake(fcl.authz, stakeAmount);
    else transactions.unstake(fcl.authz, stakeAmount);
  };

  setInterval(async () => {
    setCurrentPrice(await scripts.getCurrentPrice());
    if (user && user.loggedIn) {
      let inited = await scripts.accountInitialzed(user.addr);
      if (inited) {
        setCurrentFlowBalance(await scripts.getFlowBalance(user.addr));
        setCurrentsFlowBalance(await scripts.getsFlowBalance(user.addr));
      }
    }
  }, 10000);

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  useEffect(async () => {
    if (user && user.loggedIn) {
      let inited = await scripts.accountInitialzed(user.addr);
      console.log(inited);
      if (!inited) await transactions.initAccount(fcl.authz);
    }
  }, [user]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Flow staking with sFlow</title>
          <meta name="description" content="Flow Staking App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <AppBar position="static" className="app-bar">
          <Container>
            <Toolbar>
              <img src="./emu.png" style={{ width: "2em", height: "2em" }} />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{
                  fontWeight: 900,
                  textTransform: "uppercase",
                  display: "flex",
                  gap: "4rem",
                }}
                className="topo"
              >
                EmuDao
                <div className="links">
                  <Link href={"/"}>
                    <a className="link active">
                      <BoltOutlinedIcon /> <span>Stake</span>
                    </a>
                  </Link>
                  {/* <a className="link">Solana DEFI</a> */}
                </div>
              </Typography>
              {user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
            </Toolbar>
          </Container>
        </AppBar>

        <main>
          <Box sx={{ pt: 4, pb: 0 }}>
            <Container maxWidth="sm">
              <Typography
                className="title"
                component="h1"
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontWeight: "900", color: "#333" }}
              >
                Stake Flow
              </Typography>
              <Typography
                className="sub-title"
                variant="subtitle1"
                align="center"
                color="text.secondary"
                paragraph
              >
                Stake Flow and receive sFlow while staking
              </Typography>
            </Container>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <MUISwitch onChange={switchMode} />
              </Stack>
              <Paper
                className="paper"
                variant="outlined"
                sx={{ my: { xs: 1, md: 2 }, p: { xs: 2, md: 3 } }}
              >
                <Grid className="container" container spacing={3}>
                  <Grid item xs={12}>
                    {<InputLabel className="label">Amount</InputLabel>}
                    {
                      <Input
                        className="input"
                        id="input-with-icon-adornment"
                        type="number"
                        value={stakeAmount || ""}
                        placeholder="Amount"
                        inputProps={{ style: { fontSize: 12 } }}
                        onChange={updateStakeAmount}
                        startAdornment={
                          <InputAdornment position="start">
                            <Adornment />
                          </InputAdornment>
                        }
                      />
                    }
                    {/* <TextField
                      className="text-field"
                      fullWidth
                      value={stakeAmount || ""}
                      label="Amount"
                      color=""
                      onChange={updateStakeAmount}
                      focused
                      type="number"
                      min={0}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography style={{ fontSize: "14px" }}>
                        CurrentPrice:
                      </Typography>
                      <Typography style={{ fontSize: "16px", fontWeight: 600 }}>
                        {currentPrice}
                      </Typography>
                    </Stack>
                    <Divider className="divider"></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography style={{ fontSize: "14px" }}>
                        FlowBalance:
                      </Typography>
                      <Typography style={{ fontSize: "16px", fontWeight: 600 }}>
                        {currentFlowBalance}
                      </Typography>
                    </Stack>
                    <Divider className="divider"></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography style={{ fontSize: "14px" }}>
                        sFlowBalance:
                      </Typography>
                      <Typography style={{ fontSize: "16px", fontWeight: 500 }}>
                        {currentsFlowBalance}
                      </Typography>
                    </Stack>
                    <Divider className="divider"></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className="btn-lg"
                      color="inherit"
                      variant="outlined"
                      fullWidth
                      onClick={submit}
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      {!currentMode ? "Stake" : "Unstake"}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Box>
        </main>

        <footer>
          <Container
            maxWidth="lg"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mt: 8,
              py: [3, 6],
            }}
          >
            <Grid container spacing={4} justifyContent="space-evenly">
              {footers.map((footer) => (
                <Grid item xs={6} sm={3} key={footer.title}>
                  <Typography
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      display: "flex",
                      gap: "0.2rem",
                    }}
                    variant="h6"
                    color="text.primary"
                    gutterBottom
                  >
                    {footer.title == "EmuDao" ? (
                      <Image
                        src="/emu.png"
                        width="25"
                        height="25px"
                        alt="logo"
                      />
                    ) : (
                      ""
                    )}
                    {footer.title}
                  </Typography>
                  <ul style={{ listStyleType: "none", paddingInlineStart: 0 }}>
                    {footer.description.map((item) => (
                      <li key={item} style={{ marginBottom: "1em" }}>
                        <Link
                          href="#"
                          variant="subtitle1"
                          color="text.secondary"
                          style={{ textDecoration: "none", fontSize: "16px" }}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
          </Container>
        </footer>
      </ThemeProvider>
    </div>
  );
}
