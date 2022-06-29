import type { PageType } from "~/lib/db.server"
import { Rendered } from "~/markdown"
import { PageContent } from "../common/PageContent"
import { PostMeta } from "./PostMeta"
import { Profile } from "unidata.js"

export const SitePage: React.FC<{
  site: Profile,
  page: {
    tags?: string[]
    date_published: string
    title?: string
    related_urls?: string[]
    authors?: string[]
    body?: {
      content?: string
    }
    metadata?: {
      owner?: string
    }
  }
}> = ({ site, page }) => {
  return (
    <>
      <div className="">
        {page.tags?.includes("post") ? (
          <h2 className="text-4xl font-bold">{page.title}</h2>
        ) : (
          <h2 className="text-xl font-bold page-title">{page.title}</h2>
        )}
        {page.tags?.includes("post") && (
          <PostMeta
            publishedAt={page.date_published}
            authors={[{
              id: site.username || "",
              name: site.name || "",
              avatar: site.avatars?.[0] || null,
            }] || []}
          />
        )}
      </div>
      <PageContent
        contentHTML={page.body?.content || ""}
        className="my-10"
      />
      <div className="bg-gray-100 rounded-lg py-8 px-5 break-all">
        <p className="text-gray-700 mb-4">🔔 This post has been permanently stored on-chain and signed by its creator.</p>
        <ul className="text-gray-600 text-sm leading-6">
          <li className="mt-2">
            <div className="font-bold">Crossbell Transaction</div>
            <div>{page.related_urls?.filter((url) => url.startsWith("https://scan.crossbell.io/tx/")).map((url) => {
              return <a target="_blank" rel="noreferrer" className="inline-block mr-4" href={url} key={url}>{url.replace("https://scan.crossbell.io/tx/", "").slice(0, 10)}...{url.replace("https://scan.crossbell.io/tx/", "").slice(-10)}</a>
            })}</div>
          </li>
          <li className="mt-2">
            <div className="font-bold">IPFS Address</div>
            <div>{page.related_urls?.filter((url) => url.startsWith("https://gateway.ipfs.io/ipfs/")).map((url) => {
              return <a target="_blank" rel="noreferrer" className="inline-block mr-4" href={url} key={url}>{url.replace("https://gateway.ipfs.io/ipfs/", "ipfs://")}</a>
            })}</div>
          </li>
          <li className="mt-2">
            <div className="font-bold">Author Address</div>
            <div>
              <a target="_blank" rel="noreferrer" className="inline-block mr-4" href={`https://scan.crossbell.io/address/${page.metadata?.owner}`} key={page.metadata?.owner}>{page.metadata?.owner}</a>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
