export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          Written for the Keploy DevRel assignment. Built with Next.js, MDX and Tailwind CSS.
        </p>
        <p>
          Not affiliated with Keploy. Sample app from{" "}
          <a
            className="underline decoration-border underline-offset-4 hover:text-foreground"
            href="https://github.com/keploy/samples-go/tree/main/gin-mongo"
            target="_blank"
            rel="noreferrer"
          >
            keploy/samples-go
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
