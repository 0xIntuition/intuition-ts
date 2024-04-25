## Progressive Enhancement with Remix

Progressive enhancement emphasizes focusing on baseline functionalities and enhancing existing features rather than adding new ones. Enhancing a user experience is more impactful than merely enabling one. This approach should extend beyond frontend architecture to include SDKs, improving developer experience (DX) as well.

[Remix-run](https://remix.run/) is fundamentally designed with progressive enhancement in mind.

The Remix ethos can be summed up in four points:

1. Embrace the server/client model, including separation of source code from content/data.
2. Work with, not against, the foundations of the web: Browsers, HTTP, and HTML. It’s always been good and it's gotten really good in the last few years.
3. Use JavaScript to augment the user experience by emulating browser behavior.
4. Don't over-abstract the underlying technologies

## Implementation Guidelines

To utilize Remix as it was intended and maximize its capabilities, we should design and architect every page to meet the following criteria (to the best of our ability).

- Basic content should be accessible to all web browsers
- Basic functionality should be accessible to all web browsers
- Sparse, semantic markup contains all content.
- Enhanced layout is provided by externally linked CSS (postcss, tailwind)
- Enhanced behavior is provided by externally linked TS (framer motion, formatting libraries, wagmi / web3 writes)
- End-user web browser preferences are respected (no assumptions are made, example - assuming Location API vs. allowing user to enter in address + _optional enhancement_ using Location API if enabled for an improved UX ♥️)

By following these guidelines, we enhance the scalability, accessibility, and maintainability of our applications, providing a robust user experience that leverages the full spectrum of web technologies.
