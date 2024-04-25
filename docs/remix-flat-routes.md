# Remix Applications | Remix Flat Routes

We use remix-flat-routes, specifically `Hybrid Routes` in our Remix application to enhance route management, allowing for both flat and nested route structures. This hybrid routing approach enables simpler and more flexible organization of routes, supporting better scalability and maintainability. By using this package, we can maintain the colocation benefits of flat routes while also allowing for hierarchical structures where necessary, which is useful for large applications with deep route nesting.

For example, remix-flat-routes allows us to structure routes like this:

```plaintext
app/routes-hybrid
├── users
│   └── $userId
│       ├── index.tsx
│       └── edit
│           └── index.tsx
```

This structure maintains a clear and organized file system, making it easier to manage and navigate our routes.
For more details on remix-flat-routes, visit [kiliman/remix-flat-routes](https://github.com/kiliman/remix-flat-routes)
