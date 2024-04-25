# Remix Applications | Managing User Preferences with Cookies

Our applications utilize cookies to manage and apply user preferences, such as theme settings (e.g., light or dark mode). This approach addresses common issues associated with server-side rendering (SSR), such as the Flash of Incorrect UI and content layout shifts, thereby enhancing user experience.

## Context

When rendering content on the server, the lack of immediate access to client-specific settings (like theme preference) can lead to a mismatch between the server's output and the user's expectations. This mismatch can result in a flash of incorrect UI, where the user briefly sees incorrect styling before client-side JavaScript corrects it. To mitigate this, our application sets cookies on the client-side that store these preferences. On subsequent requests, the server reads these cookies and renders the UI accordingly, ensuring that the user sees the correct UI from the moment the page loads.

### Example: Theme Preference

Consider a user who prefers a dark mode UI. Here’s how cookies play a crucial role:

1. **Initial Visit:** On the user's first visit, if no preference cookie is found, a default light theme is served. Simultaneously, a minimal amount of JavaScript runs to detect the user's preferred theme, sets a cookie reflecting this preference, and reloads the page.
2. **Subsequent Visits:** On future visits, the server reads the user's theme preference from the cookie and renders the appropriate theme server-side. This eliminates any visual discrepancies upon page load.
3. **Changing Preferences:** If the user changes their theme preference, the change is captured by client-side JavaScript, which updates the cookie and triggers a page reload to reflect the new preference immediately.

Using cookies for storing user preferences offers several benefits:

- **Consistency:** Ensures that the UI is consistent with user preferences right from the first server-rendered view.
- **Performance:** Reduces the reliance on client-side JavaScript for initial UI corrections, which can be crucial for users on slow connections.
- **User Experience:** Significantly improves user experience by preventing content layout shifts and flashes of incorrect UI.

## Drawbacks

1. Users who disable cookies might not benefit from this functionality, resulting in default settings on each visit and potential layout shifts.
2. The proper way to handle this in the future is to use `user preferences media features` headers. We are locked into this until `user preference media features` headers become widely supported and implemented.

## TLDR

Using cookies to manage user preferences allows us to enhance the overall user experience by providing a consistent and stable UI that aligns with individual user settings from the very first load.
