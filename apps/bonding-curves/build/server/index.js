import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json } from "@remix-run/node";
import { RemixServer, useLocation, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { useState as useState$1, useEffect as useEffect$1, createContext as createContext$1, useMemo as useMemo$1, createElement as createElement$1, useContext as useContext$1, useCallback as useCallback$1, useRef as useRef$1, forwardRef as forwardRef$1, useLayoutEffect as useLayoutEffect$1, Children, cloneElement, useReducer, Fragment as Fragment$1 } from "react";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { http, createPublicClient, createWalletClient, parseEther, parseUnits, formatEther, toHex, stringToHex } from "viem";
import { foundry } from "viem/chains";
import defaultTheme from "tailwindcss/defaultTheme.js";
import require$$0 from "tailwindcss/plugin.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot, Slottable } from "@radix-ui/react-slot";
import * as ReactDOM from "react-dom";
import ReactDOM__default, { flushSync, createPortal } from "react-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { createDialogScope } from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { __assign, __rest, __spreadArray } from "tslib";
import { X as X$2 } from "lucide-react";
import * as d3 from "d3";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles = "/assets/globals-BXu0OT-B.css";
const links = () => [
  {
    rel: "stylesheet",
    href: styles
  }
];
function App() {
  const [theme, setTheme] = useState$1("dark");
  useLocation();
  useEffect$1(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: `h-full ${theme}`, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "h-full bg-background text-foreground", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const loader = () => {
  return new Response(null, {
    status: 404
  });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const execAsync = promisify(exec);
const action$1 = async ({ request }) => {
  try {
    const formData = await request.formData();
    const fileName = formData.get("file").name;
    let content = formData.get("content");
    if (!fileName || !content) {
      return json(
        { error: "File name and content are required" },
        { status: 400 }
      );
    }
    try {
      content = content.replace(/\bIMMUTABLE\b(?!\s+[a-zA-Z_])/g, "").replace(/import\s*{?\s*console\s*}?\s*from\s*["']forge-std\/console\.sol["'];?\s*/g, "").replace(/console\.log\s*\([^;]*\);?\s*/g, "").replace(/import\s*{[^}]*}\s*from\s*["'][^"']*\/test\/[^"']*["'];?\s*/g, "").replace(/using\s+StringUtils\s+for\s+(?:u?int256);?\s*/g, "");
      const escapedContent = content.replace(/"/g, '\\"').replace(
        /import\s*{BaseCurve}\s*from\s*([^"']\S+);/g,
        'import {BaseCurve} from \\"./BaseCurve.sol\\";'
      );
      await execAsync(`docker exec bonding-curves-anvil-1 bash -c "echo '${escapedContent}' > /app/contracts/${fileName}"`);
      let { stdout, stderr } = await execAsync("docker exec bonding-curves-anvil-1 forge build --force --sizes");
      console.log("Compilation output:", stdout);
      if (stderr) {
        console.error("Compilation errors:", stderr);
        return json({ error: "Compilation failed", details: stderr }, { status: 400 });
      }
      const contractName = path.parse(fileName).name;
      const { stdout: artifactContent } = await execAsync(
        `docker exec bonding-curves-anvil-1 cat /app/out/${fileName}/${contractName}.json`
      );
      let artifact;
      try {
        artifact = JSON.parse(artifactContent);
      } catch (error) {
        console.error("Failed to parse artifact:", error);
        return json({ error: "Failed to read contract artifact" }, { status: 500 });
      }
      const constructor = artifact.abi.find((item) => item.type === "constructor");
      const constructorInputs = (constructor == null ? void 0 : constructor.inputs) || [];
      const needsConstructorArgs = constructorInputs.length > 0;
      return json({
        abi: artifact.abi,
        bytecode: artifact.bytecode.object,
        constructorInputs,
        needsConstructorArgs
      });
    } catch (error) {
      console.error("Compilation failed:", error);
      return json(
        { error: error instanceof Error ? error.message : "Contract compilation failed" },
        { status: 500 }
      );
    } finally {
      try {
        await execAsync(`docker exec bonding-curves-anvil-1 rm /app/contracts/${fileName}`);
      } catch (cleanupError) {
        console.error("Failed to clean up temporary file:", cleanupError);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
const ANVIL_URL = "http://0.0.0.0:8545";
const ANVIL_ACCOUNT = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const localFoundry = {
  ...foundry,
  rpcUrls: {
    default: {
      http: [ANVIL_URL]
    },
    public: {
      http: [ANVIL_URL]
    }
  }
};
const action = async ({ request }) => {
  try {
    console.log("deploying contract, request:", JSON.stringify(request));
    const formData = await request.formData();
    const abi = JSON.parse(formData.get("abi"));
    const bytecode = formData.get("bytecode");
    const constructorArgs = formData.get("constructorArgs") ? JSON.parse(formData.get("constructorArgs")) : [];
    const transport = http(ANVIL_URL, {
      timeout: 6e4,
      retryCount: 5,
      retryDelay: 2e3,
      batch: false
    });
    const publicClient = createPublicClient({
      chain: localFoundry,
      transport
    });
    const walletClient = createWalletClient({
      chain: localFoundry,
      transport,
      account: ANVIL_ACCOUNT
    });
    const hash = await walletClient.deployContract({
      abi,
      bytecode,
      args: constructorArgs
    });
    console.log("Deployment hash:", hash);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log("Receipt:", receipt);
    console.log("Contract address:", receipt.contractAddress);
    if (!receipt.contractAddress) {
      throw new Error("No contract address in receipt");
    }
    return json({ address: receipt.contractAddress });
  } catch (error) {
    console.error("Deployment failed:", error);
    return json(
      { error: error instanceof Error ? error.message : "Contract deployment failed" },
      { status: 500 }
    );
  }
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const black = "#000000";
const white = "#FFFFFF";
const palette = {
  black: {
    base: black,
    a90: `rgba(${black}, 90%)`,
    a80: `rgba(${black}, 80%)`,
    a70: `rgba(${black}, 70%)`,
    a60: `rgba(${black}, 60%)`,
    a50: `rgba(${black}, 50%)`,
    a40: `rgba(${black}, 40%)`,
    a30: `rgba(${black}, 30%)`,
    a20: `rgba(${black}, 20%)`,
    a10: `rgba(${black}, 10%)`,
    a5: `rgba(${black}, 5%)`,
    a3: `rgba(${black}, 3%)`
  },
  white: {
    base: white,
    a90: `rgba(${white}, 90%)`,
    a80: `rgba(${white}, 80%)`,
    a70: `rgba(${white}, 70%)`,
    a60: `rgba(${white}, 60%)`,
    a50: `rgba(${white}, 50%)`,
    a40: `rgba(${white}, 40%)`,
    a30: `rgba(${white}, 30%)`,
    a20: `rgba(${white}, 20%)`,
    a10: `rgba(${white}, 10%)`,
    a5: `rgba(${white}, 5%)`,
    a3: `rgba(${white}, 3%)`
  },
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0A0A0A"
  },
  red: {
    50: "#FDF3F3",
    100: "#FBE5E5",
    200: "#F9CFCF",
    300: "#F3AEAE",
    400: "#EA807F",
    500: "#DD5352",
    600: "#CA3938",
    700: "#A92D2C",
    800: "#8C2928",
    900: "#752827",
    950: "#3F1010"
  },
  orange: {
    50: "#FFF4E6",
    100: "#FFDEB0",
    200: "#FFCE8A",
    300: "#FFB854",
    400: "#FFAA33",
    500: "#FF9500",
    600: "#E88800",
    700: "#B56A00",
    800: "#8C5200",
    900: "#6B3F00",
    950: "#553200"
  },
  yellow: {
    50: "#FFFAE6",
    100: "#FFEFB0",
    200: "#FFE88A",
    300: "#FFDD54",
    400: "#FFD633",
    500: "#FFCC00",
    600: "#E8BA00",
    700: "#B59100",
    800: "#8C7000",
    900: "#6B5600",
    950: "#5E4B00"
  },
  green: {
    50: "#F1FCF5",
    100: "#DFF9EB",
    200: "#C0F2D7",
    300: "#8FE6B8",
    400: "#57D191",
    500: "#34C578",
    600: "#23955A",
    700: "#1F754A",
    800: "#1D5E40",
    900: "#194D36",
    950: "#092A1D"
  },
  sky: {
    50: "#F2F9FE",
    100: "#E3F1FD",
    200: "#C3E5FA",
    300: "#91D1F8",
    400: "#61BAF3",
    500: "#4AA3E3",
    600: "#3882C2",
    700: "#2C679C",
    800: "#265881",
    900: "#21496B",
    950: "#142E47"
  },
  blue: {
    50: "#E6F2FF",
    100: "#B0D6FF",
    200: "#8AC2FF",
    300: "#54A6FF",
    400: "#3395FF",
    500: "#007AFF",
    600: "#006FE8",
    700: "#0057B5",
    800: "#00438C",
    900: "#00336B",
    950: "#042C5D"
  },
  purple: {
    50: "#F7EEFC",
    100: "#E6C9F5",
    200: "#DAAFF0",
    300: "#C98BE9",
    400: "#BF75E5",
    500: "#AF52DE",
    600: "#9F4BCA",
    700: "#7C3A9E",
    800: "#602D7A",
    900: "#4A225D",
    950: "#3B1B4A"
  }
};
const radiusValue = "0.5rem";
const themes = {
  light: {
    background: "0 0% 100%",
    foreground: "224 71.4% 4.1%",
    card: "0 0% 100%",
    cardForeground: "224 71.4% 4.1%",
    popover: "0 0% 100%",
    popoverForeground: "224 71.4% 4.1%",
    primary: {
      DEFAULT: "#0052FF",
      50: "#f0f2ff",
      100: "#dde1ff",
      200: "#c0c7ff",
      300: "#94a0ff",
      400: "#576aff",
      500: "#233cff",
      600: "#0420ff",
      700: "#0018d7",
      800: "#0010a6",
      900: "#000b7f",
      950: "#00064c"
    },
    primaryForeground: "224 71.4% 4.1%",
    secondary: "220 14.3% 95.9%",
    secondaryForeground: "220.9 39.3% 11%",
    muted: "220 14.3% 95.9%",
    mutedForeground: "220 8.9% 46.1%",
    accent: "220 14.3% 95.9%",
    accentForeground: "220.9 39.3% 11%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 20% 98%",
    border: "215 27.9% 16.9%",
    input: "215 27.9% 16.9%",
    ring: "216 12.2% 83.9%",
    radius: radiusValue,
    // custom attributes
    success: palette.green[500],
    successForeground: palette.black.base,
    warning: palette.yellow[600],
    warningForeground: palette.black.base,
    for: palette.blue[500],
    forForeground: palette.white.base,
    against: palette.orange[500],
    againstForeground: palette.black.base,
    social: palette.purple[600],
    socialForeground: palette.black.base
  },
  dark: {
    background: palette.black.base,
    foreground: palette.white.base,
    card: palette.black.base,
    cardForeground: palette.white.base,
    popover: palette.black.base,
    popoverForeground: palette.white.base,
    primary: {
      DEFAULT: palette.gray[50],
      ...palette.gray
    },
    primaryForeground: palette.black.base,
    secondary: palette.white.base,
    secondaryForeground: palette.gray[400],
    muted: palette.gray[800],
    mutedForeground: palette.gray[500],
    accent: palette.blue[500],
    accentForeground: palette.white.base,
    destructive: palette.red[500],
    destructiveForeground: palette.white.base,
    border: palette.white.base,
    input: palette.white.base,
    ring: palette.white.base,
    radius: radiusValue,
    // custom attributes
    success: palette.green[500],
    successForeground: palette.black.base,
    warning: palette.yellow[600],
    warningForeground: palette.black.base,
    for: palette.blue[600],
    forForeground: palette.white.base,
    against: palette.orange[600],
    againstForeground: palette.black.base,
    social: palette.purple[600],
    socialForeground: palette.black.base
  }
};
function cn$2(...inputs) {
  return twMerge(clsx(inputs));
}
function colorMix(color, opacity) {
  return `color-mix(in srgb, var(--${color}) calc(${opacity || "<alpha-value>"} * 100%), transparent)`;
}
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2["DARK"] = "dark";
  Theme2["LIGHT"] = "light";
  Theme2["SYSTEM"] = "system";
  return Theme2;
})(Theme || {});
Object.values(Theme);
require$$0(
  // 1. Add css variable definitions to the base layer
  function({ addBase, addUtilities }) {
    addBase({
      ":root": {
        "--background": themes.light.background,
        "--foreground": themes.light.foreground,
        "--card": themes.light.card,
        "--card-foreground": themes.light.cardForeground,
        "--popover": themes.light.popover,
        "--popover-foreground": themes.light.popoverForeground,
        "--primary": themes.light.primary.DEFAULT,
        "--primary-foreground": themes.light.primaryForeground,
        "--secondary": themes.light.secondary,
        "--secondary-foreground": themes.light.secondaryForeground,
        "--muted": themes.light.muted,
        "--muted-foreground": themes.light.mutedForeground,
        "--accent": themes.light.accent,
        "--accent-foreground": themes.light.accentForeground,
        "--destructive": themes.light.destructive,
        "--destructive-foreground": themes.light.destructiveForeground,
        "--border": themes.light.border,
        "--input": themes.light.input,
        "--ring": themes.light.ring,
        "--radius": themes.light.radius,
        "--success": themes.light.success,
        "--success-foreground": themes.light.successForeground,
        "--warning": themes.light.warning,
        "--warning-foreground": themes.light.warningForeground,
        "--for": themes.light.for,
        "--for-foreground": themes.light.forForeground,
        "--against": themes.light.against,
        "--against-foreground": themes.light.againstForeground,
        "--social": themes.light.social,
        "--social-foreground": themes.light.socialForeground,
        // primary
        "--primary-50": themes.light.primary[50],
        "--primary-100": themes.light.primary[100],
        "--primary-200": themes.light.primary[200],
        "--primary-300": themes.light.primary[300],
        "--primary-400": themes.light.primary[400],
        "--primary-500": themes.light.primary[500],
        "--primary-600": themes.light.primary[600],
        "--primary-700": themes.light.primary[700],
        "--primary-800": themes.light.primary[800],
        "--primary-900": themes.light.primary[900],
        "--primary-950": themes.light.primary[950]
      }
    });
    Object.entries(themes).forEach(([key, value]) => {
      addBase({
        [`[data-theme="${key}"]`]: {
          "--background": value.background,
          "--foreground": value.foreground,
          "--card": value.card,
          "--card-foreground": value.cardForeground,
          "--popover": value.popover,
          "--popover-foreground": value.popoverForeground,
          "--primary": value.primary.DEFAULT,
          "--primary-foreground": value.primaryForeground,
          "--secondary": value.secondary,
          "--secondary-foreground": value.secondaryForeground,
          "--muted": value.muted,
          "--muted-foreground": value.mutedForeground,
          "--accent": value.accent,
          "--accent-foreground": value.accentForeground,
          "--destructive": value.destructive,
          "--destructive-foreground": value.destructiveForeground,
          "--border": value.border,
          "--input": value.input,
          "--ring": value.ring,
          "--radius": value.radius,
          "--success": value.success,
          "--success-foreground": value.successForeground,
          "--warning": value.warning,
          "--warning-foreground": value.warningForeground,
          "--for": value.for,
          "--for-foreground": value.forForeground,
          "--against": value.against,
          "--against-foreground": value.againstForeground,
          "--social": value.social,
          "--social-foreground": value.socialForeground,
          // primary
          "--primary-50": value.primary[50],
          "--primary-100": value.primary[100],
          "--primary-200": value.primary[200],
          "--primary-300": value.primary[300],
          "--primary-400": value.primary[400],
          "--primary-500": value.primary[500],
          "--primary-600": value.primary[600],
          "--primary-700": value.primary[700],
          "--primary-800": value.primary[800],
          "--primary-900": value.primary[900],
          "--primary-950": value.primary[950]
        }
      });
    });
    addBase({
      body: {
        "@apply bg-background text-foreground": {},
        "font-feature-settings": '"rlig" 1, "calt" 1'
      },
      ".theme-border": {
        "@apply border border-border/10": {}
      },
      ".in-out-gradient": {
        "@apply bg-gradient-to-r from-border/5 from-10% via-border/20 via-50% to-border/5 to-90%": {}
      },
      ".in-out-gradient-strong": {
        "@apply bg-gradient-to-r from-transparent from-10% via-border/20 via-50% to-transparent to-90%": {}
      }
    });
    addUtilities({
      // Gradients
      ".primary-gradient-subtle": {
        background: `linear-gradient(${colorMix("primary", 0.1)}, ${colorMix("primary", 0.05)})`
      },
      ".primary-gradient": {
        background: `linear-gradient(${colorMix("primary", 0.4)}, ${colorMix("primary", 0.2)})`
      },
      ".primary-gradient-strong": {
        background: `linear-gradient(${colorMix("primary", 0.8)}, ${colorMix("primary", 0.5)})`
      }
    });
  },
  // 2. Extend the tailwind theme with 'themable' utilities
  {
    theme: {
      container: {
        center: true,
        padding: "2rem"
      },
      extend: {
        fontFamily: {
          sans: ["Geist", ...defaultTheme.fontFamily.sans]
        },
        borderWidth: {
          DEFAULT: "1px",
          px: "1px"
        },
        fontSize: {
          xs: ["0.625rem", "1rem"],
          // small
          sm: ["0.75rem", "1.125rem"],
          // caption & footnote
          base: ["0.875rem", "1.25rem"],
          // body
          lg: ["1rem", "1.875rem"],
          // bodyLarge
          xl: ["1.25rem", "1.875rem"],
          // headline
          "2xl": "1.5rem",
          // heading5
          "3xl": "1.875rem",
          // heading4
          "4xl": "2.5rem",
          // heading3
          "5xl": "3.125rem",
          // heading2
          "6xl": "3.75rem"
          // heading1
        },
        colors: {
          border: colorMix("border"),
          input: colorMix("input"),
          ring: colorMix("ring"),
          background: colorMix("background"),
          foreground: colorMix("foreground"),
          primary: {
            DEFAULT: colorMix("primary"),
            foreground: colorMix("primary-foreground"),
            50: colorMix("primary-50"),
            100: colorMix("primary-100"),
            200: colorMix("primary-200"),
            300: colorMix("primary-300"),
            400: colorMix("primary-400"),
            500: colorMix("primary-500"),
            600: colorMix("primary-600"),
            700: colorMix("primary-700"),
            800: colorMix("primary-800"),
            900: colorMix("primary-900"),
            950: colorMix("primary-950")
          },
          secondary: {
            DEFAULT: colorMix("secondary"),
            foreground: colorMix("secondary-foreground")
          },
          destructive: {
            DEFAULT: colorMix("destructive"),
            foreground: colorMix("destructive-foreground")
          },
          muted: {
            DEFAULT: colorMix("muted"),
            foreground: colorMix("muted-foreground")
          },
          accent: {
            DEFAULT: colorMix("accent"),
            foreground: colorMix("accent-foreground")
          },
          warning: {
            DEFAULT: colorMix("warning"),
            foreground: colorMix("warning-foreground")
          },
          success: {
            DEFAULT: colorMix("success"),
            foreground: colorMix("success-foreground")
          },
          popover: {
            DEFAULT: colorMix("popover"),
            foreground: colorMix("popover-foreground")
          },
          card: {
            DEFAULT: colorMix("card"),
            foreground: colorMix("card-foreground")
          },
          for: {
            DEFAULT: colorMix("for"),
            foreground: colorMix("for-foreground")
          },
          against: {
            DEFAULT: colorMix("against"),
            foreground: colorMix("against-foreground")
          },
          social: {
            DEFAULT: colorMix("social"),
            foreground: colorMix("social-foreground")
          }
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" }
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" }
          }
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "pulse-slow": "pulse 1.6s cubic-bezier(0.6, 0, 0.7, 1) infinite",
          "spin-slow": "spin 3.2s linear infinite"
        },
        boxShadow: {
          "sm-subtle": "0px 5px 5px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)",
          "md-subtle": "0px 8px 8px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)",
          "lg-subtle": "0px 10px 10px 0px rgba(0, 0, 0, 0.05), 0px 6px 6px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)",
          "xl-subtle": "0px 12px 12px 0px rgba(0, 0, 0, 0.06), 0px 8px 8px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.03)",
          sm: "0px 10px 10px 0px rgba(0, 0, 0, 0.10), 0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.05)",
          md: "0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 5px 10px 0px rgba(0, 0, 0, 0.10), 0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
          lg: "0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 10px 20px 0px rgba(0, 0, 0, 0.10), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)",
          xl: "0px 20px 40px 0px rgba(0, 0, 0, 0.15), 0px 15px 30px 0px rgba(0, 0, 0, 0.10), 0px 5px 10px 0px rgba(0, 0, 0, 0.10)",
          "sm-strong": "0px 10px 10px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.10), 0px 1px 0px 0px rgba(0, 0, 0, 0.05)",
          "md-strong": "0px 10px 20px 0px rgba(0, 0, 0, 0.20), 0px 5px 10px 0px rgba(0, 0, 0, 0.10), 0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
          "lg-strong": "0px 15px 30px 0px rgba(0, 0, 0, 0.20), 0px 10px 20px 0px rgba(0, 0, 0, 0.15), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)",
          "xl-strong": "0px 20px 40px 0px rgba(0, 0, 0, 0.25), 0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 5px 10px 0px rgba(0, 0, 0, 0.05)"
        }
      }
    }
  }
);
var _plugin = /* @__PURE__ */ _interopRequireDefault(require$$0);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
(0, _plugin.default)(function containerQueries(param) {
  var matchUtilities = param.matchUtilities, matchVariant = param.matchVariant, theme = param.theme;
  var parseValue = function parseValue2(value) {
    var _value_match;
    var _value_match_;
    var numericValue = (_value_match_ = (_value_match = value.match(/^(\d+\.\d+|\d+|\.\d+)\D+/)) === null || _value_match === void 0 ? void 0 : _value_match[1]) !== null && _value_match_ !== void 0 ? _value_match_ : null;
    if (numericValue === null)
      return null;
    return parseFloat(value);
  };
  var _theme;
  var values = (_theme = theme("containers")) !== null && _theme !== void 0 ? _theme : {};
  matchUtilities({
    "@container": function(value, param2) {
      var modifier = param2.modifier;
      return {
        "container-type": value,
        "container-name": modifier
      };
    }
  }, {
    values: {
      DEFAULT: "inline-size",
      normal: "normal"
    },
    modifiers: "any"
  });
  matchVariant("@", function() {
    var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", modifier = (arguments.length > 1 ? arguments[1] : void 0).modifier;
    var parsed = parseValue(value);
    return parsed !== null ? "@container ".concat(modifier !== null && modifier !== void 0 ? modifier : "", " (min-width: ").concat(value, ")") : [];
  }, {
    values,
    sort: function sort(aVariant, zVariant) {
      var a = parseFloat(aVariant.value);
      var z = parseFloat(zVariant.value);
      if (a === null || z === null)
        return 0;
      if (a - z !== 0)
        return a - z;
      var _aVariant_modifier;
      var aLabel = (_aVariant_modifier = aVariant.modifier) !== null && _aVariant_modifier !== void 0 ? _aVariant_modifier : "";
      var _zVariant_modifier;
      var zLabel = (_zVariant_modifier = zVariant.modifier) !== null && _zVariant_modifier !== void 0 ? _zVariant_modifier : "";
      if (aLabel === "" && zLabel !== "") {
        return 1;
      } else if (aLabel !== "" && zLabel === "") {
        return -1;
      }
      return aLabel.localeCompare(zLabel, "en", {
        numeric: true
      });
    }
  });
}, {
  theme: {
    containers: {
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem"
    }
  }
});
const plugin = require$$0;
function filterDefault(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([key]) => key !== "DEFAULT")
  );
}
plugin(
  ({ addUtilities, matchUtilities, theme }) => {
    addUtilities({
      "@keyframes enter": theme("keyframes.enter"),
      "@keyframes exit": theme("keyframes.exit"),
      ".animate-in": {
        animationName: "enter",
        animationDuration: theme("animationDuration.DEFAULT"),
        "--tw-enter-opacity": "initial",
        "--tw-enter-scale": "initial",
        "--tw-enter-rotate": "initial",
        "--tw-enter-translate-x": "initial",
        "--tw-enter-translate-y": "initial"
      },
      ".animate-out": {
        animationName: "exit",
        animationDuration: theme("animationDuration.DEFAULT"),
        "--tw-exit-opacity": "initial",
        "--tw-exit-scale": "initial",
        "--tw-exit-rotate": "initial",
        "--tw-exit-translate-x": "initial",
        "--tw-exit-translate-y": "initial"
      }
    });
    matchUtilities(
      {
        "fade-in": (value) => ({ "--tw-enter-opacity": value }),
        "fade-out": (value) => ({ "--tw-exit-opacity": value })
      },
      { values: theme("animationOpacity") }
    );
    matchUtilities(
      {
        "zoom-in": (value) => ({ "--tw-enter-scale": value }),
        "zoom-out": (value) => ({ "--tw-exit-scale": value })
      },
      { values: theme("animationScale") }
    );
    matchUtilities(
      {
        "spin-in": (value) => ({ "--tw-enter-rotate": value }),
        "spin-out": (value) => ({ "--tw-exit-rotate": value })
      },
      { values: theme("animationRotate") }
    );
    matchUtilities(
      {
        "slide-in-from-top": (value) => ({
          "--tw-enter-translate-y": `-${value}`
        }),
        "slide-in-from-bottom": (value) => ({
          "--tw-enter-translate-y": value
        }),
        "slide-in-from-left": (value) => ({
          "--tw-enter-translate-x": `-${value}`
        }),
        "slide-in-from-right": (value) => ({
          "--tw-enter-translate-x": value
        }),
        "slide-out-to-top": (value) => ({
          "--tw-exit-translate-y": `-${value}`
        }),
        "slide-out-to-bottom": (value) => ({
          "--tw-exit-translate-y": value
        }),
        "slide-out-to-left": (value) => ({
          "--tw-exit-translate-x": `-${value}`
        }),
        "slide-out-to-right": (value) => ({
          "--tw-exit-translate-x": value
        })
      },
      { values: theme("animationTranslate") }
    );
    matchUtilities(
      { duration: (value) => ({ animationDuration: value }) },
      { values: filterDefault(theme("animationDuration")) }
    );
    matchUtilities(
      { delay: (value) => ({ animationDelay: value }) },
      { values: theme("animationDelay") }
    );
    matchUtilities(
      { ease: (value) => ({ animationTimingFunction: value }) },
      { values: filterDefault(theme("animationTimingFunction")) }
    );
    addUtilities({
      ".running": { animationPlayState: "running" },
      ".paused": { animationPlayState: "paused" }
    });
    matchUtilities(
      { "fill-mode": (value) => ({ animationFillMode: value }) },
      { values: theme("animationFillMode") }
    );
    matchUtilities(
      { direction: (value) => ({ animationDirection: value }) },
      { values: theme("animationDirection") }
    );
    matchUtilities(
      { repeat: (value) => ({ animationIterationCount: value }) },
      { values: theme("animationRepeat") }
    );
  },
  {
    theme: {
      extend: {
        animationDelay: ({ theme }) => ({
          ...theme("transitionDelay")
        }),
        animationDuration: ({ theme }) => ({
          0: "0ms",
          ...theme("transitionDuration")
        }),
        animationTimingFunction: ({ theme }) => ({
          ...theme("transitionTimingFunction")
        }),
        animationFillMode: {
          none: "none",
          forwards: "forwards",
          backwards: "backwards",
          both: "both"
        },
        animationDirection: {
          normal: "normal",
          reverse: "reverse",
          alternate: "alternate",
          "alternate-reverse": "alternate-reverse"
        },
        animationOpacity: ({ theme }) => ({
          DEFAULT: 0,
          ...theme("opacity")
        }),
        animationTranslate: ({ theme }) => ({
          DEFAULT: "100%",
          ...theme("translate")
        }),
        animationScale: ({ theme }) => ({
          DEFAULT: 0,
          ...theme("scale")
        }),
        animationRotate: ({ theme }) => ({
          DEFAULT: "30deg",
          ...theme("rotate")
        }),
        animationRepeat: {
          0: "0",
          1: "1",
          infinite: "infinite"
        },
        keyframes: {
          enter: {
            from: {
              opacity: "var(--tw-enter-opacity, 1)",
              transform: "translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))"
            }
          },
          exit: {
            to: {
              opacity: "var(--tw-exit-opacity, 1)",
              transform: "translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))"
            }
          }
        }
      }
    }
  }
);
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}
function $c512c27ab02ef895$export$50c7b4e9d9f19c1(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName, defaultContext) {
    const BaseContext = /* @__PURE__ */ createContext$1(defaultContext);
    const index2 = defaultContexts.length;
    defaultContexts = [
      ...defaultContexts,
      defaultContext
    ];
    function Provider(props) {
      const { scope, children, ...context } = props;
      const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index2]) || BaseContext;
      const value = useMemo$1(
        () => context,
        Object.values(context)
      );
      return /* @__PURE__ */ createElement$1(Context.Provider, {
        value
      }, children);
    }
    function useContext2(consumerName, scope) {
      const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index2]) || BaseContext;
      const context = useContext$1(Context);
      if (context)
        return context;
      if (defaultContext !== void 0)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    Provider.displayName = rootComponentName + "Provider";
    return [
      Provider,
      useContext2
    ];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return /* @__PURE__ */ createContext$1(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope === null || scope === void 0 ? void 0 : scope[scopeName]) || scopeContexts;
      return useMemo$1(
        () => ({
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts
          }
        }),
        [
          scope,
          contexts
        ]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [
    $c512c27ab02ef895$export$fd42f52fd3ae1109,
    $c512c27ab02ef895$var$composeContextScopes(createScope, ...createContextScopeDeps)
  ];
}
function $c512c27ab02ef895$var$composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope1 = () => {
    const scopeHooks = scopes.map(
      (createScope) => ({
        useScope: createScope(),
        scopeName: createScope.scopeName
      })
    );
    return function useComposedScopes(overrideScopes) {
      const nextScopes1 = scopeHooks.reduce((nextScopes, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return {
          ...nextScopes,
          ...currentScope
        };
      }, {});
      return useMemo$1(
        () => ({
          [`__scope${baseScope.scopeName}`]: nextScopes1
        }),
        [
          nextScopes1
        ]
      );
    };
  };
  createScope1.scopeName = baseScope.scopeName;
  return createScope1;
}
function $6ed0406888f73fc4$var$setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref !== null && ref !== void 0)
    ref.current = value;
}
function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
  return (node) => refs.forEach(
    (ref) => $6ed0406888f73fc4$var$setRef(ref, node)
  );
}
function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs) {
  return useCallback$1($6ed0406888f73fc4$export$43e446d32b3d21af(...refs), refs);
}
function $e02a7d9cb1dc128c$export$c74125a8e3af6bb2(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = $c512c27ab02ef895$export$50c7b4e9d9f19c1(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  });
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React__default.useRef(null);
    const itemMap = React__default.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ React__default.createElement(CollectionProviderImpl, {
      scope,
      itemMap,
      collectionRef: ref
    }, children);
  };
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlot = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
    const { scope, children } = props;
    const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, context.collectionRef);
    return /* @__PURE__ */ React__default.createElement(Slot, {
      ref: composedRefs
    }, children);
  });
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlot = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
    const { scope, children, ...itemData } = props;
    const ref = React__default.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
    const context = useCollectionContext(ITEM_SLOT_NAME, scope);
    React__default.useEffect(() => {
      context.itemMap.set(ref, {
        ref,
        ...itemData
      });
      return () => void context.itemMap.delete(ref);
    });
    return /* @__PURE__ */ React__default.createElement(Slot, {
      [ITEM_DATA_ATTR]: "",
      ref: composedRefs
    }, children);
  });
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React__default.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode)
        return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [
      context.collectionRef,
      context.itemMap
    ]);
    return getItems;
  }
  return [
    {
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot
    },
    useCollection2,
    createCollectionScope2
  ];
}
function $e42e1063c40fb3ef$export$b9ecd428b558ff10(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler === null || originalEventHandler === void 0 || originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented)
      return ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
  };
}
function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
  const callbackRef = useRef$1(callback);
  useEffect$1(() => {
    callbackRef.current = callback;
  });
  return useMemo$1(
    () => (...args) => {
      var _callbackRef$current;
      return (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 ? void 0 : _callbackRef$current.call(callbackRef, ...args);
    },
    []
  );
}
function $71cd76cc60e0454e$export$6f32135080cb4c3({ prop, defaultProp, onChange = () => {
} }) {
  const [uncontrolledProp, setUncontrolledProp] = $71cd76cc60e0454e$var$useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value1 = isControlled ? prop : uncontrolledProp;
  const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
  const setValue = useCallback$1((nextValue) => {
    if (isControlled) {
      const setter = nextValue;
      const value = typeof nextValue === "function" ? setter(prop) : nextValue;
      if (value !== prop)
        handleChange(value);
    } else
      setUncontrolledProp(nextValue);
  }, [
    isControlled,
    prop,
    setUncontrolledProp,
    handleChange
  ]);
  return [
    value1,
    setValue
  ];
}
function $71cd76cc60e0454e$var$useUncontrolledState({ defaultProp, onChange }) {
  const uncontrolledState = useState$1(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = useRef$1(value);
  const handleChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onChange);
  useEffect$1(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [
    value,
    prevValueRef,
    handleChange
  ]);
  return uncontrolledState;
}
const $8927f6f2acc4f386$var$NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
const $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((primitive, node) => {
  const Node2 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    useEffect$1(() => {
      window[Symbol.for("radix-ui")] = true;
    }, []);
    return /* @__PURE__ */ createElement$1(Comp, _extends$1({}, primitiveProps, {
      ref: forwardedRef
    }));
  });
  Node2.displayName = `Primitive.${node}`;
  return {
    ...primitive,
    [node]: Node2
  };
}, {});
function $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event) {
  if (target)
    flushSync(
      () => target.dispatchEvent(event)
    );
}
const $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? useLayoutEffect$1 : () => {
};
function $fe963b355347cc68$export$3e6543de14f8614f(initialState, machine) {
  return useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState !== null && nextState !== void 0 ? nextState : state;
  }, initialState);
}
const $921a889cee6df7e8$export$99c2b779aa4e8b8b = (props) => {
  const { present, children } = props;
  const presence = $921a889cee6df7e8$var$usePresence(present);
  const child = typeof children === "function" ? children({
    present: presence.isPresent
  }) : Children.only(children);
  const ref = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(presence.ref, child.ref);
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? /* @__PURE__ */ cloneElement(child, {
    ref
  }) : null;
};
$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName = "Presence";
function $921a889cee6df7e8$var$usePresence(present) {
  const [node1, setNode] = useState$1();
  const stylesRef = useRef$1({});
  const prevPresentRef = useRef$1(present);
  const prevAnimationNameRef = useRef$1("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = $fe963b355347cc68$export$3e6543de14f8614f(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  useEffect$1(() => {
    const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [
    state
  ]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    const styles2 = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(styles2);
      if (present)
        send("MOUNT");
      else if (currentAnimationName === "none" || (styles2 === null || styles2 === void 0 ? void 0 : styles2.display) === "none")
        send("UNMOUNT");
      else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating)
          send("ANIMATION_OUT");
        else
          send("UNMOUNT");
      }
      prevPresentRef.current = present;
    }
  }, [
    present,
    send
  ]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (node1) {
      const handleAnimationEnd = (event) => {
        const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node1 && isCurrentAnimation)
          flushSync(
            () => send("ANIMATION_END")
          );
      };
      const handleAnimationStart = (event) => {
        if (event.target === node1)
          prevAnimationNameRef.current = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
      };
      node1.addEventListener("animationstart", handleAnimationStart);
      node1.addEventListener("animationcancel", handleAnimationEnd);
      node1.addEventListener("animationend", handleAnimationEnd);
      return () => {
        node1.removeEventListener("animationstart", handleAnimationStart);
        node1.removeEventListener("animationcancel", handleAnimationEnd);
        node1.removeEventListener("animationend", handleAnimationEnd);
      };
    } else
      send("ANIMATION_END");
  }, [
    node1,
    send
  ]);
  return {
    isPresent: [
      "mounted",
      "unmountSuspended"
    ].includes(state),
    ref: useCallback$1((node) => {
      if (node)
        stylesRef.current = getComputedStyle(node);
      setNode(node);
    }, [])
  };
}
function $921a889cee6df7e8$var$getAnimationName(styles2) {
  return (styles2 === null || styles2 === void 0 ? void 0 : styles2.animationName) || "none";
}
const $1746a345f3d73bb7$var$useReactId = React["useId".toString()] || (() => void 0);
let $1746a345f3d73bb7$var$count = 0;
function $1746a345f3d73bb7$export$f680877a34711e37(deterministicId) {
  const [id, setId] = React.useState($1746a345f3d73bb7$var$useReactId());
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    setId(
      (reactId) => reactId !== null && reactId !== void 0 ? reactId : String($1746a345f3d73bb7$var$count++)
    );
  }, [
    deterministicId
  ]);
  return id ? `radix-${id}` : "";
}
const $409067139f391064$var$COLLAPSIBLE_NAME = "Collapsible";
const [$409067139f391064$var$createCollapsibleContext, $409067139f391064$export$952b32dcbe73087a] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($409067139f391064$var$COLLAPSIBLE_NAME);
const [$409067139f391064$var$CollapsibleProvider, $409067139f391064$var$useCollapsibleContext] = $409067139f391064$var$createCollapsibleContext($409067139f391064$var$COLLAPSIBLE_NAME);
const $409067139f391064$export$6eb0f7ddcda6131f = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
  const [open = false, setOpen] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange
  });
  return /* @__PURE__ */ createElement$1($409067139f391064$var$CollapsibleProvider, {
    scope: __scopeCollapsible,
    disabled,
    contentId: $1746a345f3d73bb7$export$f680877a34711e37(),
    open,
    onOpenToggle: useCallback$1(
      () => setOpen(
        (prevOpen) => !prevOpen
      ),
      [
        setOpen
      ]
    )
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    "data-state": $409067139f391064$var$getState(open),
    "data-disabled": disabled ? "" : void 0
  }, collapsibleProps, {
    ref: forwardedRef
  })));
});
const $409067139f391064$var$TRIGGER_NAME = "CollapsibleTrigger";
const $409067139f391064$export$c135dce7b15bbbdc = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeCollapsible, ...triggerProps } = props;
  const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$TRIGGER_NAME, __scopeCollapsible);
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends$1({
    type: "button",
    "aria-controls": context.contentId,
    "aria-expanded": context.open || false,
    "data-state": $409067139f391064$var$getState(context.open),
    "data-disabled": context.disabled ? "" : void 0,
    disabled: context.disabled
  }, triggerProps, {
    ref: forwardedRef,
    onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onClick, context.onOpenToggle)
  }));
});
const $409067139f391064$var$CONTENT_NAME = "CollapsibleContent";
const $409067139f391064$export$aadde00976f34151 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { forceMount, ...contentProps } = props;
  const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$CONTENT_NAME, props.__scopeCollapsible);
  return /* @__PURE__ */ createElement$1(
    $921a889cee6df7e8$export$99c2b779aa4e8b8b,
    {
      present: forceMount || context.open
    },
    ({ present }) => /* @__PURE__ */ createElement$1($409067139f391064$var$CollapsibleContentImpl, _extends$1({}, contentProps, {
      ref: forwardedRef,
      present
    }))
  );
});
const $409067139f391064$var$CollapsibleContentImpl = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$CONTENT_NAME, __scopeCollapsible);
  const [isPresent, setIsPresent] = useState$1(present);
  const ref = useRef$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const heightRef = useRef$1(0);
  const height = heightRef.current;
  const widthRef = useRef$1(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = useRef$1(isOpen);
  const originalStylesRef = useRef$1();
  useEffect$1(() => {
    const rAF = requestAnimationFrame(
      () => isMountAnimationPreventedRef.current = false
    );
    return () => cancelAnimationFrame(rAF);
  }, []);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [
    context.open,
    present
  ]);
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    "data-state": $409067139f391064$var$getState(context.open),
    "data-disabled": context.disabled ? "" : void 0,
    id: context.contentId,
    hidden: !isOpen
  }, contentProps, {
    ref: composedRefs,
    style: {
      [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
      [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
      ...props.style
    }
  }), isOpen && children);
});
function $409067139f391064$var$getState(open) {
  return open ? "open" : "closed";
}
const $409067139f391064$export$be92b6f5f03c0fe9 = $409067139f391064$export$6eb0f7ddcda6131f;
const $409067139f391064$export$41fb9f06171c75f4 = $409067139f391064$export$c135dce7b15bbbdc;
const $409067139f391064$export$7c6e2c02157bb7d2 = $409067139f391064$export$aadde00976f34151;
const $f631663db3294ace$var$DirectionContext = /* @__PURE__ */ createContext$1(void 0);
function $f631663db3294ace$export$b39126d51d94e6f3(localDir) {
  const globalDir = useContext$1($f631663db3294ace$var$DirectionContext);
  return localDir || globalDir || "ltr";
}
const $1bf158f521e1b1b4$var$ACCORDION_NAME = "Accordion";
const $1bf158f521e1b1b4$var$ACCORDION_KEYS = [
  "Home",
  "End",
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight"
];
const [$1bf158f521e1b1b4$var$Collection, $1bf158f521e1b1b4$var$useCollection, $1bf158f521e1b1b4$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($1bf158f521e1b1b4$var$ACCORDION_NAME);
const [$1bf158f521e1b1b4$var$createAccordionContext, $1bf158f521e1b1b4$export$9748edc328a73be1] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($1bf158f521e1b1b4$var$ACCORDION_NAME, [
  $1bf158f521e1b1b4$var$createCollectionScope,
  $409067139f391064$export$952b32dcbe73087a
]);
const $1bf158f521e1b1b4$var$useCollapsibleScope = $409067139f391064$export$952b32dcbe73087a();
const $1bf158f521e1b1b4$export$a766cd26d0d69044 = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { type, ...accordionProps } = props;
  const singleProps = accordionProps;
  const multipleProps = accordionProps;
  return /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$Collection.Provider, {
    scope: props.__scopeAccordion
  }, type === "multiple" ? /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionImplMultiple, _extends$1({}, multipleProps, {
    ref: forwardedRef
  })) : /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionImplSingle, _extends$1({}, singleProps, {
    ref: forwardedRef
  })));
});
$1bf158f521e1b1b4$export$a766cd26d0d69044.propTypes = {
  type(props) {
    const value = props.value || props.defaultValue;
    if (props.type && ![
      "single",
      "multiple"
    ].includes(props.type))
      return new Error("Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`.");
    if (props.type === "multiple" && typeof value === "string")
      return new Error("Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`.");
    if (props.type === "single" && Array.isArray(value))
      return new Error("Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`.");
    return null;
  }
};
const [$1bf158f521e1b1b4$var$AccordionValueProvider, $1bf158f521e1b1b4$var$useAccordionValueContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
const [$1bf158f521e1b1b4$var$AccordionCollapsibleProvider, $1bf158f521e1b1b4$var$useAccordionCollapsibleContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, {
  collapsible: false
});
const $1bf158f521e1b1b4$var$AccordionImplSingle = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { value: valueProp, defaultValue, onValueChange = () => {
  }, collapsible = false, ...accordionSingleProps } = props;
  const [value, setValue] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  return /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
    scope: props.__scopeAccordion,
    value: value ? [
      value
    ] : [],
    onItemOpen: setValue,
    onItemClose: React__default.useCallback(
      () => collapsible && setValue(""),
      [
        collapsible,
        setValue
      ]
    )
  }, /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
    scope: props.__scopeAccordion,
    collapsible
  }, /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionImpl, _extends$1({}, accordionSingleProps, {
    ref: forwardedRef
  }))));
});
const $1bf158f521e1b1b4$var$AccordionImplMultiple = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { value: valueProp, defaultValue, onValueChange = () => {
  }, ...accordionMultipleProps } = props;
  const [value1 = [], setValue] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  const handleItemOpen = React__default.useCallback(
    (itemValue) => setValue(
      (prevValue = []) => [
        ...prevValue,
        itemValue
      ]
    ),
    [
      setValue
    ]
  );
  const handleItemClose = React__default.useCallback(
    (itemValue) => setValue(
      (prevValue = []) => prevValue.filter(
        (value) => value !== itemValue
      )
    ),
    [
      setValue
    ]
  );
  return /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
    scope: props.__scopeAccordion,
    value: value1,
    onItemOpen: handleItemOpen,
    onItemClose: handleItemClose
  }, /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
    scope: props.__scopeAccordion,
    collapsible: true
  }, /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionImpl, _extends$1({}, accordionMultipleProps, {
    ref: forwardedRef
  }))));
});
const [$1bf158f521e1b1b4$var$AccordionImplProvider, $1bf158f521e1b1b4$var$useAccordionContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
const $1bf158f521e1b1b4$var$AccordionImpl = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
  const accordionRef = React__default.useRef(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(accordionRef, forwardedRef);
  const getItems = $1bf158f521e1b1b4$var$useCollection(__scopeAccordion);
  const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
  const isDirectionLTR = direction === "ltr";
  const handleKeyDown = $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
    var _triggerCollection$cl;
    if (!$1bf158f521e1b1b4$var$ACCORDION_KEYS.includes(event.key))
      return;
    const target = event.target;
    const triggerCollection = getItems().filter((item) => {
      var _item$ref$current;
      return !((_item$ref$current = item.ref.current) !== null && _item$ref$current !== void 0 && _item$ref$current.disabled);
    });
    const triggerIndex = triggerCollection.findIndex(
      (item) => item.ref.current === target
    );
    const triggerCount = triggerCollection.length;
    if (triggerIndex === -1)
      return;
    event.preventDefault();
    let nextIndex = triggerIndex;
    const homeIndex = 0;
    const endIndex = triggerCount - 1;
    const moveNext = () => {
      nextIndex = triggerIndex + 1;
      if (nextIndex > endIndex)
        nextIndex = homeIndex;
    };
    const movePrev = () => {
      nextIndex = triggerIndex - 1;
      if (nextIndex < homeIndex)
        nextIndex = endIndex;
    };
    switch (event.key) {
      case "Home":
        nextIndex = homeIndex;
        break;
      case "End":
        nextIndex = endIndex;
        break;
      case "ArrowRight":
        if (orientation === "horizontal") {
          if (isDirectionLTR)
            moveNext();
          else
            movePrev();
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical")
          moveNext();
        break;
      case "ArrowLeft":
        if (orientation === "horizontal") {
          if (isDirectionLTR)
            movePrev();
          else
            moveNext();
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical")
          movePrev();
        break;
    }
    const clampedIndex = nextIndex % triggerCount;
    (_triggerCollection$cl = triggerCollection[clampedIndex].ref.current) === null || _triggerCollection$cl === void 0 || _triggerCollection$cl.focus();
  });
  return /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionImplProvider, {
    scope: __scopeAccordion,
    disabled,
    direction: dir,
    orientation
  }, /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$Collection.Slot, {
    scope: __scopeAccordion
  }, /* @__PURE__ */ React__default.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({}, accordionProps, {
    "data-orientation": orientation,
    ref: composedRefs,
    onKeyDown: disabled ? void 0 : handleKeyDown
  }))));
});
const $1bf158f521e1b1b4$var$ITEM_NAME = "AccordionItem";
const [$1bf158f521e1b1b4$var$AccordionItemProvider, $1bf158f521e1b1b4$var$useAccordionItemContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME);
const $1bf158f521e1b1b4$export$d99097c13d4dac9f = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, value, ...accordionItemProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
  const valueContext = $1bf158f521e1b1b4$var$useAccordionValueContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
  const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
  const triggerId = $1746a345f3d73bb7$export$f680877a34711e37();
  const open1 = value && valueContext.value.includes(value) || false;
  const disabled = accordionContext.disabled || props.disabled;
  return /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$AccordionItemProvider, {
    scope: __scopeAccordion,
    open: open1,
    disabled,
    triggerId
  }, /* @__PURE__ */ React__default.createElement($409067139f391064$export$be92b6f5f03c0fe9, _extends$1({
    "data-orientation": accordionContext.orientation,
    "data-state": $1bf158f521e1b1b4$var$getState(open1)
  }, collapsibleScope, accordionItemProps, {
    ref: forwardedRef,
    disabled,
    open: open1,
    onOpenChange: (open) => {
      if (open)
        valueContext.onItemOpen(value);
      else
        valueContext.onItemClose(value);
    }
  })));
});
const $1bf158f521e1b1b4$var$HEADER_NAME = "AccordionHeader";
const $1bf158f521e1b1b4$export$5e3e5deaaf81ee41 = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...headerProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
  const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$HEADER_NAME, __scopeAccordion);
  return /* @__PURE__ */ React__default.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.h3, _extends$1({
    "data-orientation": accordionContext.orientation,
    "data-state": $1bf158f521e1b1b4$var$getState(itemContext.open),
    "data-disabled": itemContext.disabled ? "" : void 0
  }, headerProps, {
    ref: forwardedRef
  }));
});
const $1bf158f521e1b1b4$var$TRIGGER_NAME = "AccordionTrigger";
const $1bf158f521e1b1b4$export$94e939b1f85bdd73 = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...triggerProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
  const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
  const collapsibleContext = $1bf158f521e1b1b4$var$useAccordionCollapsibleContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
  const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
  return /* @__PURE__ */ React__default.createElement($1bf158f521e1b1b4$var$Collection.ItemSlot, {
    scope: __scopeAccordion
  }, /* @__PURE__ */ React__default.createElement($409067139f391064$export$41fb9f06171c75f4, _extends$1({
    "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
    "data-orientation": accordionContext.orientation,
    id: itemContext.triggerId
  }, collapsibleScope, triggerProps, {
    ref: forwardedRef
  })));
});
const $1bf158f521e1b1b4$var$CONTENT_NAME = "AccordionContent";
const $1bf158f521e1b1b4$export$985b9a77379b54a0 = /* @__PURE__ */ React__default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...contentProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
  const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$CONTENT_NAME, __scopeAccordion);
  const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
  return /* @__PURE__ */ React__default.createElement($409067139f391064$export$7c6e2c02157bb7d2, _extends$1({
    role: "region",
    "aria-labelledby": itemContext.triggerId,
    "data-orientation": accordionContext.orientation
  }, collapsibleScope, contentProps, {
    ref: forwardedRef,
    style: {
      ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
      ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
      ...props.style
    }
  }));
});
function $1bf158f521e1b1b4$var$getState(open) {
  return open ? "open" : "closed";
}
const $1bf158f521e1b1b4$export$6d08773d2e66f8f2 = $1bf158f521e1b1b4$export$d99097c13d4dac9f;
const $1bf158f521e1b1b4$export$8b251419efc915eb = $1bf158f521e1b1b4$export$5e3e5deaaf81ee41;
const $1bf158f521e1b1b4$export$41fb9f06171c75f4 = $1bf158f521e1b1b4$export$94e939b1f85bdd73;
const $1bf158f521e1b1b4$export$7c6e2c02157bb7d2 = $1bf158f521e1b1b4$export$985b9a77379b54a0;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  $1bf158f521e1b1b4$export$6d08773d2e66f8f2,
  {
    ref,
    className: cn$2("border-0 border-b border-border/30", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx($1bf158f521e1b1b4$export$8b251419efc915eb, { className: "flex", children: /* @__PURE__ */ jsxs(
  $1bf158f521e1b1b4$export$41fb9f06171c75f4,
  {
    ref,
    className: cn$2(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(
        Icon,
        {
          name: IconName.chevronDownSmall,
          className: "h-5 w-5 shrink-0 transition-transform duration-200"
        }
      )
    ]
  }
) }));
AccordionTrigger.displayName = $1bf158f521e1b1b4$export$41fb9f06171c75f4.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  $1bf158f521e1b1b4$export$7c6e2c02157bb7d2,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn$2("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = $1bf158f521e1b1b4$export$7c6e2c02157bb7d2.displayName;
const Currency = {
  ETH: "ETH"
};
const Identity = {
  user: "user",
  nonUser: "non-user"
};
const ClaimPosition = {
  claimFor: "for",
  claimAgainst: "against"
};
function createContextScope$1(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = React.createContext(defaultContext);
    const index2 = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    function Provider(props) {
      const { scope, children, ...context } = props;
      const Context = (scope == null ? void 0 : scope[scopeName][index2]) || BaseContext;
      const value = React.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx(Context.Provider, { value, children });
    }
    function useContext2(consumerName, scope) {
      const Context = (scope == null ? void 0 : scope[scopeName][index2]) || BaseContext;
      const context = React.useContext(Context);
      if (context)
        return context;
      if (defaultContext !== void 0)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    Provider.displayName = rootComponentName + "Provider";
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return React.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes$1(createScope, ...createContextScopeDeps)];
}
function composeContextScopes$1(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler == null ? void 0 : originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler == null ? void 0 : ourEventHandler(event);
    }
  };
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope$1(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var TRIGGER_NAME$1 = "AlertDialogTrigger";
var AlertDialogTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME$1;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME$1 = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME$1);
var AlertDialogContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = React.useRef(null);
    return /* @__PURE__ */ jsx(
      DialogPrimitive.WarningProvider,
      {
        contentName: CONTENT_NAME$1,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxs(
          DialogPrimitive.Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsx(Slottable, { children }),
              /* @__PURE__ */ jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME$1;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsx(DialogPrimitive.Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = React.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsx(DialogPrimitive.Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsx(DialogPrimitive.Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsx(DialogPrimitive.Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME$1}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME$1}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME$1}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  React.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription)
      console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
const ButtonVariant = {
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  text: "text",
  accent: "accent",
  warning: "warning",
  success: "success",
  destructive: "destructive",
  navigation: "navigation",
  accentOutline: "accentOutline",
  warningOutline: "warningOutline",
  successOutline: "successOutline",
  destructiveOutline: "destructiveOutline",
  for: "for",
  against: "against"
};
const ButtonSize = {
  default: "default",
  md: "md",
  lg: "lg",
  xl: "xl",
  icon: "icon",
  iconMd: "iconMd",
  iconLg: "iconLg",
  iconXl: "iconXl"
};
const buttonVariants = cva(
  "flex justify-center items-center gap-2 text-sm font-medium border disabled:bg-muted aria-disabled:bg-muted disabled:text-muted-foreground aria-disabled:text-muted-foreground disabled:border-muted aria-disabled:border-muted aria-disabled:pointer-events-none",
  {
    variants: {
      variant: {
        [ButtonVariant.primary]: "bg-primary text-primary-foreground border-primary hover:bg-primary/80 rounded-full shadow-md-subtle",
        [ButtonVariant.secondary]: "primary-gradient-subtle text-primary/60 border-primary/10 rounded-lg hover:text-primary disabled:from-muted aria-disabled:from-muted disabled:to-muted aria-disabled:to-muted shadow-md-subtle",
        [ButtonVariant.ghost]: "bg-gradient-to-b from-transparent to-transparent text-primary/70 border-primary/30 rounded-lg hover:text-primary hover:border-primary/50 disabled:bg-transparent disabled:hover:cursor-not-allowed aria-disabled:bg-primary/5 aria-disabled:border-primary/10 aria-selected:primary-gradient-subtle aria-selected:border-primary/10 shadow-md-subtle",
        [ButtonVariant.text]: "bg-transparent text-primary/70 border-transparent hover:text-primary disabled:border-transparent aria-disabled:border-transparent disabled:bg-transparent aria-disabled:bg-transparent shadow-none",
        [ButtonVariant.accent]: "bg-accent text-accent-foreground border-accent rounded-full hover:bg-accent/70 hover:border-accent/30 shadow-md-subtle",
        [ButtonVariant.warning]: "bg-warning text-warning-foreground border-warning rounded-full hover:bg-warning/70 hover:border-warning/30 shadow-md-subtle",
        [ButtonVariant.success]: "bg-success text-success-foreground border-success rounded-full hover:bg-success/70 hover:border-success/30 shadow-md-subtle",
        [ButtonVariant.destructive]: "bg-destructive text-destructive-foreground border-destructive rounded-full hover:bg-destructive/70 hover:border-destructive/30 shadow-md-subtle",
        [ButtonVariant.navigation]: "bg-transparent text-secondary-foreground/70 border-transparent rounded-lg  hover:text-secondary-foreground hover:border-border/20 aria-selected:bg-primary/10 aria-selected:text-secondary-foreground/80 disabled:text-muted-foreground aria-disabled:text-muted-foreground",
        [ButtonVariant.accentOutline]: "bg-transparent text-accent border-accent rounded-full hover:bg-accent/30 hover:border-accent/30 shadow-md-subtle",
        [ButtonVariant.warningOutline]: "bg-transparent text-warning border-warning rounded-full hover:bg-warning/30 hover:border-warning/30 shadow-md-subtle",
        [ButtonVariant.successOutline]: "bg-transparent text-success border-success rounded-full hover:bg-success/30 hover:border-success/30 shadow-md-subtle",
        [ButtonVariant.destructiveOutline]: "bg-transparent text-destructive border-destructive rounded-full hover:bg-destructive/30 hover:border-destructive/30 shadow-md-subtle",
        [ButtonVariant.for]: "bg-for text-for-foreground border-for rounded-full hover:bg-for/70 hover:border-for/30 shadow-md-subtle",
        [ButtonVariant.against]: "bg-against text-against-foreground border-against rounded-full hover:bg-against/70 hover:border-against/30 shadow-md-subtle"
      },
      size: {
        [ButtonSize.default]: "px-3 py-1 max-sm:py-2 max-sm:text-base",
        [ButtonSize.md]: "px-4 py-1.5",
        [ButtonSize.lg]: "px-4 py-2 gap-2 text-base",
        [ButtonSize.xl]: "px-5 py-2.5 gap-4 text-lg",
        [ButtonSize.icon]: "p-1",
        [ButtonSize.iconMd]: "p-1.5",
        [ButtonSize.iconLg]: "p-2",
        [ButtonSize.iconXl]: "p-2.5"
      }
    },
    defaultVariants: {
      variant: ButtonVariant.primary,
      size: ButtonSize.default
    }
  }
);
const Button$1 = React.forwardRef(
  ({ className, variant, size: size2, asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxs(
      Comp,
      {
        className: cn$2(buttonVariants({ variant, size: size2 }), className),
        ref,
        ...props,
        children: [
          isLoading && /* @__PURE__ */ jsx(Icon, { name: IconName.inProgress, className: "h-6 w-6 animate-spin" }),
          props.children
        ]
      }
    );
  }
);
Button$1.displayName = "Button";
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Overlay2,
  {
    className: cn$2(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    Content2,
    {
      ref,
      className: cn$2(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 theme-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Title2,
  {
    ref,
    className: cn$2("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Description2,
  {
    ref,
    className: cn$2("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Action,
  {
    ref,
    className: cn$2(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Cancel,
  {
    ref,
    className: cn$2(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const AvatarContainer = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn$2(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
AvatarContainer.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn$2("aspect-square object-cover h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn$2(
      "bg-muted flex h-full w-full items-center justify-center",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
cva("aspect-square bg-background border-border/10", {
  variants: {
    variant: {
      [Identity.user]: "rounded-full",
      [Identity.nonUser]: "rounded"
    }
  },
  defaultVariants: {
    variant: Identity.user
  }
});
const BadgeVariant = {
  default: "default",
  success: "success",
  accent: "accent",
  social: "social",
  warning: "warning",
  against: "against",
  for: "for",
  destructive: "destructive"
};
cva(
  "inline-flex items-center gap-1 rounded-md pl-1 pr-1.5 py-0.5 text-sm font-light text-foreground/65",
  {
    variants: {
      variant: {
        [BadgeVariant.default]: "bg-primary/10",
        [BadgeVariant.success]: "bg-success/50",
        [BadgeVariant.accent]: "bg-accent/50",
        [BadgeVariant.social]: "bg-social/50",
        [BadgeVariant.warning]: "bg-warning/50",
        [BadgeVariant.against]: "bg-against/50",
        [BadgeVariant.for]: "bg-for/50",
        [BadgeVariant.destructive]: "bg-destructive/50"
      }
    },
    defaultVariants: {
      variant: BadgeVariant.default
    }
  }
);
const spriteSheet = "/assets/Icon.sprites-yN1d1xFs.svg";
const Icon = ({ name, className }) => {
  return /* @__PURE__ */ jsx("svg", { className: cn$2(`h-6 w-6`, className), children: /* @__PURE__ */ jsx("use", { href: `${spriteSheet}#${name}` }) });
};
const IconName = {
  arrowUp: "arrow-up",
  arrowDown: "arrow-down",
  arrowBoxLeft: "arrow-box-left",
  arrowLeft: "arrow-left",
  arrowRight: "arrow-right",
  arrowUpRight: "arrow-up-right",
  arrowUpRightFromCircleIcon: "arrow-up-right",
  arrowOutOfBox: "arrow-out-of-box",
  arrowsRepeat: "arrows-repeat",
  book: "book",
  bookmarkCheck: "bookmark-check",
  brushSparkle: "brush-sparkle",
  bubbleAnnotation: "bubble-annotation",
  calendar: "calendar",
  chainLink: "chain-link",
  checkmark: "checkmark",
  chevronDoubleLeft: "chevron-double-left",
  chevronDoubleRight: "chevron-double-right",
  chevronDownSmall: "chevron-down-small",
  chevronGrabberVertical: "chevron-grabber-vertical",
  chevronDownLarge: "chevron-down-large",
  chevronLeft: "chevron-left",
  chevronLeftSmall: "chevron-left-small",
  chevronRight: "chevron-right",
  chevronRightSmall: "chevron-right-small",
  chevronTopSmall: "chevron-top-small",
  circle: "circle",
  circleArrow: "circle-arrow",
  circleCheck: "circle-check",
  circleDotsCenter: "circle-dots-center",
  circlePlus: "circle-plus",
  circleQuestionMark: "circle-question-mark",
  circleX: "circle-x",
  circlesThree: "circles-three",
  copy: "copy",
  context: "context",
  crossLarge: "cross-large",
  cryptoPunk: "crypto-punk",
  crystalBall: "crystal-ball",
  dotGrid: "dot-grid",
  envelope: "envelope",
  eyeOpen: "eye-open",
  eyeSlash: "eye-slash",
  fastForward: "fast-forward",
  filter1: "filter-1",
  filter2: "filter-2",
  floppyDisk1: "floppy-disk-1",
  floppyDisk2: "floppy-disk-2",
  folder: "folder",
  gift: "gift",
  graduateCap: "graduate-cap",
  group: "group",
  headset: "headset",
  layoutGrid: "layout-grid",
  layoutThird: "layout-third",
  lightningBolt: "lightning-bolt",
  loader: "loader",
  lock: "lock",
  magnifyingGlass: "magnifying-glass",
  medal: "medal",
  megaphone: "megaphone",
  microphone: "microphone",
  mobile: "mobile",
  moneybag: "moneybag",
  personCircle: "person-circle",
  pause: "pause",
  play: "play",
  playFilled: "play-filled",
  playCircle: "play-circle",
  plusLarge: "plus-large",
  plusSmall: "plus-small",
  rescueRing: "rescue-ring",
  rocket: "rocket",
  settingsGear: "settings-gear",
  shieldCheck: "shield-check",
  shieldCheckFilled: "shield-check-filled",
  shoppingBag: "shopping-bag",
  sparkle: "sparkle",
  squareArrowTopRight: "square-arrow-top-right",
  squareCheck: "square-check",
  squareCheckEmpty: "square-check-empty",
  squareChecklist: "square-checklist",
  squarePlus: "square-plus",
  squareX: "square-x",
  trashCan: "trash-can",
  volumeFull: "volume-full",
  volumeMuted: "volume-muted",
  wallet: "wallet",
  wreath: "wreath",
  fingerprint: "fingerprint",
  x: "x",
  discord: "discord",
  lens: "lens",
  farcaster: "farcaster",
  calendly: "calendly",
  medium: "medium",
  github: "github",
  inboxEmpty: "inbox-empty",
  people: "people",
  tag: "tag",
  tagFilled: "tag-filled",
  telegram: "telegram",
  trustCircle: "trust-circle",
  trustCircleFilled: "trust-circle-filled",
  inProgress: "in-progress",
  triangleExclamationFilled: "triangle-exclamation-filled",
  triangleExclamation: "triangle-exclamation",
  awaitAction: "await-action",
  wallet2: "wallet-2",
  chevronBottom: "chevron-bottom",
  anchor: "anchor",
  airdrop: "airdrop",
  arrowCornerDownLeft: "arrow-corner-down-left",
  ethereum: "ethereum",
  map: "map",
  crossSmall: "cross-small",
  circleInfo: "circle-info",
  circleCheckFilled: "circle-check-filled",
  fingerprintFilled: "fingerprint-filled",
  claimFilled: "claim-filled",
  circlePlusFilled: "circle-plus-filled",
  arrowDownCircleFilled: "arrow-down-circle-filled",
  peopleAddFilled: "people-add-filled",
  arrowUpCircleFilled: "arrow-up-circle-filled",
  circleXFilled: "circle-x-filled",
  peopleRemoveFilled: "people-remove-filled",
  peopleAdd: "people-add",
  peopleAdded: "people-added",
  megaphone2: "megaphone-2",
  bookmark: "bookmark",
  bookmarkFilled: "bookmark-filled",
  homeDoor: "home-door",
  claim: "claim",
  fileText: "file-text",
  hamburger: "hamburger",
  avatarSparkle: "avatar-sparkle",
  twitter: "twitter",
  mirror: "mirror",
  warpcast: "warpcast",
  galxe: "galxe"
};
const TextVariant = {
  heading1: "heading1",
  heading2: "heading2",
  heading3: "heading3",
  heading4: "heading4",
  heading5: "heading5",
  headline: "headline",
  bodyLarge: "bodyLarge",
  body: "body",
  caption: "caption",
  footnote: "footnote",
  small: "small"
};
const TextWeight = {
  normal: "normal",
  medium: "medium",
  semibold: "semibold",
  bold: "bold"
};
const textVariants = cva("text-primary", {
  variants: {
    variant: {
      [TextVariant.heading1]: "text-6xl",
      [TextVariant.heading2]: "text-5xl",
      [TextVariant.heading3]: "text-4xl",
      [TextVariant.heading4]: "text-3xl",
      [TextVariant.heading5]: "text-2xl",
      [TextVariant.headline]: "text-xl",
      [TextVariant.bodyLarge]: "text-lg",
      [TextVariant.body]: "text-base",
      [TextVariant.caption]: "text-sm",
      [TextVariant.footnote]: "text-sm",
      [TextVariant.small]: "text-xs"
    },
    weight: {
      [TextWeight.normal]: "font-normal",
      [TextWeight.medium]: "font-medium",
      [TextWeight.semibold]: "font-semibold",
      [TextWeight.bold]: "font-bold"
    }
  },
  defaultVariants: {
    variant: TextVariant.body,
    weight: TextWeight.normal
  }
});
const textElement = (variant) => {
  switch (variant) {
    case TextVariant.heading1:
      return "h1";
    case TextVariant.heading2:
      return "h2";
    case TextVariant.heading3:
      return "h3";
    case TextVariant.heading4:
      return "h4";
    case TextVariant.heading5:
      return "h5";
    case TextVariant.headline:
      return "h6";
    default:
      return "div";
  }
};
const Text = React.forwardRef(
  ({ className, variant, weight, ...props }, ref) => {
    const Comp = textElement(variant);
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn$2(textVariants({ variant, weight }), className),
        ref,
        ...props
      }
    );
  }
);
Text.displayName = "Text";
const BannerVariant = {
  info: "info",
  warning: "warning",
  error: "error"
};
cva(
  "flex w-full justify-between items-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r max-sm:flex-col max-sm:gap-3",
  {
    variants: {
      variant: {
        [BannerVariant.info]: "from-accent/60 to-accent/10",
        [BannerVariant.warning]: "from-warning/60 to-warning/10",
        [BannerVariant.error]: "from-destructive/60 to-destructive/10"
      }
    },
    defaultVariants: {
      variant: BannerVariant.info
    }
  }
);
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn$2(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn$2("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(Icon, { name: IconName.checkmark, className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  HoverCardPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn$2(
      "z-50 w-64 flex flex-col gap-4 rounded-md theme-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 text-left",
      className
    ),
    ...props
  }
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
const IdentityTagSize = {
  default: "default",
  md: "md",
  lg: "lg",
  xl: "xl"
};
cva(
  "theme-border font-medium py-0.5 pl-0.5 pr-2 hover:bg-primary/10 disabled:pointer-events-none flex gap-2 items-center text-secondary/70 hover:text-secondary",
  {
    variants: {
      variant: {
        [Identity.user]: "rounded-full [&>span]:rounded-full [&>span]:overflow-hidden",
        [Identity.nonUser]: "rounded-md"
      },
      size: {
        [IdentityTagSize.default]: "text-base [&>span]:h-6 [&>span]:w-6",
        [IdentityTagSize.md]: "text-base [&>span]:h-7 [&>span]:w-7",
        [IdentityTagSize.lg]: "text-lg [&>span]:h-8 [&>span]:w-8",
        [IdentityTagSize.xl]: "text-xl [&>span]:h-11 [&>span]:w-11"
      },
      disabled: {
        true: "disabled:opacity-50 cursor-not-allowed",
        false: ""
      }
    },
    defaultVariants: {
      variant: Identity.user,
      size: IdentityTagSize.default,
      disabled: false
    }
  }
);
const formatNumber = (value) => {
  if (value >= 1e6) {
    const millions = value / 1e6;
    return millions >= 100 ? `${Math.round(millions)}M` : `${millions.toFixed(1).replace(/\.?0+$/, "")}M`;
  } else if (value >= 1e3) {
    const thousands = value / 1e3;
    return thousands >= 100 ? `${Math.round(thousands)}K` : `${thousands.toFixed(1).replace(/\.?0+$/, "")}K`;
  }
  return value.toString();
};
const $89eedd556c436f6a$var$DEFAULT_ORIENTATION = "horizontal";
const $89eedd556c436f6a$var$ORIENTATIONS = [
  "horizontal",
  "vertical"
];
const $89eedd556c436f6a$export$1ff3c3f08ae963c0 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = $89eedd556c436f6a$var$DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = $89eedd556c436f6a$var$isValidOrientation(orientationProp) ? orientationProp : $89eedd556c436f6a$var$DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? {
    role: "none"
  } : {
    "aria-orientation": ariaOrientation,
    role: "separator"
  };
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    "data-orientation": orientation
  }, semanticProps, domProps, {
    ref: forwardedRef
  }));
});
$89eedd556c436f6a$export$1ff3c3f08ae963c0.propTypes = {
  orientation(props, propName, componentName) {
    const propValue = props[propName];
    const strVal = String(propValue);
    if (propValue && !$89eedd556c436f6a$var$isValidOrientation(propValue))
      return new Error($89eedd556c436f6a$var$getInvalidOrientationError(strVal, componentName));
    return null;
  }
};
function $89eedd556c436f6a$var$getInvalidOrientationError(value, componentName) {
  return `Invalid prop \`orientation\` of value \`${value}\` supplied to \`${componentName}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${$89eedd556c436f6a$var$DEFAULT_ORIENTATION}\`.`;
}
function $89eedd556c436f6a$var$isValidOrientation(orientation) {
  return $89eedd556c436f6a$var$ORIENTATIONS.includes(orientation);
}
const $89eedd556c436f6a$export$be92b6f5f03c0fe9 = $89eedd556c436f6a$export$1ff3c3f08ae963c0;
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    $89eedd556c436f6a$export$be92b6f5f03c0fe9,
    {
      ref,
      decorative,
      orientation,
      className: cn$2(
        "shrink-0 bg-border/20",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = $89eedd556c436f6a$export$be92b6f5f03c0fe9.displayName;
const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn$2(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(Icon, { name: IconName.chevronRight, className: "ml-auto h-4 w-4" })
    ]
  }
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.SubContent,
  {
    ref,
    className: cn$2(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Content,
  {
    ref,
    className: cn$2(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Item,
  {
    ref,
    className: cn$2(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn$2(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Icon, { name: IconName.checkmark, className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ContextMenuPrimitive.RadioItem,
  {
    ref,
    className: cn$2(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Icon, { name: IconName.circle, className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Label,
  {
    ref,
    className: cn$2(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ContextMenuPrimitive.Separator,
  {
    ref,
    className: cn$2("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
const StakeButtonVariant = {
  identity: "identity",
  claimFor: "claimFor",
  claimAgainst: "claimAgainst"
};
const stakeButtonVariants = cva(
  "py-0.5 px-2.5 gap-1.5 h-9 w-16 rounded-xl disabled:bg-primary/5 disabled:border-primary/20 disabled:text-primary/20",
  {
    variants: {
      variant: {
        [StakeButtonVariant.identity]: "bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-secondary",
        [StakeButtonVariant.claimFor]: "bg-for/10 border-for/30 hover:bg-for hover:border-for/50 text-for",
        [StakeButtonVariant.claimAgainst]: "bg-against/10 border-against/30 hover:bg-against hover:border-against/50 text-against"
      },
      userPosition: {
        true: "bg-primary/20 border-primary/60 hover:border-primary/60"
      },
      positionDirection: {
        [ClaimPosition.claimFor]: "text-primary bg-for border-border/30 hover:border-border/30",
        [ClaimPosition.claimAgainst]: "text-primary bg-against border-border/30 hover:border-border/30"
      }
    },
    defaultVariants: {
      variant: StakeButtonVariant.identity
    }
  }
);
const StakeButton = React__default.forwardRef(
  ({
    className,
    variant,
    numPositions,
    userPosition,
    direction,
    positionDirection,
    onClick,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      Button$1,
      {
        variant: ButtonVariant.ghost,
        className: cn$2(
          stakeButtonVariants({
            variant,
            userPosition,
            positionDirection
          }),
          className
        ),
        ref,
        onClick,
        ...props,
        children: [
          /* @__PURE__ */ jsx(
            Icon,
            {
              name: direction === ClaimPosition.claimAgainst ? IconName.arrowDown : IconName.arrowUp,
              className: "h-4 w-4"
            }
          ),
          /* @__PURE__ */ jsx(Text, { variant: TextVariant.caption, className: "text-inherit", children: formatNumber(numPositions) })
        ]
      }
    );
  }
);
StakeButton.displayName = "StakeButton";
const StakeCardDataSetVariant = {
  for: "for",
  against: "against"
};
const ClaimStakeCardDataSet = ({
  variant,
  value,
  currency
}) => {
  const isVariantFor = variant === StakeCardDataSetVariant.for;
  let subContainerClassName = "flex gap-1 items-center";
  if (isVariantFor) {
    subContainerClassName += " justify-start";
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: subContainerClassName, children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: `block h-2 w-2 rounded-[2px] ${isVariantFor ? "bg-for" : "bg-against"}`
        }
      ),
      /* @__PURE__ */ jsx(
        Text,
        {
          variant: TextVariant.caption,
          weight: TextWeight.medium,
          className: "text-muted-foreground",
          children: !currency ? "Depositors" : isVariantFor ? "TVL For" : "TVL Against"
        }
      )
    ] }),
    currency ? /* @__PURE__ */ jsx(
      MonetaryValue,
      {
        variant: TextVariant.bodyLarge,
        value,
        currency,
        className: isVariantFor ? "text-left" : "text-right"
      }
    ) : /* @__PURE__ */ jsx(
      Text,
      {
        variant: TextVariant.bodyLarge,
        weight: TextWeight.medium,
        className: isVariantFor ? "text-left" : "text-right",
        children: value
      }
    )
  ] });
};
const ClaimStakeCard = ({
  currency,
  totalTVL,
  tvlAgainst,
  tvlFor,
  numPositionsAgainst,
  numPositionsFor,
  disableStaking = false,
  disableAgainstBtn = false,
  onAgainstBtnClick,
  disableForBtn = false,
  onForBtnClick,
  className,
  ...props
}) => {
  const stakedForPercentage = tvlFor / totalTVL * 100;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn$2(
        "flex flex-col gap-4 theme-border rounded-xl p-5 w-full",
        className
      ),
      ...props,
      children: [
        !disableStaking && /* @__PURE__ */ jsx(Text, { variant: TextVariant.bodyLarge, children: "Stake" }),
        /* @__PURE__ */ jsxs("div", { className: "grid justify-center items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "col-[1] row-[1] block w-full", children: /* @__PURE__ */ jsx(
            PieChart,
            {
              variant: PieChartVariant.forVsAgainst,
              size: PieChartSize.lg,
              percentage: stakedForPercentage
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "col-[1] row-[1] text-center", children: [
            /* @__PURE__ */ jsx(
              Text,
              {
                variant: TextVariant.bodyLarge,
                weight: TextWeight.normal,
                className: "text-muted-foreground",
                children: "TVL"
              }
            ),
            /* @__PURE__ */ jsx(
              MonetaryValue,
              {
                variant: TextVariant.bodyLarge,
                value: totalTVL,
                currency
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx(
            ClaimStakeCardDataSet,
            {
              variant: StakeCardDataSetVariant.for,
              value: tvlFor,
              currency
            }
          ),
          /* @__PURE__ */ jsx(
            ClaimStakeCardDataSet,
            {
              variant: StakeCardDataSetVariant.against,
              value: tvlAgainst,
              currency
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx(
            ClaimStakeCardDataSet,
            {
              variant: StakeCardDataSetVariant.for,
              value: numPositionsFor
            }
          ),
          /* @__PURE__ */ jsx(
            ClaimStakeCardDataSet,
            {
              variant: StakeCardDataSetVariant.against,
              value: numPositionsAgainst
            }
          )
        ] }),
        !disableStaking && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-4 w-full mt-2", children: [
          /* @__PURE__ */ jsx(
            Button$1,
            {
              variant: ButtonVariant.for,
              size: ButtonSize.md,
              disabled: disableForBtn || !onForBtnClick,
              onClick: onForBtnClick,
              className: "w-full",
              children: "Deposit For"
            }
          ),
          /* @__PURE__ */ jsx(
            Button$1,
            {
              variant: ButtonVariant.against,
              size: ButtonSize.md,
              disabled: disableAgainstBtn || !onAgainstBtnClick,
              onClick: onAgainstBtnClick,
              className: "w-full",
              children: "Deposit Against"
            }
          )
        ] })
      ]
    }
  );
};
const PieChartSize = {
  sm: "sm",
  md: "md",
  lg: "lg"
};
const PieChartVariant = {
  default: "default",
  forVsAgainst: "forVsAgainst",
  for: "for",
  against: "against"
};
const determinePieChartSize = (size2) => {
  if (size2 === PieChartSize.sm) {
    return { size: 32, width: 4 };
  } else if (size2 === PieChartSize.md) {
    return { size: 80, width: 10 };
  }
  return { size: 160, width: 10 };
};
const determinePieChartColorScheme = (variant) => {
  if (variant === PieChartVariant.forVsAgainst) {
    return {
      overlay: `var(--for)`,
      base: "var(--against)"
    };
  }
  if (variant === PieChartVariant.for) {
    return {
      overlay: `var(--for)`,
      base: "color-mix(in srgb, var(--background) 10%, transparent)"
    };
  }
  if (variant === PieChartVariant.against) {
    return {
      overlay: "var(--against)",
      base: "color-mix(in srgb, var(--background) 10%, transparent)"
    };
  }
  return {
    overlay: `var(--primary)`,
    base: "color-mix(in srgb, var(--background) 10%, transparent)"
  };
};
const PieChart = ({
  variant = PieChartVariant.default,
  size: size2 = PieChartSize.md,
  percentage,
  ...props
}) => {
  const sizeParams = determinePieChartSize(size2);
  const colorScheme = determinePieChartColorScheme(variant);
  return /* @__PURE__ */ jsxs("div", { className: "grid", ...props, children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "col-[1] row-[1] rounded-full block",
        style: {
          height: `${sizeParams.size}px`,
          width: `${sizeParams.size}px`,
          background: `conic-gradient(${colorScheme.overlay} calc(${percentage}*1%),${colorScheme.base} 0)`,
          mask: `radial-gradient(farthest-side,#0000 calc(99% - ${sizeParams.width}px),var(--background) calc(100% - ${sizeParams.width}px)`
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `col-[1] row-[1] border-muted-foreground rounded-full block`,
        style: {
          borderWidth: `${sizeParams.width}px`
        }
      }
    )
  ] });
};
const StakeTVL = React__default.forwardRef(
  ({
    totalTVL,
    numPositionsFor,
    numPositionsAgainst,
    currency = "ETH",
    className,
    isClaim,
    tvlFor,
    tvlAgainst,
    ...props
  }, ref) => {
    const stakedForPercentage = tvlFor && totalTVL ? +tvlFor / +totalTVL * 100 : 0;
    const formattedTVL = totalTVL < 1e-4 ? "< 0.0001" : totalTVL.toFixed(4);
    const content = /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn$2(
          "h-9 justify-start items-center gap-1 inline-flex",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "justify-start items-center gap-1 flex", children: /* @__PURE__ */ jsxs("div", { className: "flex-col justify-start items-end inline-flex", children: [
            /* @__PURE__ */ jsx(Text, { variant: TextVariant.caption, className: "text-primary/70", children: "TVL" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-1", children: [
              /* @__PURE__ */ jsx(Text, { variant: TextVariant.caption, children: formattedTVL }),
              /* @__PURE__ */ jsx(Text, { variant: TextVariant.caption, children: currency })
            ] })
          ] }) }),
          isClaim && /* @__PURE__ */ jsx("div", { className: "p-0.5", children: /* @__PURE__ */ jsx(
            PieChart,
            {
              variant: tvlFor && +tvlFor > 0 || tvlAgainst && +tvlAgainst > 0 ? PieChartVariant.forVsAgainst : PieChartVariant.default,
              size: PieChartSize.sm,
              percentage: stakedForPercentage
            }
          ) })
        ]
      }
    );
    if (!isClaim) {
      return content;
    }
    return /* @__PURE__ */ jsxs(HoverCard, { children: [
      /* @__PURE__ */ jsx(HoverCardTrigger, { asChild: true, children: content }),
      /* @__PURE__ */ jsx(HoverCardContent, { align: "end", side: "top", children: /* @__PURE__ */ jsx(
        ClaimStakeCard,
        {
          currency,
          totalTVL,
          tvlAgainst,
          tvlFor,
          numPositionsAgainst: numPositionsAgainst ?? 0,
          numPositionsFor: numPositionsFor ?? 0,
          disableStaking: true,
          className: "border-none p-0"
        }
      ) })
    ] });
  }
);
StakeTVL.displayName = "StakeTVL";
function $addc16e1bbe58fd0$export$3a72a57244d6e765(onEscapeKeyDownProp, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
  const onEscapeKeyDown = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onEscapeKeyDownProp);
  useEffect$1(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape")
        onEscapeKeyDown(event);
    };
    ownerDocument.addEventListener("keydown", handleKeyDown);
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown);
  }, [
    onEscapeKeyDown,
    ownerDocument
  ]);
}
const $5cb92bef7577960e$var$CONTEXT_UPDATE = "dismissableLayer.update";
const $5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
const $5cb92bef7577960e$var$FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
let $5cb92bef7577960e$var$originalBodyPointerEvents;
const $5cb92bef7577960e$var$DismissableLayerContext = /* @__PURE__ */ createContext$1({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
const $5cb92bef7577960e$export$177fb62ff3ec1f22 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  var _node$ownerDocument;
  const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
  const context = useContext$1($5cb92bef7577960e$var$DismissableLayerContext);
  const [node1, setNode] = useState$1(null);
  const ownerDocument = (_node$ownerDocument = node1 === null || node1 === void 0 ? void 0 : node1.ownerDocument) !== null && _node$ownerDocument !== void 0 ? _node$ownerDocument : globalThis === null || globalThis === void 0 ? void 0 : globalThis.document;
  const [, force] = useState$1({});
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setNode(node)
  );
  const layers = Array.from(context.layers);
  const [highestLayerWithOutsidePointerEventsDisabled] = [
    ...context.layersWithOutsidePointerEventsDisabled
  ].slice(-1);
  const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
  const index2 = node1 ? layers.indexOf(node1) : -1;
  const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
  const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
  const pointerDownOutside = $5cb92bef7577960e$var$usePointerDownOutside((event) => {
    const target = event.target;
    const isPointerDownOnBranch = [
      ...context.branches
    ].some(
      (branch) => branch.contains(target)
    );
    if (!isPointerEventsEnabled || isPointerDownOnBranch)
      return;
    onPointerDownOutside === null || onPointerDownOutside === void 0 || onPointerDownOutside(event);
    onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
    if (!event.defaultPrevented)
      onDismiss === null || onDismiss === void 0 || onDismiss();
  }, ownerDocument);
  const focusOutside = $5cb92bef7577960e$var$useFocusOutside((event) => {
    const target = event.target;
    const isFocusInBranch = [
      ...context.branches
    ].some(
      (branch) => branch.contains(target)
    );
    if (isFocusInBranch)
      return;
    onFocusOutside === null || onFocusOutside === void 0 || onFocusOutside(event);
    onInteractOutside === null || onInteractOutside === void 0 || onInteractOutside(event);
    if (!event.defaultPrevented)
      onDismiss === null || onDismiss === void 0 || onDismiss();
  }, ownerDocument);
  $addc16e1bbe58fd0$export$3a72a57244d6e765((event) => {
    const isHighestLayer = index2 === context.layers.size - 1;
    if (!isHighestLayer)
      return;
    onEscapeKeyDown === null || onEscapeKeyDown === void 0 || onEscapeKeyDown(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }, ownerDocument);
  useEffect$1(() => {
    if (!node1)
      return;
    if (disableOutsidePointerEvents) {
      if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
        $5cb92bef7577960e$var$originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
        ownerDocument.body.style.pointerEvents = "none";
      }
      context.layersWithOutsidePointerEventsDisabled.add(node1);
    }
    context.layers.add(node1);
    $5cb92bef7577960e$var$dispatchUpdate();
    return () => {
      if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1)
        ownerDocument.body.style.pointerEvents = $5cb92bef7577960e$var$originalBodyPointerEvents;
    };
  }, [
    node1,
    ownerDocument,
    disableOutsidePointerEvents,
    context
  ]);
  useEffect$1(() => {
    return () => {
      if (!node1)
        return;
      context.layers.delete(node1);
      context.layersWithOutsidePointerEventsDisabled.delete(node1);
      $5cb92bef7577960e$var$dispatchUpdate();
    };
  }, [
    node1,
    context
  ]);
  useEffect$1(() => {
    const handleUpdate = () => force({});
    document.addEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate);
    return () => document.removeEventListener($5cb92bef7577960e$var$CONTEXT_UPDATE, handleUpdate);
  }, []);
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({}, layerProps, {
    ref: composedRefs,
    style: {
      pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
      ...props.style
    },
    onFocusCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onFocusCapture, focusOutside.onFocusCapture),
    onBlurCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onBlurCapture, focusOutside.onBlurCapture),
    onPointerDownCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
  }));
});
function $5cb92bef7577960e$var$usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
  const handlePointerDownOutside = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onPointerDownOutside);
  const isPointerInsideReactTreeRef = useRef$1(false);
  const handleClickRef = useRef$1(() => {
  });
  useEffect$1(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent = function() {
          $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, {
            discrete: true
          });
        };
        const eventDetail = {
          originalEvent: event
        };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent;
          ownerDocument.addEventListener("click", handleClickRef.current, {
            once: true
          });
        } else
          handleAndDispatchPointerDownOutsideEvent();
      } else
        ownerDocument.removeEventListener("click", handleClickRef.current);
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [
    ownerDocument,
    handlePointerDownOutside
  ]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function $5cb92bef7577960e$var$useFocusOutside(onFocusOutside, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {
  const handleFocusOutside = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onFocusOutside);
  const isFocusInsideReactTreeRef = useRef$1(false);
  useEffect$1(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = {
          originalEvent: event
        };
        $5cb92bef7577960e$var$handleAndDispatchCustomEvent($5cb92bef7577960e$var$FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [
    ownerDocument,
    handleFocusOutside
  ]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function $5cb92bef7577960e$var$dispatchUpdate() {
  const event = new CustomEvent($5cb92bef7577960e$var$CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function $5cb92bef7577960e$var$handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler)
    target.addEventListener(name, handler, {
      once: true
    });
  if (discrete)
    $8927f6f2acc4f386$export$6d1a0317bde7de7f(target, event);
  else
    target.dispatchEvent(event);
}
const sides = ["top", "right", "bottom", "left"];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v2) => ({
  x: v2,
  y: v2
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp$1(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const arrow$3 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp$1(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$2 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp$1(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp$1(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
const limitShift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset2, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = ["top", "left"].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
const size$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer$1(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer$1(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x = ($2 ? round(rect.width) : rect.width) / width;
  let y = ($2 ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
const topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(element) {
  return topLayerSelectors.some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset$1 = offset$2;
const shift$1 = shift$2;
const flip$1 = flip$2;
const size$1 = size$2;
const hide$1 = hide$2;
const arrow$2 = arrow$3;
const limitShift$1 = limitShift$2;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var index = typeof document !== "undefined" ? useLayoutEffect$1 : useEffect$1;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length)
        return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React.useState(null);
  const [_floating, _setFloating] = React.useState(null);
  const setReference = React.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React.useRef(null);
  const floatingRef = React.useRef(null);
  const dataRef = React.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const update = React.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        isPositioned: true
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl)
      referenceRef.current = referenceEl;
    if (floatingEl)
      floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
const arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow$2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow$2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
const offset = (options, deps) => ({
  ...offset$1(options),
  options: [options, deps]
});
const shift = (options, deps) => ({
  ...shift$1(options),
  options: [options, deps]
});
const limitShift = (options, deps) => ({
  ...limitShift$1(options),
  options: [options, deps]
});
const flip = (options, deps) => ({
  ...flip$1(options),
  options: [options, deps]
});
const size = (options, deps) => ({
  ...size$1(options),
  options: [options, deps]
});
const hide = (options, deps) => ({
  ...hide$1(options),
  options: [options, deps]
});
const arrow = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
const $7e8f5cd07187803e$export$21b07c8f274aebd5 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.svg, _extends({}, arrowProps, {
    ref: forwardedRef,
    width,
    height,
    viewBox: "0 0 30 10",
    preserveAspectRatio: "none"
  }), props.asChild ? children : /* @__PURE__ */ createElement$1("polygon", {
    points: "0,0 30,0 15,10"
  }));
});
const $7e8f5cd07187803e$export$be92b6f5f03c0fe9 = $7e8f5cd07187803e$export$21b07c8f274aebd5;
function $db6c3485150b8e66$export$1ab7ae714698c4b8(element) {
  const [size2, setSize] = useState$1(void 0);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (element) {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight
      });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries))
          return;
        if (!entries.length)
          return;
        const entry2 = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry2) {
          const borderSizeEntry = entry2["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({
          width,
          height
        });
      });
      resizeObserver.observe(element, {
        box: "border-box"
      });
      return () => resizeObserver.unobserve(element);
    } else
      setSize(void 0);
  }, [
    element
  ]);
  return size2;
}
const $cf1ac5d9fe0e8206$var$POPPER_NAME = "Popper";
const [$cf1ac5d9fe0e8206$var$createPopperContext, $cf1ac5d9fe0e8206$export$722aac194ae923] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($cf1ac5d9fe0e8206$var$POPPER_NAME);
const [$cf1ac5d9fe0e8206$var$PopperProvider, $cf1ac5d9fe0e8206$var$usePopperContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$POPPER_NAME);
const $cf1ac5d9fe0e8206$var$ANCHOR_NAME = "PopperAnchor";
const $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopePopper, virtualRef, ...anchorProps } = props;
  const context = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$ANCHOR_NAME, __scopePopper);
  const ref = useRef$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  useEffect$1(() => {
    context.onAnchorChange((virtualRef === null || virtualRef === void 0 ? void 0 : virtualRef.current) || ref.current);
  });
  return virtualRef ? null : /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({}, anchorProps, {
    ref: composedRefs
  }));
});
const $cf1ac5d9fe0e8206$var$CONTENT_NAME = "PopperContent";
const [$cf1ac5d9fe0e8206$var$PopperContentProvider, $cf1ac5d9fe0e8206$var$useContentContext] = $cf1ac5d9fe0e8206$var$createPopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME);
const $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  var _arrowSize$width, _arrowSize$height, _middlewareData$arrow, _middlewareData$arrow2, _middlewareData$arrow3, _middlewareData$trans, _middlewareData$trans2, _middlewareData$hide;
  const { __scopePopper, side = "bottom", sideOffset = 0, align = "center", alignOffset = 0, arrowPadding = 0, avoidCollisions = true, collisionBoundary = [], collisionPadding: collisionPaddingProp = 0, sticky = "partial", hideWhenDetached = false, updatePositionStrategy = "optimized", onPlaced, ...contentProps } = props;
  const context = $cf1ac5d9fe0e8206$var$usePopperContext($cf1ac5d9fe0e8206$var$CONTENT_NAME, __scopePopper);
  const [content, setContent] = useState$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setContent(node)
  );
  const [arrow$12, setArrow] = useState$1(null);
  const arrowSize = $db6c3485150b8e66$export$1ab7ae714698c4b8(arrow$12);
  const arrowWidth = (_arrowSize$width = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.width) !== null && _arrowSize$width !== void 0 ? _arrowSize$width : 0;
  const arrowHeight = (_arrowSize$height = arrowSize === null || arrowSize === void 0 ? void 0 : arrowSize.height) !== null && _arrowSize$height !== void 0 ? _arrowSize$height : 0;
  const desiredPlacement = side + (align !== "center" ? "-" + align : "");
  const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...collisionPaddingProp
  };
  const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [
    collisionBoundary
  ];
  const hasExplicitBoundaries = boundary.length > 0;
  const detectOverflowOptions = {
    padding: collisionPadding,
    boundary: boundary.filter($cf1ac5d9fe0e8206$var$isNotNull),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: hasExplicitBoundaries
  };
  const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
    // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
    strategy: "fixed",
    placement: desiredPlacement,
    whileElementsMounted: (...args) => {
      const cleanup = autoUpdate(...args, {
        animationFrame: updatePositionStrategy === "always"
      });
      return cleanup;
    },
    elements: {
      reference: context.anchor
    },
    middleware: [
      offset({
        mainAxis: sideOffset + arrowHeight,
        alignmentAxis: alignOffset
      }),
      avoidCollisions && shift({
        mainAxis: true,
        crossAxis: false,
        limiter: sticky === "partial" ? limitShift() : void 0,
        ...detectOverflowOptions
      }),
      avoidCollisions && flip({
        ...detectOverflowOptions
      }),
      size({
        ...detectOverflowOptions,
        apply: ({ elements, rects, availableWidth, availableHeight }) => {
          const { width: anchorWidth, height: anchorHeight } = rects.reference;
          const contentStyle = elements.floating.style;
          contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
          contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
          contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
          contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
        }
      }),
      arrow$12 && arrow({
        element: arrow$12,
        padding: arrowPadding
      }),
      $cf1ac5d9fe0e8206$var$transformOrigin({
        arrowWidth,
        arrowHeight
      }),
      hideWhenDetached && hide({
        strategy: "referenceHidden",
        ...detectOverflowOptions
      })
    ]
  });
  const [placedSide, placedAlign] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement);
  const handlePlaced = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onPlaced);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (isPositioned)
      handlePlaced === null || handlePlaced === void 0 || handlePlaced();
  }, [
    isPositioned,
    handlePlaced
  ]);
  const arrowX = (_middlewareData$arrow = middlewareData.arrow) === null || _middlewareData$arrow === void 0 ? void 0 : _middlewareData$arrow.x;
  const arrowY = (_middlewareData$arrow2 = middlewareData.arrow) === null || _middlewareData$arrow2 === void 0 ? void 0 : _middlewareData$arrow2.y;
  const cannotCenterArrow = ((_middlewareData$arrow3 = middlewareData.arrow) === null || _middlewareData$arrow3 === void 0 ? void 0 : _middlewareData$arrow3.centerOffset) !== 0;
  const [contentZIndex, setContentZIndex] = useState$1();
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (content)
      setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [
    content
  ]);
  return /* @__PURE__ */ createElement$1("div", {
    ref: refs.setFloating,
    "data-radix-popper-content-wrapper": "",
    style: {
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
      // keep off the page when measuring
      minWidth: "max-content",
      zIndex: contentZIndex,
      ["--radix-popper-transform-origin"]: [
        (_middlewareData$trans = middlewareData.transformOrigin) === null || _middlewareData$trans === void 0 ? void 0 : _middlewareData$trans.x,
        (_middlewareData$trans2 = middlewareData.transformOrigin) === null || _middlewareData$trans2 === void 0 ? void 0 : _middlewareData$trans2.y
      ].join(" ")
    },
    dir: props.dir
  }, /* @__PURE__ */ createElement$1($cf1ac5d9fe0e8206$var$PopperContentProvider, {
    scope: __scopePopper,
    placedSide,
    onArrowChange: setArrow,
    arrowX,
    arrowY,
    shouldHideArrow: cannotCenterArrow
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    "data-side": placedSide,
    "data-align": placedAlign
  }, contentProps, {
    ref: composedRefs,
    style: {
      ...contentProps.style,
      // if the PopperContent hasn't been placed yet (not all measurements done)
      // we prevent animations so that users's animation don't kick in too early referring wrong sides
      animation: !isPositioned ? "none" : void 0,
      // hide the content if using the hide middleware and should be hidden
      opacity: (_middlewareData$hide = middlewareData.hide) !== null && _middlewareData$hide !== void 0 && _middlewareData$hide.referenceHidden ? 0 : void 0
    }
  }))));
});
const $cf1ac5d9fe0e8206$var$ARROW_NAME = "PopperArrow";
const $cf1ac5d9fe0e8206$var$OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
const $cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0 = /* @__PURE__ */ forwardRef$1(function $cf1ac5d9fe0e8206$export$79d62cd4e10a3fd02(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = $cf1ac5d9fe0e8206$var$useContentContext($cf1ac5d9fe0e8206$var$ARROW_NAME, __scopePopper);
  const baseSide = $cf1ac5d9fe0e8206$var$OPPOSITE_SIDE[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ createElement$1("span", {
      ref: contentContext.onArrowChange,
      style: {
        position: "absolute",
        left: contentContext.arrowX,
        top: contentContext.arrowY,
        [baseSide]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0"
        }[contentContext.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: `rotate(180deg)`,
          left: "translateY(50%) rotate(-90deg) translateX(50%)"
        }[contentContext.placedSide],
        visibility: contentContext.shouldHideArrow ? "hidden" : void 0
      }
    }, /* @__PURE__ */ createElement$1($7e8f5cd07187803e$export$be92b6f5f03c0fe9, _extends$1({}, arrowProps, {
      ref: forwardedRef,
      style: {
        ...arrowProps.style,
        // ensures the element can be measured correctly (mostly for if SVG)
        display: "block"
      }
    })))
  );
});
/* @__PURE__ */ Object.assign($cf1ac5d9fe0e8206$export$79d62cd4e10a3fd0, {
  displayName: $cf1ac5d9fe0e8206$var$ARROW_NAME
});
function $cf1ac5d9fe0e8206$var$isNotNull(value) {
  return value !== null;
}
const $cf1ac5d9fe0e8206$var$transformOrigin = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    var _middlewareData$arrow4, _middlewareData$arrow5, _middlewareData$arrow6, _middlewareData$arrow7, _middlewareData$arrow8;
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = ((_middlewareData$arrow4 = middlewareData.arrow) === null || _middlewareData$arrow4 === void 0 ? void 0 : _middlewareData$arrow4.centerOffset) !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement);
    const noArrowAlign = {
      start: "0%",
      center: "50%",
      end: "100%"
    }[placedAlign];
    const arrowXCenter = ((_middlewareData$arrow5 = (_middlewareData$arrow6 = middlewareData.arrow) === null || _middlewareData$arrow6 === void 0 ? void 0 : _middlewareData$arrow6.x) !== null && _middlewareData$arrow5 !== void 0 ? _middlewareData$arrow5 : 0) + arrowWidth / 2;
    const arrowYCenter = ((_middlewareData$arrow7 = (_middlewareData$arrow8 = middlewareData.arrow) === null || _middlewareData$arrow8 === void 0 ? void 0 : _middlewareData$arrow8.y) !== null && _middlewareData$arrow7 !== void 0 ? _middlewareData$arrow7 : 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return {
      data: {
        x,
        y
      }
    };
  }
});
function $cf1ac5d9fe0e8206$var$getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [
    side,
    align
  ];
}
const $cf1ac5d9fe0e8206$export$b688253958b8dfe7 = $cf1ac5d9fe0e8206$export$ecd4e1ccab6ed6d;
const $cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2 = $cf1ac5d9fe0e8206$export$bc4ae5855d3c4fc;
const $f1701beae083dbae$export$602eac185826482c = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  var _globalThis$document;
  const { container = globalThis === null || globalThis === void 0 ? void 0 : (_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.body, ...portalProps } = props;
  return container ? /* @__PURE__ */ ReactDOM__default.createPortal(/* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({}, portalProps, {
    ref: forwardedRef
  })), container) : null;
});
const $ea1ef594cf570d83$export$439d29a4e110a164 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends$1({}, props, {
    ref: forwardedRef,
    style: {
      // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
      position: "absolute",
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      wordWrap: "normal",
      ...props.style
    }
  }));
});
const $ea1ef594cf570d83$export$be92b6f5f03c0fe9 = $ea1ef594cf570d83$export$439d29a4e110a164;
const [$a093c7e1ec25a057$var$createTooltipContext, $a093c7e1ec25a057$export$1c540a2224f0d865] = $c512c27ab02ef895$export$50c7b4e9d9f19c1("Tooltip", [
  $cf1ac5d9fe0e8206$export$722aac194ae923
]);
const $a093c7e1ec25a057$var$usePopperScope = $cf1ac5d9fe0e8206$export$722aac194ae923();
const $a093c7e1ec25a057$var$PROVIDER_NAME = "TooltipProvider";
const $a093c7e1ec25a057$var$TOOLTIP_OPEN = "tooltip.open";
const [$a093c7e1ec25a057$var$TooltipProviderContextProvider, $a093c7e1ec25a057$var$useTooltipProviderContext] = $a093c7e1ec25a057$var$createTooltipContext($a093c7e1ec25a057$var$PROVIDER_NAME);
const $a093c7e1ec25a057$var$TOOLTIP_NAME = "Tooltip";
const [$a093c7e1ec25a057$var$TooltipContextProvider, $a093c7e1ec25a057$var$useTooltipContext] = $a093c7e1ec25a057$var$createTooltipContext($a093c7e1ec25a057$var$TOOLTIP_NAME);
const $a093c7e1ec25a057$var$PORTAL_NAME = "TooltipPortal";
const [$a093c7e1ec25a057$var$PortalProvider, $a093c7e1ec25a057$var$usePortalContext] = $a093c7e1ec25a057$var$createTooltipContext($a093c7e1ec25a057$var$PORTAL_NAME, {
  forceMount: void 0
});
const $a093c7e1ec25a057$var$CONTENT_NAME = "TooltipContent";
const $a093c7e1ec25a057$export$e9003e2be37ec060 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const portalContext = $a093c7e1ec25a057$var$usePortalContext($a093c7e1ec25a057$var$CONTENT_NAME, props.__scopeTooltip);
  const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
  const context = $a093c7e1ec25a057$var$useTooltipContext($a093c7e1ec25a057$var$CONTENT_NAME, props.__scopeTooltip);
  return /* @__PURE__ */ createElement$1($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
    present: forceMount || context.open
  }, context.disableHoverableContent ? /* @__PURE__ */ createElement$1($a093c7e1ec25a057$var$TooltipContentImpl, _extends$1({
    side
  }, contentProps, {
    ref: forwardedRef
  })) : /* @__PURE__ */ createElement$1($a093c7e1ec25a057$var$TooltipContentHoverable, _extends$1({
    side
  }, contentProps, {
    ref: forwardedRef
  })));
});
const $a093c7e1ec25a057$var$TooltipContentHoverable = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const context = $a093c7e1ec25a057$var$useTooltipContext($a093c7e1ec25a057$var$CONTENT_NAME, props.__scopeTooltip);
  const providerContext = $a093c7e1ec25a057$var$useTooltipProviderContext($a093c7e1ec25a057$var$CONTENT_NAME, props.__scopeTooltip);
  const ref = useRef$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const [pointerGraceArea, setPointerGraceArea] = useState$1(null);
  const { trigger, onClose } = context;
  const content = ref.current;
  const { onPointerInTransitChange } = providerContext;
  const handleRemoveGraceArea = useCallback$1(() => {
    setPointerGraceArea(null);
    onPointerInTransitChange(false);
  }, [
    onPointerInTransitChange
  ]);
  const handleCreateGraceArea = useCallback$1((event, hoverTarget) => {
    const currentTarget = event.currentTarget;
    const exitPoint = {
      x: event.clientX,
      y: event.clientY
    };
    const exitSide = $a093c7e1ec25a057$var$getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
    const paddedExitPoints = $a093c7e1ec25a057$var$getPaddedExitPoints(exitPoint, exitSide);
    const hoverTargetPoints = $a093c7e1ec25a057$var$getPointsFromRect(hoverTarget.getBoundingClientRect());
    const graceArea = $a093c7e1ec25a057$var$getHull([
      ...paddedExitPoints,
      ...hoverTargetPoints
    ]);
    setPointerGraceArea(graceArea);
    onPointerInTransitChange(true);
  }, [
    onPointerInTransitChange
  ]);
  useEffect$1(() => {
    return () => handleRemoveGraceArea();
  }, [
    handleRemoveGraceArea
  ]);
  useEffect$1(() => {
    if (trigger && content) {
      const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
      const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
      trigger.addEventListener("pointerleave", handleTriggerLeave);
      content.addEventListener("pointerleave", handleContentLeave);
      return () => {
        trigger.removeEventListener("pointerleave", handleTriggerLeave);
        content.removeEventListener("pointerleave", handleContentLeave);
      };
    }
  }, [
    trigger,
    content,
    handleCreateGraceArea,
    handleRemoveGraceArea
  ]);
  useEffect$1(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = (event) => {
        const target = event.target;
        const pointerPosition = {
          x: event.clientX,
          y: event.clientY
        };
        const hasEnteredTarget = (trigger === null || trigger === void 0 ? void 0 : trigger.contains(target)) || (content === null || content === void 0 ? void 0 : content.contains(target));
        const isPointerOutsideGraceArea = !$a093c7e1ec25a057$var$isPointInPolygon(pointerPosition, pointerGraceArea);
        if (hasEnteredTarget)
          handleRemoveGraceArea();
        else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea();
          onClose();
        }
      };
      document.addEventListener("pointermove", handleTrackPointerGrace);
      return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
    }
  }, [
    trigger,
    content,
    pointerGraceArea,
    onClose,
    handleRemoveGraceArea
  ]);
  return /* @__PURE__ */ createElement$1($a093c7e1ec25a057$var$TooltipContentImpl, _extends$1({}, props, {
    ref: composedRefs
  }));
});
const [$a093c7e1ec25a057$var$VisuallyHiddenContentContextProvider, $a093c7e1ec25a057$var$useVisuallyHiddenContentContext] = $a093c7e1ec25a057$var$createTooltipContext($a093c7e1ec25a057$var$TOOLTIP_NAME, {
  isInside: false
});
const $a093c7e1ec25a057$var$TooltipContentImpl = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeTooltip, children, "aria-label": ariaLabel, onEscapeKeyDown, onPointerDownOutside, ...contentProps } = props;
  const context = $a093c7e1ec25a057$var$useTooltipContext($a093c7e1ec25a057$var$CONTENT_NAME, __scopeTooltip);
  const popperScope = $a093c7e1ec25a057$var$usePopperScope(__scopeTooltip);
  const { onClose } = context;
  useEffect$1(() => {
    document.addEventListener($a093c7e1ec25a057$var$TOOLTIP_OPEN, onClose);
    return () => document.removeEventListener($a093c7e1ec25a057$var$TOOLTIP_OPEN, onClose);
  }, [
    onClose
  ]);
  useEffect$1(() => {
    if (context.trigger) {
      const handleScroll2 = (event) => {
        const target = event.target;
        if (target !== null && target !== void 0 && target.contains(context.trigger))
          onClose();
      };
      window.addEventListener("scroll", handleScroll2, {
        capture: true
      });
      return () => window.removeEventListener("scroll", handleScroll2, {
        capture: true
      });
    }
  }, [
    context.trigger,
    onClose
  ]);
  return /* @__PURE__ */ createElement$1($5cb92bef7577960e$export$177fb62ff3ec1f22, {
    asChild: true,
    disableOutsidePointerEvents: false,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside: (event) => event.preventDefault(),
    onDismiss: onClose
  }, /* @__PURE__ */ createElement$1($cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2, _extends$1({
    "data-state": context.stateAttribute
  }, popperScope, contentProps, {
    ref: forwardedRef,
    style: {
      ...contentProps.style,
      "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
      "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
      "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
    }
  }), /* @__PURE__ */ createElement$1(Slottable, null, children), /* @__PURE__ */ createElement$1($a093c7e1ec25a057$var$VisuallyHiddenContentContextProvider, {
    scope: __scopeTooltip,
    isInside: true
  }, /* @__PURE__ */ createElement$1($ea1ef594cf570d83$export$be92b6f5f03c0fe9, {
    id: context.contentId,
    role: "tooltip"
  }, ariaLabel || children))));
});
function $a093c7e1ec25a057$var$getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function $a093c7e1ec25a057$var$getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = [];
  switch (exitSide) {
    case "top":
      paddedExitPoints.push({
        x: exitPoint.x - padding,
        y: exitPoint.y + padding
      }, {
        x: exitPoint.x + padding,
        y: exitPoint.y + padding
      });
      break;
    case "bottom":
      paddedExitPoints.push({
        x: exitPoint.x - padding,
        y: exitPoint.y - padding
      }, {
        x: exitPoint.x + padding,
        y: exitPoint.y - padding
      });
      break;
    case "left":
      paddedExitPoints.push({
        x: exitPoint.x + padding,
        y: exitPoint.y - padding
      }, {
        x: exitPoint.x + padding,
        y: exitPoint.y + padding
      });
      break;
    case "right":
      paddedExitPoints.push({
        x: exitPoint.x - padding,
        y: exitPoint.y - padding
      }, {
        x: exitPoint.x - padding,
        y: exitPoint.y + padding
      });
      break;
  }
  return paddedExitPoints;
}
function $a093c7e1ec25a057$var$getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    {
      x: left,
      y: top
    },
    {
      x: right,
      y: top
    },
    {
      x: right,
      y: bottom
    },
    {
      x: left,
      y: bottom
    }
  ];
}
function $a093c7e1ec25a057$var$isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function $a093c7e1ec25a057$var$getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x)
      return -1;
    else if (a.x > b.x)
      return 1;
    else if (a.y < b.y)
      return -1;
    else if (a.y > b.y)
      return 1;
    else
      return 0;
  });
  return $a093c7e1ec25a057$var$getHullPresorted(newPoints);
}
function $a093c7e1ec25a057$var$getHullPresorted(points) {
  if (points.length <= 1)
    return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p2 = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p2.y - r.y) >= (q.y - r.y) * (p2.x - r.x))
        upperHull.pop();
      else
        break;
    }
    upperHull.push(p2);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i1 = points.length - 1; i1 >= 0; i1--) {
    const p2 = points[i1];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p2.y - r.y) >= (q.y - r.y) * (p2.x - r.x))
        lowerHull.pop();
      else
        break;
    }
    lowerHull.push(p2);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y)
    return upperHull;
  else
    return upperHull.concat(lowerHull);
}
const $a093c7e1ec25a057$export$7c6e2c02157bb7d2 = $a093c7e1ec25a057$export$e9003e2be37ec060;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  $a093c7e1ec25a057$export$7c6e2c02157bb7d2,
  {
    ref,
    sideOffset,
    className: cn$2(
      "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-border/30 z-50 overflow-hidden rounded-md border px-2 py-1 text-sm font-medium shadow-md",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = $a093c7e1ec25a057$export$7c6e2c02157bb7d2.displayName;
var U = 1, Y$1 = 0.9, H = 0.8, J = 0.17, p = 0.1, u = 0.999, $ = 0.9999;
var k$1 = 0.99, m = /[\\\/_+.#"@\[\(\{&]/, B = /[\\\/_+.#"@\[\(\{&]/g, K = /[\s-]/, X$1 = /[\s-]/g;
function G$1(_, C, h, P, A, f, O) {
  if (f === C.length)
    return A === _.length ? U : k$1;
  var T2 = `${A},${f}`;
  if (O[T2] !== void 0)
    return O[T2];
  for (var L = P.charAt(f), c = h.indexOf(L, A), S = 0, E, N2, R, M2; c >= 0; )
    E = G$1(_, C, h, P, c + 1, f + 1, O), E > S && (c === A ? E *= U : m.test(_.charAt(c - 1)) ? (E *= H, R = _.slice(A, c - 1).match(B), R && A > 0 && (E *= Math.pow(u, R.length))) : K.test(_.charAt(c - 1)) ? (E *= Y$1, M2 = _.slice(A, c - 1).match(X$1), M2 && A > 0 && (E *= Math.pow(u, M2.length))) : (E *= J, A > 0 && (E *= Math.pow(u, c - A))), _.charAt(c) !== C.charAt(f) && (E *= $)), (E < p && h.charAt(c - 1) === P.charAt(f + 1) || P.charAt(f + 1) === P.charAt(f) && h.charAt(c - 1) !== P.charAt(f)) && (N2 = G$1(_, C, h, P, c + 1, f + 2, O), N2 * p > E && (E = N2 * p)), E > S && (S = E), c = h.indexOf(L, c + 1);
  return O[T2] = S, S;
}
function D$1(_) {
  return _.toLowerCase().replace(X$1, " ");
}
function W(_, C, h) {
  return _ = h && h.length > 0 ? `${_ + " " + h.join(" ")}` : _, G$1(_, C, D$1(_), D$1(C), 0, 0, {});
}
var V = '[cmdk-group=""]', X = '[cmdk-group-items=""]', ge = '[cmdk-group-heading=""]', Y = '[cmdk-item=""]', le = `${Y}:not([aria-disabled="true"])`, Q = "cmdk-item-select", M = "data-value", Re = (r, o, n) => W(r, o, n), ue = React.createContext(void 0), G = () => React.useContext(ue), de = React.createContext(void 0), Z = () => React.useContext(de), fe = React.createContext(void 0), me = React.forwardRef((r, o) => {
  let n = k(() => {
    var e, s;
    return { search: "", value: (s = (e = r.value) != null ? e : r.defaultValue) != null ? s : "", filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), u2 = k(() => /* @__PURE__ */ new Set()), c = k(() => /* @__PURE__ */ new Map()), d = k(() => /* @__PURE__ */ new Map()), f = k(() => /* @__PURE__ */ new Set()), p2 = pe(r), { label: v2, children: b, value: l, onValueChange: y, filter: S, shouldFilter: C, loop: L, disablePointerSelection: ee = false, vimBindings: j = true, ...H2 } = r, te = React.useId(), $2 = React.useId(), K2 = React.useId(), x = React.useRef(null), g = Me();
  T(() => {
    if (l !== void 0) {
      let e = l.trim();
      n.current.value = e, h.emit();
    }
  }, [l]), T(() => {
    g(6, re);
  }, []);
  let h = React.useMemo(() => ({ subscribe: (e) => (f.current.add(e), () => f.current.delete(e)), snapshot: () => n.current, setState: (e, s, i) => {
    var a, m2, R;
    if (!Object.is(n.current[e], s)) {
      if (n.current[e] = s, e === "search")
        z(), q(), g(1, U2);
      else if (e === "value" && (i || g(5, re), ((a = p2.current) == null ? void 0 : a.value) !== void 0)) {
        let E = s != null ? s : "";
        (R = (m2 = p2.current).onValueChange) == null || R.call(m2, E);
        return;
      }
      h.emit();
    }
  }, emit: () => {
    f.current.forEach((e) => e());
  } }), []), B2 = React.useMemo(() => ({ value: (e, s, i) => {
    var a;
    s !== ((a = d.current.get(e)) == null ? void 0 : a.value) && (d.current.set(e, { value: s, keywords: i }), n.current.filtered.items.set(e, ne(s, i)), g(2, () => {
      q(), h.emit();
    }));
  }, item: (e, s) => (u2.current.add(e), s && (c.current.has(s) ? c.current.get(s).add(e) : c.current.set(s, /* @__PURE__ */ new Set([e]))), g(3, () => {
    z(), q(), n.current.value || U2(), h.emit();
  }), () => {
    d.current.delete(e), u2.current.delete(e), n.current.filtered.items.delete(e);
    let i = O();
    g(4, () => {
      z(), (i == null ? void 0 : i.getAttribute("id")) === e && U2(), h.emit();
    });
  }), group: (e) => (c.current.has(e) || c.current.set(e, /* @__PURE__ */ new Set()), () => {
    d.current.delete(e), c.current.delete(e);
  }), filter: () => p2.current.shouldFilter, label: v2 || r["aria-label"], disablePointerSelection: ee, listId: te, inputId: K2, labelId: $2, listInnerRef: x }), []);
  function ne(e, s) {
    var a, m2;
    let i = (m2 = (a = p2.current) == null ? void 0 : a.filter) != null ? m2 : Re;
    return e ? i(e, n.current.search, s) : 0;
  }
  function q() {
    if (!n.current.search || p2.current.shouldFilter === false)
      return;
    let e = n.current.filtered.items, s = [];
    n.current.filtered.groups.forEach((a) => {
      let m2 = c.current.get(a), R = 0;
      m2.forEach((E) => {
        let P = e.get(E);
        R = Math.max(P, R);
      }), s.push([a, R]);
    });
    let i = x.current;
    A().sort((a, m2) => {
      var P, _;
      let R = a.getAttribute("id"), E = m2.getAttribute("id");
      return ((P = e.get(E)) != null ? P : 0) - ((_ = e.get(R)) != null ? _ : 0);
    }).forEach((a) => {
      let m2 = a.closest(X);
      m2 ? m2.appendChild(a.parentElement === m2 ? a : a.closest(`${X} > *`)) : i.appendChild(a.parentElement === i ? a : a.closest(`${X} > *`));
    }), s.sort((a, m2) => m2[1] - a[1]).forEach((a) => {
      let m2 = x.current.querySelector(`${V}[${M}="${encodeURIComponent(a[0])}"]`);
      m2 == null || m2.parentElement.appendChild(m2);
    });
  }
  function U2() {
    let e = A().find((i) => i.getAttribute("aria-disabled") !== "true"), s = e == null ? void 0 : e.getAttribute(M);
    h.setState("value", s || void 0);
  }
  function z() {
    var s, i, a, m2;
    if (!n.current.search || p2.current.shouldFilter === false) {
      n.current.filtered.count = u2.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let e = 0;
    for (let R of u2.current) {
      let E = (i = (s = d.current.get(R)) == null ? void 0 : s.value) != null ? i : "", P = (m2 = (a = d.current.get(R)) == null ? void 0 : a.keywords) != null ? m2 : [], _ = ne(E, P);
      n.current.filtered.items.set(R, _), _ > 0 && e++;
    }
    for (let [R, E] of c.current)
      for (let P of E)
        if (n.current.filtered.items.get(P) > 0) {
          n.current.filtered.groups.add(R);
          break;
        }
    n.current.filtered.count = e;
  }
  function re() {
    var s, i, a;
    let e = O();
    e && (((s = e.parentElement) == null ? void 0 : s.firstChild) === e && ((a = (i = e.closest(V)) == null ? void 0 : i.querySelector(ge)) == null || a.scrollIntoView({ block: "nearest" })), e.scrollIntoView({ block: "nearest" }));
  }
  function O() {
    var e;
    return (e = x.current) == null ? void 0 : e.querySelector(`${Y}[aria-selected="true"]`);
  }
  function A() {
    var e;
    return Array.from((e = x.current) == null ? void 0 : e.querySelectorAll(le));
  }
  function W2(e) {
    let i = A()[e];
    i && h.setState("value", i.getAttribute(M));
  }
  function J2(e) {
    var R;
    let s = O(), i = A(), a = i.findIndex((E) => E === s), m2 = i[a + e];
    (R = p2.current) != null && R.loop && (m2 = a + e < 0 ? i[i.length - 1] : a + e === i.length ? i[0] : i[a + e]), m2 && h.setState("value", m2.getAttribute(M));
  }
  function oe(e) {
    let s = O(), i = s == null ? void 0 : s.closest(V), a;
    for (; i && !a; )
      i = e > 0 ? we(i, V) : Ie(i, V), a = i == null ? void 0 : i.querySelector(le);
    a ? h.setState("value", a.getAttribute(M)) : J2(e);
  }
  let ie = () => W2(A().length - 1), ae = (e) => {
    e.preventDefault(), e.metaKey ? ie() : e.altKey ? oe(1) : J2(1);
  }, se = (e) => {
    e.preventDefault(), e.metaKey ? W2(0) : e.altKey ? oe(-1) : J2(-1);
  };
  return React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, { ref: o, tabIndex: -1, ...H2, "cmdk-root": "", onKeyDown: (e) => {
    var s;
    if ((s = H2.onKeyDown) == null || s.call(H2, e), !e.defaultPrevented)
      switch (e.key) {
        case "n":
        case "j": {
          j && e.ctrlKey && ae(e);
          break;
        }
        case "ArrowDown": {
          ae(e);
          break;
        }
        case "p":
        case "k": {
          j && e.ctrlKey && se(e);
          break;
        }
        case "ArrowUp": {
          se(e);
          break;
        }
        case "Home": {
          e.preventDefault(), W2(0);
          break;
        }
        case "End": {
          e.preventDefault(), ie();
          break;
        }
        case "Enter":
          if (!e.nativeEvent.isComposing && e.keyCode !== 229) {
            e.preventDefault();
            let i = O();
            if (i) {
              let a = new Event(Q);
              i.dispatchEvent(a);
            }
          }
      }
  } }, React.createElement("label", { "cmdk-label": "", htmlFor: B2.inputId, id: B2.labelId, style: De }, v2), F(r, (e) => React.createElement(de.Provider, { value: h }, React.createElement(ue.Provider, { value: B2 }, e))));
}), be = React.forwardRef((r, o) => {
  var K2, x;
  let n = React.useId(), u2 = React.useRef(null), c = React.useContext(fe), d = G(), f = pe(r), p2 = (x = (K2 = f.current) == null ? void 0 : K2.forceMount) != null ? x : c == null ? void 0 : c.forceMount;
  T(() => {
    if (!p2)
      return d.item(n, c == null ? void 0 : c.id);
  }, [p2]);
  let v2 = ve(n, u2, [r.value, r.children, u2], r.keywords), b = Z(), l = D((g) => g.value && g.value === v2.current), y = D((g) => p2 || d.filter() === false ? true : g.search ? g.filtered.items.get(n) > 0 : true);
  React.useEffect(() => {
    let g = u2.current;
    if (!(!g || r.disabled))
      return g.addEventListener(Q, S), () => g.removeEventListener(Q, S);
  }, [y, r.onSelect, r.disabled]);
  function S() {
    var g, h;
    C(), (h = (g = f.current).onSelect) == null || h.call(g, v2.current);
  }
  function C() {
    b.setState("value", v2.current, true);
  }
  if (!y)
    return null;
  let { disabled: L, value: ee, onSelect: j, forceMount: H2, keywords: te, ...$2 } = r;
  return React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, { ref: N([u2, o]), ...$2, id: n, "cmdk-item": "", role: "option", "aria-disabled": !!L, "aria-selected": !!l, "data-disabled": !!L, "data-selected": !!l, onPointerMove: L || d.disablePointerSelection ? void 0 : C, onClick: L ? void 0 : S }, r.children);
}), he = React.forwardRef((r, o) => {
  let { heading: n, children: u2, forceMount: c, ...d } = r, f = React.useId(), p2 = React.useRef(null), v2 = React.useRef(null), b = React.useId(), l = G(), y = D((C) => c || l.filter() === false ? true : C.search ? C.filtered.groups.has(f) : true);
  T(() => l.group(f), []), ve(f, p2, [r.value, r.heading, v2]);
  let S = React.useMemo(() => ({ id: f, forceMount: c }), [c]);
  return React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, { ref: N([p2, o]), ...d, "cmdk-group": "", role: "presentation", hidden: y ? void 0 : true }, n && React.createElement("div", { ref: v2, "cmdk-group-heading": "", "aria-hidden": true, id: b }, n), F(r, (C) => React.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? b : void 0 }, React.createElement(fe.Provider, { value: S }, C))));
}), ye = React.forwardRef((r, o) => {
  let { alwaysRender: n, ...u2 } = r, c = React.useRef(null), d = D((f) => !f.search);
  return !n && !d ? null : React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, { ref: N([c, o]), ...u2, "cmdk-separator": "", role: "separator" });
}), Ee = React.forwardRef((r, o) => {
  let { onValueChange: n, ...u2 } = r, c = r.value != null, d = Z(), f = D((l) => l.search), p2 = D((l) => l.value), v2 = G(), b = React.useMemo(() => {
    var y;
    let l = (y = v2.listInnerRef.current) == null ? void 0 : y.querySelector(`${Y}[${M}="${encodeURIComponent(p2)}"]`);
    return l == null ? void 0 : l.getAttribute("id");
  }, []);
  return React.useEffect(() => {
    r.value != null && d.setState("search", r.value);
  }, [r.value]), React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.input, { ref: o, ...u2, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: false, "aria-autocomplete": "list", role: "combobox", "aria-expanded": true, "aria-controls": v2.listId, "aria-labelledby": v2.labelId, "aria-activedescendant": b, id: v2.inputId, type: "text", value: c ? r.value : f, onChange: (l) => {
    c || d.setState("search", l.target.value), n == null || n(l.target.value);
  } });
}), Se = React.forwardRef((r, o) => {
  let { children: n, label: u2 = "Suggestions", ...c } = r, d = React.useRef(null), f = React.useRef(null), p2 = G();
  return React.useEffect(() => {
    if (f.current && d.current) {
      let v2 = f.current, b = d.current, l, y = new ResizeObserver(() => {
        l = requestAnimationFrame(() => {
          let S = v2.offsetHeight;
          b.style.setProperty("--cmdk-list-height", S.toFixed(1) + "px");
        });
      });
      return y.observe(v2), () => {
        cancelAnimationFrame(l), y.unobserve(v2);
      };
    }
  }, []), React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, { ref: N([d, o]), ...c, "cmdk-list": "", role: "listbox", "aria-label": u2, id: p2.listId }, F(r, (v2) => React.createElement("div", { ref: N([f, p2.listInnerRef]), "cmdk-list-sizer": "" }, v2)));
}), Ce = React.forwardRef((r, o) => {
  let { open: n, onOpenChange: u2, overlayClassName: c, contentClassName: d, container: f, ...p2 } = r;
  return React.createElement(DialogPrimitive.Root, { open: n, onOpenChange: u2 }, React.createElement(DialogPrimitive.Portal, { container: f }, React.createElement(DialogPrimitive.Overlay, { "cmdk-overlay": "", className: c }), React.createElement(DialogPrimitive.Content, { "aria-label": r.label, "cmdk-dialog": "", className: d }, React.createElement(me, { ref: o, ...p2 }))));
}), xe = React.forwardRef((r, o) => D((u2) => u2.filtered.count === 0) ? React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, { ref: o, ...r, "cmdk-empty": "", role: "presentation" }) : null), Pe = React.forwardRef((r, o) => {
  let { progress: n, children: u2, label: c = "Loading...", ...d } = r;
  return React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, { ref: o, ...d, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": c }, F(r, (f) => React.createElement("div", { "aria-hidden": true }, f)));
}), He = Object.assign(me, { List: Se, Item: be, Input: Ee, Group: he, Separator: ye, Dialog: Ce, Empty: xe, Loading: Pe });
function we(r, o) {
  let n = r.nextElementSibling;
  for (; n; ) {
    if (n.matches(o))
      return n;
    n = n.nextElementSibling;
  }
}
function Ie(r, o) {
  let n = r.previousElementSibling;
  for (; n; ) {
    if (n.matches(o))
      return n;
    n = n.previousElementSibling;
  }
}
function pe(r) {
  let o = React.useRef(r);
  return T(() => {
    o.current = r;
  }), o;
}
var T = typeof window == "undefined" ? React.useEffect : React.useLayoutEffect;
function k(r) {
  let o = React.useRef();
  return o.current === void 0 && (o.current = r()), o;
}
function N(r) {
  return (o) => {
    r.forEach((n) => {
      typeof n == "function" ? n(o) : n != null && (n.current = o);
    });
  };
}
function D(r) {
  let o = Z(), n = () => r(o.snapshot());
  return React.useSyncExternalStore(o.subscribe, n, n);
}
function ve(r, o, n, u2 = []) {
  let c = React.useRef(), d = G();
  return T(() => {
    var v2;
    let f = (() => {
      var b;
      for (let l of n) {
        if (typeof l == "string")
          return l.trim();
        if (typeof l == "object" && "current" in l)
          return l.current ? (b = l.current.textContent) == null ? void 0 : b.trim() : c.current;
      }
    })(), p2 = u2.map((b) => b.trim());
    d.value(r, f, p2), (v2 = o.current) == null || v2.setAttribute(M, f), c.current = f;
  }), c;
}
var Me = () => {
  let [r, o] = React.useState(), n = k(() => /* @__PURE__ */ new Map());
  return T(() => {
    n.current.forEach((u2) => u2()), n.current = /* @__PURE__ */ new Map();
  }, [r]), (u2, c) => {
    n.current.set(u2, c), o({});
  };
};
function Te(r) {
  let o = r.type;
  return typeof o == "function" ? o(r.props) : "render" in o ? o.render(r.props) : r;
}
function F({ asChild: r, children: o }, n) {
  return r && React.isValidElement(o) ? React.cloneElement(Te(o), { ref: o.ref }, n(o.props.children)) : n(o);
}
var De = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  He,
  {
    ref,
    className: cn$2(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground theme-border",
      className
    ),
    ...props
  }
));
Command.displayName = He.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: "flex items-center border-b border-border/30 px-3",
    "cmdk-input-wrapper": "",
    children: [
      /* @__PURE__ */ jsx(
        Icon,
        {
          name: IconName.magnifyingGlass,
          className: "mr-2 h-4 w-4 shrink-0 opacity-50"
        }
      ),
      /* @__PURE__ */ jsx(
        He.Input,
        {
          ref,
          className: cn$2(
            "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          ...props
        }
      )
    ]
  }
));
CommandInput.displayName = He.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  He.List,
  {
    ref,
    className: cn$2("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = He.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  He.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = He.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  He.Group,
  {
    ref,
    className: cn$2(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = He.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  He.Separator,
  {
    ref,
    className: cn$2("-mx-1 h-px bg-border/30", className),
    ...props
  }
));
CommandSeparator.displayName = He.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  He.Item,
  {
    ref,
    className: cn$2(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent/30 aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = He.Item.displayName;
const Dialog$2 = DialogPrimitive.Root;
const DialogPortal$1 = DialogPrimitive.Portal;
const DialogOverlay$1 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn$2(
      "fixed inset-0 z-50 bg-black/3 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay$1.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent$2 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal$1, { children: [
  /* @__PURE__ */ jsx(DialogOverlay$1, {}),
  /* @__PURE__ */ jsx(
    DialogPrimitive.Content,
    {
      ref,
      className: cn$2(
        "theme-border border-rounded fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-2 bg-background p-5 pb-10 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg  max-sm:w-full max-sm:h-full max-sm:overflow-y-auto max-sm:flex max-sm:flex-col",
        className
      ),
      ...props
    }
  )
] }));
DialogContent$2.displayName = DialogPrimitive.Content.displayName;
const DialogHeader$1 = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn$2(
      "flex flex-col space-y-1 text-center sm:text-left items-center pb-10",
      className
    ),
    ...props
  }
);
DialogHeader$1.displayName = "DialogHeader";
const DialogTitle$2 = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DialogPrimitive.Title,
  {
    ref,
    className: cn$2(
      "flex justify-between items-center w-full text-lg font-medium leading-none tracking-tight mb-1 max-sm:mb-6",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "text-primary/50 hover:text-primary focus:text-primary focus-visible:outline-none", children: [
        /* @__PURE__ */ jsx(Icon, { name: IconName.crossLarge, className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
      ] })
    ]
  }
));
DialogTitle$2.displayName = DialogPrimitive.Title.displayName;
const DialogDescription$2 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn$2("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription$2.displayName = DialogPrimitive.Description.displayName;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn$2(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(Icon, { name: IconName.chevronDownSmall, className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn$2(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn$2(
      "z-50 min-w-[8rem] overflow-hidden rounded-md theme-border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn$2(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn$2(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Icon, { name: IconName.checkmark, className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn$2(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Icon, { name: IconName.circle, className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn$2(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn$2("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const MonetaryValue = ({
  value,
  currency = Currency.ETH,
  textVariant = TextVariant.bodyLarge,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(Text, { variant: textVariant, weight: TextWeight.medium, ...props, children: [
    value,
    " ",
    currency
  ] });
};
const isValueAnIconName = (value) => Object.values(IconName).includes(value);
const Adornment = ({
  position,
  value
}) => {
  return isValueAnIconName(value) ? /* @__PURE__ */ jsx(
    Icon,
    {
      name: value,
      className: "text-secondary-foreground/80"
    }
  ) : /* @__PURE__ */ jsx(
    "div",
    {
      className: `border-0 border-border/10 py-2 min-w-16 ${position === "start" ? "border-r" : "border-l text-right"}`,
      children: /* @__PURE__ */ jsx(
        Text,
        {
          variant: TextVariant.body,
          weight: TextWeight.medium,
          className: "text-secondary-foreground/80",
          children: value
        }
      )
    }
  );
};
const Input$1 = React.forwardRef(
  ({ startAdornment, endAdornment, className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn$2(
          "flex justify-between gap-2 items-center h-10 px-3 bg-primary/10 theme-border rounded-md text-base",
          className
        ),
        children: [
          startAdornment && /* @__PURE__ */ jsx(Adornment, { position: "start", value: startAdornment }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type,
              className: "flex w-full px-2 bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              ref,
              ...props
            }
          ),
          endAdornment && /* @__PURE__ */ jsx(Adornment, { position: "end", value: endAdornment })
        ]
      }
    );
  }
);
Input$1.displayName = "Input";
const labelVariants = cva(
  "text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label$1 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn$2(labelVariants(), className),
    ...props
  }
));
Label$1.displayName = LabelPrimitive.Root.displayName;
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    className: cn$2("flex flex-row items-center gap-2 h-max", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, className: cn$2("flex h-8", className), ...props }));
PaginationItem.displayName = "PaginationItem";
const PopoverContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn$2(
      "z-50 w-72 rounded-md theme-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const $d7bdfb9eb0fdf311$var$ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
const $d7bdfb9eb0fdf311$var$EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
};
const $d7bdfb9eb0fdf311$var$GROUP_NAME = "RovingFocusGroup";
const [$d7bdfb9eb0fdf311$var$Collection, $d7bdfb9eb0fdf311$var$useCollection, $d7bdfb9eb0fdf311$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($d7bdfb9eb0fdf311$var$GROUP_NAME);
const [$d7bdfb9eb0fdf311$var$createRovingFocusGroupContext, $d7bdfb9eb0fdf311$export$c7109489551a4f4] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($d7bdfb9eb0fdf311$var$GROUP_NAME, [
  $d7bdfb9eb0fdf311$var$createCollectionScope
]);
const [$d7bdfb9eb0fdf311$var$RovingFocusProvider, $d7bdfb9eb0fdf311$var$useRovingFocusContext] = $d7bdfb9eb0fdf311$var$createRovingFocusGroupContext($d7bdfb9eb0fdf311$var$GROUP_NAME);
const $d7bdfb9eb0fdf311$export$8699f7c8af148338 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  return /* @__PURE__ */ createElement$1($d7bdfb9eb0fdf311$var$Collection.Provider, {
    scope: props.__scopeRovingFocusGroup
  }, /* @__PURE__ */ createElement$1($d7bdfb9eb0fdf311$var$Collection.Slot, {
    scope: props.__scopeRovingFocusGroup
  }, /* @__PURE__ */ createElement$1($d7bdfb9eb0fdf311$var$RovingFocusGroupImpl, _extends$1({}, props, {
    ref: forwardedRef
  }))));
});
const $d7bdfb9eb0fdf311$var$RovingFocusGroupImpl = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, ...groupProps } = props;
  const ref = useRef$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
  const [currentTabStopId = null, setCurrentTabStopId] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId,
    onChange: onCurrentTabStopIdChange
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = useState$1(false);
  const handleEntryFocus = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onEntryFocus);
  const getItems = $d7bdfb9eb0fdf311$var$useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = useRef$1(false);
  const [focusableItemsCount, setFocusableItemsCount] = useState$1(0);
  useEffect$1(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, handleEntryFocus);
    }
  }, [
    handleEntryFocus
  ]);
  return /* @__PURE__ */ createElement$1($d7bdfb9eb0fdf311$var$RovingFocusProvider, {
    scope: __scopeRovingFocusGroup,
    orientation,
    dir: direction,
    loop,
    currentTabStopId,
    onItemFocus: useCallback$1(
      (tabStopId) => setCurrentTabStopId(tabStopId),
      [
        setCurrentTabStopId
      ]
    ),
    onItemShiftTab: useCallback$1(
      () => setIsTabbingBackOut(true),
      []
    ),
    onFocusableItemAdd: useCallback$1(
      () => setFocusableItemsCount(
        (prevCount) => prevCount + 1
      ),
      []
    ),
    onFocusableItemRemove: useCallback$1(
      () => setFocusableItemsCount(
        (prevCount) => prevCount - 1
      ),
      []
    )
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
    "data-orientation": orientation
  }, groupProps, {
    ref: composedRefs,
    style: {
      outline: "none",
      ...props.style
    },
    onMouseDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onMouseDown, () => {
      isClickFocusRef.current = true;
    }),
    onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onFocus, (event) => {
      const isKeyboardFocus = !isClickFocusRef.current;
      if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
        const entryFocusEvent = new CustomEvent($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, $d7bdfb9eb0fdf311$var$EVENT_OPTIONS);
        event.currentTarget.dispatchEvent(entryFocusEvent);
        if (!entryFocusEvent.defaultPrevented) {
          const items = getItems().filter(
            (item) => item.focusable
          );
          const activeItem = items.find(
            (item) => item.active
          );
          const currentItem = items.find(
            (item) => item.id === currentTabStopId
          );
          const candidateItems = [
            activeItem,
            currentItem,
            ...items
          ].filter(Boolean);
          const candidateNodes = candidateItems.map(
            (item) => item.ref.current
          );
          $d7bdfb9eb0fdf311$var$focusFirst(candidateNodes);
        }
      }
      isClickFocusRef.current = false;
    }),
    onBlur: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      props.onBlur,
      () => setIsTabbingBackOut(false)
    )
  })));
});
const $d7bdfb9eb0fdf311$var$ITEM_NAME = "RovingFocusGroupItem";
const $d7bdfb9eb0fdf311$export$ab9df7c53fe8454 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, ...itemProps } = props;
  const autoId = $1746a345f3d73bb7$export$f680877a34711e37();
  const id = tabStopId || autoId;
  const context = $d7bdfb9eb0fdf311$var$useRovingFocusContext($d7bdfb9eb0fdf311$var$ITEM_NAME, __scopeRovingFocusGroup);
  const isCurrentTabStop = context.currentTabStopId === id;
  const getItems = $d7bdfb9eb0fdf311$var$useCollection(__scopeRovingFocusGroup);
  const { onFocusableItemAdd, onFocusableItemRemove } = context;
  useEffect$1(() => {
    if (focusable) {
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }
  }, [
    focusable,
    onFocusableItemAdd,
    onFocusableItemRemove
  ]);
  return /* @__PURE__ */ createElement$1($d7bdfb9eb0fdf311$var$Collection.ItemSlot, {
    scope: __scopeRovingFocusGroup,
    id,
    focusable,
    active
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends$1({
    tabIndex: isCurrentTabStop ? 0 : -1,
    "data-orientation": context.orientation
  }, itemProps, {
    ref: forwardedRef,
    onMouseDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onMouseDown, (event) => {
      if (!focusable)
        event.preventDefault();
      else
        context.onItemFocus(id);
    }),
    onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      props.onFocus,
      () => context.onItemFocus(id)
    ),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
      if (event.key === "Tab" && event.shiftKey) {
        context.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget)
        return;
      const focusIntent = $d7bdfb9eb0fdf311$var$getFocusIntent(event, context.orientation, context.dir);
      if (focusIntent !== void 0) {
        event.preventDefault();
        const items = getItems().filter(
          (item) => item.focusable
        );
        let candidateNodes = items.map(
          (item) => item.ref.current
        );
        if (focusIntent === "last")
          candidateNodes.reverse();
        else if (focusIntent === "prev" || focusIntent === "next") {
          if (focusIntent === "prev")
            candidateNodes.reverse();
          const currentIndex = candidateNodes.indexOf(event.currentTarget);
          candidateNodes = context.loop ? $d7bdfb9eb0fdf311$var$wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(
          () => $d7bdfb9eb0fdf311$var$focusFirst(candidateNodes)
        );
      }
    })
  })));
});
const $d7bdfb9eb0fdf311$var$MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function $d7bdfb9eb0fdf311$var$getDirectionAwareKey(key, dir) {
  if (dir !== "rtl")
    return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function $d7bdfb9eb0fdf311$var$getFocusIntent(event, orientation, dir) {
  const key = $d7bdfb9eb0fdf311$var$getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && [
    "ArrowLeft",
    "ArrowRight"
  ].includes(key))
    return void 0;
  if (orientation === "horizontal" && [
    "ArrowUp",
    "ArrowDown"
  ].includes(key))
    return void 0;
  return $d7bdfb9eb0fdf311$var$MAP_KEY_TO_FOCUS_INTENT[key];
}
function $d7bdfb9eb0fdf311$var$focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function $d7bdfb9eb0fdf311$var$wrapArray(array, startIndex) {
  return array.map(
    (_, index2) => array[(startIndex + index2) % array.length]
  );
}
const $d7bdfb9eb0fdf311$export$be92b6f5f03c0fe9 = $d7bdfb9eb0fdf311$export$8699f7c8af148338;
const $d7bdfb9eb0fdf311$export$6d08773d2e66f8f2 = $d7bdfb9eb0fdf311$export$ab9df7c53fe8454;
function $010c2913dbd2fe3d$export$5cae361ad82dce8b(value) {
  const ref = useRef$1({
    value,
    previous: value
  });
  return useMemo$1(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [
    value
  ]);
}
const $ce77a8961b41be9e$var$RADIO_NAME = "Radio";
const [$ce77a8961b41be9e$var$createRadioContext, $ce77a8961b41be9e$export$67d2296460f1b002] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($ce77a8961b41be9e$var$RADIO_NAME);
const [$ce77a8961b41be9e$var$RadioProvider, $ce77a8961b41be9e$var$useRadioContext] = $ce77a8961b41be9e$var$createRadioContext($ce77a8961b41be9e$var$RADIO_NAME);
const $ce77a8961b41be9e$export$d7b12c4107be0d61 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeRadio, name, checked = false, required, disabled, value = "on", onCheck, ...radioProps } = props;
  const [button, setButton] = useState$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setButton(node)
  );
  const hasConsumerStoppedPropagationRef = useRef$1(false);
  const isFormControl = button ? Boolean(button.closest("form")) : true;
  return /* @__PURE__ */ createElement$1($ce77a8961b41be9e$var$RadioProvider, {
    scope: __scopeRadio,
    checked,
    disabled
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends$1({
    type: "button",
    role: "radio",
    "aria-checked": checked,
    "data-state": $ce77a8961b41be9e$var$getState(checked),
    "data-disabled": disabled ? "" : void 0,
    disabled,
    value
  }, radioProps, {
    ref: composedRefs,
    onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onClick, (event) => {
      if (!checked)
        onCheck === null || onCheck === void 0 || onCheck();
      if (isFormControl) {
        hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
        if (!hasConsumerStoppedPropagationRef.current)
          event.stopPropagation();
      }
    })
  })), isFormControl && /* @__PURE__ */ createElement$1($ce77a8961b41be9e$var$BubbleInput, {
    control: button,
    bubbles: !hasConsumerStoppedPropagationRef.current,
    name,
    value,
    checked,
    required,
    disabled,
    style: {
      transform: "translateX(-100%)"
    }
  }));
});
const $ce77a8961b41be9e$var$INDICATOR_NAME = "RadioIndicator";
const $ce77a8961b41be9e$export$d35a9ffa9a04f9e7 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeRadio, forceMount, ...indicatorProps } = props;
  const context = $ce77a8961b41be9e$var$useRadioContext($ce77a8961b41be9e$var$INDICATOR_NAME, __scopeRadio);
  return /* @__PURE__ */ createElement$1($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
    present: forceMount || context.checked
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends$1({
    "data-state": $ce77a8961b41be9e$var$getState(context.checked),
    "data-disabled": context.disabled ? "" : void 0
  }, indicatorProps, {
    ref: forwardedRef
  })));
});
const $ce77a8961b41be9e$var$BubbleInput = (props) => {
  const { control, checked, bubbles = true, ...inputProps } = props;
  const ref = useRef$1(null);
  const prevChecked = $010c2913dbd2fe3d$export$5cae361ad82dce8b(checked);
  const controlSize = $db6c3485150b8e66$export$1ab7ae714698c4b8(control);
  useEffect$1(() => {
    const input = ref.current;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", {
        bubbles
      });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [
    prevChecked,
    checked,
    bubbles
  ]);
  return /* @__PURE__ */ createElement$1("input", _extends$1({
    type: "radio",
    "aria-hidden": true,
    defaultChecked: checked
  }, inputProps, {
    tabIndex: -1,
    ref,
    style: {
      ...props.style,
      ...controlSize,
      position: "absolute",
      pointerEvents: "none",
      opacity: 0,
      margin: 0
    }
  }));
};
function $ce77a8961b41be9e$var$getState(checked) {
  return checked ? "checked" : "unchecked";
}
const $f99a8c78507165f7$var$ARROW_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
];
const $f99a8c78507165f7$var$RADIO_GROUP_NAME = "RadioGroup";
const [$f99a8c78507165f7$var$createRadioGroupContext, $f99a8c78507165f7$export$c547093f11b76da2] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($f99a8c78507165f7$var$RADIO_GROUP_NAME, [
  $d7bdfb9eb0fdf311$export$c7109489551a4f4,
  $ce77a8961b41be9e$export$67d2296460f1b002
]);
const $f99a8c78507165f7$var$useRovingFocusGroupScope = $d7bdfb9eb0fdf311$export$c7109489551a4f4();
const $f99a8c78507165f7$var$useRadioScope = $ce77a8961b41be9e$export$67d2296460f1b002();
const [$f99a8c78507165f7$var$RadioGroupProvider, $f99a8c78507165f7$var$useRadioGroupContext] = $f99a8c78507165f7$var$createRadioGroupContext($f99a8c78507165f7$var$RADIO_GROUP_NAME);
const $f99a8c78507165f7$export$a98f0dcb43a68a25 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeRadioGroup, name, defaultValue, value: valueProp, required = false, disabled = false, orientation, dir, loop = true, onValueChange, ...groupProps } = props;
  const rovingFocusGroupScope = $f99a8c78507165f7$var$useRovingFocusGroupScope(__scopeRadioGroup);
  const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
  const [value, setValue] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  return /* @__PURE__ */ createElement$1($f99a8c78507165f7$var$RadioGroupProvider, {
    scope: __scopeRadioGroup,
    name,
    required,
    disabled,
    value,
    onValueChange: setValue
  }, /* @__PURE__ */ createElement$1($d7bdfb9eb0fdf311$export$be92b6f5f03c0fe9, _extends$1({
    asChild: true
  }, rovingFocusGroupScope, {
    orientation,
    dir: direction,
    loop
  }), /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    role: "radiogroup",
    "aria-required": required,
    "aria-orientation": orientation,
    "data-disabled": disabled ? "" : void 0,
    dir: direction
  }, groupProps, {
    ref: forwardedRef
  }))));
});
const $f99a8c78507165f7$var$ITEM_NAME = "RadioGroupItem";
const $f99a8c78507165f7$export$9f866c100ef519e4 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeRadioGroup, disabled, ...itemProps } = props;
  const context = $f99a8c78507165f7$var$useRadioGroupContext($f99a8c78507165f7$var$ITEM_NAME, __scopeRadioGroup);
  const isDisabled = context.disabled || disabled;
  const rovingFocusGroupScope = $f99a8c78507165f7$var$useRovingFocusGroupScope(__scopeRadioGroup);
  const radioScope = $f99a8c78507165f7$var$useRadioScope(__scopeRadioGroup);
  const ref = useRef$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const checked = context.value === itemProps.value;
  const isArrowKeyPressedRef = useRef$1(false);
  useEffect$1(() => {
    const handleKeyDown = (event) => {
      if ($f99a8c78507165f7$var$ARROW_KEYS.includes(event.key))
        isArrowKeyPressedRef.current = true;
    };
    const handleKeyUp = () => isArrowKeyPressedRef.current = false;
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return /* @__PURE__ */ createElement$1($d7bdfb9eb0fdf311$export$6d08773d2e66f8f2, _extends$1({
    asChild: true
  }, rovingFocusGroupScope, {
    focusable: !isDisabled,
    active: checked
  }), /* @__PURE__ */ createElement$1($ce77a8961b41be9e$export$d7b12c4107be0d61, _extends$1({
    disabled: isDisabled,
    required: context.required,
    checked
  }, radioScope, itemProps, {
    name: context.name,
    ref: composedRefs,
    onCheck: () => context.onValueChange(itemProps.value),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10((event) => {
      if (event.key === "Enter")
        event.preventDefault();
    }),
    onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(itemProps.onFocus, () => {
      var _ref$current;
      if (isArrowKeyPressedRef.current)
        (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.click();
    })
  })));
});
const $f99a8c78507165f7$export$5fb54c671a65c88 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeRadioGroup, ...indicatorProps } = props;
  const radioScope = $f99a8c78507165f7$var$useRadioScope(__scopeRadioGroup);
  return /* @__PURE__ */ createElement$1($ce77a8961b41be9e$export$d35a9ffa9a04f9e7, _extends$1({}, radioScope, indicatorProps, {
    ref: forwardedRef
  }));
});
const $f99a8c78507165f7$export$be92b6f5f03c0fe9 = $f99a8c78507165f7$export$a98f0dcb43a68a25;
const $f99a8c78507165f7$export$6d08773d2e66f8f2 = $f99a8c78507165f7$export$9f866c100ef519e4;
const $f99a8c78507165f7$export$adb584737d712b70 = $f99a8c78507165f7$export$5fb54c671a65c88;
const RadioGroupVariant = {
  simple: "simple",
  default: "default"
};
const RadioGroup = React.forwardRef(({ variant, className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    $f99a8c78507165f7$export$be92b6f5f03c0fe9,
    {
      className: cn$2(
        variant === RadioGroupVariant.simple ? "flex gap-4" : "grid bg-primary/5 theme-border rounded-lg w-full",
        className
      ),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = $f99a8c78507165f7$export$be92b6f5f03c0fe9.displayName;
const RadioGroupItemSize = {
  small: "small",
  default: "default"
};
const RadioGroupItem = React.forwardRef(({ size: size2, className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    $f99a8c78507165f7$export$6d08773d2e66f8f2,
    {
      ref,
      className: cn$2(
        "aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        size2 === RadioGroupItemSize.small ? "h-4 w-4" : "h-5 w-5",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx($f99a8c78507165f7$export$adb584737d712b70, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
        "span",
        {
          className: cn$2(
            "block bg-current rounded-full",
            size2 === RadioGroupItemSize.small ? "h-2 w-2" : "h-3 w-3 "
          )
        }
      ) })
    }
  );
});
RadioGroupItem.displayName = $f99a8c78507165f7$export$6d08773d2e66f8f2.displayName;
const {
  createElement,
  createContext,
  createRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} = React;
const useId$1 = React["useId".toString()];
const PanelGroupContext = createContext(null);
PanelGroupContext.displayName = "PanelGroupContext";
const wrappedUseId = typeof useId$1 === "function" ? useId$1 : () => null;
let counter = 0;
function useUniqueId(idFromParams = null) {
  const idFromUseId = wrappedUseId();
  const idRef = useRef(idFromParams || idFromUseId || null);
  if (idRef.current === null) {
    idRef.current = "" + counter++;
  }
  return idFromParams !== null && idFromParams !== void 0 ? idFromParams : idRef.current;
}
function PanelWithForwardedRef({
  children,
  className: classNameFromProps = "",
  collapsedSize,
  collapsible,
  defaultSize,
  forwardedRef,
  id: idFromProps,
  maxSize,
  minSize,
  onCollapse,
  onExpand,
  onResize,
  order,
  style: styleFromProps,
  tagName: Type = "div",
  ...rest
}) {
  const context = useContext(PanelGroupContext);
  if (context === null) {
    throw Error(`Panel components must be rendered within a PanelGroup container`);
  }
  const {
    collapsePanel,
    expandPanel,
    getPanelSize,
    getPanelStyle,
    groupId,
    isPanelCollapsed,
    reevaluatePanelConstraints,
    registerPanel,
    resizePanel: resizePanel2,
    unregisterPanel
  } = context;
  const panelId = useUniqueId(idFromProps);
  const panelDataRef = useRef({
    callbacks: {
      onCollapse,
      onExpand,
      onResize
    },
    constraints: {
      collapsedSize,
      collapsible,
      defaultSize,
      maxSize,
      minSize
    },
    id: panelId,
    idIsFromProps: idFromProps !== void 0,
    order
  });
  useRef({
    didLogMissingDefaultSizeWarning: false
  });
  useImperativeHandle(forwardedRef, () => ({
    collapse: () => {
      collapsePanel(panelDataRef.current);
    },
    expand: (minSize2) => {
      expandPanel(panelDataRef.current, minSize2);
    },
    getId() {
      return panelId;
    },
    getSize() {
      return getPanelSize(panelDataRef.current);
    },
    isCollapsed() {
      return isPanelCollapsed(panelDataRef.current);
    },
    isExpanded() {
      return !isPanelCollapsed(panelDataRef.current);
    },
    resize: (size2) => {
      resizePanel2(panelDataRef.current, size2);
    }
  }), [collapsePanel, expandPanel, getPanelSize, isPanelCollapsed, panelId, resizePanel2]);
  const style = getPanelStyle(panelDataRef.current, defaultSize);
  return createElement(Type, {
    ...rest,
    children,
    className: classNameFromProps,
    id: idFromProps,
    style: {
      ...style,
      ...styleFromProps
    },
    // CSS selectors
    "data-panel": "",
    "data-panel-collapsible": collapsible || void 0,
    "data-panel-group-id": groupId,
    "data-panel-id": panelId,
    "data-panel-size": parseFloat("" + style.flexGrow).toFixed(1)
  });
}
const Panel = forwardRef((props, ref) => createElement(PanelWithForwardedRef, {
  ...props,
  forwardedRef: ref
}));
PanelWithForwardedRef.displayName = "Panel";
Panel.displayName = "forwardRef(Panel)";
function isKeyDown(event) {
  return event.type === "keydown";
}
function isPointerEvent(event) {
  return event.type.startsWith("pointer");
}
function isMouseEvent(event) {
  return event.type.startsWith("mouse");
}
function getResizeEventCoordinates(event) {
  if (isPointerEvent(event)) {
    if (event.isPrimary) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
  } else if (isMouseEvent(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return {
    x: Infinity,
    y: Infinity
  };
}
function getInputType() {
  if (typeof matchMedia === "function") {
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
  }
}
const EXCEEDED_HORIZONTAL_MIN = 1;
const EXCEEDED_HORIZONTAL_MAX = 2;
const EXCEEDED_VERTICAL_MIN = 4;
const EXCEEDED_VERTICAL_MAX = 8;
getInputType() === "coarse";
let panelConstraintFlags = /* @__PURE__ */ new Map();
function reportConstraintsViolation(resizeHandleId, flag) {
  panelConstraintFlags.set(resizeHandleId, flag);
}
function assert(expectedCondition, message) {
  if (!expectedCondition) {
    console.error(message);
    throw Error(message);
  }
}
const PRECISION = 10;
function fuzzyCompareNumbers(actual, expected, fractionDigits = PRECISION) {
  if (actual.toFixed(fractionDigits) === expected.toFixed(fractionDigits)) {
    return 0;
  } else {
    return actual > expected ? 1 : -1;
  }
}
function fuzzyNumbersEqual$1(actual, expected, fractionDigits = PRECISION) {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyNumbersEqual(actual, expected, fractionDigits) {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyLayoutsEqual(actual, expected, fractionDigits) {
  if (actual.length !== expected.length) {
    return false;
  }
  for (let index2 = 0; index2 < actual.length; index2++) {
    const actualSize = actual[index2];
    const expectedSize = expected[index2];
    if (!fuzzyNumbersEqual(actualSize, expectedSize, fractionDigits)) {
      return false;
    }
  }
  return true;
}
function resizePanel({
  panelConstraints: panelConstraintsArray,
  panelIndex,
  size: size2
}) {
  const panelConstraints = panelConstraintsArray[panelIndex];
  assert(panelConstraints != null, `Panel constraints not found for index ${panelIndex}`);
  let {
    collapsedSize = 0,
    collapsible,
    maxSize = 100,
    minSize = 0
  } = panelConstraints;
  if (fuzzyCompareNumbers(size2, minSize) < 0) {
    if (collapsible) {
      const halfwayPoint = (collapsedSize + minSize) / 2;
      if (fuzzyCompareNumbers(size2, halfwayPoint) < 0) {
        size2 = collapsedSize;
      } else {
        size2 = minSize;
      }
    } else {
      size2 = minSize;
    }
  }
  size2 = Math.min(maxSize, size2);
  size2 = parseFloat(size2.toFixed(PRECISION));
  return size2;
}
function adjustLayoutByDelta({
  delta,
  initialLayout,
  panelConstraints: panelConstraintsArray,
  pivotIndices,
  prevLayout,
  trigger
}) {
  if (fuzzyNumbersEqual(delta, 0)) {
    return initialLayout;
  }
  const nextLayout = [...initialLayout];
  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  assert(firstPivotIndex != null, "Invalid first pivot index");
  assert(secondPivotIndex != null, "Invalid second pivot index");
  let deltaApplied = 0;
  {
    if (trigger === "keyboard") {
      {
        const index2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const panelConstraints = panelConstraintsArray[index2];
        assert(panelConstraints, `Panel constraints not found for index ${index2}`);
        const {
          collapsedSize = 0,
          collapsible,
          minSize = 0
        } = panelConstraints;
        if (collapsible) {
          const prevSize = initialLayout[index2];
          assert(prevSize != null, `Previous layout not found for panel index ${index2}`);
          if (fuzzyNumbersEqual(prevSize, collapsedSize)) {
            const localDelta = minSize - prevSize;
            if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
      {
        const index2 = delta < 0 ? firstPivotIndex : secondPivotIndex;
        const panelConstraints = panelConstraintsArray[index2];
        assert(panelConstraints, `No panel constraints found for index ${index2}`);
        const {
          collapsedSize = 0,
          collapsible,
          minSize = 0
        } = panelConstraints;
        if (collapsible) {
          const prevSize = initialLayout[index2];
          assert(prevSize != null, `Previous layout not found for panel index ${index2}`);
          if (fuzzyNumbersEqual(prevSize, minSize)) {
            const localDelta = prevSize - collapsedSize;
            if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
    }
  }
  {
    const increment = delta < 0 ? 1 : -1;
    let index2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
    let maxAvailableDelta = 0;
    while (true) {
      const prevSize = initialLayout[index2];
      assert(prevSize != null, `Previous layout not found for panel index ${index2}`);
      const maxSafeSize = resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index2,
        size: 100
      });
      const delta2 = maxSafeSize - prevSize;
      maxAvailableDelta += delta2;
      index2 += increment;
      if (index2 < 0 || index2 >= panelConstraintsArray.length) {
        break;
      }
    }
    const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
    delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
  }
  {
    const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
    let index2 = pivotIndex;
    while (index2 >= 0 && index2 < panelConstraintsArray.length) {
      const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
      const prevSize = initialLayout[index2];
      assert(prevSize != null, `Previous layout not found for panel index ${index2}`);
      const unsafeSize = prevSize - deltaRemaining;
      const safeSize = resizePanel({
        panelConstraints: panelConstraintsArray,
        panelIndex: index2,
        size: unsafeSize
      });
      if (!fuzzyNumbersEqual(prevSize, safeSize)) {
        deltaApplied += prevSize - safeSize;
        nextLayout[index2] = safeSize;
        if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
          numeric: true
        }) >= 0) {
          break;
        }
      }
      if (delta < 0) {
        index2--;
      } else {
        index2++;
      }
    }
  }
  if (fuzzyLayoutsEqual(prevLayout, nextLayout)) {
    return prevLayout;
  }
  {
    const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    const prevSize = initialLayout[pivotIndex];
    assert(prevSize != null, `Previous layout not found for panel index ${pivotIndex}`);
    const unsafeSize = prevSize + deltaApplied;
    const safeSize = resizePanel({
      panelConstraints: panelConstraintsArray,
      panelIndex: pivotIndex,
      size: unsafeSize
    });
    nextLayout[pivotIndex] = safeSize;
    if (!fuzzyNumbersEqual(safeSize, unsafeSize)) {
      let deltaRemaining = unsafeSize - safeSize;
      const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
      let index2 = pivotIndex2;
      while (index2 >= 0 && index2 < panelConstraintsArray.length) {
        const prevSize2 = nextLayout[index2];
        assert(prevSize2 != null, `Previous layout not found for panel index ${index2}`);
        const unsafeSize2 = prevSize2 + deltaRemaining;
        const safeSize2 = resizePanel({
          panelConstraints: panelConstraintsArray,
          panelIndex: index2,
          size: unsafeSize2
        });
        if (!fuzzyNumbersEqual(prevSize2, safeSize2)) {
          deltaRemaining -= safeSize2 - prevSize2;
          nextLayout[index2] = safeSize2;
        }
        if (fuzzyNumbersEqual(deltaRemaining, 0)) {
          break;
        }
        if (delta > 0) {
          index2--;
        } else {
          index2++;
        }
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size2) => size2 + total, 0);
  if (!fuzzyNumbersEqual(totalSize, 100)) {
    return prevLayout;
  }
  return nextLayout;
}
function getResizeHandleElementsForGroup(groupId, scope = document) {
  return Array.from(scope.querySelectorAll(`[data-panel-resize-handle-id][data-panel-group-id="${groupId}"]`));
}
function getResizeHandleElementIndex(groupId, id, scope = document) {
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index2 = handles.findIndex((handle) => handle.getAttribute("data-panel-resize-handle-id") === id);
  return index2 !== null && index2 !== void 0 ? index2 : null;
}
function determinePivotIndices(groupId, dragHandleId, panelGroupElement) {
  const index2 = getResizeHandleElementIndex(groupId, dragHandleId, panelGroupElement);
  return index2 != null ? [index2, index2 + 1] : [-1, -1];
}
function getPanelGroupElement(id, rootElement = document) {
  var _dataset;
  if (rootElement instanceof HTMLElement && (rootElement === null || rootElement === void 0 ? void 0 : (_dataset = rootElement.dataset) === null || _dataset === void 0 ? void 0 : _dataset.panelGroupId) == id) {
    return rootElement;
  }
  const element = rootElement.querySelector(`[data-panel-group][data-panel-group-id="${id}"]`);
  if (element) {
    return element;
  }
  return null;
}
function getResizeHandleElement(id, scope = document) {
  const element = scope.querySelector(`[data-panel-resize-handle-id="${id}"]`);
  if (element) {
    return element;
  }
  return null;
}
function getResizeHandlePanelIds(groupId, handleId, panelsArray, scope = document) {
  var _panelsArray$index$id, _panelsArray$index, _panelsArray$id, _panelsArray;
  const handle = getResizeHandleElement(handleId, scope);
  const handles = getResizeHandleElementsForGroup(groupId, scope);
  const index2 = handle ? handles.indexOf(handle) : -1;
  const idBefore = (_panelsArray$index$id = (_panelsArray$index = panelsArray[index2]) === null || _panelsArray$index === void 0 ? void 0 : _panelsArray$index.id) !== null && _panelsArray$index$id !== void 0 ? _panelsArray$index$id : null;
  const idAfter = (_panelsArray$id = (_panelsArray = panelsArray[index2 + 1]) === null || _panelsArray === void 0 ? void 0 : _panelsArray.id) !== null && _panelsArray$id !== void 0 ? _panelsArray$id : null;
  return [idBefore, idAfter];
}
function useWindowSplitterPanelGroupBehavior({
  committedValuesRef,
  eagerValuesRef,
  groupId,
  layout,
  panelDataArray,
  panelGroupElement,
  setLayout
}) {
  useRef({
    didWarnAboutMissingResizeHandle: false
  });
  useEffect(() => {
    if (!panelGroupElement) {
      return;
    }
    const eagerValues = eagerValuesRef.current;
    assert(eagerValues, `Eager values not found`);
    const {
      panelDataArray: panelDataArray2
    } = eagerValues;
    const groupElement = getPanelGroupElement(groupId, panelGroupElement);
    assert(groupElement != null, `No group found for id "${groupId}"`);
    const handles = getResizeHandleElementsForGroup(groupId, panelGroupElement);
    assert(handles, `No resize handles found for group id "${groupId}"`);
    const cleanupFunctions = handles.map((handle) => {
      const handleId = handle.getAttribute("data-panel-resize-handle-id");
      assert(handleId, `Resize handle element has no handle id attribute`);
      const [idBefore, idAfter] = getResizeHandlePanelIds(groupId, handleId, panelDataArray2, panelGroupElement);
      if (idBefore == null || idAfter == null) {
        return () => {
        };
      }
      const onKeyDown = (event) => {
        if (event.defaultPrevented) {
          return;
        }
        switch (event.key) {
          case "Enter": {
            event.preventDefault();
            const index2 = panelDataArray2.findIndex((panelData) => panelData.id === idBefore);
            if (index2 >= 0) {
              const panelData = panelDataArray2[index2];
              assert(panelData, `No panel data found for index ${index2}`);
              const size2 = layout[index2];
              const {
                collapsedSize = 0,
                collapsible,
                minSize = 0
              } = panelData.constraints;
              if (size2 != null && collapsible) {
                const nextLayout = adjustLayoutByDelta({
                  delta: fuzzyNumbersEqual(size2, collapsedSize) ? minSize - collapsedSize : collapsedSize - size2,
                  initialLayout: layout,
                  panelConstraints: panelDataArray2.map((panelData2) => panelData2.constraints),
                  pivotIndices: determinePivotIndices(groupId, handleId, panelGroupElement),
                  prevLayout: layout,
                  trigger: "keyboard"
                });
                if (layout !== nextLayout) {
                  setLayout(nextLayout);
                }
              }
            }
            break;
          }
        }
      };
      handle.addEventListener("keydown", onKeyDown);
      return () => {
        handle.removeEventListener("keydown", onKeyDown);
      };
    });
    return () => {
      cleanupFunctions.forEach((cleanupFunction) => cleanupFunction());
    };
  }, [panelGroupElement, committedValuesRef, eagerValuesRef, groupId, layout, panelDataArray, setLayout]);
}
function areEqual(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }
  for (let index2 = 0; index2 < arrayA.length; index2++) {
    if (arrayA[index2] !== arrayB[index2]) {
      return false;
    }
  }
  return true;
}
function getResizeEventCursorPosition(direction, event) {
  const isHorizontal = direction === "horizontal";
  const {
    x,
    y
  } = getResizeEventCoordinates(event);
  return isHorizontal ? x : y;
}
function calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement) {
  const isHorizontal = direction === "horizontal";
  const handleElement = getResizeHandleElement(dragHandleId, panelGroupElement);
  assert(handleElement, `No resize handle element found for id "${dragHandleId}"`);
  const groupId = handleElement.getAttribute("data-panel-group-id");
  assert(groupId, `Resize handle element has no group id attribute`);
  let {
    initialCursorPosition
  } = initialDragState;
  const cursorPosition = getResizeEventCursorPosition(direction, event);
  const groupElement = getPanelGroupElement(groupId, panelGroupElement);
  assert(groupElement, `No group element found for id "${groupId}"`);
  const groupRect = groupElement.getBoundingClientRect();
  const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
  const offsetPixels = cursorPosition - initialCursorPosition;
  const offsetPercentage = offsetPixels / groupSizeInPixels * 100;
  return offsetPercentage;
}
function calculateDeltaPercentage(event, dragHandleId, direction, initialDragState, keyboardResizeBy, panelGroupElement) {
  if (isKeyDown(event)) {
    const isHorizontal = direction === "horizontal";
    let delta = 0;
    if (event.shiftKey) {
      delta = 100;
    } else if (keyboardResizeBy != null) {
      delta = keyboardResizeBy;
    } else {
      delta = 10;
    }
    let movement = 0;
    switch (event.key) {
      case "ArrowDown":
        movement = isHorizontal ? 0 : delta;
        break;
      case "ArrowLeft":
        movement = isHorizontal ? -delta : 0;
        break;
      case "ArrowRight":
        movement = isHorizontal ? delta : 0;
        break;
      case "ArrowUp":
        movement = isHorizontal ? 0 : -delta;
        break;
      case "End":
        movement = 100;
        break;
      case "Home":
        movement = -100;
        break;
    }
    return movement;
  } else {
    if (initialDragState == null) {
      return 0;
    }
    return calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement);
  }
}
function callPanelCallbacks(panelsArray, layout, panelIdToLastNotifiedSizeMap) {
  layout.forEach((size2, index2) => {
    const panelData = panelsArray[index2];
    assert(panelData, `Panel data not found for index ${index2}`);
    const {
      callbacks,
      constraints,
      id: panelId
    } = panelData;
    const {
      collapsedSize = 0,
      collapsible
    } = constraints;
    const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
    if (lastNotifiedSize == null || size2 !== lastNotifiedSize) {
      panelIdToLastNotifiedSizeMap[panelId] = size2;
      const {
        onCollapse,
        onExpand,
        onResize
      } = callbacks;
      if (onResize) {
        onResize(size2, lastNotifiedSize);
      }
      if (collapsible && (onCollapse || onExpand)) {
        if (onExpand && (lastNotifiedSize == null || fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && !fuzzyNumbersEqual$1(size2, collapsedSize)) {
          onExpand();
        }
        if (onCollapse && (lastNotifiedSize == null || !fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && fuzzyNumbersEqual$1(size2, collapsedSize)) {
          onCollapse();
        }
      }
    }
  });
}
function compareLayouts(a, b) {
  if (a.length !== b.length) {
    return false;
  } else {
    for (let index2 = 0; index2 < a.length; index2++) {
      if (a[index2] != b[index2]) {
        return false;
      }
    }
  }
  return true;
}
function computePanelFlexBoxStyle({
  defaultSize,
  dragState,
  layout,
  panelData,
  panelIndex,
  precision = 3
}) {
  const size2 = layout[panelIndex];
  let flexGrow;
  if (size2 == null) {
    flexGrow = defaultSize != void 0 ? defaultSize.toPrecision(precision) : "1";
  } else if (panelData.length === 1) {
    flexGrow = "1";
  } else {
    flexGrow = size2.toPrecision(precision);
  }
  return {
    flexBasis: 0,
    flexGrow,
    flexShrink: 1,
    // Without this, Panel sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a panel during resize
    // This avoid edge cases like nested iframes
    pointerEvents: dragState !== null ? "none" : void 0
  };
}
function debounce(callback, durationMs = 10) {
  let timeoutId = null;
  let callable = (...args) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, durationMs);
  };
  return callable;
}
function initializeDefaultStorage(storageObject) {
  try {
    if (typeof localStorage !== "undefined") {
      storageObject.getItem = (name) => {
        return localStorage.getItem(name);
      };
      storageObject.setItem = (name, value) => {
        localStorage.setItem(name, value);
      };
    } else {
      throw new Error("localStorage not supported in this environment");
    }
  } catch (error) {
    console.error(error);
    storageObject.getItem = () => null;
    storageObject.setItem = () => {
    };
  }
}
function getPanelGroupKey(autoSaveId) {
  return `react-resizable-panels:${autoSaveId}`;
}
function getPanelKey(panels) {
  return panels.map((panel) => {
    const {
      constraints,
      id,
      idIsFromProps,
      order
    } = panel;
    if (idIsFromProps) {
      return id;
    } else {
      return order ? `${order}:${JSON.stringify(constraints)}` : JSON.stringify(constraints);
    }
  }).sort((a, b) => a.localeCompare(b)).join(",");
}
function loadSerializedPanelGroupState(autoSaveId, storage) {
  try {
    const panelGroupKey = getPanelGroupKey(autoSaveId);
    const serialized = storage.getItem(panelGroupKey);
    if (serialized) {
      const parsed = JSON.parse(serialized);
      if (typeof parsed === "object" && parsed != null) {
        return parsed;
      }
    }
  } catch (error) {
  }
  return null;
}
function savePanelGroupState(autoSaveId, panels, panelSizesBeforeCollapse, sizes, storage) {
  var _loadSerializedPanelG2;
  const panelGroupKey = getPanelGroupKey(autoSaveId);
  const panelKey = getPanelKey(panels);
  const state = (_loadSerializedPanelG2 = loadSerializedPanelGroupState(autoSaveId, storage)) !== null && _loadSerializedPanelG2 !== void 0 ? _loadSerializedPanelG2 : {};
  state[panelKey] = {
    expandToSizes: Object.fromEntries(panelSizesBeforeCollapse.entries()),
    layout: sizes
  };
  try {
    storage.setItem(panelGroupKey, JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
}
function validatePanelGroupLayout({
  layout: prevLayout,
  panelConstraints
}) {
  const nextLayout = [...prevLayout];
  const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
  if (nextLayout.length !== panelConstraints.length) {
    throw Error(`Invalid ${panelConstraints.length} panel layout: ${nextLayout.map((size2) => `${size2}%`).join(", ")}`);
  } else if (!fuzzyNumbersEqual(nextLayoutTotalSize, 100)) {
    for (let index2 = 0; index2 < panelConstraints.length; index2++) {
      const unsafeSize = nextLayout[index2];
      assert(unsafeSize != null, `No layout data found for index ${index2}`);
      const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
      nextLayout[index2] = safeSize;
    }
  }
  let remainingSize = 0;
  for (let index2 = 0; index2 < panelConstraints.length; index2++) {
    const unsafeSize = nextLayout[index2];
    assert(unsafeSize != null, `No layout data found for index ${index2}`);
    const safeSize = resizePanel({
      panelConstraints,
      panelIndex: index2,
      size: unsafeSize
    });
    if (unsafeSize != safeSize) {
      remainingSize += unsafeSize - safeSize;
      nextLayout[index2] = safeSize;
    }
  }
  if (!fuzzyNumbersEqual(remainingSize, 0)) {
    for (let index2 = 0; index2 < panelConstraints.length; index2++) {
      const prevSize = nextLayout[index2];
      assert(prevSize != null, `No layout data found for index ${index2}`);
      const unsafeSize = prevSize + remainingSize;
      const safeSize = resizePanel({
        panelConstraints,
        panelIndex: index2,
        size: unsafeSize
      });
      if (prevSize !== safeSize) {
        remainingSize -= safeSize - prevSize;
        nextLayout[index2] = safeSize;
        if (fuzzyNumbersEqual(remainingSize, 0)) {
          break;
        }
      }
    }
  }
  return nextLayout;
}
const LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
const defaultStorage = {
  getItem: (name) => {
    initializeDefaultStorage(defaultStorage);
    return defaultStorage.getItem(name);
  },
  setItem: (name, value) => {
    initializeDefaultStorage(defaultStorage);
    defaultStorage.setItem(name, value);
  }
};
const debounceMap = {};
function PanelGroupWithForwardedRef({
  autoSaveId = null,
  children,
  className: classNameFromProps = "",
  direction,
  forwardedRef,
  id: idFromProps = null,
  onLayout = null,
  keyboardResizeBy = null,
  storage = defaultStorage,
  style: styleFromProps,
  tagName: Type = "div",
  ...rest
}) {
  const groupId = useUniqueId(idFromProps);
  const panelGroupElementRef = useRef(null);
  const [dragState, setDragState] = useState(null);
  const [layout, setLayout] = useState([]);
  const panelIdToLastNotifiedSizeMapRef = useRef({});
  const panelSizeBeforeCollapseRef = useRef(/* @__PURE__ */ new Map());
  const prevDeltaRef = useRef(0);
  const committedValuesRef = useRef({
    autoSaveId,
    direction,
    dragState,
    id: groupId,
    keyboardResizeBy,
    onLayout,
    storage
  });
  const eagerValuesRef = useRef({
    layout,
    panelDataArray: [],
    panelDataArrayChanged: false
  });
  useRef({
    didLogIdAndOrderWarning: false,
    didLogPanelConstraintsWarning: false,
    prevPanelIds: []
  });
  useImperativeHandle(forwardedRef, () => ({
    getId: () => committedValuesRef.current.id,
    getLayout: () => {
      const {
        layout: layout2
      } = eagerValuesRef.current;
      return layout2;
    },
    setLayout: (unsafeLayout) => {
      const {
        onLayout: onLayout2
      } = committedValuesRef.current;
      const {
        layout: prevLayout,
        panelDataArray
      } = eagerValuesRef.current;
      const safeLayout = validatePanelGroupLayout({
        layout: unsafeLayout,
        panelConstraints: panelDataArray.map((panelData) => panelData.constraints)
      });
      if (!areEqual(prevLayout, safeLayout)) {
        setLayout(safeLayout);
        eagerValuesRef.current.layout = safeLayout;
        if (onLayout2) {
          onLayout2(safeLayout);
        }
        callPanelCallbacks(panelDataArray, safeLayout, panelIdToLastNotifiedSizeMapRef.current);
      }
    }
  }), []);
  useWindowSplitterPanelGroupBehavior({
    committedValuesRef,
    eagerValuesRef,
    groupId,
    layout,
    panelDataArray: eagerValuesRef.current.panelDataArray,
    setLayout,
    panelGroupElement: panelGroupElementRef.current
  });
  useEffect(() => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    if (autoSaveId) {
      if (layout.length === 0 || layout.length !== panelDataArray.length) {
        return;
      }
      let debouncedSave = debounceMap[autoSaveId];
      if (debouncedSave == null) {
        debouncedSave = debounce(savePanelGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
        debounceMap[autoSaveId] = debouncedSave;
      }
      const clonedPanelDataArray = [...panelDataArray];
      const clonedPanelSizesBeforeCollapse = new Map(panelSizeBeforeCollapseRef.current);
      debouncedSave(autoSaveId, clonedPanelDataArray, clonedPanelSizesBeforeCollapse, layout, storage);
    }
  }, [autoSaveId, layout, storage]);
  useEffect(() => {
  });
  const collapsePanel = useCallback((panelData) => {
    const {
      onLayout: onLayout2
    } = committedValuesRef.current;
    const {
      layout: prevLayout,
      panelDataArray
    } = eagerValuesRef.current;
    if (panelData.constraints.collapsible) {
      const panelConstraintsArray = panelDataArray.map((panelData2) => panelData2.constraints);
      const {
        collapsedSize = 0,
        panelSize,
        pivotIndices
      } = panelDataHelper(panelDataArray, panelData, prevLayout);
      assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
      if (!fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
        panelSizeBeforeCollapseRef.current.set(panelData.id, panelSize);
        const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
        const delta = isLastPanel ? panelSize - collapsedSize : collapsedSize - panelSize;
        const nextLayout = adjustLayoutByDelta({
          delta,
          initialLayout: prevLayout,
          panelConstraints: panelConstraintsArray,
          pivotIndices,
          prevLayout,
          trigger: "imperative-api"
        });
        if (!compareLayouts(prevLayout, nextLayout)) {
          setLayout(nextLayout);
          eagerValuesRef.current.layout = nextLayout;
          if (onLayout2) {
            onLayout2(nextLayout);
          }
          callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
        }
      }
    }
  }, []);
  const expandPanel = useCallback((panelData, minSizeOverride) => {
    const {
      onLayout: onLayout2
    } = committedValuesRef.current;
    const {
      layout: prevLayout,
      panelDataArray
    } = eagerValuesRef.current;
    if (panelData.constraints.collapsible) {
      const panelConstraintsArray = panelDataArray.map((panelData2) => panelData2.constraints);
      const {
        collapsedSize = 0,
        panelSize = 0,
        minSize: minSizeFromProps = 0,
        pivotIndices
      } = panelDataHelper(panelDataArray, panelData, prevLayout);
      const minSize = minSizeOverride !== null && minSizeOverride !== void 0 ? minSizeOverride : minSizeFromProps;
      if (fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
        const prevPanelSize = panelSizeBeforeCollapseRef.current.get(panelData.id);
        const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
        const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
        const delta = isLastPanel ? panelSize - baseSize : baseSize - panelSize;
        const nextLayout = adjustLayoutByDelta({
          delta,
          initialLayout: prevLayout,
          panelConstraints: panelConstraintsArray,
          pivotIndices,
          prevLayout,
          trigger: "imperative-api"
        });
        if (!compareLayouts(prevLayout, nextLayout)) {
          setLayout(nextLayout);
          eagerValuesRef.current.layout = nextLayout;
          if (onLayout2) {
            onLayout2(nextLayout);
          }
          callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
        }
      }
    }
  }, []);
  const getPanelSize = useCallback((panelData) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      panelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    return panelSize;
  }, []);
  const getPanelStyle = useCallback((panelData, defaultSize) => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    const panelIndex = findPanelDataIndex(panelDataArray, panelData);
    return computePanelFlexBoxStyle({
      defaultSize,
      dragState,
      layout,
      panelData: panelDataArray,
      panelIndex
    });
  }, [dragState, layout]);
  const isPanelCollapsed = useCallback((panelData) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      collapsedSize = 0,
      collapsible,
      panelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    return collapsible === true && fuzzyNumbersEqual$1(panelSize, collapsedSize);
  }, []);
  const isPanelExpanded = useCallback((panelData) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      collapsedSize = 0,
      collapsible,
      panelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    return !collapsible || fuzzyCompareNumbers(panelSize, collapsedSize) > 0;
  }, []);
  const registerPanel = useCallback((panelData) => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    panelDataArray.push(panelData);
    panelDataArray.sort((panelA, panelB) => {
      const orderA = panelA.order;
      const orderB = panelB.order;
      if (orderA == null && orderB == null) {
        return 0;
      } else if (orderA == null) {
        return -1;
      } else if (orderB == null) {
        return 1;
      } else {
        return orderA - orderB;
      }
    });
    eagerValuesRef.current.panelDataArrayChanged = true;
  }, []);
  const registerResizeHandle = useCallback((dragHandleId) => {
    return function resizeHandler(event) {
      event.preventDefault();
      const panelGroupElement = panelGroupElementRef.current;
      if (!panelGroupElement) {
        return () => null;
      }
      const {
        direction: direction2,
        dragState: dragState2,
        id: groupId2,
        keyboardResizeBy: keyboardResizeBy2,
        onLayout: onLayout2
      } = committedValuesRef.current;
      const {
        layout: prevLayout,
        panelDataArray
      } = eagerValuesRef.current;
      const {
        initialLayout
      } = dragState2 !== null && dragState2 !== void 0 ? dragState2 : {};
      const pivotIndices = determinePivotIndices(groupId2, dragHandleId, panelGroupElement);
      let delta = calculateDeltaPercentage(event, dragHandleId, direction2, dragState2, keyboardResizeBy2, panelGroupElement);
      if (delta === 0) {
        return;
      }
      const isHorizontal = direction2 === "horizontal";
      if (document.dir === "rtl" && isHorizontal) {
        delta = -delta;
      }
      const panelConstraints = panelDataArray.map((panelData) => panelData.constraints);
      const nextLayout = adjustLayoutByDelta({
        delta,
        initialLayout: initialLayout !== null && initialLayout !== void 0 ? initialLayout : prevLayout,
        panelConstraints,
        pivotIndices,
        prevLayout,
        trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
      });
      const layoutChanged = !compareLayouts(prevLayout, nextLayout);
      if (isPointerEvent(event) || isMouseEvent(event)) {
        if (prevDeltaRef.current != delta) {
          prevDeltaRef.current = delta;
          if (!layoutChanged) {
            if (isHorizontal) {
              reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_HORIZONTAL_MIN : EXCEEDED_HORIZONTAL_MAX);
            } else {
              reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_VERTICAL_MIN : EXCEEDED_VERTICAL_MAX);
            }
          } else {
            reportConstraintsViolation(dragHandleId, 0);
          }
        }
      }
      if (layoutChanged) {
        setLayout(nextLayout);
        eagerValuesRef.current.layout = nextLayout;
        if (onLayout2) {
          onLayout2(nextLayout);
        }
        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
      }
    };
  }, []);
  const resizePanel2 = useCallback((panelData, unsafePanelSize) => {
    const {
      onLayout: onLayout2
    } = committedValuesRef.current;
    const {
      layout: prevLayout,
      panelDataArray
    } = eagerValuesRef.current;
    const panelConstraintsArray = panelDataArray.map((panelData2) => panelData2.constraints);
    const {
      panelSize,
      pivotIndices
    } = panelDataHelper(panelDataArray, panelData, prevLayout);
    assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
    const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
    const delta = isLastPanel ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      initialLayout: prevLayout,
      panelConstraints: panelConstraintsArray,
      pivotIndices,
      prevLayout,
      trigger: "imperative-api"
    });
    if (!compareLayouts(prevLayout, nextLayout)) {
      setLayout(nextLayout);
      eagerValuesRef.current.layout = nextLayout;
      if (onLayout2) {
        onLayout2(nextLayout);
      }
      callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
    }
  }, []);
  const reevaluatePanelConstraints = useCallback((panelData, prevConstraints) => {
    const {
      layout: layout2,
      panelDataArray
    } = eagerValuesRef.current;
    const {
      collapsedSize: prevCollapsedSize = 0,
      collapsible: prevCollapsible
    } = prevConstraints;
    const {
      collapsedSize: nextCollapsedSize = 0,
      collapsible: nextCollapsible,
      maxSize: nextMaxSize = 100,
      minSize: nextMinSize = 0
    } = panelData.constraints;
    const {
      panelSize: prevPanelSize
    } = panelDataHelper(panelDataArray, panelData, layout2);
    if (prevPanelSize == null) {
      return;
    }
    if (prevCollapsible && nextCollapsible && fuzzyNumbersEqual$1(prevPanelSize, prevCollapsedSize)) {
      if (!fuzzyNumbersEqual$1(prevCollapsedSize, nextCollapsedSize)) {
        resizePanel2(panelData, nextCollapsedSize);
      }
    } else if (prevPanelSize < nextMinSize) {
      resizePanel2(panelData, nextMinSize);
    } else if (prevPanelSize > nextMaxSize) {
      resizePanel2(panelData, nextMaxSize);
    }
  }, [resizePanel2]);
  const startDragging = useCallback((dragHandleId, event) => {
    const {
      direction: direction2
    } = committedValuesRef.current;
    const {
      layout: layout2
    } = eagerValuesRef.current;
    if (!panelGroupElementRef.current) {
      return;
    }
    const handleElement = getResizeHandleElement(dragHandleId, panelGroupElementRef.current);
    assert(handleElement, `Drag handle element not found for id "${dragHandleId}"`);
    const initialCursorPosition = getResizeEventCursorPosition(direction2, event);
    setDragState({
      dragHandleId,
      dragHandleRect: handleElement.getBoundingClientRect(),
      initialCursorPosition,
      initialLayout: layout2
    });
  }, []);
  const stopDragging = useCallback(() => {
    setDragState(null);
  }, []);
  const unregisterPanel = useCallback((panelData) => {
    const {
      panelDataArray
    } = eagerValuesRef.current;
    const index2 = findPanelDataIndex(panelDataArray, panelData);
    if (index2 >= 0) {
      panelDataArray.splice(index2, 1);
      delete panelIdToLastNotifiedSizeMapRef.current[panelData.id];
      eagerValuesRef.current.panelDataArrayChanged = true;
    }
  }, []);
  const context = useMemo(() => ({
    collapsePanel,
    direction,
    dragState,
    expandPanel,
    getPanelSize,
    getPanelStyle,
    groupId,
    isPanelCollapsed,
    isPanelExpanded,
    reevaluatePanelConstraints,
    registerPanel,
    registerResizeHandle,
    resizePanel: resizePanel2,
    startDragging,
    stopDragging,
    unregisterPanel,
    panelGroupElement: panelGroupElementRef.current
  }), [collapsePanel, dragState, direction, expandPanel, getPanelSize, getPanelStyle, groupId, isPanelCollapsed, isPanelExpanded, reevaluatePanelConstraints, registerPanel, registerResizeHandle, resizePanel2, startDragging, stopDragging, unregisterPanel]);
  const style = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    height: "100%",
    overflow: "hidden",
    width: "100%"
  };
  return createElement(PanelGroupContext.Provider, {
    value: context
  }, createElement(Type, {
    ...rest,
    children,
    className: classNameFromProps,
    id: idFromProps,
    ref: panelGroupElementRef,
    style: {
      ...style,
      ...styleFromProps
    },
    // CSS selectors
    "data-panel-group": "",
    "data-panel-group-direction": direction,
    "data-panel-group-id": groupId
  }));
}
const PanelGroup = forwardRef((props, ref) => createElement(PanelGroupWithForwardedRef, {
  ...props,
  forwardedRef: ref
}));
PanelGroupWithForwardedRef.displayName = "PanelGroup";
PanelGroup.displayName = "forwardRef(PanelGroup)";
function findPanelDataIndex(panelDataArray, panelData) {
  return panelDataArray.findIndex((prevPanelData) => prevPanelData === panelData || prevPanelData.id === panelData.id);
}
function panelDataHelper(panelDataArray, panelData, layout) {
  const panelIndex = findPanelDataIndex(panelDataArray, panelData);
  const isLastPanel = panelIndex === panelDataArray.length - 1;
  const pivotIndices = isLastPanel ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];
  const panelSize = layout[panelIndex];
  return {
    ...panelData.constraints,
    panelSize,
    pivotIndices
  };
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Node2 = React.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
var useLayoutEffect2 = Boolean(globalThis == null ? void 0 : globalThis.document) ? React.useLayoutEffect : () => {
};
function useStateMachine$2(initialState, machine) {
  return React.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence$1 = (props) => {
  const { present, children } = props;
  const presence = usePresence$1(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef$1(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
};
Presence$1.displayName = "Presence";
function usePresence$1(present) {
  const [node, setNode] = React.useState();
  const stylesRef = React.useRef({});
  const prevPresentRef = React.useRef(present);
  const prevAnimationNameRef = React.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine$2(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React.useEffect(() => {
    const currentAnimationName = getAnimationName$1(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles2 = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName$1(styles2);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles2 == null ? void 0 : styles2.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName$1(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName$1(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React.useCallback((node2) => {
      if (node2)
        stylesRef.current = getComputedStyle(node2);
      setNode(node2);
    }, [])
  };
}
function getAnimationName$1(styles2) {
  return (styles2 == null ? void 0 : styles2.animationName) || "none";
}
function getElementRef$1(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = React.createContext(defaultContext);
    const index2 = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index2]) || BaseContext;
      const value = React.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index2]) || BaseContext;
      const context = React.useContext(Context);
      if (context)
        return context;
      if (defaultContext !== void 0)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return React.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useCallbackRef$1(callback) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(() => (...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, []);
}
var DirectionContext = React.createContext(void 0);
function useDirection(localDir) {
  const globalDir = React.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
function clamp(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}
function useStateMachine$1(initialState, machine) {
  return React.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext, createScrollAreaScope] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = React.useState(null);
    const [viewport, setViewport] = React.useState(null);
    const [content, setContent] = React.useState(null);
    const [scrollbarX, setScrollbarX] = React.useState(null);
    const [scrollbarY, setScrollbarY] = React.useState(null);
    const [cornerWidth, setCornerWidth] = React.useState(0);
    const [cornerHeight, setCornerHeight] = React.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = React.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = React.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, asChild, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `
[data-radix-scroll-area-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-radix-scroll-area-viewport]::-webkit-scrollbar {
  display: none;
}
:where([data-radix-scroll-area-viewport]) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
:where([data-radix-scroll-area-content]) {
  flex-grow: 1;
}
`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          asChild,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: getSubtree({ asChild, children }, (children2) => /* @__PURE__ */ jsx(
            "div",
            {
              "data-radix-scroll-area-content": "",
              ref: context.onContentChange,
              style: { minWidth: context.scrollbarXEnabled ? "fit-content" : void 0 },
              children: children2
            }
          ))
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = React.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    React.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = React.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsx(Presence$1, { present: forceMount || visible, children: /* @__PURE__ */ jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = React.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine$1("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  React.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  React.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll2 = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsx(Presence$1, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = React.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = React.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsx(Presence$1, { present: forceMount || visible, children: /* @__PURE__ */ jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = React.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = React.useRef(null);
  const pointerOffsetRef = React.useRef(0);
  const [sizes, setSizes] = React.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset2 = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset2}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport)
            context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset2 = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset2}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport)
            context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport)
            context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = React.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = React.useState();
  const ref = React.useRef(null);
  const composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  React.useEffect(() => {
    if (ref.current)
      setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs2,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = React.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = React.useState();
  const ref = React.useRef(null);
  const composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  React.useEffect(() => {
    if (ref.current)
      setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs2,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = React.useState(null);
  const composeRefs2 = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = React.useRef(null);
  const prevWebkitUserSelectRef = React.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef$1(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef$1(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  React.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel)
        handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  React.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef$1(onThumbChange),
      onThumbPointerUp: useCallbackRef$1(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef$1(onThumbPointerDown),
      children: /* @__PURE__ */ jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs2,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport)
                context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport)
              context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = React.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsx(Presence$1, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = React.useRef();
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    React.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll2 = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll2);
        return () => viewport.removeEventListener("scroll", handleScroll2);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = React.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = React.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset2 = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset2;
  const minPointerPos = sizes.scrollbar.paddingStart + offset2;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll)
      handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef$1(callback);
  const debounceTimerRef = React.useRef(0);
  React.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return React.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef$1(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
function getSubtree(options, content) {
  const { asChild, children } = options;
  if (!asChild)
    return typeof content === "function" ? content(children) : content;
  const firstChild = React.Children.only(children);
  return React.cloneElement(firstChild, {
    children: typeof content === "function" ? content(firstChild.props.children) : content
  });
}
var Root$1 = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  Root$1,
  {
    ref,
    className: cn$2("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(Corner, {})
    ]
  }
));
ScrollArea.displayName = Root$1.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn$2(
      "flex touch-none select-none transition-colors pr-0",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-muted-foreground" })
  }
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
function $ae6933e535247d3d$export$7d15b64cf5a3a4c4(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}
let $3db38b7d1fb3fe6a$var$count = 0;
function $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c() {
  useEffect$1(() => {
    var _edgeGuards$, _edgeGuards$2;
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", (_edgeGuards$ = edgeGuards[0]) !== null && _edgeGuards$ !== void 0 ? _edgeGuards$ : $3db38b7d1fb3fe6a$var$createFocusGuard());
    document.body.insertAdjacentElement("beforeend", (_edgeGuards$2 = edgeGuards[1]) !== null && _edgeGuards$2 !== void 0 ? _edgeGuards$2 : $3db38b7d1fb3fe6a$var$createFocusGuard());
    $3db38b7d1fb3fe6a$var$count++;
    return () => {
      if ($3db38b7d1fb3fe6a$var$count === 1)
        document.querySelectorAll("[data-radix-focus-guard]").forEach(
          (node) => node.remove()
        );
      $3db38b7d1fb3fe6a$var$count--;
    };
  }, []);
}
function $3db38b7d1fb3fe6a$var$createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none";
  return element;
}
const $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
const $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
const $d3863c46a17e8a28$var$EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
};
const $d3863c46a17e8a28$export$20e40289641fbbb6 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
  const [container1, setContainer] = useState$1(null);
  const onMountAutoFocus = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onMountAutoFocusProp);
  const onUnmountAutoFocus = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onUnmountAutoFocusProp);
  const lastFocusedElementRef = useRef$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setContainer(node)
  );
  const focusScope = useRef$1({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  useEffect$1(() => {
    if (trapped) {
      let handleFocusIn = function(event) {
        if (focusScope.paused || !container1)
          return;
        const target = event.target;
        if (container1.contains(target))
          lastFocusedElementRef.current = target;
        else
          $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
            select: true
          });
      }, handleFocusOut = function(event) {
        if (focusScope.paused || !container1)
          return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null)
          return;
        if (!container1.contains(relatedTarget))
          $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
            select: true
          });
      }, handleMutations = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body)
          return;
        for (const mutation of mutations)
          if (mutation.removedNodes.length > 0)
            $d3863c46a17e8a28$var$focus(container1);
      };
      document.addEventListener("focusin", handleFocusIn);
      document.addEventListener("focusout", handleFocusOut);
      const mutationObserver = new MutationObserver(handleMutations);
      if (container1)
        mutationObserver.observe(container1, {
          childList: true,
          subtree: true
        });
      return () => {
        document.removeEventListener("focusin", handleFocusIn);
        document.removeEventListener("focusout", handleFocusOut);
        mutationObserver.disconnect();
      };
    }
  }, [
    trapped,
    container1,
    focusScope.paused
  ]);
  useEffect$1(() => {
    if (container1) {
      $d3863c46a17e8a28$var$focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container1.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
        container1.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container1.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          $d3863c46a17e8a28$var$focusFirst($d3863c46a17e8a28$var$removeLinks($d3863c46a17e8a28$var$getTabbableCandidates(container1)), {
            select: true
          });
          if (document.activeElement === previouslyFocusedElement)
            $d3863c46a17e8a28$var$focus(container1);
        }
      }
      return () => {
        container1.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
          container1.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container1.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented)
            $d3863c46a17e8a28$var$focus(previouslyFocusedElement !== null && previouslyFocusedElement !== void 0 ? previouslyFocusedElement : document.body, {
              select: true
            });
          container1.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          $d3863c46a17e8a28$var$focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [
    container1,
    onMountAutoFocus,
    onUnmountAutoFocus,
    focusScope
  ]);
  const handleKeyDown = useCallback$1((event) => {
    if (!loop && !trapped)
      return;
    if (focusScope.paused)
      return;
    const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
    const focusedElement = document.activeElement;
    if (isTabKey && focusedElement) {
      const container = event.currentTarget;
      const [first, last] = $d3863c46a17e8a28$var$getTabbableEdges(container);
      const hasTabbableElementsInside = first && last;
      if (!hasTabbableElementsInside) {
        if (focusedElement === container)
          event.preventDefault();
      } else {
        if (!event.shiftKey && focusedElement === last) {
          event.preventDefault();
          if (loop)
            $d3863c46a17e8a28$var$focus(first, {
              select: true
            });
        } else if (event.shiftKey && focusedElement === first) {
          event.preventDefault();
          if (loop)
            $d3863c46a17e8a28$var$focus(last, {
              select: true
            });
        }
      }
    }
  }, [
    loop,
    trapped,
    focusScope.paused
  ]);
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    tabIndex: -1
  }, scopeProps, {
    ref: composedRefs,
    onKeyDown: handleKeyDown
  }));
});
function $d3863c46a17e8a28$var$focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    $d3863c46a17e8a28$var$focus(candidate, {
      select
    });
    if (document.activeElement !== previouslyFocusedElement)
      return;
  }
}
function $d3863c46a17e8a28$var$getTabbableEdges(container) {
  const candidates = $d3863c46a17e8a28$var$getTabbableCandidates(container);
  const first = $d3863c46a17e8a28$var$findVisible(candidates, container);
  const last = $d3863c46a17e8a28$var$findVisible(candidates.reverse(), container);
  return [
    first,
    last
  ];
}
function $d3863c46a17e8a28$var$getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function $d3863c46a17e8a28$var$findVisible(elements, container) {
  for (const element of elements) {
    if (!$d3863c46a17e8a28$var$isHidden(element, {
      upTo: container
    }))
      return element;
  }
}
function $d3863c46a17e8a28$var$isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (upTo !== void 0 && node === upTo)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function $d3863c46a17e8a28$var$isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function $d3863c46a17e8a28$var$focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({
      preventScroll: true
    });
    if (element !== previouslyFocusedElement && $d3863c46a17e8a28$var$isSelectableInput(element) && select)
      element.select();
  }
}
const $d3863c46a17e8a28$var$focusScopesStack = $d3863c46a17e8a28$var$createFocusScopesStack();
function $d3863c46a17e8a28$var$createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope)
        activeFocusScope === null || activeFocusScope === void 0 || activeFocusScope.pause();
      stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      var _stack$;
      stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
      (_stack$ = stack[0]) === null || _stack$ === void 0 || _stack$.resume();
    }
  };
}
function $d3863c46a17e8a28$var$arrayRemove(array, item) {
  const updatedArray = [
    ...array
  ];
  const index2 = updatedArray.indexOf(item);
  if (index2 !== -1)
    updatedArray.splice(index2, 1);
  return updatedArray;
}
function $d3863c46a17e8a28$var$removeLinks(items) {
  return items.filter(
    (item) => item.tagName !== "A"
  );
}
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live]")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}
function useCallbackRef(initialValue, callback) {
  var ref = useState$1(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef(null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}
var SideCar$1 = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React.createElement(Target, __assign({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar$1;
}
var effectCar = createSidecarMedium();
var nothing = function() {
  return;
};
var RemoveScroll = React.forwardRef(function(props, parentRef) {
  var ref = React.useRef(null);
  var _a = React.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return React.createElement(
    React.Fragment,
    null,
    enabled && React.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref }),
    forwardProps ? React.cloneElement(React.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};
var getNonce = function() {
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter2 = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter2 == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter2++;
    },
    remove: function() {
      counter2--;
      if (!counter2 && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles2, isDynamic) {
    React.useEffect(function() {
      sheet.add(styles2);
      return function() {
        sheet.remove();
      };
    }, [styles2 && isDynamic]);
  };
};
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var styles2 = _a.styles, dynamic = _a.dynamic;
    useStyle(styles2, dynamic);
    return null;
  };
  return Sheet;
};
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
  var counter2 = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter2) ? counter2 : 0;
};
var useLockAttribute = function() {
  React.useEffect(function() {
    document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
    return function() {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function(_a) {
  var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  useLockAttribute();
  var gap = React.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return React.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  var styles2 = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles2[overflow] !== "hidden" && // contains scroll inside self
    !(styles2.overflowY === styles2.overflowX && !alwaysContainsScroll(node) && styles2[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), s = _a[1], d = _a[2];
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== document.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (availableScroll === 0 || !noOverscroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (availableScrollTop === 0 || !noOverscroll)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React.useRef([]);
  var touchStartRef = React.useRef([0, 0]);
  var activeAxis = React.useRef();
  var id = React.useState(idCounter++)[0];
  var Style2 = React.useState(function() {
    return styleSingleton();
  })[0];
  var lastProps = React.useRef(props);
  React.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && e.target === event.target && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React.createElement(
    React.Fragment,
    null,
    inert ? React.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? React.createElement(RemoveScrollBar, { gapMode: "margin" }) : null
  );
}
const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = React.forwardRef(function(props, ref) {
  return React.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
const $cc7e05a45900e73f$var$OPEN_KEYS = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
];
const $cc7e05a45900e73f$var$SELECTION_KEYS = [
  " ",
  "Enter"
];
const $cc7e05a45900e73f$var$SELECT_NAME = "Select";
const [$cc7e05a45900e73f$var$Collection, $cc7e05a45900e73f$var$useCollection, $cc7e05a45900e73f$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($cc7e05a45900e73f$var$SELECT_NAME);
const [$cc7e05a45900e73f$var$createSelectContext, $cc7e05a45900e73f$export$286727a75dc039bd] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($cc7e05a45900e73f$var$SELECT_NAME, [
  $cc7e05a45900e73f$var$createCollectionScope,
  $cf1ac5d9fe0e8206$export$722aac194ae923
]);
const $cc7e05a45900e73f$var$usePopperScope = $cf1ac5d9fe0e8206$export$722aac194ae923();
const [$cc7e05a45900e73f$var$SelectProvider, $cc7e05a45900e73f$var$useSelectContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$SELECT_NAME);
const [$cc7e05a45900e73f$var$SelectNativeOptionsProvider, $cc7e05a45900e73f$var$useSelectNativeOptionsContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$SELECT_NAME);
const $cc7e05a45900e73f$var$TRIGGER_NAME = "SelectTrigger";
const $cc7e05a45900e73f$export$3ac1e88a1c0b9f1 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, disabled = false, ...triggerProps } = props;
  const popperScope = $cc7e05a45900e73f$var$usePopperScope(__scopeSelect);
  const context = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$TRIGGER_NAME, __scopeSelect);
  const isDisabled = context.disabled || disabled;
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, context.onTriggerChange);
  const getItems = $cc7e05a45900e73f$var$useCollection(__scopeSelect);
  const [searchRef, handleTypeaheadSearch, resetTypeahead] = $cc7e05a45900e73f$var$useTypeaheadSearch((search) => {
    const enabledItems = getItems().filter(
      (item) => !item.disabled
    );
    const currentItem = enabledItems.find(
      (item) => item.value === context.value
    );
    const nextItem = $cc7e05a45900e73f$var$findNextItem(enabledItems, search, currentItem);
    if (nextItem !== void 0)
      context.onValueChange(nextItem.value);
  });
  const handleOpen = () => {
    if (!isDisabled) {
      context.onOpenChange(true);
      resetTypeahead();
    }
  };
  return /* @__PURE__ */ createElement$1($cf1ac5d9fe0e8206$export$b688253958b8dfe7, _extends$1({
    asChild: true
  }, popperScope), /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends$1({
    type: "button",
    role: "combobox",
    "aria-controls": context.contentId,
    "aria-expanded": context.open,
    "aria-required": context.required,
    "aria-autocomplete": "none",
    dir: context.dir,
    "data-state": context.open ? "open" : "closed",
    disabled: isDisabled,
    "data-disabled": isDisabled ? "" : void 0,
    "data-placeholder": $cc7e05a45900e73f$var$shouldShowPlaceholder(context.value) ? "" : void 0
  }, triggerProps, {
    ref: composedRefs,
    onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(triggerProps.onClick, (event) => {
      event.currentTarget.focus();
    }),
    onPointerDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(triggerProps.onPointerDown, (event) => {
      const target = event.target;
      if (target.hasPointerCapture(event.pointerId))
        target.releasePointerCapture(event.pointerId);
      if (event.button === 0 && event.ctrlKey === false) {
        handleOpen();
        context.triggerPointerDownPosRef.current = {
          x: Math.round(event.pageX),
          y: Math.round(event.pageY)
        };
        event.preventDefault();
      }
    }),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(triggerProps.onKeyDown, (event) => {
      const isTypingAhead = searchRef.current !== "";
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      if (!isModifierKey && event.key.length === 1)
        handleTypeaheadSearch(event.key);
      if (isTypingAhead && event.key === " ")
        return;
      if ($cc7e05a45900e73f$var$OPEN_KEYS.includes(event.key)) {
        handleOpen();
        event.preventDefault();
      }
    })
  })));
});
const $cc7e05a45900e73f$export$99b400cabb58c515 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, children, ...iconProps } = props;
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends$1({
    "aria-hidden": true
  }, iconProps, {
    ref: forwardedRef
  }), children || "▼");
});
const $cc7e05a45900e73f$export$b2af6c9944296213 = (props) => {
  return /* @__PURE__ */ createElement$1($f1701beae083dbae$export$602eac185826482c, _extends$1({
    asChild: true
  }, props));
};
const $cc7e05a45900e73f$var$CONTENT_NAME = "SelectContent";
const $cc7e05a45900e73f$export$c973a4b3cb86a03d = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const context = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, props.__scopeSelect);
  const [fragment, setFragment] = useState$1();
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    setFragment(new DocumentFragment());
  }, []);
  if (!context.open) {
    const frag = fragment;
    return frag ? /* @__PURE__ */ createPortal(/* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$SelectContentProvider, {
      scope: props.__scopeSelect
    }, /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$Collection.Slot, {
      scope: props.__scopeSelect
    }, /* @__PURE__ */ createElement$1("div", null, props.children))), frag) : null;
  }
  return /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$SelectContentImpl, _extends$1({}, props, {
    ref: forwardedRef
  }));
});
const $cc7e05a45900e73f$var$CONTENT_MARGIN = 10;
const [$cc7e05a45900e73f$var$SelectContentProvider, $cc7e05a45900e73f$var$useSelectContentContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$CONTENT_NAME);
const $cc7e05a45900e73f$var$SelectContentImpl = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const {
    __scopeSelect,
    position = "item-aligned",
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    avoidCollisions,
    //
    ...contentProps
  } = props;
  const context = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, __scopeSelect);
  const [content, setContent] = useState$1(null);
  const [viewport, setViewport] = useState$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setContent(node)
  );
  const [selectedItem, setSelectedItem] = useState$1(null);
  const [selectedItemText, setSelectedItemText] = useState$1(null);
  const getItems = $cc7e05a45900e73f$var$useCollection(__scopeSelect);
  const [isPositioned, setIsPositioned] = useState$1(false);
  const firstValidItemFoundRef = useRef$1(false);
  useEffect$1(() => {
    if (content)
      return hideOthers(content);
  }, [
    content
  ]);
  $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c();
  const focusFirst2 = useCallback$1((candidates) => {
    const [firstItem, ...restItems] = getItems().map(
      (item) => item.ref.current
    );
    const [lastItem] = restItems.slice(-1);
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
        return;
      candidate === null || candidate === void 0 || candidate.scrollIntoView({
        block: "nearest"
      });
      if (candidate === firstItem && viewport)
        viewport.scrollTop = 0;
      if (candidate === lastItem && viewport)
        viewport.scrollTop = viewport.scrollHeight;
      candidate === null || candidate === void 0 || candidate.focus();
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
        return;
    }
  }, [
    getItems,
    viewport
  ]);
  const focusSelectedItem = useCallback$1(
    () => focusFirst2([
      selectedItem,
      content
    ]),
    [
      focusFirst2,
      selectedItem,
      content
    ]
  );
  useEffect$1(() => {
    if (isPositioned)
      focusSelectedItem();
  }, [
    isPositioned,
    focusSelectedItem
  ]);
  const { onOpenChange, triggerPointerDownPosRef } = context;
  useEffect$1(() => {
    if (content) {
      let pointerMoveDelta = {
        x: 0,
        y: 0
      };
      const handlePointerMove = (event) => {
        var _triggerPointerDownPo, _triggerPointerDownPo2, _triggerPointerDownPo3, _triggerPointerDownPo4;
        pointerMoveDelta = {
          x: Math.abs(Math.round(event.pageX) - ((_triggerPointerDownPo = (_triggerPointerDownPo2 = triggerPointerDownPosRef.current) === null || _triggerPointerDownPo2 === void 0 ? void 0 : _triggerPointerDownPo2.x) !== null && _triggerPointerDownPo !== void 0 ? _triggerPointerDownPo : 0)),
          y: Math.abs(Math.round(event.pageY) - ((_triggerPointerDownPo3 = (_triggerPointerDownPo4 = triggerPointerDownPosRef.current) === null || _triggerPointerDownPo4 === void 0 ? void 0 : _triggerPointerDownPo4.y) !== null && _triggerPointerDownPo3 !== void 0 ? _triggerPointerDownPo3 : 0))
        };
      };
      const handlePointerUp = (event) => {
        if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10)
          event.preventDefault();
        else if (!content.contains(event.target))
          onOpenChange(false);
        document.removeEventListener("pointermove", handlePointerMove);
        triggerPointerDownPosRef.current = null;
      };
      if (triggerPointerDownPosRef.current !== null) {
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp, {
          capture: true,
          once: true
        });
      }
      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp, {
          capture: true
        });
      };
    }
  }, [
    content,
    onOpenChange,
    triggerPointerDownPosRef
  ]);
  useEffect$1(() => {
    const close = () => onOpenChange(false);
    window.addEventListener("blur", close);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("blur", close);
      window.removeEventListener("resize", close);
    };
  }, [
    onOpenChange
  ]);
  const [searchRef, handleTypeaheadSearch] = $cc7e05a45900e73f$var$useTypeaheadSearch((search) => {
    const enabledItems = getItems().filter(
      (item) => !item.disabled
    );
    const currentItem = enabledItems.find(
      (item) => item.ref.current === document.activeElement
    );
    const nextItem = $cc7e05a45900e73f$var$findNextItem(enabledItems, search, currentItem);
    if (nextItem)
      setTimeout(
        () => nextItem.ref.current.focus()
      );
  });
  const itemRefCallback = useCallback$1((node, value, disabled) => {
    const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
    const isSelectedItem = context.value !== void 0 && context.value === value;
    if (isSelectedItem || isFirstValidItem) {
      setSelectedItem(node);
      if (isFirstValidItem)
        firstValidItemFoundRef.current = true;
    }
  }, [
    context.value
  ]);
  const handleItemLeave = useCallback$1(
    () => content === null || content === void 0 ? void 0 : content.focus(),
    [
      content
    ]
  );
  const itemTextRefCallback = useCallback$1((node, value, disabled) => {
    const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
    const isSelectedItem = context.value !== void 0 && context.value === value;
    if (isSelectedItem || isFirstValidItem)
      setSelectedItemText(node);
  }, [
    context.value
  ]);
  const SelectPosition = position === "popper" ? $cc7e05a45900e73f$var$SelectPopperPosition : $cc7e05a45900e73f$var$SelectItemAlignedPosition;
  const popperContentProps = SelectPosition === $cc7e05a45900e73f$var$SelectPopperPosition ? {
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    avoidCollisions
  } : {};
  return /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$SelectContentProvider, {
    scope: __scopeSelect,
    content,
    viewport,
    onViewportChange: setViewport,
    itemRefCallback,
    selectedItem,
    onItemLeave: handleItemLeave,
    itemTextRefCallback,
    focusSelectedItem,
    selectedItemText,
    position,
    isPositioned,
    searchRef
  }, /* @__PURE__ */ createElement$1(ReactRemoveScroll, {
    as: Slot,
    allowPinchZoom: true
  }, /* @__PURE__ */ createElement$1($d3863c46a17e8a28$export$20e40289641fbbb6, {
    asChild: true,
    trapped: context.open,
    onMountAutoFocus: (event) => {
      event.preventDefault();
    },
    onUnmountAutoFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(onCloseAutoFocus, (event) => {
      var _context$trigger;
      (_context$trigger = context.trigger) === null || _context$trigger === void 0 || _context$trigger.focus({
        preventScroll: true
      });
      event.preventDefault();
    })
  }, /* @__PURE__ */ createElement$1($5cb92bef7577960e$export$177fb62ff3ec1f22, {
    asChild: true,
    disableOutsidePointerEvents: true,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside: (event) => event.preventDefault(),
    onDismiss: () => context.onOpenChange(false)
  }, /* @__PURE__ */ createElement$1(SelectPosition, _extends$1({
    role: "listbox",
    id: context.contentId,
    "data-state": context.open ? "open" : "closed",
    dir: context.dir,
    onContextMenu: (event) => event.preventDefault()
  }, contentProps, popperContentProps, {
    onPlaced: () => setIsPositioned(true),
    ref: composedRefs,
    style: {
      // flex layout so we can place the scroll buttons properly
      display: "flex",
      flexDirection: "column",
      // reset the outline by default as the content MAY get focused
      outline: "none",
      ...contentProps.style
    },
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(contentProps.onKeyDown, (event) => {
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      if (event.key === "Tab")
        event.preventDefault();
      if (!isModifierKey && event.key.length === 1)
        handleTypeaheadSearch(event.key);
      if ([
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(event.key)) {
        const items = getItems().filter(
          (item) => !item.disabled
        );
        let candidateNodes = items.map(
          (item) => item.ref.current
        );
        if ([
          "ArrowUp",
          "End"
        ].includes(event.key))
          candidateNodes = candidateNodes.slice().reverse();
        if ([
          "ArrowUp",
          "ArrowDown"
        ].includes(event.key)) {
          const currentElement = event.target;
          const currentIndex = candidateNodes.indexOf(currentElement);
          candidateNodes = candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(
          () => focusFirst2(candidateNodes)
        );
        event.preventDefault();
      }
    })
  }))))));
});
const $cc7e05a45900e73f$var$SelectItemAlignedPosition = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, __scopeSelect);
  const contentContext = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$CONTENT_NAME, __scopeSelect);
  const [contentWrapper, setContentWrapper] = useState$1(null);
  const [content, setContent] = useState$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setContent(node)
  );
  const getItems = $cc7e05a45900e73f$var$useCollection(__scopeSelect);
  const shouldExpandOnScrollRef = useRef$1(false);
  const shouldRepositionRef = useRef$1(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = useCallback$1(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - $cc7e05a45900e73f$var$CONTENT_MARGIN;
        const clampedLeft = $ae6933e535247d3d$export$7d15b64cf5a3a4c4(left, [
          $cc7e05a45900e73f$var$CONTENT_MARGIN,
          rightEdge - contentWidth
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - $cc7e05a45900e73f$var$CONTENT_MARGIN;
        const clampedRight = $ae6933e535247d3d$export$7d15b64cf5a3a4c4(right, [
          $cc7e05a45900e73f$var$CONTENT_MARGIN,
          leftEdge - contentWidth
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - $cc7e05a45900e73f$var$CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - $cc7e05a45900e73f$var$CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight);
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${$cc7e05a45900e73f$var$CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced === null || onPlaced === void 0 || onPlaced();
      requestAnimationFrame(
        () => shouldExpandOnScrollRef.current = true
      );
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  $9f79659886946c16$export$e5c5a5f917a5871c(
    () => position(),
    [
      position
    ]
  );
  const [contentZIndex, setContentZIndex] = useState$1();
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (content)
      setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [
    content
  ]);
  const handleScrollButtonChange = useCallback$1((node) => {
    if (node && shouldRepositionRef.current === true) {
      position();
      focusSelectedItem === null || focusSelectedItem === void 0 || focusSelectedItem();
      shouldRepositionRef.current = false;
    }
  }, [
    position,
    focusSelectedItem
  ]);
  return /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$SelectViewportProvider, {
    scope: __scopeSelect,
    contentWrapper,
    shouldExpandOnScrollRef,
    onScrollButtonChange: handleScrollButtonChange
  }, /* @__PURE__ */ createElement$1("div", {
    ref: setContentWrapper,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      zIndex: contentZIndex
    }
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({}, popperProps, {
    ref: composedRefs,
    style: {
      // When we get the height of the content, it includes borders. If we were to set
      // the height without having `boxSizing: 'border-box'` it would be too big.
      boxSizing: "border-box",
      // We need to ensure the content doesn't get taller than the wrapper
      maxHeight: "100%",
      ...popperProps.style
    }
  }))));
});
const $cc7e05a45900e73f$var$SelectPopperPosition = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, align = "start", collisionPadding = $cc7e05a45900e73f$var$CONTENT_MARGIN, ...popperProps } = props;
  const popperScope = $cc7e05a45900e73f$var$usePopperScope(__scopeSelect);
  return /* @__PURE__ */ createElement$1($cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2, _extends$1({}, popperScope, popperProps, {
    ref: forwardedRef,
    align,
    collisionPadding,
    style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      ...popperProps.style,
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    }
  }));
});
const [$cc7e05a45900e73f$var$SelectViewportProvider, $cc7e05a45900e73f$var$useSelectViewportContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$CONTENT_NAME, {});
const $cc7e05a45900e73f$var$VIEWPORT_NAME = "SelectViewport";
const $cc7e05a45900e73f$export$9ed6e7b40248d36d = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, ...viewportProps } = props;
  const contentContext = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$VIEWPORT_NAME, __scopeSelect);
  const viewportContext = $cc7e05a45900e73f$var$useSelectViewportContext($cc7e05a45900e73f$var$VIEWPORT_NAME, __scopeSelect);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, contentContext.onViewportChange);
  const prevScrollTopRef = useRef$1(0);
  return /* @__PURE__ */ createElement$1(Fragment$1, null, /* @__PURE__ */ createElement$1("style", {
    dangerouslySetInnerHTML: {
      __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
    }
  }), /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$Collection.Slot, {
    scope: __scopeSelect
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    "data-radix-select-viewport": "",
    role: "presentation"
  }, viewportProps, {
    ref: composedRefs,
    style: {
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: "relative",
      flex: 1,
      overflow: "auto",
      ...viewportProps.style
    },
    onScroll: $e42e1063c40fb3ef$export$b9ecd428b558ff10(viewportProps.onScroll, (event) => {
      const viewport = event.currentTarget;
      const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
      if (shouldExpandOnScrollRef !== null && shouldExpandOnScrollRef !== void 0 && shouldExpandOnScrollRef.current && contentWrapper) {
        const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
        if (scrolledBy > 0) {
          const availableHeight = window.innerHeight - $cc7e05a45900e73f$var$CONTENT_MARGIN * 2;
          const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
          const cssHeight = parseFloat(contentWrapper.style.height);
          const prevHeight = Math.max(cssMinHeight, cssHeight);
          if (prevHeight < availableHeight) {
            const nextHeight = prevHeight + scrolledBy;
            const clampedNextHeight = Math.min(availableHeight, nextHeight);
            const heightDiff = nextHeight - clampedNextHeight;
            contentWrapper.style.height = clampedNextHeight + "px";
            if (contentWrapper.style.bottom === "0px") {
              viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
              contentWrapper.style.justifyContent = "flex-end";
            }
          }
        }
      }
      prevScrollTopRef.current = viewport.scrollTop;
    })
  }))));
});
const $cc7e05a45900e73f$var$GROUP_NAME = "SelectGroup";
const [$cc7e05a45900e73f$var$SelectGroupContextProvider, $cc7e05a45900e73f$var$useSelectGroupContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$GROUP_NAME);
const $cc7e05a45900e73f$var$LABEL_NAME = "SelectLabel";
const $cc7e05a45900e73f$export$f67338d29bd972f8 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, ...labelProps } = props;
  const groupContext = $cc7e05a45900e73f$var$useSelectGroupContext($cc7e05a45900e73f$var$LABEL_NAME, __scopeSelect);
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    id: groupContext.id
  }, labelProps, {
    ref: forwardedRef
  }));
});
const $cc7e05a45900e73f$var$ITEM_NAME = "SelectItem";
const [$cc7e05a45900e73f$var$SelectItemContextProvider, $cc7e05a45900e73f$var$useSelectItemContext] = $cc7e05a45900e73f$var$createSelectContext($cc7e05a45900e73f$var$ITEM_NAME);
const $cc7e05a45900e73f$export$13ef48a934230896 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, value, disabled = false, textValue: textValueProp, ...itemProps } = props;
  const context = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$ITEM_NAME, __scopeSelect);
  const contentContext = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$ITEM_NAME, __scopeSelect);
  const isSelected = context.value === value;
  const [textValue, setTextValue] = useState$1(textValueProp !== null && textValueProp !== void 0 ? textValueProp : "");
  const [isFocused, setIsFocused] = useState$1(false);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, (node) => {
    var _contentContext$itemR;
    return (_contentContext$itemR = contentContext.itemRefCallback) === null || _contentContext$itemR === void 0 ? void 0 : _contentContext$itemR.call(contentContext, node, value, disabled);
  });
  const textId = $1746a345f3d73bb7$export$f680877a34711e37();
  const handleSelect = () => {
    if (!disabled) {
      context.onValueChange(value);
      context.onOpenChange(false);
    }
  };
  if (value === "")
    throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
  return /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$SelectItemContextProvider, {
    scope: __scopeSelect,
    value,
    disabled,
    textId,
    isSelected,
    onItemTextChange: useCallback$1((node) => {
      setTextValue((prevTextValue) => {
        var _node$textContent;
        return prevTextValue || ((_node$textContent = node === null || node === void 0 ? void 0 : node.textContent) !== null && _node$textContent !== void 0 ? _node$textContent : "").trim();
      });
    }, [])
  }, /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$Collection.ItemSlot, {
    scope: __scopeSelect,
    value,
    disabled,
    textValue
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    role: "option",
    "aria-labelledby": textId,
    "data-highlighted": isFocused ? "" : void 0,
    "aria-selected": isSelected && isFocused,
    "data-state": isSelected ? "checked" : "unchecked",
    "aria-disabled": disabled || void 0,
    "data-disabled": disabled ? "" : void 0,
    tabIndex: disabled ? void 0 : -1
  }, itemProps, {
    ref: composedRefs,
    onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      itemProps.onFocus,
      () => setIsFocused(true)
    ),
    onBlur: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      itemProps.onBlur,
      () => setIsFocused(false)
    ),
    onPointerUp: $e42e1063c40fb3ef$export$b9ecd428b558ff10(itemProps.onPointerUp, handleSelect),
    onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(itemProps.onPointerMove, (event) => {
      if (disabled) {
        var _contentContext$onIte;
        (_contentContext$onIte = contentContext.onItemLeave) === null || _contentContext$onIte === void 0 || _contentContext$onIte.call(contentContext);
      } else
        event.currentTarget.focus({
          preventScroll: true
        });
    }),
    onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(itemProps.onPointerLeave, (event) => {
      if (event.currentTarget === document.activeElement) {
        var _contentContext$onIte2;
        (_contentContext$onIte2 = contentContext.onItemLeave) === null || _contentContext$onIte2 === void 0 || _contentContext$onIte2.call(contentContext);
      }
    }),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(itemProps.onKeyDown, (event) => {
      var _contentContext$searc;
      const isTypingAhead = ((_contentContext$searc = contentContext.searchRef) === null || _contentContext$searc === void 0 ? void 0 : _contentContext$searc.current) !== "";
      if (isTypingAhead && event.key === " ")
        return;
      if ($cc7e05a45900e73f$var$SELECTION_KEYS.includes(event.key))
        handleSelect();
      if (event.key === " ")
        event.preventDefault();
    })
  }))));
});
const $cc7e05a45900e73f$var$ITEM_TEXT_NAME = "SelectItemText";
const $cc7e05a45900e73f$export$3572fb0fb821ff49 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, className, style, ...itemTextProps } = props;
  const context = $cc7e05a45900e73f$var$useSelectContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, __scopeSelect);
  const contentContext = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, __scopeSelect);
  const itemContext = $cc7e05a45900e73f$var$useSelectItemContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, __scopeSelect);
  const nativeOptionsContext = $cc7e05a45900e73f$var$useSelectNativeOptionsContext($cc7e05a45900e73f$var$ITEM_TEXT_NAME, __scopeSelect);
  const [itemTextNode, setItemTextNode] = useState$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setItemTextNode(node),
    itemContext.onItemTextChange,
    (node) => {
      var _contentContext$itemT;
      return (_contentContext$itemT = contentContext.itemTextRefCallback) === null || _contentContext$itemT === void 0 ? void 0 : _contentContext$itemT.call(contentContext, node, itemContext.value, itemContext.disabled);
    }
  );
  const textContent = itemTextNode === null || itemTextNode === void 0 ? void 0 : itemTextNode.textContent;
  const nativeOption = useMemo$1(
    () => /* @__PURE__ */ createElement$1("option", {
      key: itemContext.value,
      value: itemContext.value,
      disabled: itemContext.disabled
    }, textContent),
    [
      itemContext.disabled,
      itemContext.value,
      textContent
    ]
  );
  const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    onNativeOptionAdd(nativeOption);
    return () => onNativeOptionRemove(nativeOption);
  }, [
    onNativeOptionAdd,
    onNativeOptionRemove,
    nativeOption
  ]);
  return /* @__PURE__ */ createElement$1(Fragment$1, null, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends$1({
    id: itemContext.textId
  }, itemTextProps, {
    ref: composedRefs
  })), itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? /* @__PURE__ */ createPortal(itemTextProps.children, context.valueNode) : null);
});
const $cc7e05a45900e73f$var$ITEM_INDICATOR_NAME = "SelectItemIndicator";
const $cc7e05a45900e73f$export$6b9198de19accfe6 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, ...itemIndicatorProps } = props;
  const itemContext = $cc7e05a45900e73f$var$useSelectItemContext($cc7e05a45900e73f$var$ITEM_INDICATOR_NAME, __scopeSelect);
  return itemContext.isSelected ? /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends$1({
    "aria-hidden": true
  }, itemIndicatorProps, {
    ref: forwardedRef
  })) : null;
});
const $cc7e05a45900e73f$var$SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
const $cc7e05a45900e73f$export$d8117927658af6d7 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const contentContext = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = $cc7e05a45900e73f$var$useSelectViewportContext($cc7e05a45900e73f$var$SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp1, setCanScrollUp] = useState$1(false);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, viewportContext.onScrollButtonChange);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const canScrollUp = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [
    contentContext.viewport,
    contentContext.isPositioned
  ]);
  return canScrollUp1 ? /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$SelectScrollButtonImpl, _extends$1({}, props, {
    ref: composedRefs,
    onAutoScroll: () => {
      const { viewport, selectedItem } = contentContext;
      if (viewport && selectedItem)
        viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
    }
  })) : null;
});
const $cc7e05a45900e73f$var$SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
const $cc7e05a45900e73f$export$ff951e476c12189 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const contentContext = $cc7e05a45900e73f$var$useSelectContentContext($cc7e05a45900e73f$var$SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = $cc7e05a45900e73f$var$useSelectViewportContext($cc7e05a45900e73f$var$SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown1, setCanScrollDown] = useState$1(false);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, viewportContext.onScrollButtonChange);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [
    contentContext.viewport,
    contentContext.isPositioned
  ]);
  return canScrollDown1 ? /* @__PURE__ */ createElement$1($cc7e05a45900e73f$var$SelectScrollButtonImpl, _extends$1({}, props, {
    ref: composedRefs,
    onAutoScroll: () => {
      const { viewport, selectedItem } = contentContext;
      if (viewport && selectedItem)
        viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
    }
  })) : null;
});
const $cc7e05a45900e73f$var$SelectScrollButtonImpl = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = $cc7e05a45900e73f$var$useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = useRef$1(null);
  const getItems = $cc7e05a45900e73f$var$useCollection(__scopeSelect);
  const clearAutoScrollTimer = useCallback$1(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  useEffect$1(() => {
    return () => clearAutoScrollTimer();
  }, [
    clearAutoScrollTimer
  ]);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    var _activeItem$ref$curre;
    const activeItem = getItems().find(
      (item) => item.ref.current === document.activeElement
    );
    activeItem === null || activeItem === void 0 || (_activeItem$ref$curre = activeItem.ref.current) === null || _activeItem$ref$curre === void 0 || _activeItem$ref$curre.scrollIntoView({
      block: "nearest"
    });
  }, [
    getItems
  ]);
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    "aria-hidden": true
  }, scrollIndicatorProps, {
    ref: forwardedRef,
    style: {
      flexShrink: 0,
      ...scrollIndicatorProps.style
    },
    onPointerDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(scrollIndicatorProps.onPointerDown, () => {
      if (autoScrollTimerRef.current === null)
        autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
    }),
    onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(scrollIndicatorProps.onPointerMove, () => {
      var _contentContext$onIte3;
      (_contentContext$onIte3 = contentContext.onItemLeave) === null || _contentContext$onIte3 === void 0 || _contentContext$onIte3.call(contentContext);
      if (autoScrollTimerRef.current === null)
        autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
    }),
    onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(scrollIndicatorProps.onPointerLeave, () => {
      clearAutoScrollTimer();
    })
  }));
});
const $cc7e05a45900e73f$export$eba4b1df07cb1d3 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSelect, ...separatorProps } = props;
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends$1({
    "aria-hidden": true
  }, separatorProps, {
    ref: forwardedRef
  }));
});
function $cc7e05a45900e73f$var$shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
const $cc7e05a45900e73f$var$BubbleSelect = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { value, ...selectProps } = props;
  const ref = useRef$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const prevValue = $010c2913dbd2fe3d$export$5cae361ad82dce8b(value);
  useEffect$1(() => {
    const select = ref.current;
    const selectProto = window.HTMLSelectElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(selectProto, "value");
    const setValue = descriptor.set;
    if (prevValue !== value && setValue) {
      const event = new Event("change", {
        bubbles: true
      });
      setValue.call(select, value);
      select.dispatchEvent(event);
    }
  }, [
    prevValue,
    value
  ]);
  return /* @__PURE__ */ createElement$1($ea1ef594cf570d83$export$439d29a4e110a164, {
    asChild: true
  }, /* @__PURE__ */ createElement$1("select", _extends$1({}, selectProps, {
    ref: composedRefs,
    defaultValue: value
  })));
});
$cc7e05a45900e73f$var$BubbleSelect.displayName = "BubbleSelect";
function $cc7e05a45900e73f$var$useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onSearchChange);
  const searchRef = useRef$1("");
  const timerRef = useRef$1(0);
  const handleTypeaheadSearch = useCallback$1((key) => {
    const search = searchRef.current + key;
    handleSearchChange(search);
    (function updateSearch(value) {
      searchRef.current = value;
      window.clearTimeout(timerRef.current);
      if (value !== "")
        timerRef.current = window.setTimeout(
          () => updateSearch(""),
          1e3
        );
    })(search);
  }, [
    handleSearchChange
  ]);
  const resetTypeahead = useCallback$1(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  useEffect$1(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [
    searchRef,
    handleTypeaheadSearch,
    resetTypeahead
  ];
}
function $cc7e05a45900e73f$var$findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every(
    (char) => char === search[0]
  );
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = $cc7e05a45900e73f$var$wrapArray(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem)
    wrappedItems = wrappedItems.filter(
      (v2) => v2 !== currentItem
    );
  const nextItem = wrappedItems.find(
    (item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextItem !== currentItem ? nextItem : void 0;
}
function $cc7e05a45900e73f$var$wrapArray(array, startIndex) {
  return array.map(
    (_, index2) => array[(startIndex + index2) % array.length]
  );
}
const $cc7e05a45900e73f$export$41fb9f06171c75f4 = $cc7e05a45900e73f$export$3ac1e88a1c0b9f1;
const $cc7e05a45900e73f$export$f04a61298a47a40f = $cc7e05a45900e73f$export$99b400cabb58c515;
const $cc7e05a45900e73f$export$602eac185826482c = $cc7e05a45900e73f$export$b2af6c9944296213;
const $cc7e05a45900e73f$export$7c6e2c02157bb7d2 = $cc7e05a45900e73f$export$c973a4b3cb86a03d;
const $cc7e05a45900e73f$export$d5c6c08dc2d3ca7 = $cc7e05a45900e73f$export$9ed6e7b40248d36d;
const $cc7e05a45900e73f$export$b04be29aa201d4f5 = $cc7e05a45900e73f$export$f67338d29bd972f8;
const $cc7e05a45900e73f$export$6d08773d2e66f8f2 = $cc7e05a45900e73f$export$13ef48a934230896;
const $cc7e05a45900e73f$export$d6e5bf9c43ea9319 = $cc7e05a45900e73f$export$3572fb0fb821ff49;
const $cc7e05a45900e73f$export$c3468e2714d175fa = $cc7e05a45900e73f$export$6b9198de19accfe6;
const $cc7e05a45900e73f$export$2f60d3ec9ad468f2 = $cc7e05a45900e73f$export$d8117927658af6d7;
const $cc7e05a45900e73f$export$bf1aedc3039c8d63 = $cc7e05a45900e73f$export$ff951e476c12189;
const $cc7e05a45900e73f$export$1ff3c3f08ae963c0 = $cc7e05a45900e73f$export$eba4b1df07cb1d3;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  $cc7e05a45900e73f$export$41fb9f06171c75f4,
  {
    ref,
    className: cn$2(
      "flex h-10 w-full items-center justify-between rounded-md theme-border primary-gradient-subtle px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-primary/5",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx($cc7e05a45900e73f$export$f04a61298a47a40f, { asChild: true, children: /* @__PURE__ */ jsx(Icon, { name: IconName.chevronGrabberVertical, className: "h-4 w-4" }) })
    ]
  }
));
SelectTrigger.displayName = $cc7e05a45900e73f$export$41fb9f06171c75f4.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  $cc7e05a45900e73f$export$2f60d3ec9ad468f2,
  {
    ref,
    className: cn$2(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(Icon, { name: IconName.chevronTopSmall, className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = $cc7e05a45900e73f$export$2f60d3ec9ad468f2.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  $cc7e05a45900e73f$export$bf1aedc3039c8d63,
  {
    ref,
    className: cn$2(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(Icon, { name: IconName.chevronDownSmall, className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = $cc7e05a45900e73f$export$bf1aedc3039c8d63.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx($cc7e05a45900e73f$export$602eac185826482c, { children: /* @__PURE__ */ jsxs(
  $cc7e05a45900e73f$export$7c6e2c02157bb7d2,
  {
    ref,
    className: cn$2(
      "relative z-50 max-h-96 w-max overflow-hidden rounded-md theme-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        $cc7e05a45900e73f$export$d5c6c08dc2d3ca7,
        {
          className: cn$2(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = $cc7e05a45900e73f$export$7c6e2c02157bb7d2.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  $cc7e05a45900e73f$export$b04be29aa201d4f5,
  {
    ref,
    className: cn$2("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = $cc7e05a45900e73f$export$b04be29aa201d4f5.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  $cc7e05a45900e73f$export$6d08773d2e66f8f2,
  {
    ref,
    className: cn$2(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx($cc7e05a45900e73f$export$c3468e2714d175fa, { children: /* @__PURE__ */ jsx(Icon, { name: IconName.checkmark, className: "h-3 w-3" }) }) }),
      /* @__PURE__ */ jsx($cc7e05a45900e73f$export$d6e5bf9c43ea9319, { children })
    ]
  }
));
SelectItem.displayName = $cc7e05a45900e73f$export$6d08773d2e66f8f2.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  $cc7e05a45900e73f$export$1ff3c3f08ae963c0,
  {
    ref,
    className: cn$2("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = $cc7e05a45900e73f$export$1ff3c3f08ae963c0.displayName;
React.createContext({
  isMobileView: false,
  setIsMobileView: () => {
  },
  isCollapsed: false,
  setIsCollapsed: () => {
  }
});
const $6be4966fd9bbc698$var$SWITCH_NAME = "Switch";
const [$6be4966fd9bbc698$var$createSwitchContext, $6be4966fd9bbc698$export$cf7f5f17f69cbd43] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($6be4966fd9bbc698$var$SWITCH_NAME);
const [$6be4966fd9bbc698$var$SwitchProvider, $6be4966fd9bbc698$var$useSwitchContext] = $6be4966fd9bbc698$var$createSwitchContext($6be4966fd9bbc698$var$SWITCH_NAME);
const $6be4966fd9bbc698$export$b5d5cf8927ab7262 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSwitch, name, checked: checkedProp, defaultChecked, required, disabled, value = "on", onCheckedChange, ...switchProps } = props;
  const [button, setButton] = useState$1(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setButton(node)
  );
  const hasConsumerStoppedPropagationRef = useRef$1(false);
  const isFormControl = button ? Boolean(button.closest("form")) : true;
  const [checked = false, setChecked] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange
  });
  return /* @__PURE__ */ createElement$1($6be4966fd9bbc698$var$SwitchProvider, {
    scope: __scopeSwitch,
    checked,
    disabled
  }, /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends$1({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    "aria-required": required,
    "data-state": $6be4966fd9bbc698$var$getState(checked),
    "data-disabled": disabled ? "" : void 0,
    disabled,
    value
  }, switchProps, {
    ref: composedRefs,
    onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onClick, (event) => {
      setChecked(
        (prevChecked) => !prevChecked
      );
      if (isFormControl) {
        hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
        if (!hasConsumerStoppedPropagationRef.current)
          event.stopPropagation();
      }
    })
  })), isFormControl && /* @__PURE__ */ createElement$1($6be4966fd9bbc698$var$BubbleInput, {
    control: button,
    bubbles: !hasConsumerStoppedPropagationRef.current,
    name,
    value,
    checked,
    required,
    disabled,
    style: {
      transform: "translateX(-100%)"
    }
  }));
});
const $6be4966fd9bbc698$var$THUMB_NAME = "SwitchThumb";
const $6be4966fd9bbc698$export$4d07bf653ea69106 = /* @__PURE__ */ forwardRef$1((props, forwardedRef) => {
  const { __scopeSwitch, ...thumbProps } = props;
  const context = $6be4966fd9bbc698$var$useSwitchContext($6be4966fd9bbc698$var$THUMB_NAME, __scopeSwitch);
  return /* @__PURE__ */ createElement$1($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends$1({
    "data-state": $6be4966fd9bbc698$var$getState(context.checked),
    "data-disabled": context.disabled ? "" : void 0
  }, thumbProps, {
    ref: forwardedRef
  }));
});
const $6be4966fd9bbc698$var$BubbleInput = (props) => {
  const { control, checked, bubbles = true, ...inputProps } = props;
  const ref = useRef$1(null);
  const prevChecked = $010c2913dbd2fe3d$export$5cae361ad82dce8b(checked);
  const controlSize = $db6c3485150b8e66$export$1ab7ae714698c4b8(control);
  useEffect$1(() => {
    const input = ref.current;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", {
        bubbles
      });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [
    prevChecked,
    checked,
    bubbles
  ]);
  return /* @__PURE__ */ createElement$1("input", _extends$1({
    type: "checkbox",
    "aria-hidden": true,
    defaultChecked: checked
  }, inputProps, {
    tabIndex: -1,
    ref,
    style: {
      ...props.style,
      ...controlSize,
      position: "absolute",
      pointerEvents: "none",
      opacity: 0,
      margin: 0
    }
  }));
};
function $6be4966fd9bbc698$var$getState(checked) {
  return checked ? "checked" : "unchecked";
}
const $6be4966fd9bbc698$export$be92b6f5f03c0fe9 = $6be4966fd9bbc698$export$b5d5cf8927ab7262;
const $6be4966fd9bbc698$export$6521433ed15a34db = $6be4966fd9bbc698$export$4d07bf653ea69106;
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  $6be4966fd9bbc698$export$be92b6f5f03c0fe9,
  {
    className: cn$2(
      "peer inline-flex h-6 w-11 shrink-0 p-[0.5px] cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/40",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      $6be4966fd9bbc698$export$6521433ed15a34db,
      {
        className: cn$2(
          "pointer-events-none block h-5 w-5 rounded-full bg-primary shadow-lg ring-0 transition-transform data-[state=checked]:bg-background data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
        )
      }
    )
  }
));
Switch.displayName = $6be4966fd9bbc698$export$be92b6f5f03c0fe9.displayName;
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn$2("w-full caption-bottom text-base", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className, ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn$2("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn$2(
      "border-t border-border/20 bg-primary/10 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn$2(
      "border-b border-border/20 transition-colors hover:bg-primary/10 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn$2(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 border-0 border-b border-border/20",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn$2("py-3 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn$2("my-3 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope$1(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React__default.useRef(null);
    const itemMap = React__default.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlot = React__default.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsx(Slot, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlot = React__default.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React__default.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React__default.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsx(Slot, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React__default.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode)
        return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var useReactId = React["useId".toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
  const [id, setId] = React.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId)
      setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  }
}) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef$1(onChange);
  const setValue = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value2 = typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value2 !== prop)
          handleChange(value2);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const uncontrolledState = React.useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef$1(onChange);
  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);
  return uncontrolledState;
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope$1(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = React.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = React.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId = null, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId,
    onChange: onCurrentTabStopIdChange
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
  const handleEntryFocus = useCallbackRef$1(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = React.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = React.useState(0);
  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: React.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: React.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: React.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: React.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove } = context;
    React.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable)
                event.preventDefault();
              else
                context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget)
                return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
                  return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last")
                  candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev")
                    candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            })
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl")
    return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key))
    return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key))
    return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
function useStateMachine(initialState, machine) {
  return React.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = React.useState();
  const stylesRef = React.useRef({});
  const prevPresentRef = React.useRef(present);
  const prevAnimationNameRef = React.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles2 = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles2);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles2 == null ? void 0 : styles2.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node && isCurrentAnimation) {
          ReactDOM.flushSync(() => send("ANIMATION_END"));
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React.useCallback((node2) => {
      if (node2)
        stylesRef.current = getComputedStyle(node2);
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles2) {
  return (styles2 == null ? void 0 : styles2.animationName) || "none";
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope$1(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue
    });
    return /* @__PURE__ */ jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key))
                context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = React.useRef(isSelected);
    React.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  List,
  {
    ref,
    className: cn$2("flex items-center mb-2 last:mr-0", className),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTriggerVariant = {
  default: "default",
  alternate: "alternate"
};
const tabsTriggerVariants = cva(
  "group inline-flex items-center py-1 px-4 border border-border/20 whitespace-nowrap ring-offset-background transition-all disabled:border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        [TabsTriggerVariant.default]: "rounded-2xl w-[180px] hover:bg-primary/5 hover:border-border/10 data-[state=active]:bg-primary/10 mr-2",
        [TabsTriggerVariant.alternate]: "w-full border-0 border-b-2 data-[state=active]:border-border"
      }
    },
    defaultVariants: {
      variant: TabsTriggerVariant.default
    }
  }
);
const TabsTrigger = React.forwardRef(({ variant, label, totalCount = null, className, ...props }, ref) => /* @__PURE__ */ jsxs(
  Trigger,
  {
    ref,
    className: cn$2(
      cn$2(tabsTriggerVariants({ variant })),
      totalCount !== null ? "justify-between" : "justify-center",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx(
        Text,
        {
          variant: TextVariant.bodyLarge,
          className: cn$2(
            "group-disabled:text-muted",
            variant === TabsTriggerVariant.alternate && "text-primary/30 group-data-[state=active]:text-primary"
          ),
          children: label
        }
      ),
      /* @__PURE__ */ jsx(
        Text,
        {
          variant: TextVariant.body,
          className: "text-muted-foreground group-disabled:text-muted",
          children: totalCount
        }
      )
    ]
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Content,
  {
    ref,
    className: cn$2(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const TagVariant = {
  primary: "primary",
  success: "success",
  accent: "accent",
  social: "social",
  warning: "warning",
  against: "against",
  for: "for",
  destructive: "destructive"
};
const TagSize = {
  default: "default",
  sm: "sm"
};
cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 border disabled:bg-muted disabled:text-muted-foreground disabled:border-muted-foreground",
  {
    variants: {
      variant: {
        [TagVariant.primary]: "bg-primary/10 text-primary/90 border-primary/20 hover:bg-primary/20 hover:text-primary hover:border-primary/40",
        [TagVariant.success]: "bg-success/10 text-success/90 border-success/40 hover:bg-success/30 hover:text-success hover:border-success/60",
        [TagVariant.accent]: "bg-accent/10 text-accent/90 border-accent/40 hover:bg-accent/30 hover:text-accent hover:border-accent/60",
        [TagVariant.social]: "bg-social/10 text-social/90 border-social/40 hover:bg-social/30 hover:text-social hover:border-social/60",
        [TagVariant.warning]: "bg-warning/10 text-warning/90 border-warning/40 hover:bg-warning/30 hover:text-warning hover:border-warning/60",
        [TagVariant.against]: "bg-against/10 text-against/90 border-against/40 hover:bg-against/30 hover:text-against hover:border-against/60",
        [TagVariant.for]: "bg-for/10 text-for/90 border-for/30 hover:bg-for/40 hover:text-for hover:border-for/60",
        [TagVariant.destructive]: "bg-destructive/10 text-destructive/90 border-destructive/40 hover:bg-destructive/30 hover:text-destructive hover:border-destructive/60"
      },
      size: {
        [TagSize.default]: "text-base font-normal",
        [TagSize.sm]: "text-xs font-medium"
      }
    },
    defaultVariants: {
      variant: TagVariant.primary,
      size: TagSize.default
    }
  }
);
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn$2(
          "flex min-h-[80px] w-full rounded-md theme-border bg-primary/10 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
Array(12).fill(0);
React__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React__default.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }));
React__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, React__default.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }));
React__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React__default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" }));
React__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React__default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }));
var ct = 1, ut = class {
  constructor() {
    this.subscribe = (o) => (this.subscribers.push(o), () => {
      let t = this.subscribers.indexOf(o);
      this.subscribers.splice(t, 1);
    });
    this.publish = (o) => {
      this.subscribers.forEach((t) => t(o));
    };
    this.addToast = (o) => {
      this.publish(o), this.toasts = [...this.toasts, o];
    };
    this.create = (o) => {
      var b;
      let { message: t, ...n } = o, h = typeof (o == null ? void 0 : o.id) == "number" || ((b = o.id) == null ? void 0 : b.length) > 0 ? o.id : ct++, u2 = this.toasts.find((d) => d.id === h), g = o.dismissible === void 0 ? true : o.dismissible;
      return u2 ? this.toasts = this.toasts.map((d) => d.id === h ? (this.publish({ ...d, ...o, id: h, title: t }), { ...d, ...o, id: h, dismissible: g, title: t }) : d) : this.addToast({ title: t, ...n, dismissible: g, id: h }), h;
    };
    this.dismiss = (o) => (o || this.toasts.forEach((t) => {
      this.subscribers.forEach((n) => n({ id: t.id, dismiss: true }));
    }), this.subscribers.forEach((t) => t({ id: o, dismiss: true })), o);
    this.message = (o, t) => this.create({ ...t, message: o });
    this.error = (o, t) => this.create({ ...t, message: o, type: "error" });
    this.success = (o, t) => this.create({ ...t, type: "success", message: o });
    this.info = (o, t) => this.create({ ...t, type: "info", message: o });
    this.warning = (o, t) => this.create({ ...t, type: "warning", message: o });
    this.loading = (o, t) => this.create({ ...t, type: "loading", message: o });
    this.promise = (o, t) => {
      if (!t)
        return;
      let n;
      t.loading !== void 0 && (n = this.create({ ...t, promise: o, type: "loading", message: t.loading, description: typeof t.description != "function" ? t.description : void 0 }));
      let h = o instanceof Promise ? o : o(), u2 = n !== void 0;
      return h.then(async (g) => {
        if (Ot(g) && !g.ok) {
          u2 = false;
          let b = typeof t.error == "function" ? await t.error(`HTTP error! status: ${g.status}`) : t.error, d = typeof t.description == "function" ? await t.description(`HTTP error! status: ${g.status}`) : t.description;
          this.create({ id: n, type: "error", message: b, description: d });
        } else if (t.success !== void 0) {
          u2 = false;
          let b = typeof t.success == "function" ? await t.success(g) : t.success, d = typeof t.description == "function" ? await t.description(g) : t.description;
          this.create({ id: n, type: "success", message: b, description: d });
        }
      }).catch(async (g) => {
        if (t.error !== void 0) {
          u2 = false;
          let b = typeof t.error == "function" ? await t.error(g) : t.error, d = typeof t.description == "function" ? await t.description(g) : t.description;
          this.create({ id: n, type: "error", message: b, description: d });
        }
      }).finally(() => {
        var g;
        u2 && (this.dismiss(n), n = void 0), (g = t.finally) == null || g.call(t);
      }), n;
    };
    this.custom = (o, t) => {
      let n = (t == null ? void 0 : t.id) || ct++;
      return this.create({ jsx: o(n), id: n, ...t }), n;
    };
    this.subscribers = [], this.toasts = [];
  }
}, v = new ut(), Vt = (s, o) => {
  let t = (o == null ? void 0 : o.id) || ct++;
  return v.addToast({ title: s, ...o, id: t }), t;
}, Ot = (s) => s && typeof s == "object" && "ok" in s && typeof s.ok == "boolean" && "status" in s && typeof s.status == "number", Kt = Vt, Xt = () => v.toasts;
Object.assign(Kt, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: Xt });
function ft(s, { insertAt: o } = {}) {
  if (typeof document == "undefined")
    return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", o === "top" && t.firstChild ? t.insertBefore(n, t.firstChild) : t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = s : n.appendChild(document.createTextNode(s));
}
ft(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}:where([data-sonner-toaster][data-x-position="right"]){right:max(var(--offset),env(safe-area-inset-right))}:where([data-sonner-toaster][data-x-position="left"]){left:max(var(--offset),env(safe-area-inset-left))}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:max(var(--offset),env(safe-area-inset-top))}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:max(var(--offset),env(safe-area-inset-bottom))}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:0;right:0;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
const ValueDisplayVariant = {
  default: "default",
  directionFor: "directionFor",
  directionAgainst: "directionAgainst",
  attestorFor: "attestorFor",
  attestorAgainst: "attestorAgainst"
};
cva(
  "inline-flex justify-center min-w-16 bg-primary/10 py-1 px-2",
  {
    variants: {
      variant: {
        [ValueDisplayVariant.default]: "",
        [ValueDisplayVariant.directionFor]: "bg-success/20 text-success",
        [ValueDisplayVariant.directionAgainst]: "bg-destructive/20 text-destructive",
        [ValueDisplayVariant.attestorFor]: "text-success",
        [ValueDisplayVariant.attestorAgainst]: "text-destructive"
      }
    },
    defaultVariants: { variant: ValueDisplayVariant.default }
  }
);
function toBigInt(value) {
  if (typeof value === "bigint")
    return value;
  if (typeof value === "string")
    return BigInt(value);
  if (typeof value === "number")
    return BigInt(value);
  throw new Error(`Cannot convert ${typeof value} to bigint`);
}
function linearInterpolation(x1, y1, x2, y2, midX) {
  const dxFull = Number(x2 - x1);
  if (dxFull === 0)
    return Number(y1);
  const dxMid = Number(midX - x1);
  const ratio = dxMid / dxFull;
  const y1Num = Number(y1);
  const y2Num = Number(y2);
  const dy = y2Num - y1Num;
  const yPredMid = y1Num + dy * ratio;
  return yPredMid;
}
async function generateCurvePoints(address, abi, currentMaxValue, publicClient, config = {}) {
  const {
    maxDepth = 20,
    slopeThreshold = 0.1,
    // interpret as "max relative error" from chord-midpoint
    numInitialPoints = 20
  } = config;
  let bigPoints = [];
  try {
    const [maxAssets, maxShares] = await Promise.all([
      publicClient.readContract({
        address,
        abi,
        functionName: "maxAssets",
        args: []
      }).then(toBigInt),
      publicClient.readContract({
        address,
        abi,
        functionName: "maxShares",
        args: []
      }).then(toBigInt)
    ]);
    const maxValueWei = parseEther(currentMaxValue.toString());
    const upperBoundWei = maxValueWei < maxAssets ? maxValueWei : maxAssets;
    console.log("Generating curve with:", {
      maxAssets: maxAssets.toString(),
      maxShares: maxShares.toString(),
      upperBoundWei: upperBoundWei.toString()
    });
    async function getShares(assetsWei) {
      const res = await publicClient.readContract({
        address,
        abi,
        functionName: "previewDeposit",
        args: [assetsWei, 0n, 0n]
      });
      return toBigInt(res);
    }
    bigPoints.push({ x: 0n, y: 0n });
    if (upperBoundWei > 0n) {
      const stepSize = upperBoundWei / BigInt(numInitialPoints);
      for (let i = 1; i <= numInitialPoints; i++) {
        const x = stepSize * BigInt(i);
        if (x > upperBoundWei)
          break;
        try {
          const y = await getShares(x);
          if (y > maxShares) {
            console.log("Exceeded maxShares at x=", x.toString());
            break;
          }
          bigPoints.push({ x, y });
        } catch (err) {
          console.warn("Error calling previewDeposit at x=", x.toString(), err);
          break;
        }
      }
    }
    bigPoints.sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
    async function refineSegment(x1, y1, x2, y2, depth) {
      if (x2 <= x1)
        return [{ x: x2, y: y2 }];
      if (depth >= maxDepth)
        return [{ x: x2, y: y2 }];
      const midX = (x1 + x2) / 2n;
      let midY;
      try {
        midY = await getShares(midX);
        if (midY > maxShares) {
          return [{ x: x2, y: y2 }];
        }
      } catch {
        return [{ x: x1, y: y1 }];
      }
      const yPredMid = linearInterpolation(x1, y1, x2, y2, midX);
      const midYNum = Number(midY);
      const absDiff = Math.abs(midYNum - yPredMid);
      const segScale = Math.abs(Number(y2 - y1)) || 1;
      const relDiff = absDiff / segScale;
      if (relDiff > slopeThreshold) {
        const leftSub = await refineSegment(x1, y1, midX, midY, depth + 1);
        const rightSub = await refineSegment(midX, midY, x2, y2, depth + 1);
        return [...leftSub, ...rightSub];
      } else {
        return [{ x: x2, y: y2 }];
      }
    }
    let refined = [];
    for (let i = 0; i < bigPoints.length - 1; i++) {
      const p1 = bigPoints[i];
      const p2 = bigPoints[i + 1];
      refined.push(p1);
      const subPoints = await refineSegment(p1.x, p1.y, p2.x, p2.y, 0);
      refined.push(...subPoints);
    }
    refined.push(bigPoints[bigPoints.length - 1]);
    const dedupMap = /* @__PURE__ */ new Map();
    for (const { x, y } of refined) {
      dedupMap.set(x, y);
    }
    const finalBigPoints = Array.from(dedupMap.entries()).map(([x, y]) => ({ x, y })).sort((a, b) => a.x < b.x ? -1 : 1);
    const finalPoints = finalBigPoints.map(({ x, y }) => ({
      x: Number(x),
      y: Number(y)
    }));
    console.log(`Final #points: ${finalPoints.length}`, finalPoints);
    return finalPoints;
  } catch (err) {
    console.error("Error generating curve points:", err);
    return bigPoints.map(({ x, y }) => ({
      x: Number(x),
      y: Number(y)
    }));
  }
}
async function getContractLayout(address, abi, publicClient) {
  const variables = [];
  let slot = 0;
  const stateVars = abi.filter(
    (item) => item.type === "function" && item.stateMutability === "view" && item.inputs.length === 0
  );
  for (const v2 of stateVars) {
    try {
      const value = await publicClient.readContract({
        address,
        abi,
        functionName: v2.name,
        args: []
      });
      variables.push({
        name: v2.name,
        slot: slot++,
        type: v2.outputs[0].type,
        isImmutable: false,
        value
      });
    } catch (err) {
      console.error(`Failed to read ${v2.name}:`, err);
    }
  }
  return {
    name: address,
    variables
  };
}
async function writeStorageSlot(address, slot, value, publicClient) {
  console.log("Writing to storage slot");
  console.log("Address: ", address);
  console.log("Slot: ", slot);
  console.log("Value: ", value);
  const beforeValue = await publicClient.getStorageAt({
    address,
    slot: `0x${slot.toString(16)}`
  });
  console.log("Storage value before:", beforeValue);
  const hexValue = value.toString(16).padStart(64, "0");
  await publicClient.request({
    method: "anvil_setStorageAt",
    params: [address, `0x${slot.toString(16)}`, `0x${hexValue}`]
  });
  const afterValue = await publicClient.getStorageAt({
    address,
    slot: `0x${slot.toString(16)}`
  });
  console.log("Storage value after:", afterValue);
}
function parseNumberInput(input) {
  if (input.toLowerCase().includes("e")) {
    const [base, exponent] = input.toLowerCase().split("e");
    return parseUnits(base, Number(exponent));
  }
  if (input.toLowerCase().endsWith("wei")) {
    return BigInt(input.slice(0, -3));
  }
  if (input.toLowerCase().endsWith("gwei")) {
    return parseUnits(input.slice(0, -4), 9);
  }
  if (input.toLowerCase().endsWith("ether")) {
    return parseEther(input.slice(0, -5));
  }
  return BigInt(input);
}
function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}
function Button({
  children,
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: cn$1(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      ),
      ...props,
      children
    }
  );
}
function Dialog$1({
  children,
  open,
  onOpenChange
}) {
  if (!open)
    return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background p-6 shadow-lg", children }) });
}
function DialogContent$1({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4", children });
}
function DialogHeader({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-1.5 text-center", children });
}
function DialogFooter({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", children });
}
function DialogTitle$1({ children }) {
  return /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold leading-none tracking-tight", children });
}
function DialogDescription$1({ children }) {
  return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children });
}
function Input({
  className,
  type = "text",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: cn$1(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-muted dark:text-foreground dark:border-muted",
        className
      ),
      ...props
    }
  );
}
function Label({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      className: cn$1(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      ),
      ...props,
      children
    }
  );
}
function ConstructorForm({
  isOpen,
  onClose,
  onSubmit,
  args,
  fileName
}) {
  const [values, setValues] = useState$1(
    () => args.reduce((acc, arg) => ({ ...acc, [arg.name]: "" }), {})
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  return /* @__PURE__ */ jsx(Dialog$1, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent$1, { children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle$1, { children: "Constructor Arguments" }),
      /* @__PURE__ */ jsx(DialogDescription$1, { children: args.length === 0 ? `No constructor arguments required for ${fileName}` : `Enter the constructor arguments for ${fileName}` })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      args.map((arg) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(Label, { htmlFor: arg.name, children: [
          arg.name,
          " (",
          arg.type,
          ")"
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: arg.name,
            value: values[arg.name],
            onChange: (e) => setValues((prev) => ({
              ...prev,
              [arg.name]: e.target.value
            })),
            placeholder: `Enter ${arg.name}`,
            required: true
          }
        )
      ] }, arg.name)),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", children: "Deploy" })
      ] })
    ] })
  ] }) });
}
function ContractVariablesModal({
  isOpen,
  onClose,
  contract,
  onVariableChange
}) {
  const [values, setValues] = useState$1({});
  const [isUpdating, setIsUpdating] = useState$1(false);
  const handleChange = (variable, value) => {
    setValues((prev) => ({ ...prev, [variable.name]: value }));
  };
  const handleUpdate = async (variable) => {
    const value = values[variable.name];
    if (value === void 0)
      return;
    setIsUpdating(true);
    try {
      await onVariableChange(variable, value);
      setValues((prev) => ({ ...prev, [variable.name]: "" }));
    } finally {
      setIsUpdating(false);
    }
  };
  const formatVariableValue = (variable) => {
    var _a;
    const value = values[variable.name];
    if (value !== void 0)
      return value;
    return ((_a = variable.value) == null ? void 0 : _a.toString()) || "";
  };
  return /* @__PURE__ */ jsx(Dialog$2, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent$2, { children: [
    /* @__PURE__ */ jsxs(DialogHeader$1, { children: [
      /* @__PURE__ */ jsx(DialogTitle$2, { children: "Edit Contract Variables" }),
      /* @__PURE__ */ jsxs(DialogDescription$2, { children: [
        contract == null ? void 0 : contract.name,
        " (",
        contract == null ? void 0 : contract.address,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: contract == null ? void 0 : contract.variables.map((variable) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Label$1, { children: variable.name }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          Input$1,
          {
            type: "text",
            value: formatVariableValue(variable),
            onChange: (e) => handleChange(variable, e.target.value),
            disabled: variable.isImmutable
          }
        ),
        /* @__PURE__ */ jsx(
          Button$1,
          {
            onClick: () => handleUpdate(variable),
            disabled: variable.isImmutable || values[variable.name] === void 0,
            children: "Update"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Text, { variant: "small", className: "text-muted-foreground", children: [
        "Type: ",
        variable.type,
        ", Slot: ",
        variable.slot
      ] })
    ] }, variable.name)) })
  ] }) });
}
function ColorWheel({ value, onChange }) {
  const canvasRef = useRef$1(null);
  const [isDragging, setIsDragging] = useState$1(false);
  const [hue, setHue] = useState$1(0);
  const [saturation, setSaturation] = useState$1(100);
  const [lightness, setLightness] = useState$1(50);
  useEffect$1(() => {
    const match = value.match(
      /hsl\((\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%\)/
    );
    if (match) {
      setHue(parseFloat(match[1]));
      setSaturation(parseFloat(match[2]));
      setLightness(parseFloat(match[3]));
    }
  }, [value]);
  const handleColorChange = (e) => {
    if (!canvasRef.current)
      return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 20;
    const radius = Math.min(canvas.width, canvas.height - 80) / 2 - 10;
    const sliderHeight = 40;
    const sliderY = canvas.height - sliderHeight - 20;
    if (y >= sliderY && y <= sliderY + sliderHeight) {
      const newLightness = Math.max(
        0,
        Math.min(100, (x - 20) / (canvas.width - 40) * 100)
      );
      setLightness(newLightness);
      onChange(`hsl(${hue} ${saturation}% ${newLightness}%)`);
      return;
    }
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance <= radius) {
      let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
      if (angle < 0)
        angle += 360;
      const newHue = angle;
      const newSaturation = Math.min(100, distance / radius * 100);
      setHue(newHue);
      setSaturation(newSaturation);
      onChange(`hsl(${newHue} ${newSaturation}% ${lightness}%)`);
    }
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleColorChange(e);
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      handleColorChange(e);
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  useEffect$1(() => {
    const canvas = canvasRef.current;
    if (!canvas)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const radius = Math.min(width, height - 80) / 2 - 10;
    ctx.clearRect(0, 0, width, height);
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance2 = Math.sqrt(dx * dx + dy * dy);
        if (distance2 <= radius) {
          let hue2 = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
          let saturation2 = distance2 / radius * 100;
          const h = hue2 / 360;
          const s = saturation2 / 100;
          const l = 0.5;
          let r, g, b;
          if (s === 0) {
            r = g = b = l;
          } else {
            const hue2rgb = (p22, q2, t) => {
              if (t < 0)
                t += 1;
              if (t > 1)
                t -= 1;
              if (t < 1 / 6)
                return p22 + (q2 - p22) * 6 * t;
              if (t < 1 / 2)
                return q2;
              if (t < 2 / 3)
                return p22 + (q2 - p22) * (2 / 3 - t) * 6;
              return p22;
            };
            const q = l + s - l * s;
            const p2 = 2 * l - q;
            r = hue2rgb(p2, q, h + 1 / 3);
            g = hue2rgb(p2, q, h);
            b = hue2rgb(p2, q, h - 1 / 3);
          }
          const index2 = (y * width + x) * 4;
          data[index2] = Math.round(r * 255);
          data[index2 + 1] = Math.round(g * 255);
          data[index2 + 2] = Math.round(b * 255);
          data[index2 + 3] = 255;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
    const angle = hue * Math.PI / 180;
    const distance = saturation / 100 * radius;
    const markerX = centerX + Math.cos(angle) * distance;
    const markerY = centerY + Math.sin(angle) * distance;
    ctx.beginPath();
    ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
    const sliderHeight = 40;
    const sliderY = height - sliderHeight - 20;
    const sliderGradient = ctx.createLinearGradient(20, 0, width - 20, 0);
    sliderGradient.addColorStop(0, `hsl(${hue}, ${saturation}%, 0%)`);
    sliderGradient.addColorStop(0.5, `hsl(${hue}, ${saturation}%, 50%)`);
    sliderGradient.addColorStop(1, `hsl(${hue}, ${saturation}%, 100%)`);
    ctx.fillStyle = sliderGradient;
    ctx.fillRect(20, sliderY, width - 40, sliderHeight);
    const lightnessX = 20 + (width - 40) * (lightness / 100);
    ctx.beginPath();
    ctx.arc(lightnessX, sliderY + sliderHeight / 2, 5, 0, Math.PI * 2);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }, [hue, saturation, lightness]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 280,
      height: 340,
      onClick: handleColorChange,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      style: { cursor: "crosshair", marginTop: "-8px" }
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsx(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function ColorPicker({
  isOpen,
  onClose,
  onColorSelect,
  currentColor
}) {
  const [customColor, setCustomColor] = useState$1(currentColor);
  const [showColorWheel, setShowColorWheel] = useState$1(false);
  const presetColors = [
    "hsl(221.2 83.2% 53.3%)",
    // Primary blue
    "hsl(142.1 76.2% 36.3%)",
    // Forest green
    "hsl(346.8 77.2% 49.8%)",
    // Rose red
    "hsl(43.3 96.4% 56.3%)",
    // Golden yellow
    "hsl(262.1 83.3% 57.8%)",
    // Royal purple
    "hsl(20.5 90.2% 48.2%)",
    // Burnt orange
    "hsl(189.5 94.5% 42.7%)",
    // Turquoise
    "hsl(283.4 67.1% 50.4%)"
    // Magenta
  ];
  const handleColorSelect = (color) => {
    onColorSelect(color);
    onClose();
  };
  const handleCustomColorClick = () => {
    setShowColorWheel(true);
  };
  const handleCustomColorChange = (color) => {
    setCustomColor(color);
  };
  const handleApplyCustomColor = () => {
    onColorSelect(customColor);
    onClose();
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsx(DialogContent, { className: "sm:max-w-[425px]", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: "Select Curve Color" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: presetColors.map((color) => /* @__PURE__ */ jsx(
      "button",
      {
        className: "h-12 w-12 rounded-lg border border-border transition-colors hover:border-primary",
        style: { backgroundColor: color },
        onClick: () => handleColorSelect(color)
      },
      color
    )) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-2 text-sm font-medium", children: "Custom Color" }),
      showColorWheel ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          ColorWheel,
          {
            value: customColor,
            onChange: handleCustomColorChange
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-8 w-8 rounded border border-border",
              style: { backgroundColor: customColor }
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: customColor,
              onChange: (e) => setCustomColor(e.target.value),
              className: "flex-1 rounded-md border border-border bg-background px-3 py-1 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
            onClick: handleApplyCustomColor,
            children: "Apply Custom Color"
          }
        )
      ] }) : /* @__PURE__ */ jsx(
        "button",
        {
          className: "h-12 w-full rounded-lg border border-border transition-colors hover:border-primary",
          style: { backgroundColor: customColor },
          onClick: handleCustomColorClick
        }
      )
    ] })
  ] }) }) });
}
const formatScientific = (n) => {
  if (n === 0)
    return "0";
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / Math.pow(10, exp);
  return `${mantissa.toFixed(2)}e${exp}`;
};
const createEdgePoints = (points, startX, endX, count2 = 10) => {
  const step = (endX - startX) / (count2 - 1);
  return Array.from({ length: count2 }, (_, i) => {
    const x = startX + step * i;
    const idx = points.findIndex((p3) => p3.x > x);
    if (idx === 0)
      return { x, y: points[0].y };
    if (idx === -1)
      return { x, y: points[points.length - 1].y };
    const p1 = points[idx - 1];
    const p2 = points[idx];
    const t = (x - p1.x) / (p2.x - p1.x);
    return { x, y: p1.y + t * (p2.y - p1.y) };
  });
};
function LineChart({
  data,
  xLabel,
  yLabel,
  totalAssets,
  previewAmount,
  selectedCurveId
}) {
  const svgRef = useRef$1(null);
  const [stickyPoint, setStickyPoint] = React__default.useState(null);
  useEffect$1(() => {
    if (!svgRef.current || data.length === 0)
      return;
    d3.select(svgRef.current).selectAll("*").remove();
    const margin = { top: 20, right: 30, bottom: 50, left: 80 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;
    const svg = d3.select(svgRef.current).append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const defs = svg.append("defs");
    const tooltipFilter = defs.append("filter").attr("id", "tooltip-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    tooltipFilter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    tooltipFilter.append("feFlood").attr("flood-color", "#fff").attr("result", "color");
    tooltipFilter.append("feComposite").attr("in", "color").attr("in2", "coloredBlur").attr("operator", "in").attr("result", "glowColor");
    const feMerge = tooltipFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "glowColor");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    const createGradient = (id, color, secondaryColor, isPreview = false, isRedeem = false) => {
      const gradient = defs.append("linearGradient").attr("id", id).attr("x1", "0%").attr("x2", isRedeem ? "100%" : "0%").attr("y1", "0%").attr("y2", "100%");
      if (isRedeem) {
        gradient.append("stop").attr("offset", "0%").attr("stop-color", secondaryColor).attr("stop-opacity", 0.7);
        gradient.append("stop").attr("offset", "15%").attr("stop-color", color).attr("stop-opacity", 0.5);
        gradient.append("stop").attr("offset", "85%").attr("stop-color", color).attr("stop-opacity", 0.5);
        gradient.append("stop").attr("offset", "100%").attr("stop-color", secondaryColor).attr("stop-opacity", 0.7);
      } else {
        gradient.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", isPreview ? 0.5 : 0.4);
        gradient.append("stop").attr("offset", "50%").attr("stop-color", secondaryColor).attr("stop-opacity", isPreview ? 0.35 : 0.25);
        gradient.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", isPreview ? 0.2 : 0.1);
      }
    };
    const createPattern = (id, color, isRedeem = false) => {
      const pattern = defs.append("pattern").attr("id", id).attr("patternUnits", "userSpaceOnUse").attr("width", isRedeem ? 10 : 8).attr("height", isRedeem ? 10 : 8).attr("patternTransform", `rotate(45) ${isRedeem ? "scale(1.2)" : ""}`);
      if (isRedeem) {
        pattern.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 10).attr("stroke", color).attr("stroke-width", 1.5).attr("stroke-opacity", 0.4);
      } else {
        pattern.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 8).attr("stroke", color).attr("stroke-width", 0.5).attr("stroke-opacity", 0.3);
      }
    };
    createPattern("basePattern", "#ffffff");
    createPattern("depositPattern", "#00ff00");
    createPattern("redeemPattern", "#ffff00");
    const createGlowFilter = (id, color) => {
      const filter = defs.append("filter").attr("id", id).attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
      filter.append("feGaussianBlur").attr("stdDeviation", 2.5).attr("result", "coloredBlur");
      const feMerge2 = filter.append("feMerge");
      feMerge2.append("feMergeNode").attr("in", "coloredBlur");
      feMerge2.append("feMergeNode").attr("in", "SourceGraphic");
    };
    createGlowFilter("baseGlow");
    createGlowFilter("depositGlow");
    createGlowFilter("redeemGlow");
    const xScale = d3.scaleLinear().domain([
      0,
      d3.max(
        data.flatMap((curve) => curve.points),
        (d) => d.x
      ) || 0
    ]).range([0, width]);
    const yMin = 0;
    const yMax = d3.max(
      data.flatMap((curve) => curve.points),
      (d) => d.y
    ) || 0;
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]).nice();
    svg.append("g").attr("transform", `translate(0,${height})`).call(
      d3.axisBottom(xScale).tickFormat((d) => formatScientific(+d)).ticks(5)
    ).selectAll("text").style("fill", "white").style("font-size", "12px");
    svg.append("g").call(
      d3.axisLeft(yScale).tickFormat((d) => formatScientific(+d)).ticks(5)
    ).selectAll("text").style("fill", "white").style("font-size", "12px");
    svg.append("text").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height + margin.bottom - 10).text(xLabel).style("fill", "white").style("font-size", "14px");
    svg.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("y", -margin.left + 30).attr("x", -height / 2).text(yLabel).style("fill", "white").style("font-size", "14px");
    const line = d3.line().x((d) => xScale(d.x)).y((d) => yScale(d.y)).curve(d3.curveMonotoneX);
    const area = d3.area().x((d) => xScale(d.x)).y0(height).y1((d) => yScale(d.y)).curve(d3.curveMonotoneX);
    const redeemArea = d3.area().x((d) => xScale(d.x)).y0((d) => yScale(d.y)).y1(height).curve(d3.curveMonotoneX);
    data.forEach((curve) => {
      var _a, _b, _c, _d, _e, _f;
      createGradient(`gradient-${curve.id}`, curve.color, "#ffffff");
      createGradient(
        `gradient-preview-${curve.id}`,
        curve.color,
        "#00ff00",
        true
      );
      createGradient(
        "gradient-preview-redeem",
        "hsl(var(--destructive))",
        "#ffff00",
        true
      );
      svg.append("path").datum(curve.points).attr("fill", "none").attr("stroke", curve.color).attr("stroke-width", 4).attr("stroke-opacity", 0.3).attr("filter", "url(#baseGlow)").attr("d", line);
      svg.append("path").datum(curve.points).attr("fill", "none").attr("stroke", curve.color).attr("stroke-width", 1.5).attr("stroke-opacity", 0.8).attr("d", line);
      if (totalAssets !== void 0 && curve.id === selectedCurveId) {
        const scaledTotalAssets = totalAssets * 1e18;
        const scaledPreviewAmount = previewAmount ? previewAmount * 1e18 : void 0;
        const index2 = curve.points.findIndex((p2) => p2.x > scaledTotalAssets);
        const point1 = index2 > 0 ? curve.points[index2 - 1] : curve.points[0];
        const point2 = curve.points[index2] || curve.points[curve.points.length - 1];
        const t = (scaledTotalAssets - point1.x) / (point2.x - point1.x);
        const interpolatedY = point1.y + t * (point2.y - point1.y);
        const boundaryPoint = { x: scaledTotalAssets, y: interpolatedY };
        const basePoints = [
          ...curve.points.filter((p2) => p2.x < scaledTotalAssets),
          boundaryPoint
        ];
        const previewPoints = scaledPreviewAmount ? [
          boundaryPoint,
          ...((_b = (_a = curve.previewPoints) == null ? void 0 : _a[0]) == null ? void 0 : _b.isRedeem) ? curve.points.filter(
            (p2) => p2.x < scaledTotalAssets && p2.x >= scaledTotalAssets - Math.abs(scaledPreviewAmount)
          ).reverse() : curve.points.filter(
            (p2) => p2.x > scaledTotalAssets && p2.x <= scaledTotalAssets + scaledPreviewAmount
          )
        ] : [];
        if (previewPoints.length > 0 && scaledPreviewAmount) {
          const isRedeem = (_d = (_c = curve.previewPoints) == null ? void 0 : _c[0]) == null ? void 0 : _d.isRedeem;
          const endX = scaledTotalAssets + (isRedeem ? -Math.abs(scaledPreviewAmount) : scaledPreviewAmount);
          const endIndex = curve.points.findIndex((p2) => p2.x > endX);
          if (endIndex > 0) {
            const endPoint1 = curve.points[endIndex - 1];
            const endPoint2 = curve.points[endIndex];
            const endT = (endX - endPoint1.x) / (endPoint2.x - endPoint1.x);
            const endY = endPoint1.y + endT * (endPoint2.y - endPoint1.y);
            previewPoints.push({ x: endX, y: endY });
          }
        }
        console.log("Area Debug:", {
          scaledTotalAssets,
          scaledPreviewAmount,
          basePointsCount: basePoints.length,
          previewPointsCount: previewPoints.length,
          boundaryPoint,
          firstBasePoint: basePoints[0],
          lastBasePoint: basePoints[basePoints.length - 1],
          firstPreviewPoint: previewPoints[0],
          lastPreviewPoint: previewPoints[previewPoints.length - 1]
        });
        if (basePoints.length >= 1) {
          const createBaseEdgeGradient = (id, isLeft) => {
            const gradient = defs.append("linearGradient").attr("id", id).attr("x1", isLeft ? "0%" : "100%").attr("x2", isLeft ? "100%" : "0%").attr("y1", "0%").attr("y2", "0%");
            if (isLeft) {
              gradient.append("stop").attr("offset", "0%").attr("stop-color", curve.color).attr("stop-opacity", 0.5);
              gradient.append("stop").attr("offset", "100%").attr("stop-color", curve.color).attr("stop-opacity", 0);
            } else {
              gradient.append("stop").attr("offset", "0%").attr("stop-color", curve.color).attr("stop-opacity", 0.5);
              gradient.append("stop").attr("offset", "100%").attr("stop-color", curve.color).attr("stop-opacity", 0);
            }
          };
          createBaseEdgeGradient("highlight-base-left", true);
          createBaseEdgeGradient("highlight-base-right", false);
          svg.append("path").datum(basePoints).attr("class", "area1").attr("fill", `url(#gradient-${curve.id})`).attr("d", area);
          const edgeWidth = (xScale.domain()[1] - xScale.domain()[0]) * 0.05;
          svg.append("path").datum(
            createEdgePoints(
              basePoints,
              basePoints[0].x,
              basePoints[0].x + edgeWidth
            )
          ).attr("fill", "url(#highlight-base-left)").attr("d", area);
          svg.append("path").datum(
            createEdgePoints(
              basePoints,
              boundaryPoint.x - edgeWidth,
              boundaryPoint.x
            )
          ).attr("fill", "url(#highlight-base-right)").attr("d", area);
          svg.append("path").datum(basePoints).attr("class", "area1-pattern").attr("fill", "url(#basePattern)").attr("d", area);
        }
        if (previewPoints.length >= 2) {
          const isRedeem = (_f = (_e = curve.previewPoints) == null ? void 0 : _e[0]) == null ? void 0 : _f.isRedeem;
          const edgeWidth = (xScale.domain()[1] - xScale.domain()[0]) * 0.05;
          if (isRedeem) {
            const createRedeemEdgeGradient = (id, isLeft) => {
              const gradient = defs.append("linearGradient").attr("id", id).attr("x1", isLeft ? "100%" : "0%").attr("x2", isLeft ? "0%" : "100%").attr("y1", "0%").attr("y2", "0%");
              if (isLeft) {
                gradient.append("stop").attr("offset", "0%").attr("stop-color", "#ffff00").attr("stop-opacity", 0.5);
                gradient.append("stop").attr("offset", "100%").attr("stop-color", "#ffff00").attr("stop-opacity", 0);
              } else {
                gradient.append("stop").attr("offset", "0%").attr("stop-color", "#ffff00").attr("stop-opacity", 0.5);
                gradient.append("stop").attr("offset", "100%").attr("stop-color", "#ffff00").attr("stop-opacity", 0);
              }
            };
            createRedeemEdgeGradient("highlight-redeem-left", true);
            createRedeemEdgeGradient("highlight-redeem-right", false);
            svg.append("path").datum(previewPoints).attr("class", "area2").attr("fill", "url(#gradient-preview-redeem)").attr("d", redeemArea);
            const endX = boundaryPoint.x - (scaledPreviewAmount ?? 0);
            svg.append("path").datum(
              createEdgePoints(
                [...previewPoints].reverse(),
                // Reverse points for correct y-value interpolation
                boundaryPoint.x - edgeWidth,
                boundaryPoint.x
              )
            ).attr("fill", "url(#highlight-redeem-left)").attr("d", redeemArea);
            svg.append("path").datum(
              createEdgePoints(
                [...previewPoints].reverse(),
                // Reverse points for correct y-value interpolation
                endX,
                endX + edgeWidth
              )
            ).attr("fill", "url(#highlight-redeem-right)").attr("d", redeemArea);
            svg.append("path").datum(previewPoints).attr("class", "area2-pattern").attr("fill", "url(#redeemPattern)").attr("d", redeemArea);
          } else {
            const createDepositEdgeGradient = (id, isLeft) => {
              const gradient = defs.append("linearGradient").attr("id", id).attr("x1", isLeft ? "0%" : "100%").attr("x2", isLeft ? "100%" : "0%").attr("y1", "0%").attr("y2", "0%");
              if (isLeft) {
                gradient.append("stop").attr("offset", "0%").attr("stop-color", "#00ff00").attr("stop-opacity", 0.5);
                gradient.append("stop").attr("offset", "100%").attr("stop-color", "#00ff00").attr("stop-opacity", 0);
              } else {
                gradient.append("stop").attr("offset", "0%").attr("stop-color", "#00ff00").attr("stop-opacity", 0.5);
                gradient.append("stop").attr("offset", "100%").attr("stop-color", "#00ff00").attr("stop-opacity", 0);
              }
            };
            createDepositEdgeGradient("highlight-deposit-left", true);
            createDepositEdgeGradient("highlight-deposit-right", false);
            svg.append("path").datum(previewPoints).attr("class", "area2").attr("fill", `url(#gradient-preview-${curve.id})`).attr("d", area);
            svg.append("path").datum(
              createEdgePoints(
                previewPoints,
                boundaryPoint.x,
                boundaryPoint.x + edgeWidth
              )
            ).attr("fill", "url(#highlight-deposit-left)").attr("d", area);
            const endX = boundaryPoint.x + (scaledPreviewAmount ?? 0);
            svg.append("path").datum(createEdgePoints(previewPoints, endX - edgeWidth, endX)).attr("fill", "url(#highlight-deposit-right)").attr("d", area);
            svg.append("path").datum(previewPoints).attr("class", "area2-pattern").attr("fill", "url(#depositPattern)").attr("d", area);
          }
          svg.append("path").datum(previewPoints).attr("fill", "none").attr("stroke", isRedeem ? "#ffff00" : "#00ff00").attr("stroke-width", isRedeem ? 2 : 1.5).attr("stroke-opacity", isRedeem ? 0.5 : 0.4).attr("d", line);
        }
      }
    });
    const crosshair = svg.append("g").attr("class", "crosshair").style("display", "none");
    crosshair.append("line").attr("class", "crosshair-vertical").attr("y1", 0).attr("y2", height).style("stroke", "#666").style("stroke-width", 1).style("stroke-dasharray", "3,3");
    crosshair.append("line").attr("class", "crosshair-horizontal").attr("x1", 0).attr("x2", width).style("stroke", "#666").style("stroke-width", 1).style("stroke-dasharray", "3,3");
    const findClosestPoint = (mouseX) => {
      if (!selectedCurveId)
        return null;
      const selectedCurve = data.find((c) => c.id === selectedCurveId);
      if (!selectedCurve)
        return null;
      const index2 = bisect(selectedCurve.points, mouseX, 1);
      if (index2 === 0) {
        return {
          x: selectedCurve.points[0].x,
          y: selectedCurve.points[0].y,
          curve: selectedCurve
        };
      }
      if (index2 >= selectedCurve.points.length) {
        const lastPoint = selectedCurve.points[selectedCurve.points.length - 1];
        return {
          x: lastPoint.x,
          y: lastPoint.y,
          curve: selectedCurve
        };
      }
      const point1 = selectedCurve.points[index2 - 1];
      const point2 = selectedCurve.points[index2];
      const t = (mouseX - point1.x) / (point2.x - point1.x);
      const interpolatedY = point1.y + t * (point2.y - point1.y);
      return {
        x: mouseX,
        y: interpolatedY,
        curve: selectedCurve
      };
    };
    const updateCrosshairAndTooltip = (point, isSticky = false) => {
      var _a;
      const xPos = xScale(point.x);
      const yPos = yScale(point.y);
      crosshair.style("display", "block");
      crosshair.select(".crosshair-vertical").attr("x1", xPos).attr("x2", xPos);
      crosshair.select(".crosshair-horizontal").attr("y1", yPos).attr("y2", yPos);
      const svgRect = (_a = svgRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!svgRect)
        return;
      const tooltipContent = `
        <div style="margin-bottom: 8px;">
          <strong>Assets:</strong> ${formatScientific(point.x)}
        </div>
        ${data.map((curve) => {
        const index2 = bisect(curve.points, point.x, 1);
        if (index2 === 0) {
          const firstPoint = curve.points[0];
          return `
                <div style="
                  ${curve.id === selectedCurveId ? "font-weight: bold; color: " + curve.color : ""}
                  margin-bottom: 4px;
                ">
                  <span style="color: ${curve.color}">●</span> ${curve.name}<br/>
                  Shares: ${formatScientific(firstPoint.y)}
                </div>
              `;
        }
        if (index2 >= curve.points.length) {
          const lastPoint = curve.points[curve.points.length - 1];
          return `
                <div style="
                  ${curve.id === selectedCurveId ? "font-weight: bold; color: " + curve.color : ""}
                  margin-bottom: 4px;
                ">
                  <span style="color: ${curve.color}">●</span> ${curve.name}<br/>
                  Shares: ${formatScientific(lastPoint.y)}
                </div>
              `;
        }
        const point1 = curve.points[index2 - 1];
        const point2 = curve.points[index2];
        const t = (point.x - point1.x) / (point2.x - point1.x);
        const interpolatedY = point1.y + t * (point2.y - point1.y);
        const isSelected = curve.id === selectedCurveId;
        return `
              <div style="
                ${isSelected ? "font-weight: bold; color: " + curve.color : ""}
                margin-bottom: 4px;
              ">
                <span style="color: ${curve.color}">●</span> ${curve.name}<br/>
                Shares: ${formatScientific(interpolatedY)}
              </div>
            `;
      }).filter(Boolean).join("")}`;
      tooltip.style("visibility", "visible").html(tooltipContent).style("cursor", isSticky ? "pointer" : "default").style(
        "border",
        isSticky ? "1px solid rgba(255, 255, 255, 0.2)" : "none"
      ).style("filter", isSticky ? "url(#tooltip-glow)" : "none");
      const tooltipNode = tooltip.node();
      const tooltipRect = tooltipNode.getBoundingClientRect();
      const tooltipX = Math.max(
        svgRect.left + margin.left,
        Math.min(
          svgRect.left + margin.left + xPos - tooltipRect.width - 10,
          svgRect.right - tooltipRect.width - margin.right
        )
      );
      const tooltipY = Math.max(
        svgRect.top + margin.top,
        Math.min(
          svgRect.top + margin.top + yPos - tooltipRect.height - 10,
          svgRect.bottom - tooltipRect.height - margin.bottom
        )
      );
      tooltip.style("left", tooltipX + "px").style("top", tooltipY + "px");
    };
    const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("position", "absolute").style("visibility", "hidden").style("background-color", "#333").style("color", "#fff").style("padding", "8px").style("border-radius", "4px").style("font-size", "12px").style("box-shadow", "0 2px 4px rgba(0, 0, 0, 0.3)").style("pointer-events", "all").on("click", () => {
      setStickyPoint(null);
      tooltip.style("visibility", "hidden");
      crosshair.style("display", "none");
    });
    const bisect = d3.bisector((d) => d.x).left;
    svg.append("rect").attr("width", width).attr("height", height).style("fill", "none").style("pointer-events", "all").on("mousemove", (event) => {
      if (stickyPoint)
        return;
      const mouseX = xScale.invert(d3.pointer(event)[0]);
      const snapPoint = findClosestPoint(mouseX);
      if (snapPoint) {
        updateCrosshairAndTooltip(snapPoint);
      } else {
        crosshair.style("display", "none");
        tooltip.style("visibility", "hidden");
      }
    }).on("mouseout", () => {
      if (!stickyPoint) {
        crosshair.style("display", "none");
        tooltip.style("visibility", "hidden");
      }
    }).on("click", (event) => {
      const mouseX = xScale.invert(d3.pointer(event)[0]);
      const snapPoint = findClosestPoint(mouseX);
      if (snapPoint) {
        setStickyPoint(snapPoint);
        updateCrosshairAndTooltip(snapPoint, true);
      }
    });
    if (stickyPoint) {
      updateCrosshairAndTooltip(stickyPoint, true);
    }
    return () => {
      tooltip.remove();
    };
  }, [
    data,
    xLabel,
    yLabel,
    totalAssets,
    previewAmount,
    selectedCurveId,
    stickyPoint
  ]);
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ref: svgRef,
      style: { width: "100%", height: "100%" },
      className: "dark:text-white"
    }
  );
}
function SpinButton({
  value,
  onChange,
  className,
  min: min2,
  max: max2,
  step = "0.1",
  ...props
}) {
  const [isPressed, setIsPressed] = useState$1(null);
  const rafRef = useRef$1();
  const lastUpdateRef = useRef$1(0);
  const updateValue = useCallback$1(
    (delta) => {
      console.log("SpinButton updateValue called:", {
        delta,
        currentValue: value,
        step
      });
      const currentValue = parseFloat(value) || 0;
      const stepValue = parseFloat(step) || 0.1;
      const minValue = min2 ? parseFloat(min2) : 0;
      const maxValue = max2 ? parseFloat(max2) : Infinity;
      const newValue = Math.min(
        Math.max(currentValue + delta * stepValue, minValue),
        maxValue
      );
      const decimals = Math.max(
        6,
        Math.abs(Math.floor(Math.log10(stepValue))) + 1
      );
      const formattedValue = newValue.toFixed(decimals);
      console.log("SpinButton new value:", formattedValue);
      const diff = Math.abs(newValue - currentValue);
      if (diff >= stepValue / 2) {
        onChange(formattedValue);
      }
    },
    [value, step, min2, max2, onChange]
  );
  useEffect$1(() => {
    if (!isPressed)
      return;
    let startTime = performance.now();
    let frameCount = 0;
    const animate = (now) => {
      if (!isPressed)
        return;
      const delta = isPressed === "up" ? 1 : -1;
      const elapsed = now - startTime;
      if (frameCount === 0 || elapsed > 500 && now - lastUpdateRef.current > 200) {
        updateValue(delta);
        lastUpdateRef.current = now;
      }
      frameCount++;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPressed, updateValue]);
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value,
        onChange: (e) => {
          const val = e.target.value;
          if (/^[0-9]*\.?[0-9]*$/.test(val) || val === "") {
            onChange(val);
          }
        },
        onKeyDown: (e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            updateValue(1);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            updateValue(-1);
          }
        },
        className: cn$1(
          "flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col border border-l-0 border-input rounded-r-md overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: () => setIsPressed("up"),
          onMouseUp: () => setIsPressed(null),
          onMouseLeave: () => setIsPressed(null),
          onTouchStart: () => setIsPressed("up"),
          onTouchEnd: () => setIsPressed(null),
          className: "flex-1 px-2 hover:bg-accent border-b border-input text-sm",
          children: "▲"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: () => setIsPressed("down"),
          onMouseUp: () => setIsPressed(null),
          onMouseLeave: () => setIsPressed(null),
          onTouchStart: () => setIsPressed("down"),
          onTouchEnd: () => setIsPressed(null),
          className: "flex-1 px-2 hover:bg-accent text-sm",
          children: "▼"
        }
      )
    ] })
  ] });
}
const CURVE_COLORS = [
  "hsl(221.2 83.2% 53.3%)",
  "hsl(142.1 76.2% 36.3%)",
  "hsl(346.8 77.2% 49.8%)",
  "hsl(43.3 96.4% 56.3%)",
  "hsl(262.1 83.3% 57.8%)",
  "hsl(20.5 90.2% 48.2%)",
  "hsl(189.5 94.5% 42.7%)",
  "hsl(283.4 67.1% 50.4%)"
];
function CurveVisualizer() {
  var _a, _b, _c, _d;
  const [files, setFiles] = useState$1(/* @__PURE__ */ new Map());
  const [deployedContracts, setDeployedContracts] = useState$1([]);
  const [error, setError] = useState$1(null);
  const [minValue, setMinValue] = useState$1(0);
  const [maxValue, setMaxValue] = useState$1(10);
  const [selectedFileId, setSelectedFileId] = useState$1(null);
  const [pendingDeployment, setPendingDeployment] = useState$1(
    null
  );
  const [isDeploying, setIsDeploying] = useState$1(false);
  const [constructorValues, setConstructorValues] = useState$1({});
  const [selectedContract, setSelectedContract] = useState$1(null);
  const [contractLayout, setContractLayout] = useState$1(
    null
  );
  const [contractInfo, setContractInfo] = useState$1(null);
  const [totalAssets, setTotalAssets] = useState$1(0n);
  const [totalShares, setTotalShares] = useState$1(0n);
  const [selectedCurveId, setSelectedCurveId] = useState$1(null);
  const [depositAmount, setDepositAmount] = useState$1(0n);
  const [redeemAmount, setRedeemAmount] = useState$1(0n);
  const [userAssets, setUserAssets] = useState$1(parseEther("100"));
  const [userShares, setUserShares] = useState$1(0n);
  const [colorPickerOpen, setColorPickerOpen] = useState$1(false);
  const latestRangeRef = useRef$1({ min: minValue, max: maxValue });
  const pendingUpdateRef = useRef$1(null);
  const publicClient = createPublicClient({
    chain: foundry,
    transport: http("http://localhost:8545")
  });
  const handleFileChange = async (event) => {
    var _a2;
    const file = (_a2 = event.target.files) == null ? void 0 : _a2[0];
    if (!file || !file.name.endsWith(".sol")) {
      setError("Please select a valid Solidity file");
      return;
    }
    try {
      const content = await file.text();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("content", content);
      const compileResponse = await fetch("/api/compile", {
        method: "POST",
        body: formData
      });
      const compileData = await compileResponse.json();
      if (compileData.error) {
        setError(compileData.error);
        return;
      }
      const newId = crypto.randomUUID();
      setFiles((prevFiles) => {
        const newFiles = new Map(prevFiles);
        newFiles.set(newId, {
          file,
          abi: compileData.abi,
          bytecode: compileData.bytecode,
          constructorArgs: compileData.constructorInputs || []
        });
        return newFiles;
      });
      setSelectedFileId(newId);
      setError(null);
    } catch (err) {
      console.error("Error processing file:", err);
      setError(
        err instanceof Error ? err.message : "Failed to process contract"
      );
    }
    event.target.value = "";
  };
  const simulatePreview = useCallback$1(
    async (contract, amount, type) => {
      const amountWei = parseEther(amount.toFixed(18));
      const totalAssetsWei = contract.totalAssets;
      const totalSharesWei = contract.totalShares;
      try {
        let result;
        switch (type) {
          case "deposit": {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: "previewDeposit",
              args: [amountWei, totalAssetsWei, totalSharesWei]
            });
            result = BigInt(response);
            return {
              x: Number(formatEther(totalAssetsWei + amountWei)),
              y: Number(formatEther(totalSharesWei + result)),
              previewPoint: true
            };
          }
          case "mint": {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: "previewMint",
              args: [amountWei, totalSharesWei, totalAssetsWei]
            });
            result = BigInt(response);
            return {
              x: Number(formatEther(result)),
              y: amount,
              previewPoint: true
            };
          }
          case "withdraw": {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: "previewWithdraw",
              args: [amountWei, totalAssetsWei, totalSharesWei]
            });
            result = BigInt(response);
            return {
              x: amount,
              y: Number(formatEther(result)),
              previewPoint: true
            };
          }
          case "redeem": {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: "previewRedeem",
              args: [amountWei, totalSharesWei, totalAssetsWei]
            });
            result = BigInt(response);
            const previewPoint = {
              x: Number(formatEther(totalAssetsWei - result)),
              y: Number(formatEther(totalSharesWei - amountWei)),
              previewPoint: true
            };
            console.log("Redeem preview calculation:", {
              totalAssetsWei: totalAssetsWei.toString(),
              totalSharesWei: totalSharesWei.toString(),
              amountWei: amountWei.toString(),
              result: result.toString(),
              previewPoint
            });
            return previewPoint;
          }
        }
      } catch (err) {
        console.error("Error simulating preview:", err);
        return null;
      }
    },
    [publicClient]
  );
  const handlePreview = useCallback$1(
    async (type, amountWei) => {
      if (!selectedCurveId)
        return;
      const contract = deployedContracts.find((c) => c.id === selectedCurveId);
      if (!contract)
        return;
      try {
        const previewPoints = await simulatePreview(
          contract,
          Number(formatEther(amountWei)),
          type
        );
        if (!previewPoints) {
          console.log("No previewPoints generated");
          return;
        }
        setDeployedContracts(
          (prev) => prev.map((c) => {
            if (c.id === selectedCurveId) {
              const totalAssetsNum = Number(formatEther(c.totalAssets));
              const totalSharesNum = Number(formatEther(c.totalShares));
              console.log("Current totals:", { totalAssetsNum, totalSharesNum });
              const previewAmount = type === "redeem" ? parseEther((totalAssetsNum - previewPoints.x).toFixed(18)) : amountWei;
              return {
                ...c,
                previewPoints: [
                  {
                    x: totalAssetsNum,
                    y: totalSharesNum,
                    previewPoint: true,
                    isRedeem: type === "redeem"
                  },
                  previewPoints && {
                    x: previewPoints.x,
                    y: previewPoints.y,
                    previewPoint: true,
                    isRedeem: type === "redeem"
                  }
                ],
                scaledPreviewAmount: previewAmount,
                scaledTotalAssets: c.totalAssets
              };
            }
            return c;
          })
        );
      } catch (err) {
        console.error("Error in handlePreview:", err);
      }
    },
    [selectedCurveId, deployedContracts, simulatePreview]
  );
  const parseInputValue = (value) => {
    const cleanValue = value.replace(/\s*(?:wei|ETH)$/, "");
    if (cleanValue.includes(".") || cleanValue.includes("e")) {
      const num = Number(cleanValue);
      if (isNaN(num))
        return 0n;
      const fixedStr = num.toFixed(18);
      return parseEther(fixedStr);
    }
    try {
      return BigInt(cleanValue);
    } catch {
      return 0n;
    }
  };
  const handleDepositPreview = useCallback$1(
    (value) => {
      if (!value) {
        setDepositAmount(() => 0n);
        setRedeemAmount(() => 0n);
        return;
      }
      const ethValue = parseFloat(value) || 0;
      const weiValue = parseEther(ethValue.toFixed(18));
      setDepositAmount(() => weiValue);
      setRedeemAmount(() => 0n);
      handlePreview("deposit", weiValue);
    },
    [handlePreview]
  );
  const handleRedeemPreview = useCallback$1(
    async (value) => {
      console.log("handleRedeemPreview called with value:", value);
      if (!value) {
        setRedeemAmount(() => 0n);
        setDepositAmount(() => 0n);
        return;
      }
      const ethValue = parseFloat(value) || 0;
      const weiValue = parseEther(ethValue.toFixed(18));
      console.log("Parsed amount:", weiValue.toString());
      setRedeemAmount(weiValue);
      setDepositAmount(() => 0n);
      await handlePreview("redeem", weiValue);
    },
    [handlePreview]
  );
  const getStepSize = (value, total, isRedeem = false) => {
    if (isRedeem) {
      return Number(totalShares / 1000n);
    }
    if (value === 0) {
      return Math.max(1e-3, total * 1e-3);
    }
    return Math.max(1e-3, total * 1e-3);
  };
  const formatDisplayValue = (value, includeUnits = true) => {
    if (value === 0n)
      return "0";
    if (value < parseEther("0.0001")) {
      return `${value.toString()}${includeUnits ? " wei" : ""}`;
    }
    const ethValue = Number(formatEther(value));
    if (ethValue < 0.1) {
      const str2 = ethValue.toFixed(18).replace(/\.?0+$/, "");
      return `${str2}${includeUnits ? " ETH" : ""}`;
    }
    if (ethValue < 1) {
      const str2 = ethValue.toFixed(6);
      return `${str2}${includeUnits ? " ETH" : ""}`;
    }
    if (ethValue < 10) {
      const str2 = ethValue.toFixed(4);
      return `${str2}${includeUnits ? " ETH" : ""}`;
    }
    const str = ethValue.toFixed(2);
    return `${str}${includeUnits ? " ETH" : ""}`;
  };
  useCallback$1(async () => {
    const { min: min2, max: max2 } = latestRangeRef.current;
    console.log("Regenerating all curves for range:", { min: min2, max: max2 });
    const updatedCurves = await Promise.all(
      deployedContracts.map(async (contract) => {
        const points = await generateCurvePoints(
          contract.address,
          contract.abi,
          maxValue,
          publicClient
        );
        return {
          ...contract,
          points: points.map((p2) => ({
            ...p2,
            totalValue: p2.x <= Number(formatEther(contract.totalAssets)) ? p2.y : void 0,
            userValue: p2.x <= Number(formatEther(contract.userAssets)) ? p2.y : void 0
          }))
        };
      })
    );
    setDeployedContracts(updatedCurves);
  }, [deployedContracts, generateCurvePoints, maxValue, publicClient]);
  const handleMinMaxChange = useCallback$1(
    async (newMin, newMax) => {
      latestRangeRef.current = { min: newMin, max: newMax };
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
        pendingUpdateRef.current = null;
      }
      const points = await Promise.all(
        deployedContracts.map(async (contract) => {
          const newPoints = await generateCurvePoints(
            contract.address,
            contract.abi,
            newMax,
            publicClient
          );
          return {
            ...contract,
            points: newPoints.map((p2) => ({
              ...p2,
              totalValue: p2.x <= Number(formatEther(contract.totalAssets)) ? p2.y : void 0,
              userValue: p2.x <= Number(formatEther(contract.userAssets)) ? p2.y : void 0
            }))
          };
        })
      );
      setDeployedContracts(points);
    },
    [deployedContracts, generateCurvePoints, publicClient]
  );
  const removeCurve = (id) => {
    setFiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    setDeployedContracts((prev) => prev.filter((c) => c.id !== id));
  };
  const handleConstructorSubmit = async (values, fileId) => {
    const targetId = fileId || selectedFileId;
    if (!targetId)
      return;
    setSelectedFileId(null);
    await deployContract(targetId, values);
  };
  const deployContract = useCallback$1(
    async (fileId, values) => {
      if (isDeploying)
        return;
      const fileData = files.get(fileId);
      if (!fileData)
        return;
      try {
        setIsDeploying(true);
        setPendingDeployment(fileId);
        setConstructorValues(values);
        const parsedArgs = fileData.constructorArgs.map((arg) => {
          const value = values[arg.name];
          if (!value && arg.type.startsWith("uint"))
            return toHex(0n);
          if (!value)
            return value;
          if (arg.type.startsWith("uint") || arg.type.startsWith("int")) {
            const parsedValue = parseNumberInput(value);
            return toHex(parsedValue);
          }
          return value;
        });
        const deployFormData = new FormData();
        deployFormData.append("abi", JSON.stringify(fileData.abi));
        deployFormData.append("bytecode", fileData.bytecode);
        deployFormData.append("constructorArgs", JSON.stringify(parsedArgs));
        console.log("Deploying contract with args:", parsedArgs);
        const response = await fetch("/api/deploy", {
          method: "POST",
          body: deployFormData
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
          setPendingDeployment(null);
          setIsDeploying(false);
          return;
        }
        if (!data.address) {
          setError("No address returned from deployment");
          setPendingDeployment(null);
          setIsDeploying(false);
          return;
        }
        console.log("Contract deployed at:", data.address);
        const points = await generateCurvePoints(
          data.address,
          fileData.abi,
          maxValue,
          publicClient
        );
        const maxAssets = await publicClient.readContract({
          address: data.address,
          abi: fileData.abi,
          functionName: "MAX_ASSETS",
          args: []
        }).then((result) => BigInt(result));
        const maxShares = await publicClient.readContract({
          address: data.address,
          abi: fileData.abi,
          functionName: "MAX_SHARES",
          args: []
        }).then((result) => BigInt(result));
        setDeployedContracts((prev) => {
          if (prev.some((c) => c.address === data.address)) {
            return prev;
          }
          const constructorToVariable = {};
          const variableToConstructor = {};
          fileData.constructorArgs.forEach((arg) => {
            const varName = arg.name.toUpperCase();
            constructorToVariable[arg.name] = varName;
            variableToConstructor[varName] = arg.name;
          });
          const newContract = {
            id: data.address,
            name: fileData.file.name.replace(".sol", ""),
            address: data.address,
            abi: fileData.abi,
            constructorValues: values,
            constructorToVariable,
            variableToConstructor,
            points,
            color: CURVE_COLORS[prev.length % CURVE_COLORS.length],
            totalAssets: 0n,
            totalShares: 0n,
            userAssets: 0n,
            userShares: 0n,
            maxAssets,
            maxShares
          };
          return [...prev, newContract];
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to deploy contract"
        );
      } finally {
        setPendingDeployment(null);
        setIsDeploying(false);
      }
    },
    [files, isDeploying, publicClient, generateCurvePoints, maxValue]
  );
  const handleCurveSelect = (id) => {
    setSelectedCurveId(id);
    const curve = deployedContracts.find((c) => c.id === id);
    if (curve) {
      setTotalAssets(curve.totalAssets);
      setTotalShares(curve.totalShares);
    }
  };
  const handleEditCurve = useCallback$1(async () => {
    if (!selectedCurveId)
      return;
    const curve = deployedContracts.find((c) => c.id === selectedCurveId);
    if (!curve)
      return;
    try {
      const layout = await getContractLayout(
        curve.address,
        curve.abi,
        publicClient
      );
      setContractLayout(layout);
      setSelectedContract(curve);
    } catch (err) {
      console.error("Error getting contract layout:", err);
    }
  }, [selectedCurveId, deployedContracts, publicClient]);
  useCallback$1(async () => {
    if (!selectedCurveId)
      return;
    setDeployedContracts(
      (prev) => prev.map(
        (curve) => curve.id === selectedCurveId ? {
          ...curve,
          totalAssets,
          totalShares,
          points: curve.points.map((point) => ({
            ...point,
            totalValue: Number(
              formatEther(
                parseEther(point.y.toString()) * totalAssets / parseEther("1")
              )
            ),
            userValue: Number(
              formatEther(
                parseEther(point.y.toString()) * curve.userShares / parseEther("1")
              )
            )
          }))
        } : curve
      )
    );
  }, [selectedCurveId, totalAssets, totalShares]);
  const handleTotalAssetsChange = useCallback$1(
    async (newValue) => {
      try {
        const parsedValue = parseEther(newValue || "0");
        setTotalAssets(parsedValue);
        if (selectedCurveId) {
          setDeployedContracts(
            (prev) => prev.map(
              (c) => c.id === selectedCurveId ? {
                ...c,
                totalAssets: parsedValue,
                points: c.points.map((point) => ({
                  ...point,
                  totalValue: point.x <= parseFloat(formatEther(parsedValue)) ? point.y : void 0,
                  userValue: point.x <= parseFloat(formatEther(c.userAssets)) ? point.y : void 0
                }))
              } : c
            )
          );
        }
      } catch (err) {
        console.error("Error updating total assets:", err);
      }
    },
    [selectedCurveId, setDeployedContracts]
  );
  const handleTotalSharesChange = useCallback$1(
    async (newValue) => {
      try {
        const parsedValue = parseEther(newValue || "0");
        setTotalShares(parsedValue);
        if (selectedCurveId) {
          setDeployedContracts(
            (prev) => prev.map(
              (c) => c.id === selectedCurveId ? {
                ...c,
                totalShares: parsedValue,
                points: c.points.map((point) => ({
                  ...point,
                  totalValue: point.x <= parseFloat(formatEther(c.totalAssets)) ? point.y : void 0,
                  userValue: point.x <= parseFloat(formatEther(c.userAssets)) ? point.y : void 0
                }))
              } : c
            )
          );
        }
      } catch (err) {
        console.error("Error updating total shares:", err);
      }
    },
    [selectedCurveId, setDeployedContracts]
  );
  useCallback$1(
    async (amount) => {
      if (!selectedCurveId)
        return;
      const curve = deployedContracts.find((c) => c.id === selectedCurveId);
      if (!curve)
        return;
      try {
        if (!amount) {
          setDepositAmount(0n);
          return;
        }
        const fixedAmount = amount.toFixed(18);
        const amountBigInt = parseEther(fixedAmount);
        setDepositAmount(amountBigInt);
        const shares = await publicClient.readContract({
          address: curve.address,
          abi: curve.abi,
          functionName: "previewDeposit",
          args: [amountBigInt, curve.totalAssets, curve.totalShares]
        });
        const sharesNumber = Number(formatEther(BigInt(shares.toString())));
        setDeployedContracts(
          (prev) => prev.map(
            (c) => c.id === selectedCurveId ? {
              ...c,
              previewPoints: [
                {
                  x: Number(formatEther(curve.totalAssets + amountBigInt)),
                  y: sharesNumber,
                  previewPoint: true
                }
              ]
            } : c
          )
        );
      } catch (err) {
        console.error("Error previewing deposit:", err);
      }
    },
    [selectedCurveId, publicClient, deployedContracts]
  );
  const handleDeposit = useCallback$1(async () => {
    if (!selectedCurveId || !depositAmount)
      return;
    const curve = deployedContracts.find((c) => c.id === selectedCurveId);
    if (!curve)
      return;
    try {
      const response = await publicClient.readContract({
        address: curve.address,
        abi: curve.abi,
        functionName: "previewDeposit",
        args: [depositAmount, curve.totalAssets, curve.totalShares]
      });
      const newShares = BigInt(response.toString());
      const newUserAssets = userAssets - depositAmount;
      const newUserShares = userShares + newShares;
      setUserAssets(newUserAssets);
      setUserShares(newUserShares);
      const newTotalAssets = curve.totalAssets + depositAmount;
      const newTotalShares = newUserShares;
      setTotalAssets(newTotalAssets);
      setTotalShares(newTotalShares);
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        totalValue: point.x <= Number(formatEther(newTotalAssets)) ? point.y : void 0,
        userValue: point.x <= Number(formatEther(newUserAssets)) ? point.y : void 0
      }));
      setDeployedContracts(
        (prev) => prev.map(
          (c) => c.id === selectedCurveId ? {
            ...c,
            totalAssets: newTotalAssets,
            totalShares: newTotalShares,
            userAssets: newUserAssets,
            userShares: newUserShares,
            previewPoints: void 0,
            points: updatedPoints
          } : c
        )
      );
      setDepositAmount(0n);
    } catch (err) {
      console.error("Error executing deposit:", err);
    }
  }, [
    selectedCurveId,
    depositAmount,
    publicClient,
    deployedContracts,
    userAssets,
    userShares
  ]);
  const handleRedeem = useCallback$1(async () => {
    if (!selectedCurveId || !redeemAmount)
      return;
    const curve = deployedContracts.find((c) => c.id === selectedCurveId);
    if (!curve)
      return;
    try {
      const assetsToReturn = await publicClient.readContract({
        address: curve.address,
        abi: curve.abi,
        functionName: "previewRedeem",
        args: [redeemAmount, curve.totalShares, curve.totalAssets]
      });
      const assetsToReturnBigInt = BigInt(assetsToReturn.toString());
      const newUserAssets = userAssets + assetsToReturnBigInt;
      const newUserShares = userShares - redeemAmount;
      setUserAssets(newUserAssets);
      setUserShares(newUserShares);
      const newTotalAssets = curve.totalAssets - assetsToReturnBigInt;
      const newTotalShares = newUserShares;
      setTotalAssets(newTotalAssets);
      setTotalShares(newTotalShares);
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        totalValue: point.x <= Number(formatEther(newTotalAssets)) ? point.y : void 0,
        userValue: point.x <= Number(formatEther(newUserAssets)) ? point.y : void 0
      }));
      setDeployedContracts(
        (prev) => prev.map(
          (c) => c.id === selectedCurveId ? {
            ...c,
            totalAssets: newTotalAssets,
            totalShares: newTotalShares,
            userAssets: newUserAssets,
            userShares: newUserShares,
            previewPoints: void 0,
            points: updatedPoints
          } : c
        )
      );
      setRedeemAmount(0n);
    } catch (err) {
      console.error("Error executing redeem:", err);
    }
  }, [
    selectedCurveId,
    redeemAmount,
    publicClient,
    deployedContracts,
    userAssets,
    userShares
  ]);
  const handleContractLayout = useCallback$1(async (layout) => {
    setContractLayout(layout);
  }, []);
  const handleContractInfo = useCallback$1(async (info) => {
    setContractInfo(info);
  }, []);
  const handleVariableChange = useCallback$1(
    async (variable, newValue) => {
      if (!selectedContract)
        return;
      try {
        let parsedValue;
        const isString = variable.type === "string";
        if (isString) {
          const hex = stringToHex(newValue, { size: 32 });
          parsedValue = BigInt(hex);
        } else if (variable.type.startsWith("uint") || variable.type.startsWith("int")) {
          parsedValue = parseNumberInput(newValue);
        } else {
          console.warn("Unsupported variable type:", variable.type);
          return;
        }
        await writeStorageSlot(
          selectedContract.address,
          variable.slot,
          parsedValue,
          publicClient
        );
        const layout = await getContractLayout(
          selectedContract.address,
          selectedContract.abi,
          publicClient
        );
        handleContractLayout(layout);
        const info = {
          address: selectedContract.address,
          name: selectedContract.name,
          variables: layout.variables,
          constructorValues: selectedContract.constructorValues,
          variableToConstructor: selectedContract.variableToConstructor
        };
        handleContractInfo(info);
      } catch (err) {
        console.error("Failed to update variable:", err);
        setError(
          err instanceof Error ? err.message : "Failed to update variable"
        );
      }
    },
    [publicClient, selectedContract, handleContractLayout, handleContractInfo]
  );
  const handleColorChange = useCallback$1(
    (color) => {
      if (!selectedCurveId)
        return;
      setDeployedContracts(
        (prev) => prev.map(
          (curve) => curve.id === selectedCurveId ? {
            ...curve,
            color
          } : curve
        )
      );
    },
    [selectedCurveId]
  );
  useEffect$1(() => {
    return () => {
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Text, { variant: "heading2", children: "Bonding Curve Visualizer" }),
      /* @__PURE__ */ jsx(Text, { variant: "body", className: "text-muted-foreground", children: "Upload and compare multiple bonding curve implementations" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 rounded-lg border border-border p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label$1, { children: "Min Value (ETH)" }),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              type: "number",
              value: minValue,
              onChange: (e) => {
                const newMin = Number(e.target.value);
                setMinValue(newMin);
                handleMinMaxChange(newMin, maxValue);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label$1, { children: "Max Value (ETH)" }),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              type: "number",
              value: maxValue,
              onChange: (e) => {
                const newMax = Number(e.target.value);
                setMaxValue(newMax);
                handleMinMaxChange(minValue, newMax).catch(console.error);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label$1, { children: "Add Curve Implementation" }),
        /* @__PURE__ */ jsx(Input$1, { type: "file", onChange: handleFileChange })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: deployedContracts.map((contract) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex flex-col gap-2 rounded-lg border p-2 cursor-pointer ${selectedCurveId === contract.id ? "border-primary bg-primary/10" : "border-border"}`,
          onClick: () => handleCurveSelect(contract.id),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-2 w-2 rounded-full",
                  style: { backgroundColor: contract.color }
                }
              ),
              /* @__PURE__ */ jsx("span", { children: contract.name }),
              /* @__PURE__ */ jsx(
                Button$1,
                {
                  variant: "ghost",
                  className: "h-4 w-4 p-0",
                  onClick: (e) => {
                    e.stopPropagation();
                    removeCurve(contract.id);
                  },
                  children: /* @__PURE__ */ jsx(X$2, { className: "h-3 w-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: Object.entries(contract.constructorValues).map(
              ([key, value]) => /* @__PURE__ */ jsxs("div", { children: [
                key,
                ": ",
                value
              ] }, key)
            ) })
          ]
        },
        contract.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "h-[400px] w-full rounded-lg border border-border p-4", children: /* @__PURE__ */ jsx(
        LineChart,
        {
          data: deployedContracts.map((contract) => ({
            id: contract.id,
            color: contract.color,
            points: contract.points,
            name: contract.name,
            totalAssets: Number(formatEther(contract.totalAssets)),
            totalShares: Number(formatEther(contract.totalShares)),
            previewPoints: contract.previewPoints,
            scaledPreviewAmount: contract.scaledPreviewAmount,
            scaledTotalAssets: contract.scaledTotalAssets
          })),
          xLabel: "Assets",
          yLabel: "Shares",
          totalAssets: selectedCurveId ? Number(formatEther(totalAssets)) : void 0,
          previewAmount: selectedCurveId && (depositAmount > 0n || redeemAmount > 0n) ? Number(
            formatEther(
              ((_a = deployedContracts.find((c) => c.id === selectedCurveId)) == null ? void 0 : _a.scaledPreviewAmount) || 0n
            )
          ) : void 0,
          selectedCurveId: selectedCurveId || void 0
        }
      ) }),
      selectedCurveId && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx(Label$1, { children: "Total Assets" }),
              /* @__PURE__ */ jsx(
                Input$1,
                {
                  type: "text",
                  value: formatDisplayValue(totalAssets),
                  onChange: (e) => {
                    const value = parseInputValue(e.target.value);
                    setTotalAssets(value);
                    handleTotalAssetsChange(e.target.value);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx(Label$1, { children: "Total Shares" }),
              /* @__PURE__ */ jsx(
                Input$1,
                {
                  type: "text",
                  value: formatDisplayValue(totalShares),
                  onChange: (e) => {
                    const value = parseInputValue(e.target.value);
                    setTotalShares(value);
                    handleTotalSharesChange(e.target.value);
                  }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Button$1, { onClick: () => setColorPickerOpen(true), children: "Color" }),
            /* @__PURE__ */ jsx(Button$1, { onClick: handleEditCurve, children: "Edit Curve" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(Label$1, { children: "Deposit Amount (ETH)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                SpinButton,
                {
                  value: formatDisplayValue(depositAmount, false),
                  onChange: (value) => {
                    const ethValue = parseFloat(value) || 0;
                    const weiValue = parseEther(ethValue.toFixed(18));
                    setDepositAmount(weiValue);
                    handleDepositPreview(ethValue.toString());
                  },
                  min: "0",
                  step: getStepSize(
                    Number(formatEther(depositAmount)),
                    Number(formatEther(totalAssets))
                  ).toString()
                }
              ),
              /* @__PURE__ */ jsx(Button$1, { onClick: handleDeposit, children: "Deposit" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(Label$1, { children: "Redeem Amount (Shares)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                SpinButton,
                {
                  value: redeemAmount.toString(),
                  onChange: (value) => {
                    console.log("Redeem SpinButton onChange:", value);
                    const weiValue = BigInt(Math.floor(parseFloat(value)));
                    console.log("Setting redeem amount:", {
                      value,
                      weiValue: weiValue.toString()
                    });
                    setRedeemAmount(weiValue);
                    handleRedeemPreview(formatEther(weiValue));
                  },
                  min: "0",
                  max: userShares.toString(),
                  step: (totalShares / 1000n).toString()
                }
              ),
              /* @__PURE__ */ jsx(Button$1, { onClick: handleRedeem, children: "Redeem" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(Label$1, { children: "Your Assets" }),
            /* @__PURE__ */ jsx(
              Input$1,
              {
                type: "text",
                value: formatDisplayValue(userAssets),
                onChange: (e) => setUserAssets(
                  parseEther(
                    e.target.value.replace(/\s*(?:wei|ETH)$/, "") || "0"
                  )
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(Label$1, { children: "Your Shares" }),
            /* @__PURE__ */ jsx(
              Input$1,
              {
                type: "text",
                value: formatDisplayValue(userShares),
                onChange: (e) => setUserShares(
                  parseEther(
                    e.target.value.replace(/\s*(?:wei|ETH)$/, "") || "0"
                  )
                )
              }
            )
          ] })
        ] })
      ] })
    ] }),
    selectedFileId && /* @__PURE__ */ jsx(
      ConstructorForm,
      {
        isOpen: true,
        onClose: () => setSelectedFileId(null),
        onSubmit: handleConstructorSubmit,
        args: ((_b = files.get(selectedFileId)) == null ? void 0 : _b.constructorArgs) || [],
        fileName: ((_c = files.get(selectedFileId)) == null ? void 0 : _c.file.name) || ""
      }
    ),
    /* @__PURE__ */ jsx(
      ContractVariablesModal,
      {
        isOpen: !!selectedContract,
        onClose: () => {
          setSelectedContract(null);
          setContractLayout(null);
        },
        contract: selectedContract && contractLayout ? {
          address: selectedContract.address,
          name: selectedContract.name,
          variables: contractLayout.variables,
          constructorValues: selectedContract.constructorValues,
          variableToConstructor: selectedContract.variableToConstructor
        } : null,
        onVariableChange: handleVariableChange
      }
    ),
    /* @__PURE__ */ jsx(
      ColorPicker,
      {
        isOpen: colorPickerOpen,
        onClose: () => setColorPickerOpen(false),
        onColorSelect: handleColorChange,
        currentColor: ((_d = deployedContracts.find((c) => c.id === selectedCurveId)) == null ? void 0 : _d.color) || CURVE_COLORS[0]
      }
    )
  ] });
}
const meta = () => {
  return [
    { title: "Bonding Curves" },
    {
      name: "description",
      content: "Interactive visualization of bonding curves"
    }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "Bonding Curves" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Upload and visualize your custom bonding curve implementations" })
    ] }),
    /* @__PURE__ */ jsx(CurveVisualizer, {})
  ] }) }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D3xqcB6J.js", "imports": ["/assets/index-_ym_c-sR.js", "/assets/components-FTevL6iJ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CaMflcnr.js", "imports": ["/assets/index-_ym_c-sR.js", "/assets/components-FTevL6iJ.js"], "css": [] }, "routes/favicon[.ico]": { "id": "routes/favicon[.ico]", "parentId": "root", "path": "favicon.ico", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/favicon_.ico_-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api.compile": { "id": "routes/api.compile", "parentId": "root", "path": "api/compile", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.compile-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api.deploy": { "id": "routes/api.deploy", "parentId": "root", "path": "api/deploy", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.deploy-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-7UcVvO2U.js", "imports": ["/assets/index-_ym_c-sR.js", "/assets/_index-CjPjdpAJ.js"], "css": ["/assets/_index-Cp_5SWwz.css"] } }, "url": "/assets/manifest-1e3fc60b.js", "version": "1e3fc60b" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/favicon[.ico]": {
    id: "routes/favicon[.ico]",
    parentId: "root",
    path: "favicon.ico",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/api.compile": {
    id: "routes/api.compile",
    parentId: "root",
    path: "api/compile",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/api.deploy": {
    id: "routes/api.deploy",
    parentId: "root",
    path: "api/deploy",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
