import type { ArticleBlock } from "@/types/content";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={index} className="mt-10 font-display text-2xl font-semibold text-text md:text-3xl">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={index} className="mt-6 font-display text-xl font-semibold text-text">
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={index} className="list-disc space-y-2 pl-6 text-text-muted">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="leading-7">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-brand pl-5 font-display text-lg italic text-text"
              >
                {block.text}
              </blockquote>
            );
          case "paragraph":
          default:
            return (
              <p key={index} className="leading-7 text-text-muted md:text-lg">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
