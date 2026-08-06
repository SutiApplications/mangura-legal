import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type LegalDocumentProps = {
  eyebrow: string;
  markdown: string;
};

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    const element = children as { props?: { children?: ReactNode } };
    return textFromChildren(element.props?.children);
  }

  return "";
}

function headingId(children: ReactNode): string {
  return textFromChildren(children)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function HeadingTwo({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return <h2 id={headingId(children)} {...props}>{children}</h2>;
}

function HeadingThree({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  return <h3 id={headingId(children)} {...props}>{children}</h3>;
}

const markdownComponents: Components = {
  h2: HeadingTwo,
  h3: HeadingThree,
  a: ({ href, children, ...props }) => {
    const external = href?.startsWith("http");
    return (
      <a href={href} rel={external ? "noreferrer" : undefined} {...props}>
        {children}
      </a>
    );
  },
};

export function LegalDocument({ eyebrow, markdown }: LegalDocumentProps) {
  return (
    <main id="main-content" className="legal-main">
      <div className="legal-hero shell">
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <article className="legal-document shell">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}
