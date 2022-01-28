//!!!Primary colors

//#6311af - purple
//#0a7c81 - cyan

export default (mode) => {
  switch (mode) {
    case "light": return {
      palette: {
        background: {
          default: "#f1f5f9"
        },
        primary: {
          main: "#0a7c81"
        }
      },
      components: {
        MuiDrawer: {
          width: 300,
          styleOverrides: {
            paper: {
              width: 300,
              background: "linear-gradient(180deg, rgba(99,17,175,1) 35%, rgba(10,124,129,1) 100%)",
              color: "white",
            }
          }
        },
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: "#ffffff",
              color: "black"
            }
          }
        }
      },
      typography: {
        fontFamily: "Poppins, sans-serif",
      }
    };
    default: return {
      palette: {
        background: {
          default: "#f1f5f9"
        }
      },
      components: {
        MuiDrawer: {
          width: 300,
          styleOverrides: {
            paper: {
              width: 300,
              backgroundColor: "#10192a",
              color: "white",
            }
          }
        }
      }
    };
  }
};